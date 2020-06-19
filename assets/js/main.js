/** 
 * 核心 JavaScript
 */ 

// AJAX 关闭异步 
$.ajaxSetup({async: false});   // 不关有 bug !!! - 2020/6/19

// 引入 JSON 文件
// var json = (function () {
//     var json = null;
//     $.getJSON("./info.json", function(data) {json = data;});
//     return json;
// })();

// [测试用] 引入 JSON 文件
var info =   
{
    "url": "https://baoyun.ren",
    "title": "宝云小站", 
    "name": "任宝云", 
    "birthInfo": {
        "birthYear": 2020, 
        "birthMonth": 1, 
        "birthDate": 25
    }, 
    "contact": {
        "QQ": "2069818063",
        "Email": "i@baoyun.ren"
    }, 
    "friendLinks": {
        "宝硕小站": "https://www.baoshuo.ren"
    },
    "description": "宝云小站",
    "keywords": [
        "任宝云",
        "宝云"
    ],
    "styles": {
        "backgroundImgURL": "https://cdn.jsdelivr.net/gh/renbaoshuo/baoyun-site/assets/img/background.jpg"
    },
    "displayCloudflareCDNInfo": true 
}
;

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
            let areas = "Antananarivo, Madagascar - (TNR);Cape Town, South Africa - (CPT);Casablanca, Morocco - (CMN);Dar Es Salaam, Tanzania - (DAR);Djibouti City, Djibouti - (JIB);Durban, South Africa - (DUR);Johannesburg, South Africa - (JNB);Kigali, Rwanda - (KGL);Lagos, Nigeria - (LOS);Luanda, Angola - (LAD);Maputo, MZ - (MPM);Mombasa, Kenya - (MBA);Port Louis, Mauritius - (MRU);Réunion, France - (RUN);Bangalore, India - (BLR);Bangkok, Thailand - (BKK);Bandar Seri Begawan, Brunei - (BWN);Cebu, Philippines - (CEB);Chengdu, China - (CTU);Chennai, India - (MAA);Chittagong, Bangladesh - (CGP);Chongqing, China - (CKG);Colombo, Sri Lanka - (CMB);Dhaka, Bangladesh - (DAC);Dongguan, China - (SZX);Foshan, China - (FUO);Fuzhou, China - (FOC);Guangzhou, China - (CAN);Hangzhou, China - (HGH);Hanoi, Vietnam - (HAN);Hengyang, China - (HNY);Ho Chi Minh City, Vietnam - (SGN);Hong Kong - (HKG);Hyderabad, India - (HYD);Islamabad, Pakistan - (ISB);Jakarta, Indonesia - (CGK);Jinan, China - (TNA);Karachi, Pakistan - (KHI);Kathmandu, Nepal - (KTM);Kolkata, India - (CCU);Kuala Lumpur, Malaysia - (KUL);Lahore, Pakistan - (LHE);Langfang, China - (NAY);Luoyang, China - (LYA);Macau - (MFM);Malé, Maldives - (MLE);Manila, Philippines - (MNL);Mumbai, India - (BOM);Nagpur, India - (NAG);Nanning, China - (NNG);New Delhi, India - (DEL);Osaka, Japan - (KIX);Phnom Penh, Cambodia - (PNH);Qingdao, China - (TAO);Seoul, South Korea - (ICN);Shanghai, China - (SHA);Shenyang, China - (SHE);Shijiazhuang, China - (SJW);Singapore, Singapore - (SIN);Suzhou, China - (SZV);Taipei - (TPE);Thimphu, Bhutan - (PBH);Tianjin, China - (TSN);Tokyo, Japan - (NRT);Ulaanbaatar, Mongolia - (ULN);Vientiane, Laos - (VTE);Wuhan, China - (WUH);Wuxi, China - (WUX);Xi'an, China - (XIY);Yerevan, Armenia - (EVN);Zhengzhou, China - (CGO);Zuzhou, China - (CSX);Amsterdam, Netherlands - (AMS);Athens, Greece - (ATH);Barcelona, Spain - (BCN);Belgrade, Serbia - (BEG);Berlin, Germany - (TXL);Brussels, Belgium - (BRU);Bucharest, Romania - (OTP);Budapest, Hungary - (BUD);Chișinău, Moldova - (KIV);Copenhagen, Denmark - (CPH);Cork, Ireland -  (ORK);Dublin, Ireland - (DUB);Düsseldorf, Germany - (DUS);Edinburgh, United Kingdom - (EDI);Frankfurt, Germany - (FRA);Geneva, Switzerland - (GVA);Gothenburg, Sweden - (GOT);Hamburg, Germany - (HAM);Helsinki, Finland - (HEL);Istanbul, Turkey - (IST);Kyiv, Ukraine - (KBP);Lisbon, Portugal - (LIS);London, United Kingdom - (LHR);Luxembourg City, Luxembourg - (LUX);Madrid, Spain - (MAD);Manchester, United Kingdom - (MAN);Marseille, France - (MRS);Milan, Italy - (MXP);Moscow, Russia - (DME);Munich, Germany - (MUC);Nicosia, Cyprus - (LCA);Oslo, Norway - (OSL);Paris, France - (CDG);Prague, Czech Republic - (PRG);Reykjavík, Iceland - (KEF);Riga, Latvia - (RIX);Rome, Italy - (FCO);Saint Petersburg, Russia - (LED);Sofia, Bulgaria - (SOF);Stockholm, Sweden - (ARN);Tallinn, Estonia - (TLL);Thessaloniki, Greece - (SKG);Vienna, Austria - (VIE);Vilnius, Lithuania - (VNO);Warsaw, Poland - (WAW);Zagreb, Croatia - (ZAG);Zürich, Switzerland - (ZRH);Arica, Chile - (ARI);Asunción, Paraguay - (ASU);Bogotá, Colombia - (BOG);Buenos Aires, Argentina - (EZE);Curitiba, Brazil - (CWB);Fortaleza, Brazil - (FOR);Guatemala City, Guatemala - (GUA);Lima, Peru - (LIM);Medellín, Colombia - (MDE);Panama City, Panama - (PTY);Porto Alegre, Brazil - (POA);Quito, Ecuador - (UIO);Rio de Janeiro, Brazil - (GIG);São Paulo, Brazil - (GRU);Santiago, Chile - (SCL);Willemstad, Curaçao - (CUR);St. George's, Grenada - (GND);Amman, Jordan - (AMM);Baghdad, Iraq - (BGW);Baku, Azerbaijan - (GYD);Beirut, Lebanon - (BEY);Doha, Qatar - (DOH);Dubai, United Arab Emirates - (DXB);Kuwait City, Kuwait - (KWI);Manama, Bahrain - (BAH);Muscat, Oman - (MCT);Ramallah - (ZDM);Riyadh, Saudi Arabia - (RUH);Tel Aviv, Israel - (TLV);Ashburn, VA, United States - (IAD);Atlanta, GA, United States - (ATL);Boston, MA, United States - (BOS);Buffalo, NY, United States - (BUF);Calgary, AB, Canada - (YYC);Charlotte, NC, United States - (CLT);Chicago, IL, United States - (ORD);Columbus, OH, United States - (CMH);Dallas, TX, United States - (DFW);Denver, CO, United States - (DEN);Detroit, MI, United States - (DTW);Honolulu, HI, United States - (HNL);Houston, TX, United States - (IAH);Indianapolis, IN, United States - (IND);Jacksonville, FL, United States - (JAX);Kansas City, MO, United States - (MCI);Las Vegas, NV, United States - (LAS);Los Angeles, CA, United States - (LAX);McAllen, TX, United States - (MFE);Memphis, TN, United States - (MEM);Mexico City, Mexico - (MEX);Miami, FL, United States - (MIA);Minneapolis, MN, United States - (MSP);Montgomery, AL, United States - (MGM);Montréal, QC, Canada - (YUL);Nashville, TN, United States - (BNA);Newark, NJ, United States - (EWR);Norfolk, VA, United States - (ORF);Omaha, NE, United States - (OMA);Philadelphia, United States - (PHL);Phoenix, AZ, United States - (PHX);Pittsburgh, PA, United States - (PIT);Port-Au-Prince, Haiti - (PAP);Portland, OR, United States - (PDX);Queretaro, MX, Mexico - (QRO);Richmond, Virginia - (RIC);Sacramento, CA, United States - (SMF);Salt Lake City, UT, United States - (SLC);San Diego, CA, United States - (SAN);San Jose, CA, United States - (SJC);Saskatoon, SK, Canada - (YXE);Seattle, WA, United States - (SEA);St. Louis, MO, United States - (STL);Tampa, FL, United States - (TPA);Toronto, ON, Canada - (YYZ);Vancouver, BC, Canada - (YVR);Tallahassee, FL, United States - (TLH);Winnipeg, MB, Canada - (YWG);Adelaide, SA, Australia - (ADL);Auckland, New Zealand - (AKL);Brisbane, QLD, Australia - (BNE);Melbourne, VIC, Australia - (MEL);Noumea, New caledonia - (NOU);Perth, WA, Australia - (PER);Sydney, NSW, Australia - (SYD)".split(";");
            let area = data.split("colo=")[1].split("\n")[0];
            for (var i = 0; i < areas.length; i++) {
                if (areas[i].indexOf(area) != -1) {
                    r = areas[i];
                }
            }
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
    $('#main').append(`<span style="text-align: center; font-size: 70%;">当前 CDN 节点: <code style="padding: 2px 4px; font-size: 90%; color: #c7254e; background-color: #f9f2f4; border-radius: 4px;">${CDNInfo}</code></span>`);
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
