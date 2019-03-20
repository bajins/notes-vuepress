# 目录
* [hibernate的使用](#hibernate的使用)
  * [返回结果接收方式](#返回结果接收方式)
  * [HQL查询](#HQL查询)
  * [QBC查询](#QBC查询)
* [关闭session](#关闭session)
* [只读错误](#只读错误)
  * [一、编程式修改FlushMode](#一、编程式修改FlushMode)
  * [二、配置过滤器](#二、配置过滤器)
  * [三、使用execute方法回调方式实现](#三、使用execute方法回调方式实现)

*****************************************************************************

# hibernate的使用

## 返回结果接收方式
```java
setresulttransformer与addentity的区别是什么?

一个区别是前者支持查任意的列，后者必须用select * from users的形式或select {a.*},{b.*} from a,b where ....。 

如果使用原生sql语句进行query查询时，hibernate是不会自动把结果包装成实体的。所以要手动调用addentity(class class)等一系列方法。 

如session.createsqlquery(sql).addentity(class class);注意hibernate3.0.5不支持，单个参数的addentity方法 

另外，hibernate3.2可以对原生sql 查询使用resulttransformer。这会返回不受hibernate管理的实体。 

session.createsqlquery("select name ,age,birthday from students") .setresulttransformer(transformers.aliastobean(students.class)) 
或setresulttransformer(new aliastobeanresulttransformer (students.class)) 
上面的查询将会返回students的列表,它将被实例化并且将name和birthday的值注射入对应的属性或者字段。 
但必须注意，对每一个列都必须addscalar("列名") 
```
### 返回结果转换为Map
```java
List<Map<String, Object>> list = session.createSQLQuery(sql).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
```

### 当确定返回的实例只有一个或者null时 用uniqueResult()方法
```java
Double result = (Double) session.createSQLQuery(querySql).uniqueResult();
```
## HQL查询
```java
String hql = "from Invest i where i.loan.id=? and i.status=?";
List<Invest> is = ht.find(hql, new String[] { loanId, InvestStatus.REPAYING });
// 或者
String hql = "from Invest i where i.loan.id=? and i.status=?";
List<Invest> is = ht.find(hql, loanId, InvestStatus.REPAYING );
```


## QBC查询
### 该方式只能用关联表的关联字段为查询条件，无法使用关联表的其他字段为查询条件
##### Criteria 和 DetachedCriteria 的主要区别在于创建的形式不一样, Criteria 是在线的，所以它是由hibernate Session 进行创建的；而 DetachedCriteria 是离线的，创建时无需Session ，DetachedCriteria 提供了 2 个静态方法 forClass(Class) 或 forEntityName(Name)进行DetachedCriteria 实例的创建。
##### spring 的框架提供了getHibernateTemplate().findByCriteria(detachedCriteria) 方法可以很方便地根据DetachedCriteria 来返回查询结果。
### hibernate5.2版本之前createCriteria()查询的方式
```java
// Restrictions.in传值为数组或list集合
List<String> status = Arrays.asList(InvestConstants.InvestStatus.REPAYING,InvestConstants.InvestStatus.OVERDUE);
DetachedCriteria criteria = DetachedCriteria.forClass(InvestExtensionPlan.class);
criteria.createAlias("invest", "i");// 当查询关联第三张表时，第二张表需要取别名
criteria.add(Restrictions.eq("i.loan.id", loanExtensionPlan.getLoan().getId()));
criteria.add(Restrictions.in("status", status));
criteria.addOrder(Order.desc("period"));// 添加排序
// 查询一范围内的的数据,需借助Criteria来查询
Criteria cri = criteria.getExecutableCriteria(ht.getSessionFactory().getCurrentSession());
cri.setFirstResult(firstResult);// 从第几条开始
cri.setMaxResults(maxResults);// 查询多少条
List<InvestExtensionPlan> investExtensionPlans = ht.findByCriteria(criteria);
```
#### 模糊查询和自定义查询
```diff
criteria.add(Restrictions.like("time","%" + "2018-11-13" + "%"));
criteria.add(Restrictions.sqlRestriction("time like '%2018-11-13%'"));
```
### hibernate5.2及之后版本createCriteria()查询的方式
##### 原有的session.createCriteria()方法已经过时，替代的方式是使用JPA Criteria。
##### session.createSQLCriteria()方法也过时了，当然可以用session.createNativeCriteria()方法来代替。
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
#### 多表查询
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

## [调用hibernate存储过程](http://www.voidcn.com/article/p-kixpjimv-qq.html)

## 关闭session
```
if (session != null) {
	session.flush();
	session.clear();
	session.close();
}
```

hibernate中evict()和clear()的区别

session.evict(obj)：会把指定的缓冲对象从一级缓存中进行清除；

session.clear()：把一级缓存中的全部对象清除，但不包括操作中的对象。

hibernate执行的顺序如下：

(1)生成一个事务的对象，并标记当前的session处于事务状态（此时并未启动数据库级事务）。

(2)应用使用s.save()保存对象，这个时候Session将这个对象放入entityEntries，用来标记对象已经和当前的会话建立了关联，由于应用对对对象做了保存的操作，Session还要在insertions中登记应用的这个插入行为(行为包括：对象引用、对象id、Session、持久化处理类)。

(3)s.evict()将对象从s会话中拆离，这时s会从entityEntries中将这个对象移除。

(4)事务提示，需要将所有缓存flush入数据库，Session启动一个事务，并按照insert ,update,...,delete的顺序提交所有之前登记的操作（注意：所有insert执行完毕后才会执行update，这里的特殊处理也可能会将你的程序搞得一团遭，如需要控制操作的顺序，需要使用flush），现在对象不再entityEntries中，但在执行insert的行为时只需要访问insertions就足够了，所以此时不会有任何的异常，异常出现在插入后通知Session该对象已经插入完毕这个步骤上，这个步骤中需要将entityEntries中对象的existsInDatabase标志置true，由于对象并不存在于entityEntres中，此时Hibernate就认为insertions和entityEntries可能因为线程安全的问题产生了不同步（也不知道Hibernate的开发者是否考虑到例子中的处理方式，如果没有的话，这也许算是一个bug吧），于是一个net.sf.hibernate.AssertionFailure就被抛出，程序终止。

　　一般我们会错误的认为s.sava会立即执行，而将对象过早的与session拆离，造成了session的insertion和entityEntries中内容的不同步。所以我们在做此类操作时一定要清楚hibernate什么时候会将数据flush入数据库，在未flush之前不要将已进行操作的对象从session上拆离，解决办法是在sava之后，添加session.flush。


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

# 只读错误
```diff
Write operations are not allowed in read-only mode (FlushMode.MANUAL):
    Turn your Session into FlushMode.COMMIT/AUTO or remove 'readOnly' marker from transaction definition.
写操作在只读模式下不被允许（(FlushMode.MANUAL): 把你的Session改成FlushMode.COMMIT/AUTO或者清除事务定义中的readOnly标记。
```
## 一、编程式修改FlushMode
```java
ht.setFlushMode(HibernateTemplate.FLUSH_AUTO);
ht.getSessionFactory().getCurrentSession().setFlushMode(FlushMode.AUTO);
```
## 二、配置过滤器
```xml
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
```

## 三、使用execute方法回调方式实现
#### Dao层HibernateTemplate操作数据时，使用execute方法回调方式实现：

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



