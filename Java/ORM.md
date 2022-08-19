# ORM


[[toc]]




## Flag

> 对象关系映射（Object Relational Mapping，简称ORM）是通过使用描述对象和数据库之间映射的元数据，
> 将面向对象语言程序中的对象自动持久化到关系数据库中。

* [Java，JDBC和MySQL对应数据类型](https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-reference-type-conversions.html)
* [http://www.squirrelsql.org](http://www.squirrelsql.org)
* [http://java-source.net/open-source/sql-clients](http://java-source.net/open-source/sql-clients)
* 链式SQL框架 [https://github.com/jOOQ](https://github.com/jOOQ)
* [https://github.com/querydsl/querydsl](https://github.com/querydsl/querydsl)
* [https://github.com/BatooOrg/BatooJPA](https://github.com/BatooOrg/BatooJPA)
* [https://github.com/eclipse-ee4j/eclipselink](https://github.com/eclipse-ee4j/eclipselink)
* [https://github.com/apache/openjpa](https://github.com/apache/openjpa)
* [https://github.com/spring-projects/spring-data-jdbc](https://github.com/spring-projects/spring-data-jdbc)
* [https://github.com/apache/commons-dbutils](https://github.com/apache/commons-dbutils)
* 只读查询 [https://github.com/ejlchina/bean-searcher](https://github.com/ejlchina/bean-searcher)
* [https://github.com/speedment](https://github.com/speedment)


- [https://github.com/itfsw/mybatis-generator-plugin](https://github.com/itfsw/mybatis-generator-plugin)
- CRUD生成器 [https://github.com/SanjinKurelic/MVCGenerator](https://github.com/SanjinKurelic/MVCGenerator)
- 数据库中间件 [https://github.com/apache/shardingsphere](https://github.com/apache/shardingsphere)
- 连接池 [https://github.com/brettwooldridge/HikariCP](https://github.com/brettwooldridge/HikariCP)



**Transaction**

* [https://github.com/codingapi/tx-lcn](https://github.com/codingapi/tx-lcn)
* [https://github.com/seata/seata](https://github.com/seata/seata)
* [https://github.com/changmingxie/tcc-transaction](https://github.com/changmingxie/tcc-transaction)
* [https://github.com/QNJR-GROUP/EasyTransaction](https://github.com/QNJR-GROUP/EasyTransaction)
* [https://github.com/liuyangming/ByteTCC](https://github.com/liuyangming/ByteTCC)
* [https://github.com/wchswchs/Hulk](https://github.com/wchswchs/Hulk)
* [https://github.com/atomikos/transactions-essentials](https://github.com/atomikos/transactions-essentials)





## JDBC驱动

**注意使用的JDBC驱动**

- `com.mysql.jdbc.Driver`是`mysql-connector-java 5`中的，不再推荐使用
- `com.mysql.cj.jdbc.Driver`是`mysql-connector-java 6`中的

> 如果`mysql-connector-java`用的`6.0`以上的，但是你的`driver`用的还是`com.mysql.jdbc.Driver`，就会报错



**URL及参数**

* [(https://mysql-net.github.io/MySqlConnector/connection-options]((https://mysql-net.github.io/MySqlConnector/connection-options)
    * [https://mysqlconnector.net/connection-options](https://mysqlconnector.net/connection-options)

> `jdbc:mysql://127.0.0.1:3306/test?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&useSSL=false`
> `&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&zeroDateTimeBehavior=convertToNull&serverTimezone=Asia/Shanghai`

| 参数名称              	| 参数说明                                                                        	| 缺省值 	| 最低版本要求 	|
|-----------------------	|---------------------------------------------------------------------------------	|--------	|--------------	|
| user                  	| 数据库用户名（用于连接数据库）                                                  	|        	| 所有版本     	|
| password              	| 用户密码（用于连接数据库）                                                      	|        	| 所有版本     	|
| useUnicode            	| 是否使用Unicode字符集，使用参数characterEncoding，本参数值必须设置为true        	| FALSE  	| 1.1g         	|
| characterEncoding     	| 当useUnicode设置为true时，指定字符编码。比如可设置为gb2312或gbk、UTF-8          	| FALSE  	| 1.1g         	|
| autoReconnect         	| 当数据库连接异常中断时，是否自动重新连接？                                      	| FALSE  	| 1.1          	|
| autoReconnectForPools 	| 是否使用针对数据库连接池的重连策略                                              	| FALSE  	| 3.1.3        	|
| failOverReadOnly      	| 自动重连成功后，连接是否设置为只读？                                            	| TRUE   	| 3.0.12       	|
| maxReconnects         	| autoReconnect设置为true时，重试连接的次数                                       	| 3      	| 1.1          	|
| initialTimeout        	| autoReconnect设置为true时，两次重连之间的时间间隔，单位：秒                     	| 2      	| 1.1          	|
| connectTimeout        	| 和数据库服务器建立socket连接时的超时，单位：毫秒                                	| 0      	| 3.0.1        	|
| socketTimeout         	| socket操作（读写）超时，单位：毫秒。 0表示永不超时                              	| 0      	| 3.0.1        	|
| useSSL                	| 是否进行ssl连接                                                                 	|        	|              	|
| zeroDateTimeBehavior  	| 把零值日期转换为`null`                                                          	|        	|              	|
| serverTimezone        	| `GMT%2B8` `%2B`是`+`的转义字符,其实就是`GMT+8`（'+8:00'）,代表东八区`Asia/Shanghai` 	|        	|              	|

- `useTimeZone` 为true时，会开启服务器和客户端之间的时区转换，只有`useLegacyDatetimeCode = true`时才回生效
- `useLegacyDatetimeCode` 默认为true，为false时: `useTimezone`, `useJDBCCompliantTimezoneShift`, `useGmtMillisForDatetimes`, `useFastDateParsing` 这几个参数都会无效




## Mybatis

* [https://github.com/mybatis](https://github.com/mybatis)
* [https://mybatis.org/mybatis-3/zh/dynamic-sql.html](https://mybatis.org/mybatis-3/zh/dynamic-sql.html)
* [https://github.com/pagehelper/Mybatis-PageHelper](https://github.com/pagehelper/Mybatis-PageHelper)
* [https://github.com/baomidou/mybatis-plus](https://github.com/baomidou/mybatis-plus)
* [https://github.com/davidfantasy/mybatis-plus-generator-ui](https://github.com/davidfantasy/mybatis-plus-generator-ui)

- [https://github.com/alexdyysp/MybatisHandBook](https://github.com/alexdyysp/MybatisHandBook)

* [干掉mapper.xml！MyBatis新特性动态SQL](https://cloud.tencent.com/developer/article/1769767)
* [Mybatis 源码分析 (一) Mapper扫描及代理](https://cofcool.github.io/tech/2018/06/20/mybatis-sourcecode-1)
* [一条sql查出树形结构数据](https://my.oschina.net/u/2326864/blog/1622990)
* [Sql中对于树形结构的处理](https://blog.csdn.net/weixin_43794897/article/details/88534992)


**trim标签**

| 属性              | 描述                |
|-----------------|-------------------|
| prefix          | 在条件语句前需要加入的内容     |
| suffix          | 在条件语句后需要加入的内容     |
| prefixOverrides | 覆盖/去除sql语句前面的指定内容 |
| suffixOverrides | 覆盖/去除sql语句后面的指定内容 |


- 示例

```xml
<select id="selectSelective" resultType="java.util.Map">
  SELECT * FROM user
  <trim prefix="WHERE" suffix="AND|OR">
    <if test="id != null and id.trim() != '' ">
        id = #{id} AND
    </if>
    <if test="name != null and name.trim() != '' ">
        name = #{name} AND
    </if>
  </trim>
</select>
<!-- 等同于以下方式 -->
<select id="selectSelective" resultType="java.util.Map">
  SELECT * FROM user
  <where>
    <if test="id != null and id.trim() != '' ">
        id = #{id}
    </if>
    <if test="name != null and name.trim() != '' ">
        AND name = #{name} 
    </if>
  </where>
</select>
```


**Oracle 的in query list 的大小要不大于1000**

```java
List<String> taskLists = new ArrayList<>();
taskLists.addAll(tasksToArchive);
int times = tasksToArchive.size() % 1000 == 0 ? tasksToArchive.size() / 1000 : (tasksToArchive.size() / 1000 + 1);
List<IAccountingTask> tasksToArchiveList = new ArrayList<IAccountingTask>();
if (taskLists != null && !taskLists.isEmpty()) {
    for (int i = 0; i < times; i++) {
        List<? extends IAccountingTask> tempList;
        if ((i + 1) * 1000 <= taskLists.size()) {
            tempList = persistenceManager.getSession().getAll(AccountingTask.class,
                    taskLists.subList(i * 1000, (i + 1) * 1000));
        } else {
            tempList = persistenceManager.getSession().getAll(AccountingTask.class,
                    taskLists.subList(i * 1000, taskLists.size()));
        }
        tasksToArchiveList.addAll(tempList);
    }
}

List<TransactRepViewModel> result = new ArrayList<TransactRepViewModel>();
final List<List<String>> partitions = ListUtils.partition(clientIdList, 999);
for (List<String> partition : partitions) {
    result.addAll(yourRepo.findByClientIdList(partition, startDate, endDate);)
}
```


```xml
<foreach collection="sessionIds" item="session_id" open="(" close=")" separator="," index="index">
    <if test="index == 0">
      session_id in (
    </if>
    <!-- 多个if判断原因：
           sql in 最大只有1000个参数。
           foreach 只去掉了最后一个‘,’
           数据库表中sessionId是非空设置
    -->
    <if test="index != 0 and index % 500 == 0">
      '' ) or session_id in (
    </if>
    #{session_id}
    <if test="index == sessionIds.size - 1">
      )
    </if>
</foreach>
```




## Hibernate

* [https://github.com/hibernate](https://github.com/hibernate)
* [https://github.com/vladmihalcea/hypersistence-optimizer](https://github.com/vladmihalcea/hypersistence-optimizer)


### 返回结果接收方式

**setresulttransformer与addentity的区别**

> 一个区别是前者支持查任意的列，后者必须用select * from users的形式或select {a.*},{b.*} from a,b where ....。 
>
> 如果使用原生sql语句进行query查询时，hibernate是不会自动把结果包装成实体的。所以要手动调用addentity(class class)等一系列方法。 
>
> 如session.createsqlquery(sql).addentity(class class);注意hibernate3.0.5不支持，单个参数的addentity方法 
>
> 另外，hibernate3.2可以对原生sql 查询使用resulttransformer。这会返回不受hibernate管理的实体。 

```java
session.createsqlquery("select name ,age,birthday from students") .setresulttransformer(transformers.aliastobean(students.class)) 
// 或
setresulttransformer(new aliastobeanresulttransformer (students.class)) 
```

>> 上面的查询将会返回students的列表,它将被实例化并且将name和birthday的值注射入对应的属性或者字段。 
但必须注意，对每一个列都必须addscalar("列名") 

**返回结果转换为Map**

```java
List<Map<String, Object>> list = session.createSQLQuery(sql).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
Map<String, Object> map = (Map<String, Object>) session.createSQLQuery(sql).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).uniqueResult();
```

**当确定返回的实例只有一个或者null时 用uniqueResult()方法**

```java
Double result = (Double) session.createSQLQuery(querySql).uniqueResult();
```

### HQL查询

```java
String hql = "from Invest i where i.loan.id=? and i.status=?";
List<Invest> is = ht.find(hql, new String[] { loanId, InvestStatus.REPAYING });
// 或者
String hql = "from Invest i where i.loan.id=? and i.status=?";
List<Invest> is = ht.find(hql, loanId, InvestStatus.REPAYING );

// 使用in，同createSQLQuery使用方式一样
String hql = "from Invest i where i.loan.id=? and i.status in(:status)";
List<Invest> is = session.createQuery(sql)
					.setParameter(0, loanId)
					.setParameterList("status", Arrays.asList(InvestStatus.REPAYING, InvestStatus.OVERDUE,
							InvestStatus.COMPLETE, InvestStatus.BID_SUCCESS)).list()
```


### QBC查询

> 该方式只能用关联表的关联字段为查询条件，无法使用关联表的其他字段为查询条件

> Criteria 和 DetachedCriteria 的主要区别在于创建的形式不一样, Criteria 是在线的，所以它是由hibernate Session 进行创建的；
而 DetachedCriteria 是离线的，创建时无需Session ，DetachedCriteria 提供了 2 个静态方法 forClass(Class) 或 forEntityName(Name)进行DetachedCriteria 实例的创建。

>  spring 的框架提供了getHibernateTemplate().findByCriteria(detachedCriteria) 方法可以很方便地根据DetachedCriteria 来返回查询结果。

**hibernate5.2版本之前createCriteria()查询的方式**

```java
// Restrictions.in传值为数组或list集合
List<String> status = Arrays.asList(InvestConstants.InvestStatus.REPAYING,InvestConstants.InvestStatus.OVERDUE);
DetachedCriteria criteria = DetachedCriteria.forClass(InvestExtensionPlan.class);
criteria.createAlias("invest", "i");// 当查询关联第三张表时，第二张表需要取别名
criteria.add(Restrictions.eq("i.loan.id", loanExtensionPlan.getLoan().getId()));
criteria.add(Restrictions.in("status", status)); // 可解决ORACLE in 大于1000问题
criteria.addOrder(Order.desc("period"));// 添加排序

// 查询一范围内的的数据,需借助Criteria来查询
Criteria cri = criteria.getExecutableCriteria(ht.getSessionFactory().getCurrentSession());
cri.setFirstResult(firstResult);// 从第几条开始
cri.setMaxResults(maxResults);// 查询多少条
List<InvestExtensionPlan> investExtensionPlans = ht.findByCriteria(criteria);


// 可解决ORACLE in 大于1000问题
private void addCriteriaIn(String propertyName, List<?> list, Criteria criteria) {
    Disjunction or = Restrictions.disjunction();
    if (list.size() > 1000) {
        while (list.size() > 1000) {
            List<?> subList = list.subList(0, 1000);
            or.add(Restrictions.in(propertyName, subList));
            list.subList(0, 1000).clear();
        }
    }
    or.add(Restrictions.in(propertyName, list));
    criteria.add(or);
}
```

> 模糊查询和自定义查询

```java
criteria.add(Restrictions.like("time","%" + "2018-11-13" + "%"));
criteria.add(Restrictions.sqlRestriction("time like '%2018-11-13%'"));
```

**hibernate5.2及之后版本createCriteria()查询的方式**

> 原有的session.createCriteria()方法已经过时，替代的方式是使用JPA Criteria。

> session.createSQLCriteria()方法也过时了，当然可以用session.createNativeCriteria()方法来代替。

```java
//注意导入的包是import javax.persistence.criteria.CriteriaQuery;
try {
    session.beginTransaction();
    //1.创建CriteriaBuilder,用于创建查询
    CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
    //2.创建CriteriaQuery,用于设置查询语句的信息
    CriteriaQuery<Student> criteriaQuery = criteriaBuilder.createQuery(Student.class);
    //3.定义查询的From子句中能出现的类型,也可以用root.get()获取具体的某个属性
    Root<Student> root = criteriaQuery.from(Student.class);
    //4.设置WHERE字句的条件，此处条件为score<= 98
    criteriaQuery.where(criteriaBuilder.lt(root.get("score"), 98));
    //5.设置排序标准与排序方式
    criteriaQuery.orderBy(criteriaBuilder.desc(root.get("score")));
    //6.创建Query对象并获取结果集list
    Query<Student> query = session.createQuery(criteriaQuery);
    List<Student> list = query.list();
    // List<Student> list = session.createQuery(criteriaQuery).getResultList();
    //7.遍历结果集
    list.forEach(System.out::println);
    session.getTransaction().commit();
} catch (Exception e) {
    e.printStackTrace();
    session.getTransaction().rollback();
}
```

> 多表查询

```java
try {
    session.beginTransaction();
    //1.创建CriteriaBuilder
    CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
    //2.创建CriteriaQuery
    CriteriaQuery<Country> criteriaQuery = criteriaBuilder.createQuery(Country.class);
    //3.设置distinct去重
    criteriaQuery.distinct(true);
    //4.获取root句柄
    Root<Country> root = criteriaQuery.from(Country.class);
    //5.设置fetch的连接对象以及连接类型，此处为迫切左外连接
    root.fetch("ministers", JoinType.LEFT);
    //6.设置where查询条件
    criteriaQuery.where(criteriaBuilder.equal(root.get("cid"), 1));
    //7.获取Query对象
    Query<Country> query = session.createQuery(criteriaQuery);
    //8.获取查询结构
    List<Country> list = query.list();
    // List<Student> list = session.createQuery(criteriaQuery).getResultList();
    for (Country country : list) {
	System.out.println(country);
	country.getMinisters().forEach(System.out::println);
    }
    session.getTransaction().commit();
} catch (Exception e) {
    e.printStackTrace();
    session.getTransaction().rollback();
}
```

* [调用hibernate存储过程](http://www.voidcn.com/article/p-kixpjimv-qq.html)

### 关闭session

```java
if (session != null) {
	session.flush();
	session.clear();
	session.close();
}
```

- hibernate中evict()和clear()的区别

> session.evict(obj)：会把指定的缓冲对象从一级缓存中进行清除；

> session.clear()：把一级缓存中的全部对象清除，但不包括操作中的对象。

- hibernate执行的顺序如下：
> (1)生成一个事务的对象，并标记当前的session处于事务状态（此时并未启动数据库级事务）。

> (2)应用使用s.save()保存对象，这个时候Session将这个对象放入entityEntries，用来标记对象已经和当前的会话建立了关联，
> 由于应用对对对象做了保存的操作，Session还要在insertions中登记应用的这个插入行为(行为包括：对象引用、对象id、Session、持久化处理类)。

> (3)s.evict()将对象从s会话中拆离，这时s会从entityEntries中将这个对象移除。

> (4)事务提示，需要将所有缓存flush入数据库，Session启动一个事务，并按照insert ,update,...,delete的顺序提交所有之前登记的操作
（注意：所有insert执行完毕后才会执行update，这里的特殊处理也可能会将你的程序搞得一团遭，如需要控制操作的顺序，需要使用flush），
现在对象不再entityEntries中，但在执行insert的行为时只需要访问insertions就足够了，所以此时不会有任何的异常，
异常出现在插入后通知Session该对象已经插入完毕这个步骤上，这个步骤中需要将entityEntries中对象的existsInDatabase标志置true，
由于对象并不存在于entityEntres中，此时Hibernate就认为insertions和entityEntries可能因为线程安全的问题产生了不同步
（也不知道Hibernate的开发者是否考虑到例子中的处理方式，如果没有的话，这也许算是一个bug吧），
于是一个net.sf.hibernate.AssertionFailure就被抛出，程序终止。

> 一般我们会错误的认为s.sava会立即执行，而将对象过早的与session拆离，造成了session的insertion和entityEntries中内容的不同步。
所以我们在做此类操作时一定要清楚hibernate什么时候会将数据flush入数据库，在未flush之前不要将已进行操作的对象从session上拆离，解决办法是在sava之后，添加session.flush。


```java
/**
 * 验证缓存管理的方法evict
 * 执行完evict之后，将会将id为5的user对象从一级缓存中移除，再次访问的话将重新查询数据库
 * 该用例将发出2个select语句
 */
@Test
public void testEvict(){
	Session session = HibernateUtil.getSession();
	User user1 =  (User)session.get(User.class, 5);
	System.out.println(user1.getName());
	session.evict(user1);
	User user2 =  (User)session.get(User.class, 5);
	System.out.println(user2.getName());
	session.close();
}


/**
 * 验证缓存管理的方法clear
 * 执行clear方法之后，一级缓存中的对象全部被清除，再次查询，将从数据库中查询
 * 该用例将发出2个select语句
 */
@Test
public void testClear(){
	Session session = HibernateUtil.getSession();
	User user1 =  (User)session.get(User.class, 5);
	System.out.println(user1.getName());
	System.out.println("=======================");
	User user2 =  (User)session.get(User.class, 5);
	System.out.println(user2.getName());
	session.clear();


}
```

### 只读错误

> Write operations are not allowed in read-only mode (FlushMode.MANUAL):
Turn your Session into FlushMode.COMMIT/AUTO or remove 'readOnly' marker from transaction definition.

> 写操作在只读模式下不被允许(FlushMode.MANUAL): 把你的Session改成FlushMode.COMMIT/AUTO或者清除事务定义中的readOnly标记。

### 编程式修改FlushMode

```java
ht.setFlushMode(HibernateTemplate.FLUSH_AUTO);
ht.getSessionFactory().getCurrentSession().setFlushMode(FlushMode.AUTO);
```

### 配置过滤器

```xml
<web-app version="3.0" >
    <filter>
        <filter-name>OpenSessionInViewFilter</filter-name>
        <filter-class>org.springframework.orm.hibernate3.support.OpenSessionInViewFilter</filter-class>
        <!-- singleSession默认为true,若设为false则等于没用OpenSessionInView 。所以默认可以不写 -->
        <init-param>
            <param-name>singleSession</param-name>
            <param-value>true</param-value>
        </init-param>
        <!-- 设置flushMode为AUTO(在确保查询从不会返回脏数据的情况下，在查询前刷新Session。)/COMMIT(Session在提交事务时刷新。) -->
        <init-param>
            <param-name>flushMode</param-name>
            <param-value>AUTO</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>OpenSessionInViewFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
</web-app>
```

### 使用execute方法回调方式实现

- Dao层HibernateTemplate操作数据时，使用execute方法回调方式实现：

```java
// 原方式
getHibernateTemplate().save(user); 

// 更改后方式
getHibernateTemplate().execute(new HibernateCallback<User>() {
	@Override
	public User doInHibernate(Session session) throws HibernateException {
		session.save(user);
		return null;
	}
});

```


