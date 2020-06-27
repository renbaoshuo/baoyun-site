/** 
 * 站点运行入口
 */ 

// 识别浏览器
var ua = navigator && navigator.userAgent;
var isUseOldBrowser = (function () {
    var m;

    if (!ua) {
        return true;                     // 没有 User-Agent
    }

    if (/MSIE |Trident\//.exec(ua)) {
        return true;                     // No IE
    } 
    m = /Edge\/([\d.]+)/.exec(ua);
    if (m && Number(m[1]) < 16) {
        return true;                     // Edge >= 16
    }
    m = /Chrome\/([\d.]+)/.exec(ua);
    if (m && Number(m[1]) < 40) {
        return true;                     // Chrome >= 40
    }
    m = /Firefox\/([\d.]+)/.exec(ua);
    if (m && Number(m[1]) < 38) {
        return true;                     // Firefox >= 38
    }

    // 正常情况
    return false;
})();

if(isUseOldBrowser) {
    // 显示提示
    document.getElementsByTagName('body')[0].innerHTML = '<h1>您可能在使用不受支持的<b style="color:#f00; font-size: 125%;">过时</b>浏览器，导致加载出现了问题。</h1>' +
    '<h3 style="text-align: left; font-size:15px">如果您使用国产浏览器，请在右上方选择 <b style="color:#f00; font-size: 125%;">“极速模式”</b> ，而非 “兼容模式” 。</h3>' +
    '<h3 style="text-align: left; font-size:15px">推荐使用基于 <code>Chromium</code> 的最新版本的 <a target="_blank" href="https://www.microsoft.com/zh-cn/windows/microsoft-edge" style="color:#f62;">Microsoft Edge 浏览器</a> 访问本站</h3>' +
    '<div style="text-align: left !important;"><span style="font-size: 65%">UA 调试区: </span><code style="padding: 2px 4px; font-size: 55%; color: #c7254e; background-color: #f9f2f4; border-radius: 4px; text-align:left">' + ua + '</code></div><br>';

} else {
    // 执行核心代码
    // $.getScript("assets/js/main.js");
    $.getScript("https://cdn.jsdelivr.net/gh/renbaoshuo/baoyun-site@master/assets/js/main.min.js");
}

