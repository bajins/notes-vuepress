import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.Properties;

import org.springframework.core.io.support.PropertiesLoaderUtils;

/**
 * 
 * @ClassName: TestProperties   
 * @Description: 获取配置文件信息  
 * @date: 2017年11月25日 上午10:56:00  
 * @version: 1.0.0
 */
public class TestProperties {
    
    
    /**
     * 
     * @Title: printAllProperty   
     * @Description: 输出所有配置信息  
     * @param props
     * @return void  
     * @throws
     */
    private static void printAllProperty(Properties props)  
    {  
        @SuppressWarnings("rawtypes")  
        Enumeration en = props.propertyNames();  
        while (en.hasMoreElements())  
        {  
            String key = (String) en.nextElement();  
            String value = props.getProperty(key);  
            System.out.println(key + " : " + value);  
        }  
    }

    /**
     * 根据key读取value
     * 
     * @Title: getProperties_1   
     * @Description: 第一种方式：根据文件名使用spring中的工具类进行解析  
     *                  filePath是相对路劲，文件需在classpath目录下
     *                   比如：config.properties在包com.test.config下， 
     *                路径就是com/test/config/config.properties    
     *          
     * @param filePath 
     * @param keyWord      
     * @return
     * @return String  
     * @throws
     */
    public static String getProperties_1(String filePath, String keyWord){
        Properties prop = null;
        String value = null;
        try {
            // 通过Spring中的PropertiesLoaderUtils工具类进行获取
            prop = PropertiesLoaderUtils.loadAllProperties(filePath);
            // 根据关键字查询相应的值
            value = prop.getProperty(keyWord);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return value;
    }
    
    /**
     * 读取配置文件所有信息
     * 
     * @Title: getProperties_1   
     * @Description: 第一种方式：根据文件名使用Spring中的工具类进行解析  
     *                  filePath是相对路劲，文件需在classpath目录下
     *                   比如：config.properties在包com.test.config下， 
     *                路径就是com/test/config/config.properties
     *              
     * @param filePath 
     * @return void  
     * @throws
     */
    public static void getProperties_1(String filePath){
        Properties prop = null;
        try {
            // 通过Spring中的PropertiesLoaderUtils工具类进行获取
            prop = PropertiesLoaderUtils.loadAllProperties(filePath);
            printAllProperty(prop);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    /**
     * 根据key读取value
     * 
     * @Title: getProperties_2   
     * @Description: 第二种方式：使用缓冲输入流读取配置文件，然后将其加载，再按需操作
     *                    绝对路径或相对路径， 如果是相对路径，则从当前项目下的目录开始计算， 
     *                  如：当前项目路径/config/config.properties, 
     *                  相对路径就是config/config.properties   
     *           
     * @param filePath
     * @param keyWord
     * @return
     * @return String  
     * @throws
     */
    public static String getProperties_2(String filePath, String keyWord){
        Properties prop = new Properties();
        String value = null;
        try {
            // 通过输入缓冲流进行读取配置文件
            InputStream InputStream = new BufferedInputStream(new FileInputStream(new File(filePath)));
            // 加载输入流
            prop.load(InputStream);
            // 根据关键字获取value值
            value = prop.getProperty(keyWord);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return value;
    }
    
    /**
     * 读取配置文件所有信息
     * 
     * @Title: getProperties_2   
     * @Description: 第二种方式：使用缓冲输入流读取配置文件，然后将其加载，再按需操作
     *                    绝对路径或相对路径， 如果是相对路径，则从当前项目下的目录开始计算， 
     *                  如：当前项目路径/config/config.properties, 
     *                  相对路径就是config/config.properties   
     *           
     * @param filePath
     * @return void
     * @throws
     */
    public static void getProperties_2(String filePath){
        Properties prop = new Properties();
        try {
            // 通过输入缓冲流进行读取配置文件
            InputStream InputStream = new BufferedInputStream(new FileInputStream(new File(filePath)));
            // 加载输入流
            prop.load(InputStream);
            printAllProperty(prop);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    /**
     * 根据key读取value
     * 
     * @Title: getProperties_3   
     * @Description: 第三种方式：
     *                    相对路径， properties文件需在classpath目录下， 
     *                  比如：config.properties在包com.test.config下， 
     *                  路径就是/com/test/config/config.properties 
     * @param filePath
     * @param keyWord
     * @return
     * @return String  
     * @throws
     */
    public static String getProperties_3(String filePath, String keyWord){
        Properties prop = new Properties();
        String value = null;
        try {
            InputStream inputStream = TestProperties.class.getResourceAsStream(filePath);
            prop.load(inputStream);
            value = prop.getProperty(keyWord);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return value;
    }
    
    /**
     * 读取配置文件所有信息
     * 
     * @Title: getProperties_3   
     * @Description: 第三种方式：
     *                    相对路径， properties文件需在classpath目录下， 
     *                  比如：config.properties在包com.test.config下， 
     *                  路径就是/com/test/config/config.properties 
     * @param filePath
     * @return
     * @throws
     */
    public static void getProperties_3(String filePath){
        Properties prop = new Properties();
        try {
            InputStream inputStream = TestProperties.class.getResourceAsStream(filePath);
            prop.load(inputStream);
            printAllProperty(prop);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    
    public static void main(String[] args) {
        // 注意路径问题
        String properties_1 = getProperties_1("com/test/config/config.properties", "wechat_appid");
        System.out.println("wechat_appid = " + properties_1);
        getProperties_1("com/test/config/config.properties");
        System.out.println("*********************************************");
        // 注意路径问题
        String properties_2 = getProperties_2("configure/configure.properties", "jdbc.url");
        System.out.println("jdbc.url = " + properties_2);
        getProperties_2("configure/configure.properties");
        System.out.println("*********************************************");
        // 注意路径问题
        String properties_3 = getProperties_3("/com/test/config/config.properties", "wechat_appid");
        System.out.println("wechat_appid = " + properties_3);
        getProperties_3("/com/test/config/config.properties");
    }
}
