# 邮箱

[测试邮箱](https://www.mail-tester.com/)

## 域名邮箱

[宝塔邮局管理器](https://www.bt.cn/bbs/thread-32749-1-1.html)

[httpsmail](https://www.httpsmail.com/hosting/)

| 国外免费域名邮箱 | [Zoho](https://mail.zoho.com/biz/mailsignup.do?plan=free) | [Yandex](https://hky.moe/archives/21/) |
|-----------|------|--------|
| 域名数量      | 1    | 不限     |
| 用户数量      | 25   | 1000   |
| 邮箱别名      | 支持   | 支持     |
| 邮箱容量      | 5G   | 不限     |
| 两步验证      | 支持   | 支持     |
| Catch All | 支持   | 支持     |
| POP3      | 付费支持   | 支持     |
| IMAP      | 付费支持   | 支持     |
| SMTP      | 支持   | 支持     |
| Exchange  | 支持   | 不支持    |

#### 端口
> Zoho
>> SMTP：`smtp.zoho.com:465 SSL`
>>
>> SMTP：`smtp.zoho.com:587 TLS`
>>
>> IMAP：`imappro.zoho.com:993 SSL`
>>
>> POP3：`poppro.zoho.com:995 SSL`
>
> Yandex
>> SMTP：`smtp.yandex.com:465 SSL`
>>
>> IMAP：`imap.yandex.com:993 SSL`
>>
>> POP3：`pop.yandex.com:995 SSL`
>

### Yandex配置步骤
- 1、先到这里注册账户：[https://mail.yandex.com](https://mail.yandex.com)

- 2、进入域名邮箱注册页面：[https://connect.yandex.com/pdd/](https://connect.yandex.com/pdd/) 添加域名

- 3、此时已经进入到管理页面，验证域名所有权，验证成功后左侧菜单栏会多出几个菜单（这时域名上面是一个`感叹号`）

- 4、按照这里的DNS配置：[https://connect.yandex.com/portal/admin/customization/dns](https://connect.yandex.com/portal/admin/customization/dns)
（或者点击左侧菜单栏`DNS management`）到自己域名所在服务商添加DNS解析，注意末尾的点不要丢了，虽然某些托管商会将它去掉，
等待几分钟刷新（这时域名上面是一个`绿色的勾`）

- 5、以上DNS只是配置了`SPF Record`、`MX`、二级域名，还要配置`DKIM signature`：
[https://connect.yandex.com/portal/admin/customization/mail](https://connect.yandex.com/portal/admin/customization/mail)（就是左侧`Email`菜单）
进入界面后点击`DKIM signatures`点击`Copy`,然后在域名所在服务商添加一条TXT记录DNS解析，主机记录（name）为`mail._domainkey`,值就是刚刚复制的`DKIM signatures`

- 6、添加邮箱账户：点击 `Все сотрудники`（就是左侧第一个菜单），然后点击页面下方有一个带`+`的`add`按钮，
再点击`Add a person`，在弹出的页面输入，带`*`的为必填，填完后就点击`橙色的add按钮`

- 7、发现pop无法使用是怎么回事？后来在 [https://connect.yandex.com/portal/admin/customization/mail](https://connect.yandex.com/portal/admin/customization/mail)
（就是左侧`Email`菜单）把POP的勾去掉保存，然后再勾上保存就可以用了

- 8、新添加的用户需要去登录一次才能使用，因为首次登陆需要同意一个协议，所以到这里[https://mail.yandex.com](https://mail.yandex.com)
登录刚刚添加的账户并点击`Complete registration`按钮同意协议


## 临时邮箱

[guerrillamail](https://www.guerrillamail.com/zh)

[mail.bccto.me](http://mail.bccto.me/)

[mjjmail.me](https://mjjmail.me/)

[shorttimemail](https://shorttimemail.com/zh-Hans)

[linshiyouxiang](https://www.linshiyouxiang.net/)