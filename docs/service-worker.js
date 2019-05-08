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
    "revision": "352ad531ace52ef17c87b98bae705cb9"
  },
  {
    "url": "Android/index.html",
    "revision": "fc3c9103868a96d9474c7002ce4b0a6c"
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
    "url": "assets/js/1.3abf8fba.js",
    "revision": "34f1afcd5f67918b074a06db9acc1991"
  },
  {
    "url": "assets/js/10.b8cc765b.js",
    "revision": "c6708cb9f69fa15bfd07ea87a51705af"
  },
  {
    "url": "assets/js/11.aabca80d.js",
    "revision": "bb6a23e1b73d4b7d643ac2d1ffb140cb"
  },
  {
    "url": "assets/js/12.c0d633f7.js",
    "revision": "35a9441be8177b29a4f49b4d6dc6f2ab"
  },
  {
    "url": "assets/js/13.d38f4ba0.js",
    "revision": "70e608e18ee0012115eeb13a42425c91"
  },
  {
    "url": "assets/js/14.aef4e557.js",
    "revision": "6f50a658f89fef4ba6c0556c9fcd6d63"
  },
  {
    "url": "assets/js/15.a6ea943c.js",
    "revision": "b44be1deee3774603bd6c251643ffa04"
  },
  {
    "url": "assets/js/16.b5f42ccf.js",
    "revision": "030ee6a6fcce9ce5909073445ff5a713"
  },
  {
    "url": "assets/js/17.57d82844.js",
    "revision": "cbe89376055cb579ff265060b8a1c989"
  },
  {
    "url": "assets/js/18.91120777.js",
    "revision": "a90464cdcb188558f9d73846022780bd"
  },
  {
    "url": "assets/js/19.fb32eb55.js",
    "revision": "aa8a9f0e6bf9d7bd08057b8442587898"
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
    "url": "assets/js/22.e6879a72.js",
    "revision": "947c8af7dc5112013abdfb04eda691a3"
  },
  {
    "url": "assets/js/23.85111fc3.js",
    "revision": "1dcbe4b68b1c39e1c9025a8095cf1c97"
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
    "url": "assets/js/26.ad5573ed.js",
    "revision": "f89497d8c88d7a8d42760c9515e9aeda"
  },
  {
    "url": "assets/js/27.7d26bdd5.js",
    "revision": "872f09133781460d0b7bf18673eb7f58"
  },
  {
    "url": "assets/js/28.3b942955.js",
    "revision": "2d5317a623a97f4a79d82a4c86e3a96b"
  },
  {
    "url": "assets/js/29.b3214dc5.js",
    "revision": "0736474cf1109d0e59605571e7322ef7"
  },
  {
    "url": "assets/js/30.28862566.js",
    "revision": "71590bc335fa147d545247ab1a63f318"
  },
  {
    "url": "assets/js/31.ce37341b.js",
    "revision": "5ab7f97e3e69c7b1552018e38925d87c"
  },
  {
    "url": "assets/js/32.408bef20.js",
    "revision": "7acfe9ed163bf4bb5f8f3a4b477f40c2"
  },
  {
    "url": "assets/js/33.4f1e703e.js",
    "revision": "11c16b0635910cc426360fe3c22a5bac"
  },
  {
    "url": "assets/js/34.cd7d8068.js",
    "revision": "c0d41faaa19678bca700dc6551033c0e"
  },
  {
    "url": "assets/js/35.c2c5f8b3.js",
    "revision": "f1538a2c36385d46f0ffc1e5a326fbcc"
  },
  {
    "url": "assets/js/36.17ec486c.js",
    "revision": "d89bed679df838079f7bd92311574be2"
  },
  {
    "url": "assets/js/37.4e1f3d08.js",
    "revision": "d0d293c9a3886b0bbd613cb93a9ee62c"
  },
  {
    "url": "assets/js/38.337b181b.js",
    "revision": "db9280f23b44d175fd88155b105b0272"
  },
  {
    "url": "assets/js/39.857d2123.js",
    "revision": "99cc7267ea29b4d253c09c7df552b365"
  },
  {
    "url": "assets/js/4.30278f26.js",
    "revision": "b9cfe81c9af9b1a14da72abd444311c2"
  },
  {
    "url": "assets/js/40.0e823925.js",
    "revision": "2d35cc5838295f83715067f279b1e4da"
  },
  {
    "url": "assets/js/41.7a5e3b00.js",
    "revision": "a69bebfd90aa6d6c95fb574a2b9ed1b0"
  },
  {
    "url": "assets/js/42.633c30ea.js",
    "revision": "1caea7deb7c7e4f0750f99de159dee43"
  },
  {
    "url": "assets/js/43.850619f5.js",
    "revision": "3c9b07a3e5c4c02de515130d8dadddfa"
  },
  {
    "url": "assets/js/44.8ca9306c.js",
    "revision": "5d642426784a6b32f3af896c967637da"
  },
  {
    "url": "assets/js/45.9f3d46c3.js",
    "revision": "0a2a96cb45556bda9614510417d9dfad"
  },
  {
    "url": "assets/js/46.7d1b217d.js",
    "revision": "88b91bd3467464b6dbd082ae4da39d50"
  },
  {
    "url": "assets/js/47.6eacd4e8.js",
    "revision": "a88bf2e7be935c6e12bffbe18ee00c16"
  },
  {
    "url": "assets/js/48.927b61ff.js",
    "revision": "f2bad41fa955d042a559cdb1821f3725"
  },
  {
    "url": "assets/js/49.44f82d95.js",
    "revision": "109b0d21bf17aff5fa302931bcf7f4a7"
  },
  {
    "url": "assets/js/5.512308f1.js",
    "revision": "85b74fb9da2172a9f75843c5af8daf66"
  },
  {
    "url": "assets/js/50.3008812c.js",
    "revision": "d08176df44b47206a093698f00c926f3"
  },
  {
    "url": "assets/js/51.890dbd5e.js",
    "revision": "1a889961f90ee1c00a459e03185efac9"
  },
  {
    "url": "assets/js/52.79f01054.js",
    "revision": "a22fb958db0d6aa86e86f8075ac95586"
  },
  {
    "url": "assets/js/53.bc6c4443.js",
    "revision": "5e55eb926882bec1c89abfc45c7c1204"
  },
  {
    "url": "assets/js/54.56b44c47.js",
    "revision": "279706e5b0347a7c4a767bd60eb1c18f"
  },
  {
    "url": "assets/js/55.040806e7.js",
    "revision": "50ef8693043041235296d433f4d179af"
  },
  {
    "url": "assets/js/56.c758b565.js",
    "revision": "07c1ee3b8b68a31564db602038fbcc37"
  },
  {
    "url": "assets/js/57.c5d6e3c3.js",
    "revision": "8623db47247c1f9b079d51c555aeb1be"
  },
  {
    "url": "assets/js/58.e6225428.js",
    "revision": "a1eaee2c7f139376e83eecda7b50e2fc"
  },
  {
    "url": "assets/js/59.a3dffc1e.js",
    "revision": "e02a5e857280556069eb0ae2330438ef"
  },
  {
    "url": "assets/js/6.9594aa8e.js",
    "revision": "3754e7b22acd4f50df7a0e15290792d8"
  },
  {
    "url": "assets/js/60.ba64a800.js",
    "revision": "ea4930562639de4ca22ccf6d67477fcd"
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
    "url": "assets/js/63.5aeea942.js",
    "revision": "deb5c5e823538f62e9a6c246c81c24b1"
  },
  {
    "url": "assets/js/64.ef1d1024.js",
    "revision": "c3acc744daed2a954237208423333cf2"
  },
  {
    "url": "assets/js/65.c8851b17.js",
    "revision": "6a1fab2c0e6f7ff9339d3b49c1356e23"
  },
  {
    "url": "assets/js/66.ba48a904.js",
    "revision": "20aaa4234b7ee89c51449d7ffd492728"
  },
  {
    "url": "assets/js/67.aca3fa8c.js",
    "revision": "5681d540b68903349d7c2d8749244943"
  },
  {
    "url": "assets/js/68.abec008b.js",
    "revision": "a601dcc46861acb30665cb47f4cc51d7"
  },
  {
    "url": "assets/js/69.4f1580e6.js",
    "revision": "61062bcf1763e34b35407ef45a0eb65d"
  },
  {
    "url": "assets/js/7.79c19694.js",
    "revision": "e8c825f16746e8bb217a68aaae78a215"
  },
  {
    "url": "assets/js/70.8e48eb2b.js",
    "revision": "97ff545f2d676328d079a5b0443d2eef"
  },
  {
    "url": "assets/js/71.8447747e.js",
    "revision": "bbb3157372b3f36ad8b7a0c80898fd1a"
  },
  {
    "url": "assets/js/72.73214218.js",
    "revision": "a1098d1df6a9158a3dec20a3627c89ae"
  },
  {
    "url": "assets/js/73.e88e7f50.js",
    "revision": "1d6e8c72a93ab6b0d64b38bfe23aa424"
  },
  {
    "url": "assets/js/74.10064c6e.js",
    "revision": "6dbdd3baf08dec188f03f02b9ffe3007"
  },
  {
    "url": "assets/js/75.b0cf65d8.js",
    "revision": "3a6b60e1a799bb2db78bdba37a184256"
  },
  {
    "url": "assets/js/76.44e048d0.js",
    "revision": "2679b241d4270c90af8d88e82cf5566c"
  },
  {
    "url": "assets/js/77.635ff72c.js",
    "revision": "59c6b76d77ec88eeda0e5136e91de2d8"
  },
  {
    "url": "assets/js/78.82db5d2b.js",
    "revision": "67fec15adb70d342ff4e04a2bc810aed"
  },
  {
    "url": "assets/js/79.09969f5f.js",
    "revision": "e8cdb04cebc1718d274cf798b78f02dc"
  },
  {
    "url": "assets/js/8.24854105.js",
    "revision": "ae470182aecfb3679bed30b7a5024363"
  },
  {
    "url": "assets/js/80.21866e28.js",
    "revision": "f111e20bd4232857aa7a19538da8ac84"
  },
  {
    "url": "assets/js/81.617e18ec.js",
    "revision": "3c917ee940ddbf3e809fa83cf4b0a973"
  },
  {
    "url": "assets/js/82.3e0c63a9.js",
    "revision": "20c641ddf1d5eee8b5666873e27adfb6"
  },
  {
    "url": "assets/js/83.897a44c5.js",
    "revision": "077f232522d9d7eceda877d77fdd520f"
  },
  {
    "url": "assets/js/84.66eb6505.js",
    "revision": "6aa55b9fa9e39a5e0f3ed2c35f358351"
  },
  {
    "url": "assets/js/85.4dce4dc1.js",
    "revision": "882037934128befd8cea5f2ec3e7f074"
  },
  {
    "url": "assets/js/86.862e37aa.js",
    "revision": "2b2e0f4aa83ecf19dcb3fb4813f545ea"
  },
  {
    "url": "assets/js/87.b939491d.js",
    "revision": "24ed167ef254d2c3895c16159e6bee0c"
  },
  {
    "url": "assets/js/88.3577c1f2.js",
    "revision": "e9ac377f15a8aa8ecd2fd27d9f010a15"
  },
  {
    "url": "assets/js/9.ebbdca13.js",
    "revision": "12a830e664d191db2d5c76f09a005848"
  },
  {
    "url": "assets/js/app.0f421437.js",
    "revision": "e1f26c33c55d72b8f10c035a0d1c4ca5"
  },
  {
    "url": "assets/js/vendors~flowchart.f6a389b4.js",
    "revision": "9407ddfa9d6dc862eb5b1afeb7797a94"
  },
  {
    "url": "category/index.html",
    "revision": "eb1d717ec7d80ba8fda69c1b371bb461"
  },
  {
    "url": "Git.html",
    "revision": "1a82b34417241a5814cbcad515a890ff"
  },
  {
    "url": "Golang/index.html",
    "revision": "d5df49c8fbed9d0f2b39a952f793bcca"
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
    "revision": "fd1b370bd4d61ef836bf0fb16dbbcf2d"
  },
  {
    "url": "IDE/IDEAPlugins.html",
    "revision": "963c9689615d8510ae22ad333731bad7"
  },
  {
    "url": "IDE/idea设置.html",
    "revision": "4dc9ba7f4827e3cd92c3cb69fd1e23f1"
  },
  {
    "url": "IDE/idea错误解决.html",
    "revision": "5a5811d73d32e10e5f90cce142855708"
  },
  {
    "url": "IDE/index.html",
    "revision": "1979d8c33b61d97790923bc9078e09cb"
  },
  {
    "url": "IDE/SublimeText插件.html",
    "revision": "576b867fc23723efc9404d7d4fa52afa"
  },
  {
    "url": "IDE/VisualStudioCodePlugins.html",
    "revision": "7d74aa173da76211a0dfc7829d4a1ccd"
  },
  {
    "url": "IDE/插件.html",
    "revision": "a28279559180fcd9f41efd363dc789d1"
  },
  {
    "url": "images/index.html",
    "revision": "054e72eaba5984d261a3db47e94a4050"
  },
  {
    "url": "index.html",
    "revision": "774a443b7482d651744ebb06d15a3ee9"
  },
  {
    "url": "IOS/index.html",
    "revision": "af13ae51f69b011914b091be69e65eab"
  },
  {
    "url": "JAVA/AOP.html",
    "revision": "eb5f0a730de455a6a2ef2247e2e6a8e5"
  },
  {
    "url": "JAVA/API/360wallpaper.html",
    "revision": "06b23070d4cb6830b3fcd583452c2ff5"
  },
  {
    "url": "JAVA/API/index.html",
    "revision": "4a7fdbdc8ace3a3a0734270771eeef59"
  },
  {
    "url": "JAVA/API/unsplash.html",
    "revision": "640eac6e760a29e5491e90868ef74035"
  },
  {
    "url": "JAVA/API/Wallpapers.html",
    "revision": "2257dbea87c47cd7dea242fbe5b27188"
  },
  {
    "url": "JAVA/CollectionAndMap.html",
    "revision": "4ddac4930ae537a53e3cd5f489404246"
  },
  {
    "url": "JAVA/hibernate.html",
    "revision": "ef38c233dd29e7fd05fb259a3aeda348"
  },
  {
    "url": "JAVA/index.html",
    "revision": "2ef7a9ea728357ea86006fed176bbb07"
  },
  {
    "url": "JAVA/JavaFX.html",
    "revision": "5cdcfaedb23484cdfc94d14fed572af8"
  },
  {
    "url": "JAVA/Java异常.html",
    "revision": "bdcdb15b8d72f086453f8463684261ee"
  },
  {
    "url": "JAVA/Java笔记.html",
    "revision": "23ae96c0e6917d33069a3235db76d02c"
  },
  {
    "url": "JAVA/Java锁.html",
    "revision": "edc771c5828003bfbcf6c6db8c6cb3e3"
  },
  {
    "url": "JAVA/JVM.html",
    "revision": "b0d312471af5524b443819aafa82c894"
  },
  {
    "url": "JAVA/Quartz定时器.html",
    "revision": "aa918c674163a3fc9a3fa2424f5d1f33"
  },
  {
    "url": "JAVA/Quartz定时器API.html",
    "revision": "cfaab87b9ad6e0ae777fbee17d4c0641"
  },
  {
    "url": "JAVA/Tomcat优化.html",
    "revision": "45e950e890be00ddfc74946069abd5ea"
  },
  {
    "url": "JAVA/windows环境变量.html",
    "revision": "63cf581231becfbea6797deda73bf34d"
  },
  {
    "url": "JAVA/正则表达式.html",
    "revision": "4ed201aa1e78a7230034d5a2f7d2fd4b"
  },
  {
    "url": "JAVA/项目收集.html",
    "revision": "41ac94802b86ca7ab45d88e6a510eeae"
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
    "revision": "79d5dd2d0bd3855c8e8ca202a7fe3d93"
  },
  {
    "url": "MySQL/index.html",
    "revision": "b0a6c5e36ddfa3fb85a4798be15c3771"
  },
  {
    "url": "MySQL/MySQL-binlog2sql恢复数据.html",
    "revision": "01dabbbabfe8a1ba00454876482d9cb6"
  },
  {
    "url": "MySQL/mysql-udf/mysql-udf安装.html",
    "revision": "e077574b9374f4b92bba662dbc5f2f47"
  },
  {
    "url": "MySQL/MySQL主从同步.html",
    "revision": "fc1b60ec9bcf2af216ebdd27a8870301"
  },
  {
    "url": "MySQL/MySQL事件.html",
    "revision": "d96b6abdc7594a9c4e37f867d8ef5ac6"
  },
  {
    "url": "MySQL/MySQL存储过程.html",
    "revision": "0c6b3c8201f06256b3f5165594e60fdd"
  },
  {
    "url": "MySQL/MySQL异常捕获处理.html",
    "revision": "10c1ef8e115101f8cf621a4f7ea57feb"
  },
  {
    "url": "MySQL/MySQL循环.html",
    "revision": "6ec39a64df070ec15b4f5ac2d1791cc9"
  },
  {
    "url": "MySQL/MySQL数据库信息.html",
    "revision": "fc642e495ecf58b83853768f75755116"
  },
  {
    "url": "MySQL/MySQL时间函数.html",
    "revision": "17b8ad4c1e738085f413e0c0843dc426"
  },
  {
    "url": "MySQL/MySQL用户管理.html",
    "revision": "a32a074f97efc54bda0df6f4f1fca905"
  },
  {
    "url": "MySQL/MySQL配置.html",
    "revision": "cf80f80dcad74e566e3618cba6af3013"
  },
  {
    "url": "MySQL/优化语句.html",
    "revision": "7a5c811e15e5fb47e26ce983006aab55"
  },
  {
    "url": "MySQL/常见问题解决.html",
    "revision": "e4528bf8588c65017b34e3af7e5aaaf4"
  },
  {
    "url": "other/bat脚本使用.html",
    "revision": "3a1c19196aa30081306c03550da9c3a3"
  },
  {
    "url": "other/Frp.html",
    "revision": "49dc807901f39a0b9d92641aa2b05186"
  },
  {
    "url": "other/index.html",
    "revision": "7a35c4f60d7e3e4e0aa07de38b6dfec5"
  },
  {
    "url": "other/other.html",
    "revision": "3f2664e0f2079c448c0074fefb1dac20"
  },
  {
    "url": "other/PC-software.html",
    "revision": "434c8b8e89fb08475e9d831010adf59a"
  },
  {
    "url": "other/小说.html",
    "revision": "a0c41c01daeeab91b78bf849838729aa"
  },
  {
    "url": "plugin.png",
    "revision": "3e325210d3e3752e32818385fc4afbc9"
  },
  {
    "url": "Python/index.html",
    "revision": "90358e4994e2b21d71739b38ed4a39e3"
  },
  {
    "url": "Python/install.html",
    "revision": "80f15554dc5c8dd4194f57b80b00af62"
  },
  {
    "url": "Python/Script/index.html",
    "revision": "ac7373438663809784aeefbfe3cd89b2"
  },
  {
    "url": "README语法.html",
    "revision": "82653f8426543b9fcef997e3fd8a4257"
  },
  {
    "url": "tag/index.html",
    "revision": "700bb53e100c1a8128580cf04878afe3"
  },
  {
    "url": "VPS/Centos-idea激活与PHP.html",
    "revision": "d36919232f0019515098116e4cb8f415"
  },
  {
    "url": "VPS/centos7 配置多个Tomcat.html",
    "revision": "99cc67db86a12f3f032f96c33ad3f236"
  },
  {
    "url": "VPS/CentOS7.x内核升级.html",
    "revision": "347683e183fdd285459997aada811dc6"
  },
  {
    "url": "VPS/CentOS7安装mysql.html",
    "revision": "93e093298afc9065c7b6cb56e09956af"
  },
  {
    "url": "VPS/CentOS7安装配置svn服务.html",
    "revision": "04ade50dd96762426325fcefd0f0d98e"
  },
  {
    "url": "VPS/CentOS新系统依赖安装.html",
    "revision": "c6a6960f494f0e642d6f494570bf2675"
  },
  {
    "url": "VPS/Docker/index.html",
    "revision": "10564158a10af3c066c2492d156a75cc"
  },
  {
    "url": "VPS/index.html",
    "revision": "5337ced87fcebeb8664c07a83099357e"
  },
  {
    "url": "VPS/linux命令.html",
    "revision": "f5e3ba08b88c8afcca5dfa2b1017b2e8"
  },
  {
    "url": "VPS/NextCloudAndAria2.html",
    "revision": "4669678a5d41025884e763270220005e"
  },
  {
    "url": "VPS/script/index.html",
    "revision": "8b8841dc759af38d6ecbe146ddbb3d4b"
  },
  {
    "url": "VPS/VPS-jre.html",
    "revision": "b282430265926389c700ed9b7fd0e3ec"
  },
  {
    "url": "VPS/xshell.html",
    "revision": "dc5025547808aecbf43ee60c9a43b909"
  },
  {
    "url": "VPS/宝塔面板.html",
    "revision": "5a5331503ca2dc9681a5b429f7fcbf88"
  },
  {
    "url": "VPS/构建Docker镜像.html",
    "revision": "249c3f073c31fc3e03108bd44fc6c028"
  },
  {
    "url": "VPS/测试脚本.html",
    "revision": "3b1fd69ebef78a0c086bf528c6fd6256"
  },
  {
    "url": "VPS/路由跟踪.html",
    "revision": "0e07109d094ea4ee4da4e0658784a90d"
  },
  {
    "url": "WEB/index.html",
    "revision": "1f59b0778feff90eca39c05e37c084cb"
  },
  {
    "url": "WEB/WebSSH.html",
    "revision": "96cecabb3fddb063aca048ac841997f2"
  },
  {
    "url": "WEB/微信小程序常用框架.html",
    "revision": "2bacc0307a30eab42ef10f622bbe5399"
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
