(function() {
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