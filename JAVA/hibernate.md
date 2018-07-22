# hibernate的使用

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


hibernate中evict()和clear()的区别
session.evict(obj)：会把指定的缓冲对象进行清除；

session.clear()：把缓冲区内的全部对象清除，但不包括操作中的对象。

hibernate执行的顺序如下：

(1)生成一个事务的对象，并标记当前的session处于事务状态（此时并未启动数据库级事务）。

(2)应用使用s.save()保存对象，这个时候Session将这个对象放入entityEntries，用来标记对象已经和当前的会话建立了关联，由于应用对对对象做了保存的操作，Session还要在insertions中登记应用的这个插入行为(行为包括：对象引用、对象id、Session、持久化处理类)。

(3)s.evict()将对象从s会话中拆离，这时s会从entityEntries中将这个对象移除。

(4)事务提示，需要将所有缓存flush入数据库，Session启动一个事务，并按照insert ,update,...,delete的顺序提交所有之前登记的操作（注意：所有insert执行完毕后才会执行update，这里的特殊处理也可能会将你的程序搞得一团遭，如需要控制操作的顺序，需要使用flush），现在对象不再entityEntries中，但在执行insert的行为时只需要访问insertions就足够了，所以此时不会有任何的异常，异常出现在插入后通知Session该对象已经插入完毕这个步骤上，这个步骤中需要将entityEntries中对象的existsInDatabase标志置true，由于对象并不存在于entityEntres中，此时Hibernate就认为insertions和entityEntries可能因为线程安全的问题产生了不同步（也不知道Hibernate的开发者是否考虑到例子中的处理方式，如果没有的话，这也许算是一个bug吧），于是一个net.sf.hibernate.AssertionFailure就被抛出，程序终止。

　　一般我们会错误的认为s.sava会立即执行，而将对象过早的与session拆离，造成了session的insertion和entityEntries中内容的不同步。所以我们在做此类操作时一定要清楚hibernate什么时候会将数据flush入数据库，在未flush之前不要将已进行操作的对象从session上拆离，解决办法是在sava之后，添加session.flush。
