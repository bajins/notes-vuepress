(function() {
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    } else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);

    // 修改来源属性
    var referrer = document.querySelector("meta[name=referrer]");
    if (referrer) {
        console.log(referrer.getAttribute("content"));
        referrer.setAttribute('content', 'never');
        console.log(document.querySelector("meta[name=referrer]").getAttribute("content"));
    } else {
        referrer = document.createElement('meta');
        referrer.name = "referrer";
        referrer.content = "never";
        document.getElementsByTagName('head')[0].appendChild(referrer);
    }
})();