# Frp

* [https://github.com/fatedier/frp/releases](https://github.com/fatedier/frp/releases)


## 一键安装脚本
[onekey-install-shell](https://github.com/clangcn/onekey-install-shell/tree/master/frps)

[frpspro](https://github.com/dylanbai8/frpspro)

## 获取frp最新版本号
```bash
wget -qO- https://github.com/fatedier/frp/releases/latest | grep "<title>" |sed -r 's/.*Release (.> ) · fatedier.*/\1/'
```
```bash
curl -s https://api.github.com/repos/fatedier/frp/releases/latest --connect-timeout 10| grep 'tag_name' | cut -d\" -f4
wget -qO- https://api.github.com/repos/fatedier/frp/releases/latest --connect-timeout 10| grep 'tag_name' | cut -d\" -f4
```

## [frp-onekey](https://github.com/MvsCode/frp-onekey)

```bash
# 下载脚本
wget --no-check-certificate https://raw.githubusercontent.com/MvsCode/frp-onekey/master/install-frps.sh -O ./install-frps.sh
# 脚本授权
chmod 700 ./install-frps.sh
# 运行脚本安装
./install-frps.sh install
# 升级
bash install-frps.sh update
# 卸载
bash install-frps.sh uninstall
```


### 设置参数说明

> 输入frp提供服务的端口，用于服务器端和客户端通信
>
> `Please input frps bind_port [1-65535](Default Server Port: 5443):`

> 输入frp进行http穿透的http服务端口
>
> `Please input frps vhost_http_port [1-65535](Default vhost_http_port: 80):`

> 输入frp进行https穿透的https服务端口
>
> `Please input frps vhost_https_port [1-65535](Default vhost_https_port: 443):`

> 输入frp的控制台服务端口，用于查看frp工作状态
>
> `Please input frps dashboard_port [1-65535](Default dashboard_port: 6443):`

> 输入控制台账号，默认admin
>
> `Please input dashboard_user (Default: admin):`

> 输入控制台密码，默认随机
>
> `Please input dashboard_pwd (Default: d5Ai7XhC):`

> 输入frp服务器和客户端通信的密码，默认是随机生成的
> 
> `Please input token (Default: QZwoVJKgfLMhSQ1B):`

> 设置每个代理可以创建的连接池上限，默认50
> 
> `Please input frps max_pool_count [1-200](Default max_pool_count: 50):`

> `Please select log_level`设置日志等级，4个选项，默认是info
>> 1: info(default)
>> 
>> 2: warn
>> 
>> 3: error
>> 
>> 4: debug

> 设置日志保留天数，范围是1到30天，默认保留3天。
> 
> `Please input frps log_max_days [1-30](Default log_max_days: 3 day):`


> `Please select log_file`设置是否开启日志记录，默认开启，开启后日志等级及保留天数生效，否则等级和保留天数无效
>> 1: enable(default)
>>
>> 2: disable

> `Please select tcp_mux`
>> 1: enable (default)
>>
>> 2: disable

> `Please select kcp support`
>> 1: enable (default)
>>
>> 2: disable


### 管理命令
```bash
/etc/init.d/frps start
/etc/init.d/frps stop
/etc/init.d/frps restart
/etc/init.d/frps status
/etc/init.d/frps config
/etc/init.d/frps version
```


## [客户端配置](https://github.com/fatedier/frp/blob/master/README_zh.md#%E9%80%9A%E8%BF%87%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9F%9F%E5%90%8D%E8%AE%BF%E9%97%AE%E9%83%A8%E7%BD%B2%E4%BA%8E%E5%86%85%E7%BD%91%E7%9A%84-web-%E6%9C%8D%E5%8A%A1)
```ini
[common]
server_addr = 服务器IP
server_port = 服务器bind_port
token = 服务器token

[web]
type = http
local_port = 本地Tomcat端口
custom_domains = 域名
```
## 客户端启动
```batch
# 进入在客户端文件夹下启动cmd窗口，再执行以下命令
# 简单配置
frpc -c frpc.ini
# 全部配置
frpc -c frpc_full.ini
```


## 服务端配置
```ini
[common]
bind_addr = 0.0.0.0
#服务器IP，0.0.0.0为服务器全局所有IP可用，假如你的服务器有多个IP则可以这样做，或者填写为指定其中的一个服务器IP,支持IPV6
bind_port = 7000
#通讯端口，用于和客户端内网穿透传输数据的端口，可自定义
bind_udp_port = 7001
#UDP通讯端口，用于点对点内网穿透
kcp_bind_port = 7000
#用于KCP协议UDP通讯端口，在弱网环境下传输效率提升明显，但是会有一些额外的流量消耗。设置后frpc客户端须设置protocol = kcp
vhost_http_port = 7552
#http监听端口，注意可能和服务器上其他服务用的80冲突，比如centos有些默认有Apache，可自定义
vhost_https_port = 446
#https监听端口，可自定义
dashboard_port = 7500
#通过浏览器查看 frp 的状态以及代理统计信息展示端口，可自定义
dashboard_user = admin
#信息展示面板用户名
dashboard_pwd = admin

admin_addr = 127.0.0.1
admin_port = 7400
admin_user = admin
admin_pwd = admin


#信息展示面板密码
log_max_days = 7
#最多保存多少天日志
token = woytu.com
#特权模式认证密钥
#allow_ports = 1-65535
#端口白名单，为了防止端口被滥用，可以手动指定允许哪些端口被使用
max_pool_count = 100
#每个内网穿透服务限制最大连接池上限，避免大量资源占用，可自定义
authentication_timeout = 0
#frpc 所在机器和 frps 所在机器的时间相差不能超过 15 分钟，因为时间戳会被用于加密验证中，防止报文被劫持后被其他人利用,单位为秒，默认值为 
900，即 15 分钟。如果修改为 0，则 frps 将不对身份验证报文的时间戳进行超时校验。国外服务器由于时区的不同，时间会相差非常大，这里需要注意同
步时间或者设置此值为0
subdomain_host = zd966.com
log_file = frps.log
log_level = info
```