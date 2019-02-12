# List
## List取一定范围数据
```java
List newList = list.subList(start, end);
start,end分别是第几个到第几个。
```
## List随机取值
### 方法一
```java
public static void main(String[] args) {
    List<String> list = Arrays.asList("a","b","c");
    int index = (int) (Math.random()* list.size());
    System.out.println(list.get(index));
}
```
### 方法二
```java
public static void main(String[] args) {
    List<String> list = Arrays.asList("a","b","c");
    // shuffle 打乱顺序 
    Collections.shuffle(list);
    System.out.println(list.get(0));
}
```
