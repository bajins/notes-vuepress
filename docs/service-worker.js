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
    "revision": "77547be895c0fcb7100931943974f379"
  },
  {
    "url": "Android/index.html",
    "revision": "b64e2debea9628098a8d5d197f1ab348"
  },
  {
    "url": "architecture.png",
    "revision": "9a93cf6cea38878e19c5816d1af28b17"
  },
  {
    "url": "assets/css/0.styles.b8f8fe13.css",
    "revision": "087c6f61ef08ab9a81c1d36686368401"
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
    "url": "assets/js/1.589da995.js",
    "revision": "507cb7f7d03fb7d814e82303251f9a8c"
  },
  {
    "url": "assets/js/10.de156f86.js",
    "revision": "d2228083d03ee138637be79240540fee"
  },
  {
    "url": "assets/js/11.49dda682.js",
    "revision": "fd0482fe8a0e21f25d48d341faa26ba4"
  },
  {
    "url": "assets/js/12.30aa9166.js",
    "revision": "f77f9eca3325a8b978e251bab48df772"
  },
  {
    "url": "assets/js/13.8923ce30.js",
    "revision": "c07b750651963c983d59906c1f5a98c8"
  },
  {
    "url": "assets/js/14.098cd030.js",
    "revision": "fff03cf446806c0feaa4c1cccbb1b24d"
  },
  {
    "url": "assets/js/15.8ee02f86.js",
    "revision": "e32514b6ec722ecb618b41f8c09af669"
  },
  {
    "url": "assets/js/16.b5f42ccf.js",
    "revision": "030ee6a6fcce9ce5909073445ff5a713"
  },
  {
    "url": "assets/js/17.11fed8c1.js",
    "revision": "642f115564b7a47fec15a15009793ee0"
  },
  {
    "url": "assets/js/18.2c5286de.js",
    "revision": "0dedb48e328d1258f43091e3799c721d"
  },
  {
    "url": "assets/js/19.87df7060.js",
    "revision": "842faa66e83a7e05c4470bd12e85ad56"
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
    "url": "assets/js/22.f4e7a767.js",
    "revision": "2074fc9d218cea46280b0ffdc234ea39"
  },
  {
    "url": "assets/js/23.e6277f44.js",
    "revision": "daf6234cb64f702fe301d3766b803b79"
  },
  {
    "url": "assets/js/24.b9525f9b.js",
    "revision": "ae799515be55f96ee731b18a3036fe86"
  },
  {
    "url": "assets/js/25.c60739c3.js",
    "revision": "08060ac1d5cfd2e457f12461d208a710"
  },
  {
    "url": "assets/js/26.accc1085.js",
    "revision": "00e184e9e194790bc9a1a744c587bb2e"
  },
  {
    "url": "assets/js/27.5c64a451.js",
    "revision": "386662e6b0ba6ed803130e2d18d05721"
  },
  {
    "url": "assets/js/28.62086486.js",
    "revision": "8380de54b082441dd679180826c96275"
  },
  {
    "url": "assets/js/29.e2663ef5.js",
    "revision": "c4a95940ba90e858713ec943b8f37eeb"
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
    "url": "assets/js/42.5feab037.js",
    "revision": "e45026e2e63d69a3d55a6feca4d42fb4"
  },
  {
    "url": "assets/js/43.c6f7d15a.js",
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
    "url": "assets/js/50.f0e8be28.js",
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
    "url": "assets/js/55.e5769c2b.js",
    "revision": "2e0537cdc67604bdf02cb13062c7de6a"
  },
  {
    "url": "assets/js/56.251a646c.js",
    "revision": "17850aa1fe7de0b89ae1657129a43677"
  },
  {
    "url": "assets/js/57.82da3e5b.js",
    "revision": "41e7be2059e3d70b09d148cceada3e51"
  },
  {
    "url": "assets/js/58.21934cc6.js",
    "revision": "5f3227dc63d26fef3cd27c7f8227a615"
  },
  {
    "url": "assets/js/59.de91bd7f.js",
    "revision": "ced25d5586b4cee881ba57b3896b4b93"
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
    "url": "assets/js/61.4c7c8528.js",
    "revision": "4b290e4142d7894f615c1a4a09c181fb"
  },
  {
    "url": "assets/js/62.7bddb3f8.js",
    "revision": "0563c501d3ae5043fba4dcd61e530fac"
  },
  {
    "url": "assets/js/63.afd339cb.js",
    "revision": "6f5a4a2886687d51fb8778483d14b9fc"
  },
  {
    "url": "assets/js/64.0c258685.js",
    "revision": "7834ef81f9932b629f9128c6b739b751"
  },
  {
    "url": "assets/js/65.6125ede2.js",
    "revision": "7075cdd604f615a92b5111369d804f67"
  },
  {
    "url": "assets/js/66.5f0dd206.js",
    "revision": "9e685ed615119224b68d52ca28714976"
  },
  {
    "url": "assets/js/67.e1cd48d6.js",
    "revision": "722865f4762848f3cd31ba735bc7db85"
  },
  {
    "url": "assets/js/68.abec008b.js",
    "revision": "a601dcc46861acb30665cb47f4cc51d7"
  },
  {
    "url": "assets/js/69.6c4011a0.js",
    "revision": "528e25dbd909f0410a243eb1a693b546"
  },
  {
    "url": "assets/js/7.519f49df.js",
    "revision": "0586929ffb757d925e2b40f419c79a24"
  },
  {
    "url": "assets/js/70.e9b82433.js",
    "revision": "046dff43a93906702e8ddf25f7870c4b"
  },
  {
    "url": "assets/js/71.6a898226.js",
    "revision": "7cba44cd04d8e2d40082e6f6a6edff59"
  },
  {
    "url": "assets/js/72.28bacdd3.js",
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
    "url": "assets/js/79.fbd30562.js",
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
    "url": "assets/js/81.9905f5a1.js",
    "revision": "baaabef9268af97959509cd56cde65de"
  },
  {
    "url": "assets/js/82.f6097244.js",
    "revision": "a4906644e098b0e5303555a9dc196f38"
  },
  {
    "url": "assets/js/83.90ee1371.js",
    "revision": "c4e94421ed6c8ae34fbcea89ce092762"
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
    "url": "assets/js/app.631bcf42.js",
    "revision": "91c65d8456beb4f3e4942600c569d59b"
  },
  {
    "url": "assets/js/vendors~flowchart.795428e4.js",
    "revision": "cb4858a641b6198bf623098959f0f00a"
  },
  {
    "url": "category/index.html",
    "revision": "f55a3d8e405f91fd5f19b64743ccea8f"
  },
  {
    "url": "Git.html",
    "revision": "d0b5de30e1220bc40b7d4859fecd3d05"
  },
  {
    "url": "Golang/index.html",
    "revision": "f7ea318309424b014d2d91be6fb98372"
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
    "revision": "2907ffbe945cba612e7cb924da7d41c6"
  },
  {
    "url": "IDE/IDEAPlugins.html",
    "revision": "b0fb82aeaaa4e83ae613842cb8d2bfed"
  },
  {
    "url": "IDE/idea设置.html",
    "revision": "7ce4680725a2fd4503cfc1daa4cc9d75"
  },
  {
    "url": "IDE/idea错误解决.html",
    "revision": "b601e113e029909f793b45f04c24e76e"
  },
  {
    "url": "IDE/index.html",
    "revision": "5ea0a39b9ddbf8c13bfe4794aa4cf835"
  },
  {
    "url": "IDE/SublimeText插件.html",
    "revision": "c3fe1709fafeec472b5aac9422a0b44b"
  },
  {
    "url": "IDE/VisualStudioCodePlugins.html",
    "revision": "f0aae74070dae52e77ed89bbf01b2377"
  },
  {
    "url": "IDE/插件.html",
    "revision": "e76b0bc1d8acb44f71931f05edadb8e9"
  },
  {
    "url": "images/index.html",
    "revision": "41228a3448f8618a872f2873e5fe22d6"
  },
  {
    "url": "index.html",
    "revision": "eb7806803f97131cf09fe688b66162a4"
  },
  {
    "url": "IOS/index.html",
    "revision": "4b05389f56d6814835846b7c974c98c3"
  },
  {
    "url": "JAVA/AOP.html",
    "revision": "88f9ef16815cb139a5b2031b19c5614d"
  },
  {
    "url": "JAVA/API/360wallpaper.html",
    "revision": "3292020156ca20a74b58cb3cc987c987"
  },
  {
    "url": "JAVA/API/index.html",
    "revision": "c24760c944a2a87887237ebed8fe86be"
  },
  {
    "url": "JAVA/API/unsplash.html",
    "revision": "d32dc525f6b17874f6701a3dc6f5417f"
  },
  {
    "url": "JAVA/API/Wallpapers.html",
    "revision": "4b165229cc5c0d6a8218b0e8de4a2a2c"
  },
  {
    "url": "JAVA/CollectionAndMap.html",
    "revision": "1965ff6ea04462ae2c1c193406977315"
  },
  {
    "url": "JAVA/hibernate.html",
    "revision": "1bbc7750999a940d8a46540888e304ac"
  },
  {
    "url": "JAVA/index.html",
    "revision": "c00923ec965a4dbe5f233979cfc07686"
  },
  {
    "url": "JAVA/JavaFX.html",
    "revision": "eac8517dbded89ed9cac8bcec5409b01"
  },
  {
    "url": "JAVA/Java异常.html",
    "revision": "734dc7f2e815bc66cccf85e79236b8dd"
  },
  {
    "url": "JAVA/Java笔记.html",
    "revision": "e4f1df761be9ebd8bfbb118e3f595f85"
  },
  {
    "url": "JAVA/Java锁.html",
    "revision": "b747bee6fbebed5b9dffe47c12cb554f"
  },
  {
    "url": "JAVA/JVM.html",
    "revision": "380de7ce8f23f02b958e26dd5f75b260"
  },
  {
    "url": "JAVA/Quartz定时器.html",
    "revision": "83a07598f3a2f80fe73d764dcb990631"
  },
  {
    "url": "JAVA/Quartz定时器API.html",
    "revision": "5de51f7ec809a9fce43ac3d467312c48"
  },
  {
    "url": "JAVA/Tomcat优化.html",
    "revision": "3f165e558936172c191ac14256457a90"
  },
  {
    "url": "JAVA/windows环境变量.html",
    "revision": "c11394af570d8776aab8fe3f8930791f"
  },
  {
    "url": "JAVA/正则表达式.html",
    "revision": "f0849f22a9a5fb057d1bd4de17edbf98"
  },
  {
    "url": "JAVA/项目收集.html",
    "revision": "4fd69fcac32143e54183aab245b77ce1"
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
    "revision": "bd4c2f91e330d52daaaeef220552ddaa"
  },
  {
    "url": "MySQL/index.html",
    "revision": "4e2a56cf5a043a8b5f369f964ae1f3ac"
  },
  {
    "url": "MySQL/MySQL-binlog2sql恢复数据.html",
    "revision": "165c64c12ab3b59878505a97fab64ff5"
  },
  {
    "url": "MySQL/mysql-udf/mysql-udf安装.html",
    "revision": "3246a2563ac806760ce018952a4441c4"
  },
  {
    "url": "MySQL/MySQL主从同步.html",
    "revision": "d157fcea2f6dc03fd96d82cf2457f141"
  },
  {
    "url": "MySQL/MySQL事件.html",
    "revision": "ac79004841a13c3045f3e0a10f4600a2"
  },
  {
    "url": "MySQL/MySQL存储过程.html",
    "revision": "e265c031bdadf9016500a29986cbf60e"
  },
  {
    "url": "MySQL/MySQL异常捕获处理.html",
    "revision": "5128d936fc9388a9b8a364745957105d"
  },
  {
    "url": "MySQL/MySQL循环.html",
    "revision": "e93c730009c9449455d08fa92cbbe2e9"
  },
  {
    "url": "MySQL/MySQL数据库信息.html",
    "revision": "0bcd55d2401ab5d9cd5f0f382547c3c8"
  },
  {
    "url": "MySQL/MySQL时间函数.html",
    "revision": "4a20f71921eeaa8e127b9087172368a0"
  },
  {
    "url": "MySQL/MySQL用户管理.html",
    "revision": "ca748503226984e06b1bd695587994ac"
  },
  {
    "url": "MySQL/MySQL配置.html",
    "revision": "fdd6af80ad4d30f1f936363218e88e56"
  },
  {
    "url": "MySQL/优化语句.html",
    "revision": "183b3f959536e3ce2dc4ac2a09e9ce48"
  },
  {
    "url": "MySQL/常见问题解决.html",
    "revision": "9faa77545da60ee8955f1d8f28ff4614"
  },
  {
    "url": "other/bat脚本使用.html",
    "revision": "ae3b3404e03f207ae5d6d667396ae7e5"
  },
  {
    "url": "other/Frp.html",
    "revision": "8f2a8be741cb749fdadda78aece290ac"
  },
  {
    "url": "other/index.html",
    "revision": "3f1e4474c62e8ba08d1f98c9273cf2b1"
  },
  {
    "url": "other/other.html",
    "revision": "7e115f5eec79c10d2d3ed2fd709ce995"
  },
  {
    "url": "other/PC-software.html",
    "revision": "52edef930f5c287b986162f2a9fa2274"
  },
  {
    "url": "other/小说.html",
    "revision": "0101dbaac5905ce3f123725457d72a46"
  },
  {
    "url": "plugin.png",
    "revision": "3e325210d3e3752e32818385fc4afbc9"
  },
  {
    "url": "Python/index.html",
    "revision": "5a29893f3cc3c7634c7b916b5d11bf24"
  },
  {
    "url": "Python/install.html",
    "revision": "3e643013a41bb3f61e7f641b77bd5c7d"
  },
  {
    "url": "Python/Script/index.html",
    "revision": "7695f2b23b663ab082137a2e83885e51"
  },
  {
    "url": "README语法.html",
    "revision": "3e5c00ced9583bc827737b9c38f8d519"
  },
  {
    "url": "tag/index.html",
    "revision": "c98f3bbcdd28d8b7bf3c492f5ad71b03"
  },
  {
    "url": "VPS/Centos-idea激活与PHP.html",
    "revision": "3fccf06e4e99a626ab9a92e3dba7d7d4"
  },
  {
    "url": "VPS/centos7 配置多个Tomcat.html",
    "revision": "8fb0e2d7e88981ecaf73782ba7b11362"
  },
  {
    "url": "VPS/CentOS7.x内核升级.html",
    "revision": "6244eaa219855a024c6cc154e6850210"
  },
  {
    "url": "VPS/CentOS7安装mysql.html",
    "revision": "4713fca28e01229ef5bb8678cfa70d83"
  },
  {
    "url": "VPS/CentOS7安装配置svn服务.html",
    "revision": "94ccf4f1df100608fe91576e8b013e1b"
  },
  {
    "url": "VPS/CentOS新系统依赖安装.html",
    "revision": "3de3bc1e5e3fb4945515a58ebd12bfd6"
  },
  {
    "url": "VPS/Docker/index.html",
    "revision": "0674c7c1db3e7f4ac8fff2a88ec6ebcd"
  },
  {
    "url": "VPS/index.html",
    "revision": "c6228b94c0c9548af9954ec434d2c31c"
  },
  {
    "url": "VPS/linux命令.html",
    "revision": "1c05a36b4f9356525be592cf5c1e8e2d"
  },
  {
    "url": "VPS/NextCloudAndAria2.html",
    "revision": "f8bcda6419794ae5bce4db2a20f1d093"
  },
  {
    "url": "VPS/script/index.html",
    "revision": "08c8098310f30f32af80e2ac5fac0e8e"
  },
  {
    "url": "VPS/VPS-jre.html",
    "revision": "94f993a03c6ba142833024997bf07cfc"
  },
  {
    "url": "VPS/xshell.html",
    "revision": "2545e99e63b95fe0a80c31960241df26"
  },
  {
    "url": "VPS/宝塔面板.html",
    "revision": "dd7f8279af195ed0feac0c3f7edc3479"
  },
  {
    "url": "VPS/构建Docker镜像.html",
    "revision": "6b2caafe5bf2b6d918449a2204842a89"
  },
  {
    "url": "VPS/测试脚本.html",
    "revision": "a2868fdc6bb8f37f431a7d50f2bbc2a2"
  },
  {
    "url": "VPS/路由跟踪.html",
    "revision": "f1895f62a7241b677e9fc45d5b1ebe67"
  },
  {
    "url": "WEB/index.html",
    "revision": "fdea912dff13f401efd1cfe61aa81f36"
  },
  {
    "url": "WEB/WebSSH.html",
    "revision": "7af36b2b09a9f2b7b6419bc4b9eb164d"
  },
  {
    "url": "WEB/微信小程序常用框架.html",
    "revision": "66de7d9f4220832c9ed485b34db585a7"
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
