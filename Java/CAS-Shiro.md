# CAS和Shiro内外网访问

> 由于有需求要实现内外网双IP访问同一个应用，但是当前已部署的应用使用的cas+shiro的跳转url在spring的配置xml中写死的，所以需要实现判断来源HOST动态单点登录和跳转

> 物理方式：可以通过另外搭建搭建两台机器做iptables转发，需要有一个公网IP和一个内网IP，通过iptables把外网请求全部转发到VIP上面
> ，一台做一个VIP转发，这样就可以实现跨网段的通讯了


**部分响应体中写死了IP需要替换**

> 使用Nginx+Lua脚本，[body_filter_by_lua*](https://github.com/openresty/lua-nginx-module#body_filter_by_lua)替换响应体中的IP，也可以使用Nginx内置模块[ngx_http_sub_filter_module ](https://iziyang.github.io/2020/05/26/6-nginx)，或第三方模块[replace-filter-nginx-module](https://github.com/openresty/replace-filter-nginx-module)

> 因为替换内容后长度不一致了，需要在`header_filter_by_lua*`中加入`ngx.header.content_length = nil`置空内容长度

```lua
-- body_filter_by_lua_file:
-- 获取当前响应数据
local chunk, eof = ngx.arg[1], ngx.arg[2]
local cjson = require("cjson");

local req_headers = ngx.req.get_headers() -- 请求头
local resp_headers = ngx.resp.get_headers() -- 响应头

-- 定义全局变量，收集全部响应
if ngx.ctx.buffered == nil then
    ngx.ctx.buffered = {}
end

-- 如果非最后一次响应，将当前响应赋值
if chunk ~= "" and not ngx.is_subrequest then
    table.insert(ngx.ctx.buffered, chunk)
    -- 将当前响应赋值为空，以修改后的内容作为最终响应
    ngx.arg[1] = nil
end

-- 如果为最后一次响应，对所有响应数据进行处理
if eof then
    -- 获取所有响应数据
    local whole = table.concat(ngx.ctx.buffered)
    ngx.ctx.buffered = nil
    
    -- 内容有指定IP
    if whole
        -- 判断响应Host是否为客户端访问Host
        and not string.match(whole, ngx.var.http_host)
    then
        -- ngx.log(ngx.ERR, "body_filter_by_lua::::响应内容：》》》\n", whole, "\n《《《")
        -- 替换外网IP，需在server或location中设置以下两个变量
        -- set $outerIP "100%.100%.100%.100"; # 外网IP
        -- set $insideIP  "172%.16%.0%.91"; # 内网IP
        whole = string.gsub(whole, ngx.var.insideIP, ngx.var.outerIP)
        -- 重新赋值响应数据，以修改后的内容作为最终响应
    end
    ngx.arg[1] = whole
end
```



## 方案一

- 使用Nginx反向代理

> 缺点很明显：登录CAS的URL中的`service`参数不能替换，而且无法做判断，可自定义程度不高

```nginx
location /test {
    proxy_headers_hash_max_size 51200;
    proxy_headers_hash_bucket_size 6400;
    proxy_connect_timeout 500s;
    proxy_read_timeout 500s;
    proxy_send_timeout 500s;
    proxy_pass http://server/test;
    
    proxy_set_header Host $host:$server_port;
    #proxy_set_header Host $http_host;
    #proxy_set_header Host $server_addr:$server_port;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # 修改响应头中的"Location"和"Refresh"字段，只能替换host部分，参数部分无法替换，非常重要
    # https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_redirect
    #proxy_redirect $scheme://$server_addr:$server_port/ /;
    #proxy_redirect $scheme://$server_addr:$server_port/ $scheme://$http_host/;
    #proxy_redirect ~^http://172.16.0.1:81(.*) http://100.100.100.100:81$1; 
    proxy_redirect ~^http://172.16.0.91:81(.*) $scheme://$http_host$1;
    #proxy_set_header REMOTE-HOST $server_addr;
    proxy_set_header X-FORWARDED-HOST $server_addr;
    proxy_set_header X-FORWARDED-PORT $server_port;
    proxy_set_header Referer $http_referer;
    proxy_set_header Cookie $http_cookie;
    # response中set-cookie的domain转换
    #proxy_cookie_domain $server_addr $host; 
}
```



## 方案二

> 使用纯Nginx+Lua实现 **[`lua-nginx-module`时序图](https://github.com/openresty/lua-nginx-module#lua_load_resty_core)，点击链接后向上滑动**


**完整实现脚本见[https://github.com/bajins/scripts_shell](https://github.com/bajins/scripts_shell)**

> 后端返回的地址全部填NGINX的内网IP:port（端口内外网是一致的），当为外网IP请求进来时，把URL替换成NGINX的内网IP，返回时替换内网IP为外网IP


* [access_by_lua*](https://github.com/openresty/lua-nginx-module#access_by_lua) 替换请求头Host和`service`参数

> 此方式可以使用Nginx全局变量实现，但可自定义程度范围不大

```nginx
if ($is_args = "?"){
  
}
if ($arg_service){
    set $arg_service "http://172.16.0.91:81/test/login";
}
```

* [header_filter_by_lua*](https://github.com/openresty/lua-nginx-module#header_filter_by_lua) 替换响应头Location和Refresh

> 其实此方式也可以使用Nginx第三方模块实现：[headers-more-nginx-module](https://github.com/openresty/headers-more-nginx-module)



**其他人的一些实现**

- [https://github.com/EsupPortail/nginx-auth-cas-lua](https://github.com/EsupPortail/nginx-auth-cas-lua)
- [https://github.com/search?q=nginx+cas](https://github.com/search?q=nginx+cas)


## 方案三

**继承`FormAuthenticationFilter`动态改变各个url**

- 后端继承`FormAuthenticationFilter`并修改`CasRealm.setCasService()`为动态URL（应与访问CAS登录URL携带的`service`参数一致，授权是根据此参数发票）

> CAS验证前端传的`ticket`所属域（Host）与`CasService`是否一致，不一致将报错：`org.jasig.cas.client.validation.TicketValidationException:  ticket 'ST-5490-w49WPFydIwcL9bdlY7cq-cas01.example.org' does not match supplied service.  The original service was 'http://x.x.x.x:8080/test/login' and the supplied service was 'http://172.16.0.91:2931/test/login'`
>
> 且在浏览器客户端不停地重定向`首页->cas登录->登录带ticket`死循环，查看IP下的Cookie发现ticket其实是在另一个IP下面

> 出现此错误的原因是：由于`CasRealm.setCasService()`的值是固定的（这里我并没有修改），然后在lua脚本中替换了CAS登录URL中所有的Host（错误的：`http://100.100.100.100:81/cas/login?service=http://100.100.100.100:81/test/login`，包含`service`参数部分被替换，正确的应该是：`http://100.100.100.100:81/cas/login?service=http://172.16.0.91:81/test/login`），这是因为在登录之后，CAS中校验授权时会发现票根的URL（`http://172.16.0.91:81/test/login`）与当前访问的应用URL（`http://100.100.100.100:81/test/login`）不一致


```java
package com.bajins.common;

import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.cas.CasFilter;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.filter.authc.LogoutFilter;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.util.StringUtils;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.bajins.common.shiro.cas.CasUserRealm;

/**
 * @Title: ImsAuthenticationFilter.java
 * @Package com.bajins.common
 * @Description: shiro动态改变loginUrl
 * @author: https://www.bajins.com
 * @date: 2021年4月15日 下午3:07:18
 * @version V1.0
 * @Copyright: 2021 bajins.com Inc. All rights reserved.
 */
public class ImsAuthenticationFilter extends FormAuthenticationFilter {

    private static transient final Logger log = LoggerFactory.getLogger(ImsAuthenticationFilter.class);

    private static final String FLAG = "/login?service=";

    private String clientUrl;
    private String serverUrl;

    /**
     * @return the clientUrl
     */
    public String getClientUrl() {
        return clientUrl;
    }

    /**
     * @param clientUrl the clientUrl to set
     */
    public void setClientUrl(String clientUrl) {
        this.clientUrl = clientUrl;
    }

    /**
     * @return the serverUrl
     */
    public String getServerUrl() {
        return serverUrl;
    }

    /**
     * @param serverUrl the serverUrl to set
     */
    public void setServerUrl(String serverUrl) {
        this.serverUrl = serverUrl;
    }

    @Override
    protected void redirectToLogin(ServletRequest request, ServletResponse response) throws IOException {

        HttpServletRequest httpServletRequest = (HttpServletRequest) request;

        String contextPath = httpServletRequest.getContextPath();

        // url - uri = domain
        int len = httpServletRequest.getRequestURL().length() - httpServletRequest.getRequestURI().length();
        String domain = httpServletRequest.getRequestURL().substring(0, len);

        /*String reg = "^(192\\.168|172\\.(1[6-9]|2\\d|3[0,1]))(\\.(2[0-4]\\d|25[0-5]|[0,1]?\\d?\\d)){2}$"
                + "|^10(\\.([2][0-4]\\d|25[0-5]|[0,1]?\\d?\\d)){3}$";
        //String reg = "(10|172|192|127)\\.([0-1][0-9]{0,2}|[2][0-5]{0,2}|[3-9][0-9]{0,1})\\.([0-1][0-9]{0,2}"
        //        + "|[2][0-5]{0,2}|[3-9][0-9]{0,1})\\.([0-1][0-9]{0,2}|[2][0-5]{0,2}|[3-9][0-9]{0,1})";
        Pattern p = Pattern.compile(reg);
        Matcher matcher = p.matcher(ipAddress);
        boolean isIntranet = matcher.find();
        if (isIntranet || httpServletRequest.getRemoteHost().equals("172.16.0.91")) { // 如果是内网
            WebUtils.issueRedirect(request, response, domain + "/cas" + loginUrl);
        } else {
            
        }*/

        // 获取servletContext容器
        ServletContext sc = httpServletRequest.getSession().getServletContext();
        // 获取web环境下spring容器
        ApplicationContext ac = WebApplicationContextUtils.getWebApplicationContext(sc);

        CasUserRealm casUserRealm = (CasUserRealm) ac.getBean("casUserRealm");
        CasFilter casFilter = (CasFilter) ac.getBean("casFilter");
        LogoutFilter logoutFilter = (LogoutFilter) ac.getBean("logoutFilter");

        ShiroFilterFactoryBean shiroFilter = (ShiroFilterFactoryBean) ac.getBean("&shiroFilter");

        // 根据客户端url中的host动态替换url
        String client = domain + contextPath;
        String clientLoginUrl = client + "/login";
        casUserRealm.setCasServerUrlPrefix(domain + getServerUrl());
        casUserRealm.setCasService(clientLoginUrl);
        casFilter.setFailureUrl(client + "/index");
        casFilter.setSuccessUrl(client + "/");
        // casFilter.setLoginUrl(loginUrl);
        logoutFilter.setRedirectUrl(domain + getServerUrl() + FLAG.replace("login", "logout") + clientLoginUrl);
        shiroFilter.setLoginUrl(domain + getServerUrl() + FLAG + clientLoginUrl);
        log.info("login跳转地址：{}", this.getLoginUrl());

        WebUtils.issueRedirect(httpServletRequest, response, this.getLoginUrl()); // 302跳转
    }

    /*@Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
        return false;
    }*/

    /*@Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        String loginUrl = this.getLoginUrl();
        Subject subject = getSubject(request, response);
        if (subject.getPrincipal() == null) {// 表示没有登录，重定向到登录页面
            saveRequest(request);
            WebUtils.issueRedirect(request, response, loginUrl);
        } else {
            if (StringUtils.hasText(loginUrl)) {
                WebUtils.issueRedirect(request, response, loginUrl);
            } else {
                WebUtils.toHttp(response).sendError(HttpServletResponse.SC_UNAUTHORIZED);
            }
        }
        return true;
    }*/

    /**
     * 获取用户真实IP地址
     * <p>
     * 当我们通过request获取客户端IP时，如果对自身服务器做了反向代理。 
     * 通过request.getRemoteAddr();可能获取到的是代理服务器的IP，而无法获取到用户请求IP
     *
     * @param request
     * @return java.lang.String
     */
    public static String getIpAddress(HttpServletRequest request) {
        // X-Real-IP：Nginx服务代理
        String ipAddresses = request.getHeader("X-Real-IP");

        if (!StringUtils.hasText(ipAddresses) || "unknown".equalsIgnoreCase(ipAddresses)) {
            // Proxy-Client-IP：Apache 服务代理
            ipAddresses = request.getHeader("Proxy-Client-IP");
        }
        if (!StringUtils.hasText(ipAddresses) || "unknown".equalsIgnoreCase(ipAddresses)) {
            // WL-Proxy-Client-IP：WebLogic 服务代理
            ipAddresses = request.getHeader("WL-Proxy-Client-IP");
        }
        if (!StringUtils.hasText(ipAddresses) || "unknown".equalsIgnoreCase(ipAddresses)) {
            // HTTP_CLIENT_IP：有些代理服务器
            ipAddresses = request.getHeader("HTTP_CLIENT_IP");
        }
        if (!StringUtils.hasText(ipAddresses) || "unknown".equalsIgnoreCase(ipAddresses)) {
            ipAddresses = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (!StringUtils.hasText(ipAddresses) || "unknown".equalsIgnoreCase(ipAddresses)) {
            // X-Forwarded-For：Squid 服务代理 和 Nginx服务代理
            ipAddresses = request.getHeader("X-Forwarded-For");
        }
        // 有些网络通过多层代理，那么会获取到以逗号（,）分割的多个IP，第一个才是真实IP
        int index = ipAddresses.indexOf(",");
        if (index != -1) {
            ipAddresses = ipAddresses.substring(0, index);
        }
        if (!StringUtils.hasText(ipAddresses) || "unknown".equalsIgnoreCase(ipAddresses)) {
            ipAddresses = request.getRemoteAddr();
        }
        return ipAddresses;
    }
}
```

**修改Spring-Shiro配置xml**

```xml
<bean id="imsAuthenticationFilter" class="com.bajins.common.ImsAuthenticationFilter">
	<property name="serverUrl" value="${cas.server}" />
	<property name="clientUrl" value="${cas.client}" />
</bean>
<!-- Shiro的Web过滤器 -->
<bean id="shiroFilter" class="org.apache.shiro.spring.web.ShiroFilterFactoryBean">
	<property name="securityManager" ref="securityManager" />
	<!-- 原来写死的配置 -->
	<!-- <property name="loginUrl" value="${cas.server}/login?service=${cas.client}/login" /> -->
	<property name="loginUrl" value="/login?service=${cas.client}/login" />
	<property name="unauthorizedUrl" value="/unauthorized" />
	<property name="filters">
		<util:map>
			<!-- 这里把自定义的过滤器加入 -->
			<entry key="authc" value-ref="imsAuthenticationFilter" />
			<entry key="authl" value-ref="loginControlFilter" />
			<entry key="cas" value-ref="casFilter" />
			<entry key="logout" value-ref="logoutFilter" />
			<entry key="casLogout" value-ref="casLogoutFilter" />
		</util:map>
	</property>
	<!-- 指定访问地址经过指定Filter过滤 -->
	<property name="filterChainDefinitions">
		<value>
			/common/** = anon
			/css/** = anon
			/js/** = anon
			/fileUpload/**=anon
			/api/** = anon
			/changeLocale=anon
			<!-- 注意：这里不能用自定义的过滤器，否则死循环重定向 -->
			/login = authl,casLogout,cas
			/logout = logout
			<!-- 使用自定义的过滤器 -->
			/** = authc,casLogout,user
		</value>
	</property>
</bean>
```



**参考：**

* [解决CAS内外网双IP访问的问题](https://blog.csdn.net/Y_paloma/article/details/76849746)
* [双网隔离环境下CAS单点登录的解决方案](https://blog.csdn.net/zazzh007/article/details/86686032)
* [CAS内外网都能访问配置说明](https://www.jianshu.com/p/0a86a376e897)
* [DataViz CAS 单点登录集成 · dataviz](http://www.idataviz.com/doc/integration/cas_integration.html)
* [springboot shiro 多realm多loginUrl设置（动态改变loginUrl）踩坑经历 重定向次数多](https://blog.csdn.net/weixin_44273241/article/details/109780822)