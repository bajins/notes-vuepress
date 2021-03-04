(function () {
    // 修改来源属性
    var referrer = document.querySelector("meta[name=referrer]");
    if (referrer) {
        referrer.setAttribute('content', 'never');
    } else {
        referrer = document.createElement('meta');
        referrer.name = "referrer";
        referrer.content = "never";
        document.getElementsByTagName('head')[0].appendChild(referrer);
    }
    // let html = document.getElementsByTagName("html");
    // html.setAttribute("lang", "zh-CN");
    
    let secScript = document.createElement("script");
    secScript.setAttribute("data-cf-beacon", '{"token": "41188662635a42d1a77d66ff498ac43d", "spa": true}');
    secScript.setAttribute("src", "https://static.cloudflareinsights.com/beacon.min.js");
    let d = document.getElementsByTagName('script')[0];
    d.parentNode.insertBefore(secScript, d);
})();