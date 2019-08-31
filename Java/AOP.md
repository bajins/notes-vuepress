# AOP

|AOP配置元素 | 描述 |
------------ | -------------
|`<aop:advisor>` | 定义AOP通知器|
|`<aop:after>`  | 定义AOP后置通知（不管该方法是否执行成功）|
|`<aop:after-returning>` | 在方法成功执行后调用通知|
|`<aop:after-throwing>` | 在方法抛出异常后调用通知|
|`<aop:around>` | 定义AOP环绕通知|
|`<aop:aspect>` | 定义切面|
|`<aop:aspect-autoproxy>` | 定义`@AspectJ`注解驱动的切面|
|`<aop:before>` | 定义AOP前置通知|
|`<aop:config>` | 顶层的AOP配置元素，大多数的<aop:*>包含在<aop:config>元素内|
|`<aop:declare-parent>` | 为被通知的对象引入额外的接口，并透明的实现|
|`<aop:pointcut>` | 定义切点|
