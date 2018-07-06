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
