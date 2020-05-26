/**
 * Baoyun's Small Site
 * -------------------------------
 * Author: RenBaoshuo
 * Date: 2020/05/21
 * Link: https://www.baoshuo.ren/
 * Github: renbaoshuo/baoyun-site
 * -------------------------------
 * Copyright 2020 RenBaoshuo All Rights Reserved.
 */

(function () {
    // 判断 User-Agent 以识别浏览器类型
    var ua = navigator && navigator.userAgent;
    var orzed = (function () {
        var m;
        if (!ua) return true;
        if (/MSIE |Trident\//.exec(ua)) return true;  // No IE
        m = /Edge\/([\d.]+)/.exec(ua);                // Edge >= 16
        if (m && Number(m[1]) < 16) return true;
        m = /Chrome\/([\d.]+)/.exec(ua);              // Chrome >= 40
        if (m && Number(m[1]) < 40) return true;
        m = /Firefox\/([\d.]+)/.exec(ua);             // Firefox >= 38
        if (m && Number(m[1]) < 38) return true;

        return false;
    })();

    //定义输出文本，使用HTML格式
    var infoHTML =
        '<h1>您可能在使用不受支持的<b style="color:#f00; font-size: 125%;">过时</b>浏览器，导致加载出现了问题。</h1>' +
        '<h3 style="text-align: left; font-size:15px">如果您使用国产浏览器，请在右上方选择 <b style="color:#f00; font-size: 125%;">“极速模式”</b> ，而非 “兼容模式” 。</h3>' +
        '<h3 style="text-align: left; font-size:15px">推荐使用基于 Chromium 的最新版本的 <a target="_blank" href="https://www.microsoft.com/zh-cn/windows/microsoft-edge" style="color:#f62;">Microsoft Edge 浏览器</a> 访问本站</h3>' +
        '<div style="text-align: left !important;"><span style="font-size: 65%">UA 调试区: </span><code style="padding: 2px 4px; font-size: 55%; color: #c7254e; background-color: #f9f2f4; border-radius: 4px; text-align:left">' + ua + '</code></div><br>';

    var elem = document.getElementById('main');
    window.browser_orzed = orzed;
    if (orzed) {
        elem.innerHTML = infoHTML;
    }
})();
