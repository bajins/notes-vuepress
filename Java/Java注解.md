# Java注解

[[toc]]


## Flag

> 解释注解的方式：反射！反射是jdk中提供的一种机制，通过读取编译后的运行文件，反向获取类信息的一种手段！可以通过反射获取类、方法、成员变量上的运行时注解内容！

> 元注解: 能注解到注解上的注解，能用在其他注解上的注解

* [Java 注解（Annotation）](https://www.runoob.com/w3cnote/java-annotation.html)
* [Javadoc标签和Javadoc注释规范](https://blog.csdn.net/linton1/article/details/93733508)


## JDK

> 从Java源码中提取的所有注解

```python
# 获取所有Java中的注解
import os, re

dir_path="./jdk8u"

ans = set() # 无序的不重复元素序列

for r, d, f in os.walk(dir_path):
    for file in f:
        fp = os.path.join(r, file)
        if ".java" in file and not re.search('[0-9]+|Test', file, re.I):
            try:
                with open(fp, "r", encoding="utf8") as rf:
                    an = re.compile(r'public @interface (.*) \{', re.I).findall(rf.read())
                    if an and len(an) > 0:
                        ans.add("@" + an[0])
            except:
                pass

print('\n'.join(ans))
```



| 注解                            	| 版本       	| 说明                                                                                       	|
|---------------------------------	|------------	|--------------------------------------------------------------------------------------------	|
| @WebParam                       	|            	| 表示方法的参数                                                                             	|
| @Oneway                         	|            	| 表示为只有输入消息而没有输出消息的 Web Service 单向操作                                    	|
| @WebResult                      	|            	| 表示方法的返回值                                                                           	|
| @HandlerChain                   	|            	| 使 Web Service 与外部定义的处理程序链相关联。                                              	|
| @WebService                     	|            	| 用于对接口，类进行注解，表示要发布的web服务                                                	|
| @WebMethod                      	|            	| 该注解用于用@WebService注解的类或接口的方法上，表示要发布的方法                            	|
| @SOAPMessageHandlers            	|            	|                                                                                            	|
| @SOAPMessageHandler             	|            	|                                                                                            	|
| @SOAPBinding                    	|            	| SOAP绑定类型：RPC、DOCUMENT                                                                	|
| @InitParam                      	|            	|                                                                                            	|
| @Resource                       	|            	|                                                                                            	|
| @Resources                      	|            	|                                                                                            	|
| @PreDestroy                     	| Servlet2.5 	| 被@PreDestroy修饰的方法会在服务器卸载Servlet之前运行，并且只会被服务器调用一次             	|
| @Generated                      	|            	|                                                                                            	|
| @PostConstruct                  	| Servlet2.5 	| 被@PostConstruct修饰的方法会在服务器加载Servle且构造函数之后执行，并且只会被服务器执行一次 	|
| @RespectBinding                 	|            	|                                                                                            	|
| @ResponseWrapper                	|            	|                                                                                            	|
| @WebServiceRefs                 	|            	|                                                                                            	|
| @Action                         	|            	|                                                                                            	|
| @RequestWrapper                 	|            	|                                                                                            	|
| @WebServiceProvider             	|            	|                                                                                            	|
| @WebServiceRef                  	|            	|                                                                                            	|
| @FaultAction                    	|            	|                                                                                            	|
| @WebFault                       	|            	|                                                                                            	|
| @ServiceMode                    	|            	|                                                                                            	|
| @WebEndpoint                    	|            	|                                                                                            	|
| @BindingType                    	|            	|                                                                                            	|
| @WebServiceClient               	|            	|                                                                                            	|
| @Addressing                     	|            	|                                                                                            	|
| @MTOM                           	|            	|                                                                                            	|
| @WebServiceFeatureAnnotation    	|            	|                                                                                            	|
| @XmlSeeAlso                     	|            	|                                                                                            	|
| @XmlElementDecl                 	|            	|                                                                                            	|
| @XmlIDREF                       	|            	|                                                                                            	|
| @XmlValue                       	|            	|                                                                                            	|
| @XmlAccessorType                	|            	| 控制字段或属性的序列化                                                                    	|
| @XmlMixed                       	|            	|                                                                                            	|
| @XmlID                          	|            	|                                                                                            	|
| @XmlRootElement                 	|            	| 根节点,将Java类或枚举类型映射到XML元素                                                       	|
| @XmlElementRef                  	|            	|                                                                                            	|
| @XmlEnum                        	|            	|                                                                                            	|
| @XmlElementWrapper              	|            	| 对于数组或集合（即包含多个元素的成员变量），生成一个包装该数组或集合的XML元素（称为包装器）       	|
| @XmlEnumValue                   	|            	|                                                                                            	|
| @XmlType                        	|            	| 对于@XmlElementWrapper标注的属性，不能出现在@XmlType的propOrder列表中                           	|
| @XmlAccessorOrder               	|            	| 控制JAXB 绑定类中属性和字段的排序                                                         	|
| @XmlSchemaTypes                 	|            	|                                                                                            	|
| @XmlInlineBinaryData            	|            	|                                                                                            	|
| @XmlSchema                      	|            	|                                                                                            	|
| @XmlAnyElement                  	|            	|                                                                                            	|
| @XmlSchemaType                  	|            	|                                                                                            	|
| @XmlRegistry                    	|            	|                                                                                            	|
| @XmlList                        	|            	|                                                                                            	|
| @XmlAttribute                   	|            	| 将Java类的一个属性映射到与属性同名的一个XML元素                                                	|
| @XmlAttachmentRef               	|            	|                                                                                            	|
| @XmlNs                          	|            	|                                                                                            	|
| @XmlMimeType                    	|            	|                                                                                            	|
| @XmlElements                    	|            	|                                                                                            	|
| @XmlElement                     	|            	| 对于所有@XmlElement标注过的属性，必须出现在@XmlType的propOrder列表中                            	|
| @XmlElementRefs                 	|            	|                                                                                            	|
| @XmlTransient                   	|            	|                                                                                            	|
| @XmlAnyAttribute                	|            	|                                                                                            	|
| @XmlJavaTypeAdapters            	|            	|                                                                                            	|
| @XmlJavaTypeAdapter             	|            	| 使用定制的适配器（即扩展抽象类XmlAdapter并覆盖marshal()和unmarshal()方法），以序列化Java类为XML 	|
| @Interned                       	|            	|                                                                                            	|
| @NotNull                        	|            	|                                                                                            	|
| @Nullable                       	|            	|                                                                                            	|
| @MessageDumping                 	|            	|                                                                                            	|
| @FeatureConstructor             	|            	|                                                                                            	|
| @FeatureListValidatorAnnotation 	|            	|                                                                                            	|
| @InstanceResolverAnnotation     	|            	|                                                                                            	|
| @SchemaValidation               	|            	|                                                                                            	|
| @Serialization                  	|            	|                                                                                            	|
| @StreamingAttachment            	|            	|                                                                                            	|
| @UsesJAXBContext                	|            	|                                                                                            	|
| @MemberSubmissionAddressing     	|            	|                                                                                            	|
| @XmlAccessorFactory             	|            	|                                                                                            	|
| @OverrideAnnotationOf           	|            	|                                                                                            	|
| @XmlIsSet                       	|            	|                                                                                            	|
| @XmlLocation                    	|            	|                                                                                            	|
| @WsgenProtocol                  	|            	|                                                                                            	|
| @InheritedAttributes            	|            	|                                                                                            	|
| @DescriptorFields               	|            	|                                                                                            	|
| @ParameterNames                 	|            	|                                                                                            	|
| @ManagedAttribute               	|            	|                                                                                            	|
| @AMXMetadata                    	|            	|                                                                                            	|
| @InheritedAttribute             	|            	|                                                                                            	|
| @IncludeSubclass                	|            	|                                                                                            	|
| @ManagedData                    	|            	|                                                                                            	|
| @ManagedOperation               	|            	|                                                                                            	|
| @Description                    	|            	|                                                                                            	|
| @NameValue                      	|            	|                                                                                            	|
| @ManagedObject                  	|            	|                                                                                            	|
| @DescriptorKey                  	|            	|                                                                                            	|
| @Taxonomy                       	|            	|                                                                                            	|
| @Reset                          	|            	|                                                                                            	|
| @ProbeParam                     	|            	|                                                                                            	|
| @ProbeProvider                  	|            	|                                                                                            	|
| @Probe                          	|            	|                                                                                            	|
| @ProbeListener                  	|            	|                                                                                            	|
| @EnvelopeStyle                  	|            	|                                                                                            	|
| @Property                       	|            	|                                                                                            	|
| @DatabindingMode                	|            	|                                                                                            	|
| @Reference                      	|            	|                                                                                            	|
| @Immutable                      	|            	|                                                                                            	|
| @Ignore                         	|            	|                                                                                            	|
| @Logger                         	|            	|                                                                                            	|
| @Setter                         	|            	|                                                                                            	|
| @Constructor                    	|            	|                                                                                            	|
| @Optimistic                     	|            	|                                                                                            	|
| @SpecializedFunction            	|            	|                                                                                            	|
| @ScriptClass                    	|            	|                                                                                            	|
| @Function                       	|            	|                                                                                            	|
| @Getter                         	|            	|                                                                                            	|
| @CallerSensitive                	|            	|                                                                                            	|
| @Contended                      	|            	|                                                                                            	|
| @MXBean                         	|            	|                                                                                            	|
| @ProbeName                      	|            	|                                                                                            	|
| @ProviderName                   	|            	|                                                                                            	|
| @Attributes                     	|            	|                                                                                            	|
| @NameAttributes                 	|            	|                                                                                            	|
| @ProviderAttributes             	|            	|                                                                                            	|
| @FunctionAttributes             	|            	|                                                                                            	|
| @ModuleName                     	|            	|                                                                                            	|
| @ModuleAttributes               	|            	|                                                                                            	|
| @ArgsAttributes                 	|            	|                                                                                            	|
| @FunctionName                   	|            	|                                                                                            	|
| @ConstructorProperties          	|            	|                                                                                            	|
| @Transient                      	|            	|                                                                                            	|
| @Deprecated                     	| jdk1.5     	| 内置注解：用于标志过时的类、方法和成员变量                                                 	|
| @FunctionalInterface            	| jdk1.8     	| 函数式接口注解，用于定义函数式接口                                                         	|
| @SafeVarargs                    	| jdk1.7     	| 参数安全类型注解，用于提示用户参数安全                                                     	|
| @Override                       	| jdk1.5     	| 内置注解：用于修饰重写的方法                                                               	|
| @SuppressWarnings               	| jdk1.5     	| 内置注解：用户忽略@Deprecated标志过的警告                                                  	|
| @Repeatable                     	| jdk1.8     	| 表示注解的属性可以重复！@Repeatable通俗来讲，就是注解容器！                                	|
| @Inherited                      	| jdk1.5     	| 元注解：子类继承父类的注解（子类没有任何注解修饰）                                         	|
| @Retention                      	| jdk1.5     	| 元注解：表示注解保留周期                                                                   	|
| @Documented                     	| jdk1.5     	| 元注解：将注解写入文档                                                                     	|
| @Target                         	| jdk1.5     	| 元注解：表示注解可以使用在什么地方                                                         	|
| @Native                         	| jdk1.8     	| 生成本机头文件的工具的提示，以确定是否需要头文件，如果需要，它应该包含哪些声明。           	|
| @Validate                       	|            	|                                                                                            	|
| @RequireContainer               	|            	|                                                                                            	|
| @Require                        	|            	|                                                                                            	|
| @Exported                       	|            	|                                                                                            	|
| @SupportedOptions               	|            	|                                                                                            	|
| @SupportedAnnotationTypes       	|            	|                                                                                            	|
| @SupportedSourceVersion         	|            	|                                                                                            	|
| @Trusted                        	|            	|                                                                                            	|




## Servlet

> `Tomcat 7.0`及以上版本的`server.api`才有注解

- `servlet.jar` 是`servlet 3.0`版本之前的地址
- `javax.servlet-api.jar` 是`servlet 3.0`版本之后的地址

* [https://github.com/eclipse-ee4j/servlet-api](https://github.com/eclipse-ee4j/servlet-api)


| 注解                  	| 版本       	| 说明                                                                   	|
|-----------------------	|------------	|------------------------------------------------------------------------	|
| @WebServlet           	| Servlet3.0 	| 用于声明servlet                                                        	|
| @WebListener          	| Servlet3.0 	| 用于声明过监听器，可通过控制filter的文件名来控制执行顺序               	|
| @WebFilter            	| Servlet3.0 	| 用于声明过滤器                                                         	|
| @WebInitParam         	| Servlet3.0 	| 为 Servlet 或者过滤器指定初始化参数，配置@WebServlet或@WebFilter时使用 	|
| @MultipartConfig      	| Servlet3.0 	| HttpServletRequest 提供的对上传文件的支持，该注解标注在 Servlet 上面   	|
| @HandlesTypes         	|            	|                                                                        	|
| @HttpConstraint       	|            	|                                                                        	|
| @HttpMethodConstraint 	|            	|                                                                        	|
| @ServletSecurity      	|            	|                                                                        	|




## Validation

> `JSR-303`是`JAVA EE 6`中的一项子规范，叫做`Bean Validation`，但是这只是一个接口，没有具体实现。

+ [https://github.com/topics/validation](https://github.com/topics/validation)
+ [https://github.com/topics/validator](https://github.com/topics/validator)


* [https://github.com/apache/commons-validator](https://github.com/apache/commons-validator)
* [https://github.com/apache/bval](https://github.com/apache/bval)
* [https://github.com/jakartaee/validation](https://github.com/jakartaee/validation)
    * [https://beanvalidation.org](https://beanvalidation.org)
    * [https://github.com/hibernate/hibernate-validator](https://github.com/hibernate/hibernate-validator)
    * [https://github.com/nomemory/java-bean-validation-extension](https://github.com/nomemory/java-bean-validation-extension)
    * [https://github.com/Baeldung/spring-security-registration](https://github.com/Baeldung/spring-security-registration)
    * [https://github.com/jirutka/validator-collection](https://github.com/jirutka/validator-collection)
    * [https://github.com/Naoghuman/lib-validation](https://github.com/Naoghuman/lib-validation)
* [https://github.com/neoremind/fluent-validator](https://github.com/neoremind/fluent-validator)
* [https://github.com/making/yavi](https://github.com/making/yavi)


> `javax.validation.Validation`、`hibernate-validator`和`Spring validtor`
> 提供了`JSR 303`规范中所有内置constraint 的实现，除此之外还有一些附加的 constraint

* [这么写参数校验(validator)就不会被劝退了](https://juejin.im/post/5d3fbeb46fb9a06b317b3c48)
* [四款数据校验的类(Validate)](https://blog.csdn.net/king101125s/article/details/104356059)

| 注解                               	| 支持Java类型                                          	| 备注                                                         	|
|------------------------------------	|-------------------------------------------------------	|--------------------------------------------------------------	|
| @AssertFalse                       	| Boolean, boolean                                      	| 验证元素值必须为flase                                        	|
| @AssertTrue                        	| Boolean, boolean                                      	| 验证元素值必须为true，否则抛异常                             	|
| @CreditCardNumber                  	| CharSequence                                          	| 验证信用卡号码是否有效                                       	|
| @DecimalMax                        	| Object                                                	| 验证数值是否小于等于指定值                                   	|
| @DecimalMin                        	| CharSequence                                          	| 验证数值是否大于等于指定值                                   	|
| @Digits(integer = 3, fraction = 2) 	| Long, Integer, Double, Float                          	| 验证注解的元素值的整数位数和小数位数上限                     	|
| @Email                             	| CharSequence                                          	| 验证元素必须是电子邮箱地址                                   	|
| @Future                            	| java.util.Date, java.util.Calendar                    	| 验证日期为当前时间之后                                       	|
| @FutureOrPresent                   	| java.util.Date, java.util.Calendar                    	| 验证日期为当前时间或之后一个时间                             	|
| @Length(min=,max=)                 	| CharSequence                                          	| 验证元素值包含在一个区间                                     	|
| @Max                               	| CharSequence                                          	| 检验当前数值小于等于指定值                                   	|
| @Min                               	| BigDecimal, BigInteger, byte, short,int, long,Number. 	| 检验当前数值大于等于指定值                                   	|
| @NotBlank                          	| CharSequence                                          	| 验证元素值不为null且移除两边空格后长度大于0                  	|
| @NotEmpty                          	| CharSequence,Collection,Map and Arrays                	| 验证元素值不为null且不为空（字符串长度不为0、集合大小不为0） 	|
| @NotNull                           	| Object                                                	| 验证元素值不能为 null                                        	|
| @Null                              	| Object                                                	| 验证元素值为null                                             	|
| @Past                              	| java.util.Date, java.util.Calendar                    	| 验证日期为当前时间之前                                       	|
| @PastOrPresent                     	| java.util.Date, java.util.Calendar                    	| 验证日期为当前时间或之前                                     	|
| @Pattern(regex=,flag=)             	| CharSequence                                          	| 验证元素必须符合指定的正则表达式                             	|
| @Range(min=,max=,message=)         	| CharSequence                                          	| 验证数值为指定值区间范围内                                   	|
| @Size(max=, min=)                  	| String,Collection,Map,arrays,CharSequence             	| 验证元素个数包含在一个区间                                   	|
| @UniqueElements                    	| Collection                                            	| 校验集合中的元素必须保持唯一 否则异常                        	|
| @URL                               	| CharSequence                                          	| 验证日期为当前时间之前                                       	|
| @Valid                             	| Object                                                	| 验证关联对象元素进行递归校验检查                             	|
| @ScriptAssert                      	| CharSequence                                          	| 脚本表达式的计算结果为true                                   	|
| @SafeHtml                          	| CharSequence                                          	| 可能包含不安全的html内容                                     	|






## JAX-RS

> `Jersey`和`CxF`框架实现了`JSR311`/`JSR339`标准

**jersey常用注解**

* [https://github.com/eclipse-ee4j/jersey](https://github.com/eclipse-ee4j/jersey)

| Annotation      	| 作用                        	| 说明                                                                                                                                                   	|
|-----------------	|-----------------------------	|--------------------------------------------------------------------------------------------------------------------------------------------------------	|
| @GET            	| 查询请求                    	| 相当于数据库的查询数据操作                                                                                                                             	|
| @PUT            	| 更新请求                    	| 相当于数据库的更新数据操作                                                                                                                             	|
| @POST           	| 插入请求                    	| 相当于数据库的插入数据操作                                                                                                                             	|
| @DELETE         	| 删除请求                    	| 相当于数据的删除数据操作                                                                                                                               	|
| @Path           	| uri路径                     	| 定义资源的访问路径，client通过这个路径访问资源。比如：@Path("user")                                                                                    	|
| @Produces       	| 指定返回MIME格式            	| 资源按照那种数据格式返回，可取的值有：MediaType.APPLICATION_XXX。比如：@Produces(MediaType.APPLICATION_XML)                                            	|
| @Consumes       	| 接受指定的MIME格式          	| 只有符合这个参数设置的请求再能访问到这个资源。比如@Consumes("application/x-www-form-urlencoded")                                                       	|
| @PathParam      	| uri路径参数                 	| 写在方法的参数中，获得请求路径参数。比如：@PathParam("username") String userName                                                                       	|
| @QueryParam     	| uri路径请求参数             	| 写在方法的参数中，获得请求路径附带的参数。比如：@QueryParam("desc") String desc                                                                        	|
| @DefaultValue   	| 设置@QueryParam参数的默认值 	| 如果@QueryParam没有接收到值，就使用默认值。比如：@DefaultValue("description") @QueryParam("desc") String desc                                          	|
| @FormParam      	| form传递的参数              	| 接受form传递过来的参数。比如：@FormParam("name") String userName                                                                                       	|
| @BeanParam      	| 通过Bean的形式传递参数      	| 接受client传递的bean类型的参数，同时这个bean可以在属性上配置@FormParam用以解决client的属性名称和bean的属性名称不一致的问题。比如：@BeanParam User user 	|
| @Context        	| 获得一些系统环境信息        	| 通过@Context可以获得以下信息：UriInfo、ServletConfig、ServletContext、HttpServletRequest、HttpServletResponse和HttpHeaders等                           	|




## Spring


### 声明bean的注解

- `@Component` 组件，没有明确的角色
- `@Service` 在业务逻辑层使用（service层）
- `@Repository` 在数据访问层使用（dao层）
- `@Controller` 在展现层使用，控制器的声明（C）


### 注入bean的注解

> 都可以注解在set方法和属性上，推荐注解在属性上（一目了然，少写代码）。

- `@Autowired` 由Spring提供（Spring上下文已有实例（已注入IOC），`@Autowired`只是取一下）
- `@Inject` 由JSR-330提供
- `@Resource` 由JSR-250提供


### java配置类相关注解

- `@Configuration` 声明当前类为配置类，相当于xml形式的Spring配置（类上）
- `@Bean` 注解在方法上，声明当前方法的返回值为一个bean，替代xml中的方式（方法上）
- `@Configuration` 声明当前类为配置类，其中内部组合了`@Component`注解，表明这个类是一个bean（类上）
- `@ComponentScan` 用于对Component进行扫描，相当于xml中的（类上）
- `@WishlyConfiguration` 为`@Configuration`与`@ComponentScan`的组合注解，可以替代这两个注解


### 切面（AOP）相关注解

> Spring支持AspectJ的注解式切面编程。

- `@Aspect` 声明一个切面（类上）

> 使用`@After`、`@Before`、`@Around`定义建言（advice），可直接将拦截规则（切点）作为参数。
 
- `@After` 在方法执行之后执行（方法上）
- `@Before` 在方法执行之前执行（方法上）
- `@Around` 在方法执行之前与之后执行（方法上）
- `@PointCut` 声明切点

> 在java配置类中使用`@EnableAspectJAutoProxy`注解开启Spring对AspectJ代理的支持（类上）


| AOP配置元素              	| 描述                                                       	|
|--------------------------	|------------------------------------------------------------	|
| `<aop:advisor>`          	| 定义AOP通知器                                              	|
| `<aop:after>`            	| 定义AOP后置通知（不管该方法是否执行成功）                  	|
| `<aop:after-returning>`  	| 在方法成功执行后调用通知                                   	|
| `<aop:after-throwing>`   	| 在方法抛出异常后调用通知                                   	|
| `<aop:around>`           	| 定义AOP环绕通知                                            	|
| `<aop:aspect>`           	| 定义切面                                                   	|
| `<aop:aspect-autoproxy>` 	| 定义`@AspectJ`注解驱动的切面                               	|
| `<aop:before>`           	| 定义AOP前置通知                                            	|
| `<aop:config>`           	| 顶层的AOP配置元素，大多数的<aop:*>包含在<aop:config>元素内 	|
| `<aop:declare-parent>`   	| 为被通知的对象引入额外的接口，并透明的实现                 	|
| `<aop:pointcut>`         	| 定义切点                                                   	|


### @Bean的属性支持

> `@Bean` 手动创建一个实例，并保留在IOC中，当我们引用第三方库中的类需要装配到Spring容器时，可以通过`@Bean`来实现

- `@Scope` 设置Spring容器如何新建Bean实例（方法上，得有`@Bean`）,其设置类型包括：
    - `Singleton` （单例,一个Spring容器中只有一个bean实例，默认模式）, 
    - `Protetype` （每次调用新建一个bean）, 
    - `Request` （web项目中，给每个http request新建一个bean）, 
    - `Session` （web项目中，给每个http session新建一个bean）, 
    - `GlobalSession`（给每一个 global http session新建一个Bean实例）
- `@StepScope` 在Spring Batch中还有涉及
- `@PostConstruct` 由JSR-250提供，在构造函数执行完之后执行，等价于xml配置文件中bean的initMethod
- `@PreDestory` 由JSR-250提供，在Bean销毁之前执行，等价于xml配置文件中bean的destroyMethod


### @Value注解

> `@Value` 为属性注入值（属性上）

- `@Value("Michael Jackson")` String name; 注入普通字符
- `@Value("#{systemProperties['os.name']}")` String osName; 注入操作系统属性
- `@Value("#{ T(java.lang.Math).random() * 100 }")` String randomNumber; 注入表达式结果
- `@Value("#{domeClass.name}")` String name; 注入其它bean属性
- `@Value("classpath:com/hgs/hello/test.txt")` String Resource file; 注入文件资源
- `@Value("http://www.cznovel.com")` Resource url; 注入网站资源
- `@Value("${book.name}")` String bookName; 注入配置文件

**注入配置使用方法**

> 编写配置文件（test.properties）

```conf
book.name = test
```

- `@PropertySource` 加载配置文件(类上)

```java
@PropertySource("classpath:/test.propertie")
```

- 还需配置一个`PropertySourcesPlaceholderConfigurer`的bean。


### 环境切换

- `@Profile` 通过设定Environment的ActiveProfiles来设定当前context需要使用的配置环境。（类或方法上）
- `@Conditional` Spring4中可以使用此注解定义条件话的bean，通过实现Condition接口，并重写matches方法，从而决定该bean是否被实例化。（方法上）


### 异步相关

- `@EnableAsync` 配置类中，通过此注解开启对异步任务的支持，叙事性AsyncConfigurer接口（类上）
- `@Async` 在实际执行的bean方法使用该注解来申明其是一个异步任务（方法上或类上所有的方法都将异步，需要@EnableAsync开启异步任务）


### 定时任务相关

- `@EnableScheduling` 在配置类上使用，开启计划任务的支持（类上）
- `@Scheduled` 来申明这是一个任务，包括cron,fixDelay,fixRate等类型（方法上，需先开启计划任务的支持）


### @Enable*注解说明

> 这些注解主要用来开启对xxx的支持。

- `@EnableAspectJAutoProxy` 开启对AspectJ自动代理的支持
- `@EnableAsync` 开启异步方法的支持
- `@EnableScheduling` 开启计划任务的支持
- `@EnableWebMvc` 开启Web MVC的配置支持
- `@EnableConfigurationProperties` 开启对`@ConfigurationProperties`注解配置Bean的支持
- `@EnableJpaRepositories` 开启对SpringData JPA Repository的支持
- `@EnableTransactionManagement` 开启注解式事务的支持
- `@EnableTransactionManagement` 开启注解式事务的支持
- `@EnableCaching` 开启注解式的缓存支持


### 测试相关注解

- `@RunWith` 运行器，Spring中通常用于对JUnit的支持 `@RunWith(SpringJUnit4ClassRunner.class)`
- `@ContextConfiguration` 用来加载配置ApplicationContext，其中classes属性用来加载配置类 `@ContextConfiguration(classes={TestConfig.class})`
- `@WebAppConfiguration`


### SpringMVC注解

- `@EnableWebMvc` 在配置类中开启Web MVC的配置支持，如一些ViewResolver或者MessageConverter等，若无此句，重写WebMvcConfigurerAdapter方法（用于对SpringMVC的配置）。
- `@Controller` 声明该类为SpringMVC中的Controller
- `@RestController` 该注解为一个组合注解，相当于`@Controller`和`@ResponseBody`的组合
- `@RequestMapping` 用于映射Web请求，包括访问路径和参数（类或方法上）
    - `@PathVariable` 用于接收url路径上使用`{}`声明的参数，将注解放在参数中前，即可获取该值，通常作为Restful的接口实现方法。
        - [获取Spring中@PathVariable注解里带点的完整参数](https://blog.csdn.net/m0_56069948/article/details/124791784)
    - `@RequestParam` 用于接收参数（如果变量名与参数名相同可不使用此注解），`GET`为`?`后面的查询参数，`POST`为body中的表单参数和URL参数；
    - `@RequestBody` 适用于请求体格式为`application/json`，只能用于接收JSON对象，body中的内容
    - `@RequestPart` 适用于请求体格式为`multipart/form-data`，可嵌套复杂的请求域（JSON，XML），既可以接收对象又可以接收二进制数据
- `@ResponseBody` 将返回内容序列化为json字符串（返回值旁或方法上）
- `@SessionAttributes`
- `@SessionAttribute`
- `@CookieValue`
- `@CrossOrigin`
- `@Mapping`
- `@PutMapping`
- `@PatchMapping`
- `@PostMapping`
- `@DeleteMapping`
- `@GetMapping`
- `@ValueConstants`
- `@MatrixVariable`
- `@RequestHeader`
- `@RequestAttribute`
- `@ResponseStatus`
- `@ControllerAdvice` 全局控制器，注解了`@Controller`的类的方法可使用，这对所有注解了`@RequestMapping`的控制器内的方法有效。
    - `@ExceptionHandler` 用于全局处理控制器里的异常处理方法（全局异常捕获）
    - `@InitBinder` 用来设置WebDataBinder（用来自动绑定前台请求参数到Model中）。
    - `@ModelAttribute` 本来的作用是绑定键值对到Model里，在`@ControllerAdvice`中是让全局的`@RequestMapping`都能获得在此处设置的键值对。
- `@RestControllerAdvice`



## Swagger2

| 注解名称            	| 注解属性    	| 作用域   	| 属性作用       	|
|---------------------	|-------------	|----------	|----------------	|
| @Api                	| tags        	| 类       	| 说明该类的作用 	|
|                     	| value       	| 类       	| 说明该类的作用 	|
| @ApiOperation()     	| value       	| 方法     	| 描述方法作用   	|
|                     	| notes       	| 方法     	| 提示内容       	|
|                     	| tags        	| 方法     	| 分组           	|
| @ApiParam()         	| name        	| 方法参数 	| 参数名         	|
|                     	| value       	| 方法参数 	| 参数说明       	|
|                     	| required    	| 方法参数 	| 是否必填       	|
| @ApiModel()         	| value       	| 类       	| 对象名         	|
|                     	| description 	| 类       	| 描述           	|
| @ApiModelProperty() 	| value       	| 方法     	| 字段说明       	|
|                     	| name        	| 方法     	| 属性名         	|
|                     	| dataType    	| 方法     	| 属性类型       	|
|                     	| required    	| 方法     	| 是否必填       	|
|                     	| example     	| 方法     	| 举例           	|
|                     	| hidden      	| 方法     	| 隐藏           	|
| @ApiImplicitParam() 	| value       	| 方法     	| 参数说明       	|
|                     	| name        	| 方法     	| 参数名         	|
|                     	| dataType    	| 方法     	| 数据类型       	|
|                     	| paramType   	| 方法     	| 参数类型       	|
|                     	| example     	| 方法     	| 举例           	|
| @ApiResponse()      	| response    	| 方法     	| 返回类         	|
|                     	| code        	| 方法     	| 返回码         	|
|                     	| message     	| 方法     	| 返回信息       	|
|                     	| examples    	| 方法     	| 例子           	|


| 注解               	| 属性         	| 值                    	| 备注                                                            	|
|--------------------	|--------------	|-----------------------	|-----------------------------------------------------------------	|
| @Api               	| value        	| 字符串                	| 可用在class头上,class描述                                       	|
|                    	| description  	| 字符串                	|                                                                 	|
|                    	|              	|                       	| @Api(value = "xxx", description = "xxx")                        	|
| @ApiOperation      	| value        	| 字符串                	| 可用在方法头上.参数的描述容器                                   	|
|                    	| notes        	| 字符串                	|                                                                 	|
|                    	|              	|                       	| @ApiOperation(value = "xxx", notes = "xxx")                     	|
| @ApiImplicitParams 	| {}           	| @ApiImplicitParam数组 	| 可用在方法头上.参数的描述容器                                   	|
|                    	|              	|                       	| @ApiImplicitParams({@ApiImplicitParam1,@ApiImplicitParam2,...}) 	|
| @ApiImplicitParam  	| name         	| 字符串 与参数命名对应 	| 可用在@ApiImplicitParams里                                      	|
|                    	| value        	| 字符串                	| 参数中文描述                                                    	|
|                    	| required     	| 布尔值                	| true/false                                                      	|
|                    	| dataType     	| 字符串                	| 参数类型                                                        	|
|                    	| paramType    	| 字符串                	| 参数请求方式:query/path                                         	|
|                    	|              	|                       	| query:对应@RequestParam?传递                                    	|
|                    	|              	|                       	| path: 对应@PathVariable{}path传递                               	|
|                    	| defaultValue 	| 字符串                	| 在api测试中默认值                                               	|
|                    	|              	|                       	| 用例参见项目中的设置                                            	|
| @ApiResponses      	| {}           	| @ApiResponse数组      	| 可用在方法头上.参数的描述容器                                   	|
|                    	|              	|                       	| @ApiResponses({@ApiResponse1,@ApiResponse2,...})                	|
| @ApiResponse       	| code         	| 整形                  	| 可用在@ApiResponses里                                           	|
|                    	| message      	| 字符串                	| 错误描述                                                        	|
|                    	|              	|                       	| @ApiResponse(code = 200, message = "Successful")                	|




## Jackson

| 注解名称                  	| 作用域 	| 说明   	|
|---------------------------	|--------	|--------	|
| @JacksonAnnotation        	|        	|        	|
| @JacksonAnnotationsInside 	|        	|        	|
| @JacksonAnnotationValue   	|        	|        	|
| @JacksonInject            	|        	|        	|
| @JsonAlias                	|        	|        	|
| @JsonAnyGetter            	|        	|        	|
| @JsonAnySetter            	|        	|        	|
| @JsonAutoDetect           	|        	|        	|
| @JsonBackReference        	|        	|        	|
| @JsonClassDescription     	|        	|        	|
| @JsonCreator              	|        	|        	|
| @JsonEnumDefaultValue     	|        	|        	|
| @JsonFilter               	|        	|        	|
| @JsonFormat               	|        	| 格式化 	|
| @JsonGetter               	|        	|        	|
| @JsonIdentityInfo         	|        	|        	|
| @JsonIdentityReference    	|        	|        	|
| @JsonIgnore               	|        	|        	|
| @JsonIgnoreProperties     	|        	|        	|
| @JsonIgnoreType           	|        	|        	|
| @JsonInclude              	|        	|        	|
| @JsonManagedReference     	|        	|        	|
| @JsonMerge                	|        	|        	|
| @JsonProperty             	|        	|        	|
| @JsonPropertyDescription  	|        	|        	|
| @JsonPropertyOrder        	|        	|        	|
| @JsonRawValue             	|        	|        	|
| @JsonRootName             	|        	|        	|
| @JsonSetter               	|        	|        	|
| @JsonSubTypes             	|        	|        	|
| @JsonTypeId               	|        	|        	|
| @JsonTypeInfo             	|        	|        	|
| @JsonTypeName             	|        	|        	|
| @JsonUnwrapped            	|        	|        	|
| @JsonValue                	|        	|        	|
| @JsonView                 	|        	|        	|
