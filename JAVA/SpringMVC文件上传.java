import org.slf4j.Logger;

/**
 * @author claer claer@ichangg.com
 * @program PACKAGE_NAME
 * @description Test
 * @create 2018-05-22 15:50
 */
public class TestController {

    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(Test.class);

    /**
     * 单个文件上传，方式一，使用MultipartFile作为方法参数接收传入的文件
     * 用 transferTo方法来保存图片，保存到本地磁盘。
     *
     * @RequestParam("file")中的file对应input标签中的name属性值
     * @author chunlynn
     */
    @RequestMapping("upload")
    public String upload(@RequestParam("file") MultipartFile file, HttpServletRequest request, ModelMap model) {

        // 先判断文件是否为空 
        if (!file.isEmpty()) {
            // 获得原始文件名
            String fileName = file.getOriginalFilename();
            // 重命名文件
            String newfileName = new Date().getTime() + String.valueOf(fileName);
            //获得物理路径webapp所在路径
            /**
             * request.getSession().getServletContext().getRealPath("/")表示当前项目的根路径，如
             * D:\Workspaces\eclipse_luna\.metadata\.plugins\org.eclipse.wst.server.core\tmp3\wtpwebapps\sky\
             */
            String pathRoot = request.getSession().getServletContext().getRealPath("");
            // 项目下相对路径
            String path = FILE_PATH + newfileName;

            // 创建文件实例
            File tempFile = new File(pathRoot + path);
            // 判断父级目录是否存在，不存在则创建
            if (!tempFile.getParentFile().exists()) {
                tempFile.getParentFile().mkdir();
            }
            // 判断文件是否存在，否则创建文件（夹）
            if (!tempFile.exists()) {
                tempFile.mkdir();
            }

            try {
                // 将接收的文件保存到指定文件中
                file.transferTo(tempFile);
            } catch (IllegalStateException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            // 方法一：model属性也行
            model.addAttribute("fileUrl", path); //保存路径，用于jsp页面回显
            // 方法二：Request域属性也行，两个二选一即可。
            // request.setAttribute("fileUrl", path);
        }
        // getWiewPath方法里就处理了一些路径，相当于转发forward，返回 return "cms/notices/upload";
        return getViewPath("upload"); // 转发到upload.jsp页面
    }


    @RequestMapping("/toUpload")
    public String toUpload() {
        // 相当于转发forward，转发到cms/notices/upload.jsp页面,框架会找到该逻辑视图名对应的 View并渲染  
        return getViewPath("upload");
    }


    /**
     * 单文件上传，方式二，利用MultipartHttpServletRequest来解析request中的文件
     * 用 transferTo方法来保存图片，保存到本地磁盘。
     * 普通request是无法解析请求中的文件的。
     * MultipartHttpServletRequest是springmvc框架中的一个接口，默认实现类是DefaultMultipartHttpServletRequest
     *
     * @author chunlynn
     */
    @RequestMapping("upload2")
    public String upload2(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

        // 先实例化一个文件解析器
        CommonsMultipartResolver coMultipartResolver = new CommonsMultipartResolver(request.getSession()
                .getServletContext());

        // 判断request请求中是否有文件上传
        if (coMultipartResolver.isMultipart(request)) {
            // 转换request
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
            // 获得文件
            MultipartFile file = multiRequest.getFile("file");
            if (!file.isEmpty()) {

                // 获得原始文件名
                String fileName = file.getOriginalFilename();
                String newfileName = new Date().getTime() + String.valueOf(fileName);
                //获得物理路径webapp所在路径
                String pathRoot = request.getSession().getServletContext().getRealPath("");
                // 项目下相对路径
                String path = FILE_PATH + newfileName;
                // 创建文件实例
                File tempFile = new File(pathRoot + path); //文件保存路径为pathRoot + path
                if (!tempFile.getParentFile().exists()) {
                    tempFile.getParentFile().mkdir();
                }
                if (!tempFile.exists()) {
                    tempFile.mkdir();
                }
                try {
                    // Transfer the received file to the given destination file. 
                    file.transferTo(tempFile);
                } catch (IllegalStateException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }

                // 方法一：model属性也行
                model.addAttribute("fileUrl", path); //保存路径，用于jsp页面回显
                // 方法二：Request域属性也行，两个二选一即可。
                // request.setAttribute("fileUrl", path); //保存路径，用于jsp页面回显
            }
        }

        return getViewPath("upload");
    }

    /**
     * 单文件上传，利用MultipartHttpServletRequest来解析Request中的文件，用流的方式将文件存到数据库。
     * <p>
     * 使用流来存图片，保存进数据库。保存进数据库的多半是用户头像之类的小图片，占用空间比较小的。一次一张。
     * jsp页面的其他参数，可以通过request.getParameter()获取
     *
     * @author chunlynn
     */
    @RequestMapping("upload7")
    public String upload7(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

        // 先实例化一个文件解析器
        CommonsMultipartResolver coMultiResolver = new CommonsMultipartResolver(request.getSession()
                .getServletContext());
        // 判断request请求中是否有文件上传
        if (coMultiResolver.isMultipart(request)) {
            // 转换Request
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
            // 获得文件
            MultipartFile file = multiRequest.getFile("file");

            if (!file.isEmpty()) { //这个判断必须要加

                try {
                    // 举例，Notices就是一个普通的model类
                    Notices notices = new Notices();
                    notices.setCreateDate(new Date());
                    notices.setPicPath("/upload/aaa.jpg");
                    // jsp页面中的其他非文件类参数，直接request就可以获取到
                    notices.setTitle(request.getParameter("title"));
                    if (StringUtil.isNotEmpty(request.getParameter("isShowPic"))) {
                        notices.setIsShowPic(1);
                    } else {
                        notices.setIsShowPic(0);
                    }
                    notices.setIsShowTitle(1);
                    notices.setContent("这是内容content");

                    // 获得输入流
                    InputStream in = file.getInputStream();
                    byte[] data = new byte[]{};
                    data = inputStreamToByte(in);// 将文件保存到字节数组中
                    notices.setLogo(data); // 将字节数组保存到对象中

                    noticesService.save(notices);  // 保存进数据库
                    in.close();
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        return getViewPath("upload");
    }
     /**
     * 将文件保存到字节数组中
     * This class implements an output stream in which the data is written into a byte array.
     *
     * @author chunlynn
     */
    public byte[] inputStreamToByte(InputStream in) throws Exception {
        // This class implements an output stream in which the data is written into a byte array. 
        ByteArrayOutputStream bos = new ByteArrayOutputStream(); // 输出流对象，用来接收文件流，然后写入一个字节数组中
        int len;
        byte[] buffer = new byte[1024]; //缓存1KB
        while ((len = in.read(buffer)) != -1) {
            bos.write(buffer, 0, len);
        }
        byte[] data = bos.toByteArray(); // 字节数组，输出流中的文件保存到字节数组
        bos.close();
        return data;
    }
    
    
    

    /**
     * 多文件上传，方式一：利用MultipartFile[]作为方法的参数接收传入的文件
     * 用 transferTo方法来保存图片，保存到本地磁盘。
     *
     * @author chunlynn
     */
    @RequestMapping("upload3")
    public String upload3(@RequestParam("file") MultipartFile[] files, HttpServletRequest request,
                          HttpServletResponse response, ModelMap model) {

        List<String> fileUrlList = new ArrayList<String>(); //用来保存文件路径，用于jsp页面回显用
        String path = "";

        // 先判断文件files不为空
        if (files != null && files.length > 0) {
            for (MultipartFile file : files) { //循环遍历，取出单个文件，下面的操作和单个文件就一样了
                if (!file.isEmpty()) {//这个判断必须加上

                    // 获得原始文件名
                    String fileName = file.getOriginalFilename();
                    String newfileName = new Date().getTime() + String.valueOf(fileName);
                    //获得物理路径webapp所在路径
                    String pathRoot = request.getSession().getServletContext().getRealPath("");
                    // 项目下相对路径
                    path = FILE_PATH + newfileName;
                    // 创建文件实例
                    File tempFile = new File(pathRoot + path); //文件保存路径为pathRoot + path
                    if (!tempFile.getParentFile().exists()) { /这个判断必须加上
                        tempFile.getParentFile().mkdir();
                    }
                    if (!tempFile.exists()) {
                        tempFile.mkdir();
                    }
                    try {
                        // Transfer the received file to the given destination file. 
                        file.transferTo(tempFile);
                    } catch (IllegalStateException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                    fileUrlList.add(path);
                }
            }

            // 方法一：model属性保存图片路径也行
            model.addAttribute("fileUrlList", fileUrlList); //保存路径，用于jsp页面回显
            // 方法二：request域属性保存图片路径也行，两个二选一即可。
            // request.setAttribute("fileUrlList", fileUrlList); //保存路径，用于jsp页面回显

        }

        return getViewPath("upload");
    }


    /**
     * 多文件上传，方式二：利用MultipartHttpServletRequest来解析Request中的文件
     * <p>
     * 用 transferTo方法来保存图片，保存到本地磁盘。
     *
     * @author chunlynn
     */
    @RequestMapping("upload4")
    public String upload4(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

        // 先实例化一个文件解析器
        CommonsMultipartResolver coMultiResolver = new CommonsMultipartResolver(request.getSession()
                .getServletContext());

        // 判断request请求中是否有文件上传
        if (coMultiResolver.isMultipart(request)) {

            List<String> fileUrlList = new ArrayList<String>(); //用来保存文件路径，用来jsp页面遍历回显

            // 转换Request
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
            // 获得文件，方式一
            List<MultipartFile> files = multiRequest.getFiles("file");
            for (MultipartFile file : files) { //循环遍历，取出单个文件，下面的操作和单个文件就一样了
                if (!file.isEmpty()) { //这个判断必须要加

                    // 获得原始文件名
                    String fileName = file.getOriginalFilename();
                    String newfileName = new Date().getTime() + String.valueOf(fileName);
                    //获得物理路径webapp所在路径
                    String pathRoot = request.getSession().getServletContext().getRealPath("");
                    // 项目下相对路径
                    String path = FILE_PATH + newfileName;
                    // 创建文件实例
                    File tempFile = new File(pathRoot + path); //文件保存路径为pathRoot + path
                    if (!tempFile.getParentFile().exists()) {
                        tempFile.getParentFile().mkdir();
                    }

                    if (!tempFile.exists()) {
                        tempFile.mkdir();
                    }

                    try {
                        file.transferTo(tempFile);
                    } catch (IllegalStateException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                    fileUrlList.add(path);
                }
            }

            // 方法一：model属性保存图片路径也行
            model.addAttribute("fileUrlList", fileUrlList); //保存路径，用于jsp页面回显
            // 方法二：request域属性保存图片路径也行，两个二选一即可。
            // request.setAttribute("fileUrlList", fileUrlList); //保存路径，用于jsp页面回显

        }

        return getViewPath("upload");
    }


    /**
     * 多文件上传，方式三：利用MultipartHttpServletRequest来解析Request中的文件，用流的方式将文件存到磁盘
     * <p>
     * 使用流来存图片，保存到本地磁盘。
     *
     * @author chunlynn
     */
    @RequestMapping("upload5")
    public String upload5(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

        // 先实例化一个文件解析器
        CommonsMultipartResolver coMultiResolver = new CommonsMultipartResolver(request.getSession()
                .getServletContext());

        // 判断request请求中是否有文件上传
        if (coMultiResolver.isMultipart(request)) {

            List<String> fileUrlList = new ArrayList<String>(); //用来保存文件路径
            // 转换Request
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
            // 获得文件，方式一，input标签name属性值相同都为"file"
            List<MultipartFile> files = multiRequest.getFiles("file");
            for (MultipartFile file : files) { //循环遍历，取出单个文件，下面的操作和单个文件就一样了
                if (!file.isEmpty()) { //这个判断必须要加

                    // 获得原始文件名
                    String fileName = file.getOriginalFilename();
                    String newfileName = new Date().getTime() + String.valueOf(fileName);
                    //获得物理路径webapp所在路径
                    String pathRoot = request.getSession().getServletContext().getRealPath("");
                    // 项目下相对路径
                    String path = FILE_PATH + newfileName;

                    try {
                        //创建输出流，用流将文件保存到指定目录
                        FileOutputStream fos = new FileOutputStream(pathRoot + path);
                        // 获得输入流
                        InputStream in = file.getInputStream();
                        int len = 0;
                        byte[] buffer = new byte[1024]; //创建缓冲区 1kB，byte表示一个字节B，1KB=1024B
                        // Reads some number of bytes from the inputstream and stores them into the buffer array b. 
                        while ((len = in.read(buffer)) != -1) { // 如果不用缓存，会一个字节一个字节的写，这样影响效率，效率低下
                            fos.write(buffer, 0, len); //每次1KB的方式写入
                        }
                        fos.flush();
                        fos.close();
                        in.close();
                    } catch (FileNotFoundException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                    fileUrlList.add(path);
                }
            }

            // 方法一：model属性保存图片路径也行
            model.addAttribute("fileUrlList", fileUrlList); //保存路径，用于jsp页面回显
            // 方法二：request域属性保存图片路径也行，两个二选一即可。
            // request.setAttribute("fileUrlList", fileUrlList); //保存路径，用于jsp页面回显

        }

        return getViewPath("upload");
    }


    /**
     * 多文件上传，方式三：利用MultipartHttpServletRequest来解析Request中的文件，用流的方式将文件存到磁盘
     * <p>
     * 使用流来存图片，保存到本地磁盘。
     * jsp页面的input标签可以有不同的name属性值
     *
     * @author chunlynn
     */
    @RequestMapping("upload6")
    public String upload6(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

        // 先实例化一个文件解析器
        CommonsMultipartResolver coMultiResolver = new CommonsMultipartResolver(request.getSession()
                .getServletContext());

        // 判断request请求中是否有文件上传
        if (coMultiResolver.isMultipart(request)) {

            List<String> fileUrlList = new ArrayList<String>(); //用来保存文件路径
            // 转换Request
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;

            // 获得文件，方式二
            // Return an java.util.Iterator of String objects containing the parameter names of the multipart files 
            // contained in this request.
            // jsp页面的input标签可以有不同的name属性值
            Iterator<String> fileNames = multiRequest.getFileNames();

            while (fileNames.hasNext()) { //循环遍历
                MultipartFile file = multiRequest.getFile(fileNames.next()); //取出单个文件
                if (!file.isEmpty()) { //这个判断必须要加，下面的操作和单个文件就一样了
                    // 获得原始文件名
                    String fileName = file.getOriginalFilename();
                    String newfileName = new Date().getTime() + String.valueOf(fileName);
                    //获得物理路径webapp所在路径
                    String pathRoot = request.getSession().getServletContext().getRealPath("");
                    // 项目下相对路径
                    String path = FILE_PATH + newfileName;

                    try {
                        //创建输出流，用流将文件保存到指定目录
                        FileOutputStream fos = new FileOutputStream(pathRoot + path);
                        // 获得输入流
                        InputStream in = file.getInputStream();
                        int len = 0;
                        byte[] buffer = new byte[1024]; //创建缓冲区 1kB，byte表示一个字节B，1KB=1024B
                        // Reads some number of bytes from the inputstream and stores them into the buffer array b. 
                        while ((len = in.read(buffer)) != -1) { // 如果不用缓存，会一个字节一个字节的写，这样影响效率，效率低下
                            fos.write(buffer, 0, len); //每次1KB的方式写入
                        }
                        fos.flush();
                        fos.close();
                        in.close();

                    } catch (FileNotFoundException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                    fileUrlList.add(path);
                }
            }

            // 方法一：model属性保存图片路径也行
            model.addAttribute("fileUrlList", fileUrlList); //保存路径，用于jsp页面回显
            // 方法二：request域属性保存图片路径也行，两个二选一即可。
            // request.setAttribute("fileUrlList", fileUrlList); //保存路径，用于jsp页面回显

        }

        return getViewPath("upload");
    }

    public static final String FILE_PATH = "/upload/chunlynn/"; //相对路径


    


   


    /**
     * 该方法放在父类controller中
     *
     * @author chunlynn
     */
    protected String viewPath = "cms/notices"; //在本controller进行初始化

    protected String getViewPath(String viewName) {
        if (viewPath == null)
            return viewName;
        if (viewPath.endsWith(File.separator))
            return viewPath + viewName;
        return viewPath + File.separator + viewName;
    }

}
