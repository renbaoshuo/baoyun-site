/** 
 * 核心 JavaScript
 */ 

// AJAX 关闭异步 
$.ajaxSetup({async: false});   // 不关有 bug !!! - 2020/6/19

// 引入 JSON 文件
var info = (function () {
    var json = null;
    $.getJSON("./info.json", function(data) {json = data;});
    return json;
})();


// 定义函数

/**
 * 返回当前年龄的HTML文本
 * @param year  出生年份
 * @param month 出生月份
 * @param date  出生日期
 */
function getAgeInfo(year, month, date) {
    var nowtime = new Date();                           // 当前时间
    var nyear  = nowtime.getUTCFullYear();              // 当前年份
    var nmonth = nowtime.getUTCMonth()+1;               // 当前月份
    var nday   = nowtime.getUTCDate();                  // 当前日期
    var mday   = new Date(nyear, nmonth, 0).getDate();  // 当月日期
    var r = "";                                         // 返回字符串

    if(nyear > year) {
        if(nmonth == month) {
            if(nday == date) {          // 生日当天
                r = `我现在&nbsp;<b>${nyear - year}</b>&nbsp;岁了！<br><b style="color: #dc143c;">今天是我的生日！快来祝贺我吧~</b>`;
            } else if(nday > date) {    // 过完生日
                r = `我现在&nbsp;<b>${nyear - year}</b>&nbsp;岁了！`;
            } else if(nday < date) {    // 还没过生日
                if(nyear - 1 > year) {  // 大于 1 岁
                    r = `我现在&nbsp;<b>${nyear - year - 1}</b>&nbsp;岁了！`;
                } else {                // 马上一岁
                    r = `我现在&nbsp;<b>11</b>&nbsp;个月大了~`;
                }
            }
        } else if(nmonth > month) {     // 过完生日的月份
            r = `我现在&nbsp;<b>${nyear - year}</b>&nbsp;岁了！`;
        } else if(nmonth < month) {     // 生日之前的月份
            if(nyear - 1 == year) {     // 去年出生
                r = `我现在&nbsp;<b>${12 - month + nmonth}</b>&nbsp;个月大了~`;
            } else {                    // 去年以前出生
                r = `我现在&nbsp;<b>${nyear - year - 1}</b>&nbsp;岁大了！`;
            }
        }
    } else {
        r = `我现在&nbsp;<b>${nmonth - month - 1}</b>&nbsp;个月大了~`;
    }
    return r;
}

/**
 * 返回联系方式的HTML文本
 * @param json 联系方式的json格式
 */
function getContactInfo(json) {
    var r = "";
    r += "<table><tbody>";
    for(var key in json) {
        if(key == "Email") {             // 邮箱
            r += `<tr><td><i class="fa fa-envelope-o"></i>&nbsp;&nbsp;${json[key]}</td></tr>`;
        } else if(key == "QQ") {         // QQ
            r += `<tr><td><i class="fa fa-qq"></i>&nbsp;&nbsp;${json[key]}</td></tr>`;
        } else if(key == "Google") {     // 谷歌
            r += `<tr><td><i class="fa fa-google"></i>&nbsp;&nbsp;${json[key]}</td></tr>`;
        } else if(key == "Github") {     // Github
            r += `<tr><td><i class="fa fa-github"></i>&nbsp;&nbsp;${json[key]}</td></tr>`;
        } else if(key == "GitLab") {     // GitLab
            r += `<tr><td><i class="fa fa-gitlab"></i>&nbsp;&nbsp;${json[key]}</td></tr>`;
        } else if(key == "Apple") {      // 苹果
            r += `<tr><td><i class="fa fa-apple"></i>&nbsp;&nbsp;${json[key]}</td></tr>`;
        } else if(key == "Reddit") {     // Reddit
            r += `<tr><td><i class="fa fa-reddit"></i>&nbsp;&nbsp;${json[key]}</td></tr>`;
        } else if(key == "Telegram") {   // Telegram
            r += `<tr><td><i class="fa fa-telegram"></i>&nbsp;&nbsp;${json[key]}</td></tr>`;
        } else if(key == "Weixin") {     // 微信
            r += `<tr><td><i class="fa fa-weixin"></i>&nbsp;&nbsp;${json[key]}</td></tr>`;
        } else if(key == "Weibo") {      // 微博
            r += `<tr><td><i class="fa fa-weibo"></i>&nbsp;&nbsp;${json[key]}</td></tr>`;
        } else {                         // 其他
            r += `<tr><td>${key}:&nbsp;&nbsp;${json[key]}</td></tr>`;
        }
    }
    r += "</tbody></table>";
    return r;
}

/**
 * 获取用户IP信息
 */
function getUserIPInfo() {
    var ipinfo = null;
    $.get("https://api.myip.la/cn?json", function(data, status){ipinfo = data;});
    return ipinfo;
};

/**
 * 转换关键词
 * @param keywords 关键词
 */
function getHTMLKeyWords(keywords) {
    $tmpkwd = "";
    for($_i = 0 ; $_i < keywords.length - 1 ; $_i++) {
        $tmpkwd += keywords[$_i];
        $tmpkwd += ","
    }
    $tmpkwd += keywords[keywords.length - 1];
    return $tmpkwd;
}; 

/**
 * 转换友情链接
 * @param links 友情链接的JSON格式列表
 */
function getHTMLFriendLinks(links) {
    var tmpkwd = "";
    if(JSON.stringify(links) === "{}") {
        return "";
    } else {
        tmpkwd = "友情链接: ";
        for(var key in links) {
            tmpkwd += `<a href="${links[key]}" style="text-decoration: none; line-height: 200%; color: #6c767d;">${key}</a>`;
            tmpkwd += "&nbsp;";
        }
    }
    return tmpkwd;
}; 

/**
 * 获取用户系统版本
 */
function getUserOSInfo() {
    var item, token, ua, _i, _len;
    ua = navigator.userAgent;
    token = [
        ["Windows Phone", "Windows Phone"], 
        ["Windows NT 5.0", "Windows 2000"], 
        ["Windows NT 5.1", "Windows XP"], 
        ["Windows NT 5.2", "Windows 2003"], 
        ["Windows NT 6.0", "Windows Vista"], 
        ["Windows NT 6.1", "Windows 7"], 
        ["Windows NT 6.2", "Windows 8.0"], 
        ["windows NT 6.3", "Windows 8.1"], 
        ["Windows NT 10.0", "Windows 10"], 
        ["Android", "Android"], 
        ["iPhone", "iOS"], 
        ["iPad", "iPadOS"], 
        ["Macintosh", "macOS"], 
        ["Windows", "Windows"], 
        ["Ubuntu", "Ubuntu"], 
        ["Linux", "Linux"]
    ];
    for (_i = 0, _len = token.length; _i < _len; _i++) {
        item = token[_i];
        if (ua.indexOf(item[0]) > -1) {
            return item[1];
        }
    }
    return "Other";
};

/**
 * 获取当前CDN节点信息
 */
function getCDNInfo() {
    r = "";
    try {
        $.ajax({
        url: "/cdn-cgi/trace",
        success: function(data, status) {
            let areas = {"TNR":"Antananarivo, Madagascar","CPT":"Cape Town, South Africa","CMN":"Casablanca, Morocco","DAR":"Dar Es Salaam, Tanzania","JIB":"Djibouti City, Djibouti","DUR":"Durban, South Africa","JNB":"Johannesburg, South Africa","KGL":"Kigali, Rwanda","LOS":"Lagos, Nigeria","LAD":"Luanda, Angola","MPM":"Maputo, MZ","MBA":"Mombasa, Kenya","MRU":"Port Louis, Mauritius","RUN":"Réunion, France","BLR":"Bangalore, India","BKK":"Bangkok, Thailand","BWN":"Bandar Seri Begawan, Brunei","CEB":"Cebu, Philippines","CTU":"Chengdu, China","MAA":"Chennai, India","CGP":"Chittagong, Bangladesh","CKG":"Chongqing, China","CMB":"Colombo, Sri Lanka","DAC":"Dhaka, Bangladesh","SZX":"Dongguan, China","FUO":"Foshan, China","FOC":"Fuzhou, China","CAN":"Guangzhou, China","HGH":"Hangzhou, China","HAN":"Hanoi, Vietnam","HNY":"Hengyang, China","SGN":"Ho Chi Minh City, Vietnam","HKG":"Hong Kong, China","HYD":"Hyderabad, India","ISB":"Islamabad, Pakistan","CGK":"Jakarta, Indonesia","TNA":"Jinan, China","KHI":"Karachi, Pakistan","KTM":"Kathmandu, Nepal","CCU":"Kolkata, India","KUL":"Kuala Lumpur, Malaysia","LHE":"Lahore, Pakistan","NAY":"Langfang, China","LYA":"Luoyang, China","MFM":"Macau","MLE":"Malé, Maldives","MNL":"Manila, Philippines","BOM":"Mumbai, India","NAG":"Nagpur, India","NNG":"Nanning, China","DEL":"New Delhi, India","KIX":"Osaka, Japan","PNH":"Phnom Penh, Cambodia","TAO":"Qingdao, China","ICN":"Seoul, South Korea","SHA":"Shanghai, China","SHE":"Shenyang, China","SJW":"Shijiazhuang, China","SIN":"Singapore, Singapore","SZV":"Suzhou, China","TPE":"Taipei, China","PBH":"Thimphu, Bhutan","TSN":"Tianjin, China","NRT":"Tokyo, Japan","ULN":"Ulaanbaatar, Mongolia","VTE":"Vientiane, Laos","WUH":"Wuhan, China","WUX":"Wuxi, China","XIY":"Xi'an, China","EVN":"Yerevan, Armenia","CGO":"Zhengzhou, China","CSX":"Zuzhou, China","AMS":"Amsterdam, Netherlands","ATH":"Athens, Greece","BCN":"Barcelona, Spain","BEG":"Belgrade, Serbia","TXL":"Berlin, Germany","BRU":"Brussels, Belgium","OTP":"Bucharest, Romania","BUD":"Budapest, Hungary","KIV":"Chișinău, Moldova","CPH":"Copenhagen, Denmark","ORK":"Cork, Ireland","DUB":"Dublin, Ireland","DUS":"Düsseldorf, Germany","EDI":"Edinburgh, United Kingdom","FRA":"Frankfurt, Germany","GVA":"Geneva, Switzerland","GOT":"Gothenburg, Sweden","HAM":"Hamburg, Germany","HEL":"Helsinki, Finland","IST":"Istanbul, Turkey","KBP":"Kyiv, Ukraine","LIS":"Lisbon, Portugal","LHR":"London, United Kingdom","LUX":"Luxembourg City, Luxembourg","MAD":"Madrid, Spain","MAN":"Manchester, United Kingdom","MRS":"Marseille, France","MXP":"Milan, Italy","DME":"Moscow, Russia","MUC":"Munich, Germany","LCA":"Nicosia, Cyprus","OSL":"Oslo, Norway","CDG":"Paris, France","PRG":"Prague, Czech Republic","KEF":"Reykjavík, Iceland","RIX":"Riga, Latvia","FCO":"Rome, Italy","LED":"Saint Petersburg, Russia","SOF":"Sofia, Bulgaria","ARN":"Stockholm, Sweden","TLL":"Tallinn, Estonia","SKG":"Thessaloniki, Greece","VIE":"Vienna, Austria","VNO":"Vilnius, Lithuania","WAW":"Warsaw, Poland","ZAG":"Zagreb, Croatia","ZRH":"Zürich, Switzerland","ARI":"Arica, Chile","ASU":"Asunción, Paraguay","BOG":"Bogotá, Colombia","EZE":"Buenos Aires, Argentina","CWB":"Curitiba, Brazil","FOR":"Fortaleza, Brazil","GUA":"Guatemala City, Guatemala","LIM":"Lima, Peru","MDE":"Medellín, Colombia","PTY":"Panama City, Panama","POA":"Porto Alegre, Brazil","UIO":"Quito, Ecuador","GIG":"Rio de Janeiro, Brazil","GRU":"São Paulo, Brazil","SCL":"Santiago, Chile","CUR":"Willemstad, Curaçao","GND":"St. George's, Grenada","AMM":"Amman, Jordan","BGW":"Baghdad, Iraq","GYD":"Baku, Azerbaijan","BEY":"Beirut, Lebanon","DOH":"Doha, Qatar","DXB":"Dubai, United Arab Emirates","KWI":"Kuwait City, Kuwait","BAH":"Manama, Bahrain","MCT":"Muscat, Oman","ZDM":"Ramallah","RUH":"Riyadh, Saudi Arabia","TLV":"Tel Aviv, Israel","IAD":"Ashburn, VA, United States","ATL":"Atlanta, GA, United States","BOS":"Boston, MA, United States","BUF":"Buffalo, NY, United States","YYC":"Calgary, AB, Canada","CLT":"Charlotte, NC, United States","ORD":"Chicago, IL, United States","CMH":"Columbus, OH, United States","DFW":"Dallas, TX, United States","DEN":"Denver, CO, United States","DTW":"Detroit, MI, United States","HNL":"Honolulu, HI, United States","IAH":"Houston, TX, United States","IND":"Indianapolis, IN, United States","JAX":"Jacksonville, FL, United States","MCI":"Kansas City, MO, United States","LAS":"Las Vegas, NV, United States","LAX":"Los Angeles, CA, United States","MFE":"McAllen, TX, United States","MEM":"Memphis, TN, United States","MEX":"Mexico City, Mexico","MIA":"Miami, FL, United States","MSP":"Minneapolis, MN, United States","MGM":"Montgomery, AL, United States","YUL":"Montréal, QC, Canada","BNA":"Nashville, TN, United States","EWR":"Newark, NJ, United States","ORF":"Norfolk, VA, United States","OMA":"Omaha, NE, United States","PHL":"Philadelphia, United States","PHX":"Phoenix, AZ, United States","PIT":"Pittsburgh, PA, United States","PAP":"Port-Au-Prince, Haiti","PDX":"Portland, OR, United States","QRO":"Queretaro, MX, Mexico","RIC":"Richmond, Virginia","SMF":"Sacramento, CA, United States","SLC":"Salt Lake City, UT, United States","SAN":"San Diego, CA, United States","SJC":"San Jose, CA, United States","YXE":"Saskatoon, SK, Canada","SEA":"Seattle, WA, United States","STL":"St. Louis, MO, United States","TPA":"Tampa, FL, United States","YYZ":"Toronto, ON, Canada","YVR":"Vancouver, BC, Canada","TLH":"Tallahassee, FL, United States","YWG":"Winnipeg, MB, Canada","ADL":"Adelaide, SA, Australia","AKL":"Auckland, New Zealand","BNE":"Brisbane, QLD, Australia","MEL":"Melbourne, VIC, Australia","NOU":"Noumea, New caledonia","PER":"Perth, WA, Australia","SYD":"Sydney, NSW, Australia"};
            let area  = data.split("colo=")[1].split("\n")[0];
            r = areas[area];
        },
        error: function(){
            r = "None";
        }
    });
    } catch {
        return "None";
    }
    return r;
}

// 处理信息
/* 转换关键词 */
var htmlkeyword = getHTMLKeyWords(info.keywords);
var htmllinks   = getHTMLFriendLinks(info.friendLinks);
var userIPInfo  = getUserIPInfo();
var userOSInfo  = getUserOSInfo();
var CDNInfo     = getCDNInfo();

// 修改信息
document.title = info.title;                                          // 页面标题
$('meta[name="description"]').attr('content', info.description);      // 页面描述
$('meta[name="keywords"]').attr('content', htmlkeyword);              // 关键词

// 绘制基础页面内容
$('#app').html('');
$('#app').append(`<div id="bg" style="background-image: url(${info.styles.backgroundImgURL});"></div>`);   // 页面背景                              
$('#app').append('<div id="main" class="main card"></div>');                         // 中央卡片

// 核心卡片
$('#main').append(`<h2 id="title" style="text-align: center;">${info.title}</h2>`);  // 显示标题
$('#main').append('<div id="tab" class="tabs"></div>');                              // 插入 tab 模块
if(info.displayCloudflareCDNInfo) {
    $('#main').append(`<span id="ftinfo" style="text-align: center; font-size: 70%;">当前 CDN 节点: <code>${CDNInfo}</code></span>`);
}
$('#main').append('<footer id="footer" style="padding-top:10px; font-size: 10px;"></footer>');

// TAB
$('#tab').prepend('<div id="tab1" class="tab-2"></div>');                            // 插入左侧 tab
$('#tab').append('<div id="tab2" class="tab-2" style="text-align:left;"></div>');    // 插入右侧 tab

// 左侧 tab 
$('#tab1').prepend('<label for="tab2-1">主页</label><input id="tab2-1" name="tabs-two" type="radio" checked="checked">'); // 左侧 tab 标题
$('#tab1').append('<div id="tab-1-s"></div>');                  // 左侧 tab 内容
$('#tab-1-s').prepend('<div id="i" class="i"></div>');          // 信息

// 信息
$('#i').append(`<p>嘿，这里是${info.name}的个人网站，欢迎光临！</p><br>`);  // 欢迎语
$('#i').append('<div id="age-time-n" style="font-size: 15px;"></div>');    // 年龄
$('#i').append('<h3 style="padding-left: 5px;">联系我</h3>'); // 联系
$('#i').append('<div id="contact" class="contact"></div>');   // 联系

$('#age-time-n').html(getAgeInfo(info.birthInfo.birthYear, info.birthInfo.birthMonth, info.birthInfo.birthDate));  // 年龄
$('#contact').html(getContactInfo(info.contact));             // 联系方式

// 右侧 tab
$('#tab2').prepend('<label for="tab2-2">客户端信息</label><input id="tab2-2" name="tabs-two" type="radio">');
$('#tab2').append('<div id="tab2-s"></div>');
$('#tab2-s').append('<div id="info" class="info"></div>');
$('#tab2-s').append('<div id="userinfo" style="font-size: 85%; line-height: 165%;"></div>');

// 客户端
$('#info').html('<table style="padding: 10px 5px 10px 2px;"><tr><td><i class="fa fa-info-circle"></i></td><td style="padding-left: 10px; text-align: left; text-indent: 0%; line-height: 16px;">此页面仅用于定位您的浏览器和网络信息，不涉及您的隐私信息，更不会将数据上传至服务器，请放心使用。</td></tr></table>')
$('#userinfo').append(`<span>您的 IP 地址： <code>${userIPInfo.ip}</code></span><br>`);
$('#userinfo').append(`<span>您的地理位置： <code>${userIPInfo.location.country_name} ${userIPInfo.location.province} ${userIPInfo.location.city}</code></span><br>`);
$('#userinfo').append(`<span>客户端当前时间： <code id="user-time">${new Date()}</code></span><br>`);
$('#userinfo').append(`<span>客户端操作系统： <code>${userOSInfo}</code></span>`);

// Footer
$('#footer').prepend(`<span>&copy;&nbsp;<span>${new Date().getFullYear()}</span>&nbsp;<a style="color: inherit; text-decoration: none; cursor: pointer; word-break: break-all;" href="https://www.baoshuo.ren/">宝硕小站</a>&nbsp;版权所有</span> | <a href="https://github.com/renbaoshuo/baoyun-site" style="color: inherit; text-decoration: none; cursor: pointer; word-break: break-all;">GitHub</a><br>`);
$('#footer').append(htmllinks);


// 样式处理
$.getScript("assets/js/style.js");

// 渲染时间
endTime = new Date().getTime();
$('#ftinfo').append(`&nbsp;&nbsp;|&nbsp;&nbsp;加载耗时：<code>${endTime-startTime}ms</code>`);
