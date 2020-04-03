# Annotation


[[toc]]



## flag

> 解释注解的方式：反射！反射是jdk中提供的一种机制，通过读取编译后的运行文件，反向获取类信息的一种手段！可以通过反射获取类、方法、成员变量上的运行时注解内容！

> 元注解: 能注解到注解上的注解，能用在其他注解上的注解

* [Java 注解（Annotation）](https://www.runoob.com/w3cnote/java-annotation.html)


## Servlet

| 注解             	| 版本       	| 说明                                                                                       	|
|------------------	|------------	|--------------------------------------------------------------------------------------------	|
| @PostConstruct   	| Servlet2.5 	| 被@PostConstruct修饰的方法会在服务器加载Servle且构造函数之后执行，并且只会被服务器执行一次 	|
| @PreDestroy      	| Servlet2.5 	| 被@PreDestroy修饰的方法会在服务器卸载Servlet之前运行，并且只会被服务器调用一次             	|
| @WebServlet      	| Servlet3.0 	| 用于声明servlet                                                                            	|
| @WebListener     	| Servlet3.0 	| 用于声明过监听器，可通过控制filter的文件名来控制执行顺序                                   	|
| @WebFilter       	| Servlet3.0 	| 用于声明过滤器                                                                             	|
| @WebInitParam    	| Servlet3.0 	| 为 Servlet 或者过滤器指定初始化参数，配置@WebServlet或@WebFilter时使用                     	|
| @MultipartConfig 	| Servlet3.0 	| HttpServletRequest 提供的对上传文件的支持，该注解标注在 Servlet 上面                       	|



## JDK

| 注解                 	| 版本   	| 说明                                                                             	|
|----------------------	|--------	|----------------------------------------------------------------------------------	|
| @Retention           	| jdk1.5 	| 元注解：表示注解保留周期                                                         	|
| @Target              	| jdk1.5 	| 元注解：表示注解可以使用在什么地方                                               	|
| @Documented          	| jdk1.5 	| 元注解：将注解写入文档                                                           	|
| @Inherited           	| jdk1.5 	| 元注解：子类继承父类的注解（子类没有任何注解修饰）                               	|
| @Repeatable          	| jdk1.8 	| 表示注解的属性可以重复！@Repeatable通俗来讲，就是注解容器！                      	|
| @Deprecated          	| jdk1.5 	| 内置注解：用于标志过时的类、方法和成员变量                                       	|
| @Override            	| jdk1.5 	| 内置注解：用于修饰重写的方法                                                     	|
| @SuppressWarnings    	| jdk1.5 	| 内置注解：用户忽略@Deprecated标志过的警告                                        	|
| @SafeVarargs         	| jdk1.7 	| 参数安全类型注解，用于提示用户参数安全                                           	|
| @FunctionalInterface 	| jdk1.8 	| 函数式接口注解，用于定义函数式接口                                               	|
| @Interface           	| jdk1.5 	| 注解的创建和接口的创建，用来声明一个注解                                         	|
| @Native              	| jdk1.8 	| 生成本机头文件的工具的提示，以确定是否需要头文件，如果需要，它应该包含哪些声明。 	|




## JAX-RS

> `Jersey`和`CxF`框架实现了`JSR311`/`JSR339`标准

**jersey常用注解**

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
| @XmlRootElement 	| 将bean转换为xml             	| 如果要将bean以xml或json的格式返回，必须要这个注解。比如：@XmlRootElementpublic class User{...}                                                         	|
| @XmlElements    	|                             	|                                                                                                                                                        	|
| @XmlElement     	|                             	|                                                                                                                                                        	|




## AOP

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



## spring

```java
// 手动回滚事务
TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
```

### 1.声明bean的注解

- `@Component` 组件，没有明确的角色

- `@Service` 在业务逻辑层使用（service层）

- `@Repository` 在数据访问层使用（dao层）

- `@Controller` 在展现层使用，控制器的声明（C）

### 2.注入bean的注解

> 都可以注解在set方法和属性上，推荐注解在属性上（一目了然，少写代码）。

- `@Autowired` 由Spring提供
 
- `@Inject` 由JSR-330提供

- `@Resource` 由JSR-250提供


### 3.java配置类相关注解

- `@Configuration` 声明当前类为配置类，相当于xml形式的Spring配置（类上）

- `@Bean` 注解在方法上，声明当前方法的返回值为一个bean，替代xml中的方式（方法上）

- `@Configuration` 声明当前类为配置类，其中内部组合了`@Component`注解，表明这个类是一个bean（类上）

- `@ComponentScan` 用于对Component进行扫描，相当于xml中的（类上）

- `@WishlyConfiguration` 为`@Configuration`与`@ComponentScan`的组合注解，可以替代这两个注解

### 4.切面（AOP）相关注解

> Spring支持AspectJ的注解式切面编程。

- `@Aspect` 声明一个切面（类上）

> 使用`@After`、`@Before`、`@Around`定义建言（advice），可直接将拦截规则（切点）作为参数。
 
- `@After` 在方法执行之后执行（方法上）

- `@Before` 在方法执行之前执行（方法上）

- `@Around` 在方法执行之前与之后执行（方法上）

- `@PointCut` 声明切点

> 在java配置类中使用`@EnableAspectJAutoProxy`注解开启Spring对AspectJ代理的支持（类上）

### 5.@Bean的属性支持

- `@Scope` 设置Spring容器如何新建Bean实例（方法上，得有`@Bean`） ,其设置类型包括：
    - `Singleton` （单例,一个Spring容器中只有一个bean实例，默认模式）, 
    - `Protetype` （每次调用新建一个bean）, 
    - `Request` （web项目中，给每个http request新建一个bean）, 
    - `Session` （web项目中，给每个http session新建一个bean）, 
    - `GlobalSession`（给每一个 global http session新建一个Bean实例）

- `@StepScope` 在Spring Batch中还有涉及

- `@PostConstruct` 由JSR-250提供，在构造函数执行完之后执行，等价于xml配置文件中bean的initMethod

- `@PreDestory` 由JSR-250提供，在Bean销毁之前执行，等价于xml配置文件中bean的destroyMethod

### 6.@Value注解

> `@Value` 为属性注入值（属性上）,支持如下方式的注入

- `@Value("Michael Jackson")` String name; 注入普通字符

- `@Value("#{systemProperties['os.name']}")` String osName; 注入操作系统属性

- `@Value("#{ T(java.lang.Math).random() * 100 }")` String randomNumber; 注入表达式结果

- `@Value("#{domeClass.name}")` String name; 注入其它bean属性

- `@Value("classpath:com/hgs/hello/test.txt")` String Resource file; 注入文件资源

- `@Value("http://www.cznovel.com")` Resource url; 注入网站资源

- `@Value("${book.name}")` String bookName; 注入配置文件

**注入配置使用方法**

> 编写配置文件（test.properties）

```
book.name= test
```

> `@PropertySource` 加载配置文件(类上)

```
@PropertySource("classpath:/test.propertie")
```
> ③ 还需配置一个`PropertySourcesPlaceholderConfigurer`的bean。

### 7.环境切换

- `@Profile` 通过设定Environment的ActiveProfiles来设定当前context需要使用的配置环境。（类或方法上）

- `@Conditional` Spring4中可以使用此注解定义条件话的bean，通过实现Condition接口，并重写matches方法，从而决定该bean是否被实例化。（方法上）

### 8.异步相关

> @EnableAsync 配置类中，通过此注解开启对异步任务的支持，叙事性AsyncConfigurer接口（类上）

> @Async 在实际执行的bean方法使用该注解来申明其是一个异步任务（方法上或类上所有的方法都将异步，需要@EnableAsync开启异步任务）

### 9.定时任务相关

- `@EnableScheduling` 在配置类上使用，开启计划任务的支持（类上）

- `@Scheduled` 来申明这是一个任务，包括cron,fixDelay,fixRate等类型（方法上，需先开启计划任务的支持）

### 10.@Enable*注解说明

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

### 11.测试相关注解

- `@RunWith` 运行器，Spring中通常用于对JUnit的支持

> `@RunWith(SpringJUnit4ClassRunner.class)`

- `@ContextConfiguration` 用来加载配置ApplicationContext，其中classes属性用来加载配置类

> `@ContextConfiguration(classes={TestConfig.class})`

### SpringMVC注解

- `@EnableWebMvc` 在配置类中开启Web MVC的配置支持，如一些ViewResolver或者MessageConverter等，若无此句，重写WebMvcConfigurerAdapter方法（用于对SpringMVC的配置）。

- `@Controller` 声明该类为SpringMVC中的Controller

- `@RequestMapping` 用于映射Web请求，包括访问路径和参数（类或方法上）

- `@ResponseBody` 支持将返回值放在response内，而不是一个页面，通常用户返回json数据（返回值旁或方法上）

- `@RequestBody` 允许request的参数在request体中，而不是在直接连接在地址后面。（放在参数前）

- `@PathVariable` 用于接收路径参数，比如`@RequestMapping(“/hello/{name}”)`申明的路径，将注解放在参数中前，即可获取该值，通常作为Restful的接口实现方法。

- `@RestController` 该注解为一个组合注解，相当于`@Controller`和`@ResponseBody`的组合，注解在类上，意味着，该Controller的所有方法都默认加上了`@ResponseBody`。

- `@ControllerAdvice` 通过该注解，我们可以将对于控制器的全局配置放置在同一个位置，注解了`@Controller`的类的方法可使用`@ExceptionHandler`、`@InitBinder`、`@ModelAttribute`注解到方法上，这对所有注解了 `@RequestMapping`的控制器内的方法有效。

- `@ExceptionHandler` 用于全局处理控制器里的异常

- `@InitBinder` 用来设置WebDataBinder，WebDataBinder用来自动绑定前台请求参数到Model中。

- `@ModelAttribute` 本来的作用是绑定键值对到Model里，在`@ControllerAdvice`中是让全局的`@RequestMapping`都能获得在此处设置的键值对。




## Swagger2

| 注解名称 | 注解属性 | 作用域 | 属性作用       |
|----------|----------|--------|----------------|
| @Api     | tags     | 类     | 说明该类的作用 |
|          | value    | 类     | 说明该类的作用 |
| @ApiOperation() | value    | 方法   | 描述方法作用 |
|                 | notes    | 方法   | 提示内容     |
|                 | tags     | 方法   | 分组         |
| @ApiParam() | name     | 方法参数 | 参数名   |
|             | value    | 方法参数 | 参数说明 |
|             | required | 方法参数 | 是否必填 |
| @ApiModel()         | value       | 类   | 对象名   |
|                     | description | 类   | 描述     |
| @ApiModelProperty() | value       | 方法 | 字段说明 |
|                     | name        | 方法 | 属性名   |
|                     | dataType    | 方法 | 属性类型 |
|                     | required    | 方法 | 是否必填 |
|                     | example     | 方法 | 举例     |
|                     | hidden      | 方法 | 隐藏     |
| @ApiImplicitParam() | value       | 方法 | 参数说明 |
|                     | name        | 方法 | 参数名   |
|                     | dataType    | 方法 | 数据类型 |
|                     | paramType   | 方法 | 参数类型 |
|                     | example     | 方法 | 举例     |
| @ApiResponse()      | response    | 方法 | 返回类   |
|                     | code        | 方法 | 返回码   |
|                     | message     | 方法 | 返回信息 |
|                     | examples    | 方法 | 例子     |


|        注解        |     属性     |        值       |               备注                      |
|--------------------|--------------|---------------------|-----------------------------------------|
| @Api               | value        | 字符串                 | 可用在class头上,class描述   |
|                    | description  | 字符串                 |                               |
|                    |              |                     | @Api(value = "xxx", description = "xxx")   |
| @ApiOperation      | value        | 字符串                 | 可用在方法头上.参数的描述容器         |
|                    | notes        | 字符串                 |                                        |
|                    |              |                     | @ApiOperation(value = "xxx", notes = "xxx")   |
| @ApiImplicitParams | {}         | @ApiImplicitParam数组 | 可用在方法头上.参数的描述容器               |
|                    |              |                     | @ApiImplicitParams({@ApiImplicitParam1,@ApiImplicitParam2,...}) |
| @ApiImplicitParam  | name         | 字符串 与参数命名对应         | 可用在@ApiImplicitParams里         |
|                    | value        | 字符串                 | 参数中文描述                          |
|                    | required     | 布尔值                 | true/false                         |
|                    | dataType     | 字符串                 | 参数类型                           |
|                    | paramType    | 字符串                 | 参数请求方式:query/path              |
|                    |              |                     | query:对应@RequestParam?传递            |
|                    |              |                     | path: 对应@PathVariable{}path传递         |
|                    | defaultValue | 字符串                 | 在api测试中默认值                        |
|                    |              |                     | 用例参见项目中的设置                       |
| @ApiResponses      | {}         | @ApiResponse数组      | 可用在方法头上.参数的描述容器               |
|                    |              |                     | @ApiResponses({@ApiResponse1,@ApiResponse2,...}) |
| @ApiResponse       | code         | 整形                  | 可用在@ApiResponses里                   |
|                    | message      | 字符串                 | 错误描述                             |
|                    |              |                     | @ApiResponse(code = 200, message = "Successful") |
