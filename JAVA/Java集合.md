# Java集合

## List
### List取一定范围数据
```java
List newList = list.subList(start, end);
// start,end分别是第几个到第几个。
// 注意的是此方法和substring一样，包含前不包含结尾，取下标索引
// 另一个注意的地方是使用此方法会改变原始list列表，返回的这个子列表的幕后其实还是原列表；
// 也就是说，修改这个子列表，将导致原列表也发生改变。
```
### List随机取值
#### 方法一
```java
public static void main(String[] args) {
    List<String> list = Arrays.asList("a","b","c");
    int index = (int) (Math.random()* list.size());
    System.out.println(list.get(index));
}
```
#### 方法二
```java
public static void main(String[] args) {
    List<String> list = Arrays.asList("a","b","c");
    // shuffle 打乱顺序 
    Collections.shuffle(list);
    System.out.println(list.get(0));
}
```
