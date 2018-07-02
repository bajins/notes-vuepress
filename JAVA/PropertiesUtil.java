
import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.Properties;
import java.util.ResourceBundle;

import org.springframework.core.io.support.PropertiesLoaderUtils;

/**
 * 
 * @ClassName: PropertiesUtil
 * @Description: 获取配置文件信息
 * @date: 2018年7月2日 
 * @version: 1.1.0
 */
public class PropertiesUtil {

	public static Properties getPropertiesL(String filePath) {
		Properties properties = new Properties();
		try {
			// 基于ClassLoder读取配置文件,该方式只能读取类路径下的配置文件，有局限但是如果配置文件在类路径下比较方便。
			properties.load(Thread.currentThread().getContextClassLoader().getResourceAsStream(filePath));
		} catch (FileNotFoundException e) {
			throw new RuntimeException("FTP.properties文件", e);
		} catch (IOException e) {
			throw new RuntimeException("FTP.properties文件出错", e);
		}
		return properties;
	}

	/**
	 * 根据文件名使用BufferedReader获取Properties
	 * 
	 * @param filePath
	 * @return
	 */
	public static Properties getPropertiesB(String filePath) {
		Properties properties = new Properties();

		try {
			// 使用InPutStream流读取properties文件
			// 该方式的优点在于可以读取任意路径下的配置文件
			BufferedReader bufferedReader = new BufferedReader(new FileReader(filePath));
			properties.load(bufferedReader);
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		// 获取key对应的value值
		// properties.getProperty("");
		return properties;
	}

	/**
	 * 根据文件名使用ResourceBundle获取Properties
	 * 
	 * @param filePath
	 * @return
	 */
	public static ResourceBundle getPropertiesR(String filePath) {
		// 通过 java.util.ResourceBundle 类来读取，这种方式比使用 Properties 要方便一些
		// config为属性文件名，放在包com.test.config下，如果是放在src下，直接用config即可
		ResourceBundle rb = ResourceBundle.getBundle(filePath);
		// String key = rb.getString("key");
		return rb;
	}

	/**
	 * 根据文件名使用spring中的工具类获取Properties
	 * 
	 * @param filePath
	 * @return
	 */
	public static Properties getPropertiesS(String filePath) {
		Properties prop = null;
		try {
			// 通过Spring中的PropertiesLoaderUtils工具类进行获取
			prop = PropertiesLoaderUtils.loadAllProperties(filePath);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return prop;
	}

	/**
	 * 使用InputStream缓冲输入流读取配置文件获取Properties
	 * 
	 * @param filePath
	 * @return
	 */
	public static Properties getPropertiesI(String filePath) {
		Properties prop = new Properties();
		try {
			// 通过输入缓冲流进行读取配置文件
			InputStream InputStream = new BufferedInputStream(new FileInputStream(new File(filePath)));
			// 加载输入流
			prop.load(InputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return prop;
	}

	/**
	 * 基于ClassLoder读取配置文件获取Properties
	 * 
	 * @param filePath
	 * @return
	 */
	public static Properties getPropertiesC(String filePath) {
		Properties prop = new Properties();
		try {
			InputStream inputStream = PropertiesUtil.class.getResourceAsStream(filePath);
			prop.load(inputStream);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return prop;
	}

	/**
	 * 
	 * @Title: printAllProperty @Description: 输出所有配置信息 @param props @return
	 *         void @throws
	 */
	private static void printAllProperty(Properties props) {

		Enumeration<?> en = props.propertyNames();
		while (en.hasMoreElements()) {
			String key = (String) en.nextElement();
			String value = props.getProperty(key);
			System.out.println(key + " : " + value);
		}
	}

	/**
	 * 根据key读取value
	 * 
	 * @Title: getProperties_1 @Description: 第一种方式：根据文件名使用spring中的工具类进行解析
	 *         filePath是相对路劲，文件需在classpath目录下
	 *         比如：config.properties在包com.test.config下，
	 *         路径就是com/test/config/config.properties
	 * 
	 * @param filePath
	 * @param keyWord
	 * @return @return String @throws
	 */
	public static String getProperties_1(String filePath, String keyWord) {
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
	 * @Title: getProperties_1 @Description: 第一种方式：根据文件名使用Spring中的工具类进行解析
	 *         filePath是相对路劲，文件需在classpath目录下
	 *         比如：config.properties在包com.test.config下，
	 *         路径就是com/test/config/config.properties
	 * 
	 * @param filePath
	 * @return void @throws
	 */
	public static void getProperties_1(String filePath) {
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
	 * @Title: getProperties_2 @Description: 第二种方式：使用缓冲输入流读取配置文件，然后将其加载，再按需操作
	 *         绝对路径或相对路径， 如果是相对路径，则从当前项目下的目录开始计算，
	 *         如：当前项目路径/config/config.properties, 相对路径就是config/config.properties
	 * 
	 * @param filePath
	 * @param keyWord
	 * @return @return String @throws
	 */
	public static String getProperties_2(String filePath, String keyWord) {
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
	 * @Title: getProperties_2 @Description: 第二种方式：使用缓冲输入流读取配置文件，然后将其加载，再按需操作
	 *         绝对路径或相对路径， 如果是相对路径，则从当前项目下的目录开始计算，
	 *         如：当前项目路径/config/config.properties, 相对路径就是config/config.properties
	 * 
	 * @param filePath
	 * @return void @throws
	 */
	public static void getProperties_2(String filePath) {
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
	 * @Title: getProperties_3 @Description: 第三种方式： 相对路径，
	 *         properties文件需在classpath目录下，
	 *         比如：config.properties在包com.test.config下，
	 *         路径就是/com/test/config/config.properties @param filePath @param
	 *         keyWord @return @return String @throws
	 */
	public static String getProperties_3(String filePath, String keyWord) {
		Properties prop = new Properties();
		String value = null;
		try {
			InputStream inputStream = PropertiesUtil.class.getResourceAsStream(filePath);
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
	 * @Title: getProperties_3 @Description: 第三种方式： 相对路径，
	 *         properties文件需在classpath目录下，
	 *         比如：config.properties在包com.test.config下，
	 *         路径就是/com/test/config/config.properties @param
	 *         filePath @return @throws
	 */
	public static void getProperties_3(String filePath) {
		Properties prop = new Properties();
		try {
			InputStream inputStream = PropertiesUtil.class.getResourceAsStream(filePath);
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
		
		Properties propertiesI = getPropertiesI("com/test/config/config.properties");
		System.out.println(propertiesI.getProperty("key"));
		
		Properties propertiesS = getPropertiesS("com/test/config/config.properties");
		System.out.println(propertiesS.getProperty("key"));
		
		ResourceBundle propertiesR = getPropertiesR("com/test/config/config.properties");
		System.out.println(propertiesR.getString("key"));
		
		Properties propertiesB = getPropertiesB("com/test/config/config.properties");
		System.out.println(propertiesB.getProperty("key"));
		
		Properties propertiesC = getPropertiesC("com/test/config/config.properties");
		System.out.println(propertiesC.getProperty("key"));
		
		Properties propertiesL = getPropertiesL("com/test/config/config.properties");
		System.out.println(propertiesL.getProperty("key"));
		
		
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
