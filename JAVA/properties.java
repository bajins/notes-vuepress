private static Properties properties;

	static {
		properties = new Properties();
		try {
			// 基于ClassLoder读取配置文件,该方式只能读取类路径下的配置文件，有局限但是如果配置文件在类路径下比较方便。
			properties.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("FTP.properties"));
		} catch (FileNotFoundException e) {
			throw new RuntimeException("FTP.properties文件", e);
		} catch (IOException e) {
			throw new RuntimeException("FTP.properties文件出错", e);
		}

	}
	/*Properties properties = new Properties();
	static {

		try {
			// 使用InPutStream流读取properties文件
			// 该方式的优点在于可以读取任意路径下的配置文件
			BufferedReader bufferedReader = new BufferedReader(new FileReader("E:/config.properties"));
			properties.load(bufferedReader);
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		// 获取key对应的value值
		properties.getProperty("");
	}*/

	// 通过 java.util.ResourceBundle 类来读取，这种方式比使用 Properties 要方便一些
	// config为属性文件名，放在包com.test.config下，如果是放在src下，直接用config即可
  /*ResourceBundle resource =ResourceBundle.getBundle("com/test/config/config"); 
  String key =resource.getString("key");*/
