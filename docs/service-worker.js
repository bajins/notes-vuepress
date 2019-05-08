/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "f74cf8d3b26f7969d98e8d264f8f9663"
  },
  {
    "url": "Android/index.html",
    "revision": "823c1765d14bf0bd02012c86656e3a9e"
  },
  {
    "url": "architecture.png",
    "revision": "9a93cf6cea38878e19c5816d1af28b17"
  },
  {
    "url": "assets/css/0.styles.c215b91c.css",
    "revision": "84e68c59ef6c1d4dbfdd77f574faa9cb"
  },
  {
    "url": "assets/img/iconfont.c72e426b.svg",
    "revision": "c72e426b70ea73c3ee394bce277544e2"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.1931c572.js",
    "revision": "5215eac0ecf122cc332d9d77ffd79179"
  },
  {
    "url": "assets/js/10.0c21490a.js",
    "revision": "d009fe73dfa7ebcf01df780718ae3c5a"
  },
  {
    "url": "assets/js/11.7122ecad.js",
    "revision": "69de8f8b810cc5335220160cf4bf390d"
  },
  {
    "url": "assets/js/12.30aa9166.js",
    "revision": "f77f9eca3325a8b978e251bab48df772"
  },
  {
    "url": "assets/js/13.4bb828d3.js",
    "revision": "a0287c59c2c1423af0aec09e6b51347e"
  },
  {
    "url": "assets/js/14.aef4e557.js",
    "revision": "6f50a658f89fef4ba6c0556c9fcd6d63"
  },
  {
    "url": "assets/js/15.da7c41fe.js",
    "revision": "7bb4a1f901f447b3e8258a3c901cd9f6"
  },
  {
    "url": "assets/js/16.3c36dd5a.js",
    "revision": "e9abf5dde384517a8d7739966b04e015"
  },
  {
    "url": "assets/js/17.1fa0c56e.js",
    "revision": "f8aa0cc075ebe2767e0fcd80154bc89b"
  },
  {
    "url": "assets/js/18.eaae20d0.js",
    "revision": "f7d87d0e4d6f456b3ab5a5bfce7d0109"
  },
  {
    "url": "assets/js/19.fb0ed5ca.js",
    "revision": "a7a1cfb9f4a81fbbf0c5dcd4fd647a03"
  },
  {
    "url": "assets/js/20.cf2c43cd.js",
    "revision": "09846236f39fbf6306be7cb8cd06259e"
  },
  {
    "url": "assets/js/21.f0f9e7f0.js",
    "revision": "e646fe25cd69e490d66c6873fec33b79"
  },
  {
    "url": "assets/js/22.ca67bdbe.js",
    "revision": "4cde705a31d12e1a8c4572267576e4f2"
  },
  {
    "url": "assets/js/23.e6277f44.js",
    "revision": "daf6234cb64f702fe301d3766b803b79"
  },
  {
    "url": "assets/js/24.fff11f17.js",
    "revision": "841fcb921d3749200f4177b7d170575b"
  },
  {
    "url": "assets/js/25.4d770d5c.js",
    "revision": "e075284e14efd5ccc51bb4924bb920bc"
  },
  {
    "url": "assets/js/26.accc1085.js",
    "revision": "00e184e9e194790bc9a1a744c587bb2e"
  },
  {
    "url": "assets/js/27.5e531138.js",
    "revision": "ad17ad3f271a16963fa3d1bd8ee3a5ef"
  },
  {
    "url": "assets/js/28.62086486.js",
    "revision": "8380de54b082441dd679180826c96275"
  },
  {
    "url": "assets/js/29.b3214dc5.js",
    "revision": "0736474cf1109d0e59605571e7322ef7"
  },
  {
    "url": "assets/js/30.5911b455.js",
    "revision": "6f1d63100c8d44e8f4752754f172af34"
  },
  {
    "url": "assets/js/31.900c3f0d.js",
    "revision": "c1a8360eb70059483ccd5aae36d09a9d"
  },
  {
    "url": "assets/js/32.20cb307b.js",
    "revision": "0a97d4f67f3a18bcb07f5f37c5986d22"
  },
  {
    "url": "assets/js/33.b0ebbea3.js",
    "revision": "601c5d221c6a146636b3f7b27825cfac"
  },
  {
    "url": "assets/js/34.c55449a2.js",
    "revision": "1363f1fa174cce753ca885d60264a7b1"
  },
  {
    "url": "assets/js/35.a5dafffc.js",
    "revision": "37d028d8be1c677d6b24248bb25ecd7d"
  },
  {
    "url": "assets/js/36.1897eb64.js",
    "revision": "2129451170b5a31ed42d8b96bb6b2c9b"
  },
  {
    "url": "assets/js/37.3ea451d0.js",
    "revision": "b85a1a8edb980743603051ee5a765864"
  },
  {
    "url": "assets/js/38.7c2843ee.js",
    "revision": "5b0e72ec648a83b12ad7d23f2c0cbb04"
  },
  {
    "url": "assets/js/39.c670a351.js",
    "revision": "c0ffccae2019a2727cd7eda58e8eda81"
  },
  {
    "url": "assets/js/4.d7264ae1.js",
    "revision": "1784143a470420b7cb94934518b9dd23"
  },
  {
    "url": "assets/js/40.09c4b604.js",
    "revision": "9a94967d4208058cdcae081675119b11"
  },
  {
    "url": "assets/js/41.a9c13732.js",
    "revision": "dceef66af59e9b4c6356448c5043d1f4"
  },
  {
    "url": "assets/js/42.d5e36ac8.js",
    "revision": "d4185d93743abcdc7efb28d66c040937"
  },
  {
    "url": "assets/js/43.398f8c02.js",
    "revision": "edeb28d308025bf19d290f48b1ceb498"
  },
  {
    "url": "assets/js/44.ad6e00b7.js",
    "revision": "7fae83e0ccff8070e252a68ecb2247bf"
  },
  {
    "url": "assets/js/45.0221d948.js",
    "revision": "fe4c7ee6a9870cd901e6e847737767ce"
  },
  {
    "url": "assets/js/46.058c45db.js",
    "revision": "6424002ab837e43c4f136b7cb89cf5e1"
  },
  {
    "url": "assets/js/47.f76a95eb.js",
    "revision": "b392fe5bd014f9bd28b4e04af82d1b46"
  },
  {
    "url": "assets/js/48.4de0d8e9.js",
    "revision": "0407cbd03b0ffc7a3f53ba1afee4116c"
  },
  {
    "url": "assets/js/49.31bcab69.js",
    "revision": "79d651ceed90a746d5b29f878cb077db"
  },
  {
    "url": "assets/js/5.5b715fb7.js",
    "revision": "0b49f5f38ffc2b8a5f70615ba74044cd"
  },
  {
    "url": "assets/js/50.5a830897.js",
    "revision": "d21cb712e07fa7dd21289fae09a1c237"
  },
  {
    "url": "assets/js/51.95177141.js",
    "revision": "e0140cae3b6e61ca6466dee6330607ea"
  },
  {
    "url": "assets/js/52.f7e10477.js",
    "revision": "3eb3800a721164a7bbae9907b18f4e5e"
  },
  {
    "url": "assets/js/53.d2315297.js",
    "revision": "1e647d910e85cfbbf140bf8702784b14"
  },
  {
    "url": "assets/js/54.1a4c08c5.js",
    "revision": "52b9a735e3007a212269cb2da81a6135"
  },
  {
    "url": "assets/js/55.83f5fc69.js",
    "revision": "2e0537cdc67604bdf02cb13062c7de6a"
  },
  {
    "url": "assets/js/56.8a2feff5.js",
    "revision": "17850aa1fe7de0b89ae1657129a43677"
  },
  {
    "url": "assets/js/57.82da3e5b.js",
    "revision": "41e7be2059e3d70b09d148cceada3e51"
  },
  {
    "url": "assets/js/58.ceec8893.js",
    "revision": "a1eaee2c7f139376e83eecda7b50e2fc"
  },
  {
    "url": "assets/js/59.a3dffc1e.js",
    "revision": "e02a5e857280556069eb0ae2330438ef"
  },
  {
    "url": "assets/js/6.3cd05f11.js",
    "revision": "60841034ee38f9eb043a437fa2278690"
  },
  {
    "url": "assets/js/60.aea9e0f2.js",
    "revision": "425698472723bd898cb0d8a5ca00478c"
  },
  {
    "url": "assets/js/61.d8fb8c4a.js",
    "revision": "4b290e4142d7894f615c1a4a09c181fb"
  },
  {
    "url": "assets/js/62.86565564.js",
    "revision": "0563c501d3ae5043fba4dcd61e530fac"
  },
  {
    "url": "assets/js/63.afd339cb.js",
    "revision": "6f5a4a2886687d51fb8778483d14b9fc"
  },
  {
    "url": "assets/js/64.c12e6c0d.js",
    "revision": "c2047a41b521d52788e81e66e7015f05"
  },
  {
    "url": "assets/js/65.cafef6e1.js",
    "revision": "f09754ff879f16b100374b8a58f3f374"
  },
  {
    "url": "assets/js/66.4aa831ae.js",
    "revision": "9e685ed615119224b68d52ca28714976"
  },
  {
    "url": "assets/js/67.e1cd48d6.js",
    "revision": "722865f4762848f3cd31ba735bc7db85"
  },
  {
    "url": "assets/js/68.53b40f24.js",
    "revision": "630cc0fed8864c8e0e9a8dac05c85c51"
  },
  {
    "url": "assets/js/69.e0365ef5.js",
    "revision": "cf5daa8fe841d80a89b04ce0ca7ace35"
  },
  {
    "url": "assets/js/7.519f49df.js",
    "revision": "0586929ffb757d925e2b40f419c79a24"
  },
  {
    "url": "assets/js/70.bd24715d.js",
    "revision": "efdedd8219a2576ee80b2711e75dceb5"
  },
  {
    "url": "assets/js/71.6a898226.js",
    "revision": "7cba44cd04d8e2d40082e6f6a6edff59"
  },
  {
    "url": "assets/js/72.740f0696.js",
    "revision": "abfb84dc63a53ab853ed0d049a9a9d6e"
  },
  {
    "url": "assets/js/73.a72ea349.js",
    "revision": "a74ef77d1e32597f3c5d8f2928ae4fd8"
  },
  {
    "url": "assets/js/74.189d5c3f.js",
    "revision": "8c209595e44ce19ec4496404b1c03265"
  },
  {
    "url": "assets/js/75.1ce0057e.js",
    "revision": "6b9900c721f2699416c4ac620681cfe2"
  },
  {
    "url": "assets/js/76.ea2bbb6e.js",
    "revision": "2767363077989e201df7d9de9f74dffc"
  },
  {
    "url": "assets/js/77.0a91cde5.js",
    "revision": "8610199436dd330f263c800cd9772a77"
  },
  {
    "url": "assets/js/78.eee26d02.js",
    "revision": "90ba24bb3c4ea538bc960d1780a1cb35"
  },
  {
    "url": "assets/js/79.74bbd8f6.js",
    "revision": "9917bf4e1567e37688a6c7672f073909"
  },
  {
    "url": "assets/js/8.31680628.js",
    "revision": "affb5629c4eb8b86faf8accff4640390"
  },
  {
    "url": "assets/js/80.44f10954.js",
    "revision": "3f24f98772503e1ee58e16f9f7a2db3f"
  },
  {
    "url": "assets/js/81.79eb8d2a.js",
    "revision": "4025e6f50d07b6dbedc1ea4d232eb65d"
  },
  {
    "url": "assets/js/82.0a3c5b3a.js",
    "revision": "ac214c86a2a140c7bf2b29c7bc72ca06"
  },
  {
    "url": "assets/js/83.c596ec92.js",
    "revision": "663fb446a338593aa81064bca3e9f290"
  },
  {
    "url": "assets/js/84.265a1780.js",
    "revision": "1fdb4407bf7539d285aa771a8f6555fc"
  },
  {
    "url": "assets/js/85.8dcbf1c4.js",
    "revision": "36c80f3b43325b081886d05fc27373c1"
  },
  {
    "url": "assets/js/86.f6dcaab5.js",
    "revision": "590f77f5a1fc804d77b52fa769376712"
  },
  {
    "url": "assets/js/87.9043d010.js",
    "revision": "9be713870ca36e647da26cece80b7c2d"
  },
  {
    "url": "assets/js/88.845d8728.js",
    "revision": "ac5dc3aeee6e146eb593767d9d86bf3d"
  },
  {
    "url": "assets/js/9.35466352.js",
    "revision": "2ee1b3faabb40e8273a780cdf4e7a55a"
  },
  {
    "url": "assets/js/app.b447ca00.js",
    "revision": "adf370689f44c1420f5bb1682005fb72"
  },
  {
    "url": "assets/js/vendors~flowchart.795428e4.js",
    "revision": "cb4858a641b6198bf623098959f0f00a"
  },
  {
    "url": "category/index.html",
    "revision": "7dd05a01a1825ccfa6415434d9256952"
  },
  {
    "url": "Git.html",
    "revision": "36f5bf4008b08ffd56b1866fb1f43717"
  },
  {
    "url": "Golang/index.html",
    "revision": "f6f72f330390d052f74884f4a9f377f7"
  },
  {
    "url": "hero.png",
    "revision": "e6550a3a90b31abc53930555e63eea60"
  },
  {
    "url": "icons/android-chrome-192x192.png",
    "revision": "23a1dfecc87f08ead519cf0a2e8fd862"
  },
  {
    "url": "icons/android-chrome-512x512.png",
    "revision": "c9c85509b2a2786e57180934445eab03"
  },
  {
    "url": "icons/apple-touch-icon-120x120.png",
    "revision": "f9fdb6da3bc8d8997d0313eb62820ed8"
  },
  {
    "url": "icons/apple-touch-icon-152x152.png",
    "revision": "040e6d6c824c04842be4a34d8bf48d35"
  },
  {
    "url": "icons/apple-touch-icon-180x180.png",
    "revision": "62f0430e084c863e96da78b3a54934ba"
  },
  {
    "url": "icons/apple-touch-icon-60x60.png",
    "revision": "cbc25cfe12f83ac3435f346c4089403f"
  },
  {
    "url": "icons/apple-touch-icon-76x76.png",
    "revision": "a816dd596bd2fb619603d97557f6c3aa"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "62f0430e084c863e96da78b3a54934ba"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "4457d00ecd6cc87b40a6e36db98c8709"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "e61668f0b3b2c62f958fb4d93bc37a59"
  },
  {
    "url": "icons/msapplication-icon-144x144.png",
    "revision": "f9c165602717085d7a70eabc08051d47"
  },
  {
    "url": "icons/mstile-150x150.png",
    "revision": "42b7839db5eaa6469313cdd04c41361c"
  },
  {
    "url": "icons/safari-pinned-tab.svg",
    "revision": "f78c0251d6ddd56ee219a1830ded71b4"
  },
  {
    "url": "IDE/eclipse设置.html",
    "revision": "4889a46d29d47570cd2bf674055db4f7"
  },
  {
    "url": "IDE/IDEAPlugins.html",
    "revision": "ebd60111b68495dc80bd71e6097af6fb"
  },
  {
    "url": "IDE/idea设置.html",
    "revision": "ce715ecff59fecb25a637300432e32db"
  },
  {
    "url": "IDE/idea错误解决.html",
    "revision": "5ca8503071cfbeb4ab8a6d462f959052"
  },
  {
    "url": "IDE/index.html",
    "revision": "aa2619fe3b14ae76ac565364417d36a2"
  },
  {
    "url": "IDE/SublimeText插件.html",
    "revision": "308becbe12c83b94c75d74e936d5a844"
  },
  {
    "url": "IDE/VisualStudioCodePlugins.html",
    "revision": "bc4150a7e64f8e9a391d4f7b9dae7dd3"
  },
  {
    "url": "IDE/插件.html",
    "revision": "e80e64eac22f99e0b557eb6a005a16ae"
  },
  {
    "url": "images/index.html",
    "revision": "077411a4c291e117e11bc22f987e3a0c"
  },
  {
    "url": "index.html",
    "revision": "318f04a7de398bcc4ec5bcf904c643cb"
  },
  {
    "url": "IOS/index.html",
    "revision": "84d3b940abe0ab874864765d17c775a4"
  },
  {
    "url": "JAVA/AOP.html",
    "revision": "d138c786041a34dc372dafed6458980d"
  },
  {
    "url": "JAVA/API/360wallpaper.html",
    "revision": "7e40ebd574532df185985661685ee105"
  },
  {
    "url": "JAVA/API/index.html",
    "revision": "2890d3201367d8408fe52b52780491c7"
  },
  {
    "url": "JAVA/API/unsplash.html",
    "revision": "39bd4bab96c5642849451c6750fb40c8"
  },
  {
    "url": "JAVA/API/Wallpapers.html",
    "revision": "8414339d686bd6a6df14f57660c7b19c"
  },
  {
    "url": "JAVA/CollectionAndMap.html",
    "revision": "e512bb1eeb2fd0994a6af36a6a479557"
  },
  {
    "url": "JAVA/hibernate.html",
    "revision": "89bba8782ba49fff2e5cf3ba86399d8a"
  },
  {
    "url": "JAVA/index.html",
    "revision": "9988869b2517483651bf76342dd0fcf1"
  },
  {
    "url": "JAVA/JavaFX.html",
    "revision": "15d6144c4bb5196a6f758fe8d86132bd"
  },
  {
    "url": "JAVA/Java异常.html",
    "revision": "6353bff5fcfc5cc3b2e719a9761b1ac9"
  },
  {
    "url": "JAVA/Java笔记.html",
    "revision": "ca8dfa13e19352fc275c01d77ce79356"
  },
  {
    "url": "JAVA/Java锁.html",
    "revision": "1530ae0fe6eabc4b6d6af29cb4487dd1"
  },
  {
    "url": "JAVA/JVM.html",
    "revision": "564ea18a60f5557f95c7c28c16fa02ec"
  },
  {
    "url": "JAVA/Quartz定时器.html",
    "revision": "321edf17291520d99e487c62d1b0a3ff"
  },
  {
    "url": "JAVA/Quartz定时器API.html",
    "revision": "785d93e7b0cd8c729b1db13b3eb323ab"
  },
  {
    "url": "JAVA/Tomcat优化.html",
    "revision": "7bee935fa8adac1b5e90bdfcd3640536"
  },
  {
    "url": "JAVA/windows环境变量.html",
    "revision": "0f19f1d6abae6c677fc3c81387710159"
  },
  {
    "url": "JAVA/正则表达式.html",
    "revision": "c59a4a3b1bbcde587c5ed1f8152ffb24"
  },
  {
    "url": "JAVA/项目收集.html",
    "revision": "5ba0e2ba2958cb65a292cc158800c83f"
  },
  {
    "url": "line-numbers-desktop.png",
    "revision": "7c8ccab7c4953ac2fb9e4bc93ecd25ac"
  },
  {
    "url": "line-numbers-mobile.gif",
    "revision": "580b860f45436c9a15a9f3bd036edd97"
  },
  {
    "url": "logo.png",
    "revision": "5e2142dd2a9beba0de0b72f4d8b4cf76"
  },
  {
    "url": "Markdown编辑器.html",
    "revision": "f58bb45e45037cf95a89c8cbfa43391e"
  },
  {
    "url": "MySQL/index.html",
    "revision": "84f46a81eb51e5aa561d1866ad4d3f8d"
  },
  {
    "url": "MySQL/MySQL-binlog2sql恢复数据.html",
    "revision": "75c2c17da92602f7fce4b5eb37a589ab"
  },
  {
    "url": "MySQL/mysql-udf/mysql-udf安装.html",
    "revision": "a2e3fe78366af2e1b338061a01d4c295"
  },
  {
    "url": "MySQL/MySQL主从同步.html",
    "revision": "93b2f30067ec9e3505e941d4ead37af6"
  },
  {
    "url": "MySQL/MySQL事件.html",
    "revision": "dd5b6fd46cb66a5b0a77a982d6529b4f"
  },
  {
    "url": "MySQL/MySQL存储过程.html",
    "revision": "d7751f81eb01fb943e20d387421d8a6c"
  },
  {
    "url": "MySQL/MySQL异常捕获处理.html",
    "revision": "71220804137db2f244b68136cc469424"
  },
  {
    "url": "MySQL/MySQL循环.html",
    "revision": "d19b59bdcb26fd21d680a02431910625"
  },
  {
    "url": "MySQL/MySQL数据库信息.html",
    "revision": "ef5cc85196ee769ec962ba94799630fb"
  },
  {
    "url": "MySQL/MySQL时间函数.html",
    "revision": "1ac52b6a91b36ff73e2e446d4f43f173"
  },
  {
    "url": "MySQL/MySQL用户管理.html",
    "revision": "01b87c89ae67f65e795e8a1e3396d714"
  },
  {
    "url": "MySQL/MySQL配置.html",
    "revision": "ed228abb90543600a2f5155ab5e98bad"
  },
  {
    "url": "MySQL/优化语句.html",
    "revision": "853d733b827e2c8730ddea5b96f28964"
  },
  {
    "url": "MySQL/常见问题解决.html",
    "revision": "bd2148cf1a21cfe81afc9932d790168b"
  },
  {
    "url": "other/bat脚本使用.html",
    "revision": "992d9f94329156f7bf67b9619234f35d"
  },
  {
    "url": "other/Frp.html",
    "revision": "23ecb99f2014313418de190b96c6cd1c"
  },
  {
    "url": "other/index.html",
    "revision": "2d77381d01dbb4cb44934302acb74171"
  },
  {
    "url": "other/other.html",
    "revision": "c11e9b7942bdd7a362c687579072a83d"
  },
  {
    "url": "other/PC-software.html",
    "revision": "b694e0fd2bf87758b2e4f0f7f0211286"
  },
  {
    "url": "other/小说.html",
    "revision": "13f9c7d905a2b6bd5ce958d2d58be37a"
  },
  {
    "url": "plugin.png",
    "revision": "3e325210d3e3752e32818385fc4afbc9"
  },
  {
    "url": "Python/index.html",
    "revision": "7b99efac528b47310a5ff3ac19d505c2"
  },
  {
    "url": "Python/install.html",
    "revision": "e0651a28445554507a80f7107dce3408"
  },
  {
    "url": "Python/Script/index.html",
    "revision": "0a9315e2d774296ca679cb35d7a78963"
  },
  {
    "url": "README语法.html",
    "revision": "cc06ff5dad2fb169a32c607fe5ecf603"
  },
  {
    "url": "tag/index.html",
    "revision": "1ac6c0c6c27c10a8365aba1be7441e47"
  },
  {
    "url": "VPS/Centos-idea激活与PHP.html",
    "revision": "2dad668917b0090443c07bc158eb4424"
  },
  {
    "url": "VPS/centos7 配置多个Tomcat.html",
    "revision": "12b78841669787e3c84f8d09446203eb"
  },
  {
    "url": "VPS/CentOS7.x内核升级.html",
    "revision": "e68b5b7528653c5db84c1382dba3b806"
  },
  {
    "url": "VPS/CentOS7安装mysql.html",
    "revision": "ef4e3673d1fb47224356e13d84ace3ea"
  },
  {
    "url": "VPS/CentOS7安装配置svn服务.html",
    "revision": "95be3ef6ba8783884a38983a5d57e9fe"
  },
  {
    "url": "VPS/CentOS新系统依赖安装.html",
    "revision": "05d742b74b5c1b0bdb3520c5ac3e5b8b"
  },
  {
    "url": "VPS/Docker/index.html",
    "revision": "14c6a197bc9990cb02c1498ce5b8dc8b"
  },
  {
    "url": "VPS/index.html",
    "revision": "a1c11a3c134922f0e08ff53526fa3ff2"
  },
  {
    "url": "VPS/linux命令.html",
    "revision": "b646c91cd45ef8e32e3ff0d0762e3dd8"
  },
  {
    "url": "VPS/NextCloudAndAria2.html",
    "revision": "2d7964d569c9167d159b75082fe245e7"
  },
  {
    "url": "VPS/script/index.html",
    "revision": "4cc97f60013201dc5b02f8459b70dd30"
  },
  {
    "url": "VPS/VPS-jre.html",
    "revision": "f610894b0309b47dd5426ee765800e54"
  },
  {
    "url": "VPS/xshell.html",
    "revision": "95455d790faf890d37af693cf00f3819"
  },
  {
    "url": "VPS/宝塔面板.html",
    "revision": "18005d65fd1234e0dc8f9649bc05b7ad"
  },
  {
    "url": "VPS/构建Docker镜像.html",
    "revision": "d7733573d99e875d9b3a80b907e9eaf0"
  },
  {
    "url": "VPS/测试脚本.html",
    "revision": "ff4f62e453a3019cbd13419565c3c32a"
  },
  {
    "url": "VPS/路由跟踪.html",
    "revision": "fca549d96b735447e25267a2ef093464"
  },
  {
    "url": "WEB/index.html",
    "revision": "e0150990422966b81be713923d69830c"
  },
  {
    "url": "WEB/WebSSH.html",
    "revision": "5a0905092087d815873d83b6094e20f9"
  },
  {
    "url": "WEB/微信小程序常用框架.html",
    "revision": "1c7d9d724c61994b61e642f5fecc91c0"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
