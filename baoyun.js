/**
 * Baoyun's Small Site
 * Author: RenBaoshuo
 * Date: 2020/05/21
 * Link: https://www.baoshuo.ren/
 * Github: renbaoshuo/baoyun-site
 */

// 函数定义
var baoyuntime = function() {
    var ndate  = new Date();
    var ntzone = ndate.getTimezoneOffset() / 60;
    var nyear  = ndate.getFullYear();
    var nmonth = ndate.getMonth();
    var nday   = ndate.getDay();
    var nhour  = ndate.getHours();
    var byear  = 0;
    var bmonth = 0;
    if(ntzone != -8) {
        // 调整时区
        // TO DO
        // 2020/05/21 - 直接隐藏
        document.getElementById('baoyun-time').style.display = 'none';
    } else {
        // 北京时间无需调整
        // 计算岁
        if((nyear > 2020) && (nmonth == 1)) {
            byear = nday > 25 ? nyear - 2020 : nyear - 2021;
        } else {
            byear = nyear - 2020;
        }
        // 判断输出
        if(byear > 0) {
            document.getElementById('baoyun-year').innerHTML = byear;
        } else {
            document.getElementById('baoyun-year-pre').style.display = 'none';
            document.getElementById('baoyun-year').style.display     = 'none';
            document.getElementById('baoyun-year-des').style.display = 'none';
        }
        // 计算月份
        if(ndate <= 25) {
            bmonth = nmonth - 1;
        } else {
            bmonth = nmonth;
        }
        // 判断输出
        if(bmonth != 0) {
            document.getElementById('baoyun-month').innerHTML = bmonth;
        } else {
            document.getElementById('baoyun-month-pre').style.display = 'none';
            document.getElementById('baoyun-month').style.dispaly     = 'none';
            document.getElementById('baoyun-month-des').style.display = 'none';
        }
    }
}

// 程序入口
baoyuntime();                 // 首次处理
setInterval(baoyuntime, 100);  // 后续更新

// 客户端时间
var userNowTime = function() {
    document.getElementById('usernowtime').innerHTML = new Date();
}
setInterval(userNowTime, 1000)

// 客户端 IP
// API: https://api.ip.sb/ip
$.getJSON("https://pubstatic.b0.upaiyun.com/?_upnode&t=" + (+new Date()), function (json) {
    $('#userip').css("cssText", 'display:inline-block');
    $('#userip').html('<code style="padding: 2px 4px; font-size: 90%; color: #c7254e; background-color: #f9f2f4; border-radius: 4px;">' + json.remote_addr + '</code> [' + json.remote_addr_location.province + ' ' + json.remote_addr_location.city + ' ' + json.remote_addr_location.isp + ']');
});

