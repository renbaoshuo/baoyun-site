/**
 * Baoyun's Small Site
 * 
 * Author: RenBaoshuo
 * Date: 2020/05/21
 * Link: https://www.baoshuo.ren/
 * Github: renbaoshuo/baoyun-site
 */

// 客户端时间
var userNowTime = function() {
    $('#usernowtime').html(new Date());
}
setInterval(userNowTime, 1000);


// 客户端 IP
$.getJSON("http://ip-api.com/json/?lang=zh-CN", function(json) {
    $('#userip').html(json.query);
});

