/**
 * 核心 JavaScript 文件
 * 
 * + 需引用 jQuery 库, Font Awesome 库, style.css, tab.css
 * + 使用异步方式加载内容
 * 
 * 核心功能
 *   + tab 切换实现
 *   + 页面显示信息处理 + 获取
 * 
 */

// 控制台说明
console.log("\n %c 宝云小站 %c by 任宝硕 | www.baoyun.ren", "color:#eee;background:#444;padding:5px 0;", "color:#444;background:#eee;padding:5px 0;");
console.log('%c\n\n这是一个开源软件，源代码托管在 Github 中，点击下方链接前往 Github 项目页面。\n\nThis is an open source software. The source code is hosted in Github. Click the link below to go to the Github project page.%c\n\nhttps://github.com/renbaoshuo/baoyun-site\n ', "color:#eee;background:#444;padding:5px 0;", "");

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
 * 转换友情链接
 * @param links 友情链接的JSON格式列表
 */
function getHTMLFriendLinks(links) {
    var tmpkwd = '<div id="friends">';
    if(JSON.stringify(links) === "{}") {
        return "";
    } else {
        tmpkwd += "友情链接: ";
        for(var key in links) {
            tmpkwd += `<a href="${links[key]}" style="text-decoration: none; line-height: 200%; color: #6c767d;">${key}</a>`;
            tmpkwd += "&nbsp;&nbsp;";
        }
    }
    tmpkwd += "</div>"
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
 * 转换关键词
 * @param keywords 关键词
 */
function getHTMLKeyWords(keywords) {
    $tmpkwd = "";
    for($_i = 0 ; $_i < keywords.length - 1 ; $_i++) {
        $tmpkwd += keywords[$_i];
        $tmpkwd += ",";
    }
    $tmpkwd += keywords[keywords.length - 1];
    return $tmpkwd;
}; 

// 信息处理
$.ajax({
    // url: "https://cdn.jsdelivr.net/gh/renbaoshuo/baoyun-site/info.json",  /* for debug */
    url: "info.json",
    async: true,
    type: "GET",
    success: function(data, status, xhr) {
        // 页面标题
        document.title = data.title;                                          
        // 页面描述
        $('meta[name="description"]').attr('content', data.description);      
        // 关键词
        $('meta[name="keywords"]').attr('content', getHTMLKeyWords(data.keywords));              
        // 背景
        $('#bg').css('background-image', `url(${data.styles.backgroundImgURL})`);
        // 标题
        $('#title').html(data.HTMLtitle);
        // 名字
        $('#i-name').html(data.name);
        // 生日
        $('#age-time-n').html(getAgeInfo(data.birthInfo.birthYear, data.birthInfo.birthMonth, data.birthInfo.birthDate));
        // 联系方式
        $('#contact').html(getContactInfo(data.contact));
        // 友情链接
        $('#footer').append(getHTMLFriendLinks(data.friendLinks));
        // 处理完成再显示
        $('#loading-tab1').css("display", "none");
        $('#tab1-s').css("display", "inline-block");
    },
    error: function(xhr, status, error) {
        // 加载错误
        $("#app").html('<div style="text-align: center; margin: 20% 0;"><i class="fa fa-warning"></i>&nbsp;&nbsp;加载失败，请刷新页面重试！</div>');
        document.title = "加载失败了! ";
    }
});

// 客户端 IP
$.ajax({
    url: "https://myip.ipip.net/json",
    async: true,
    type: "GET",
    success: function(data, status, xhr) {
        $('#userip-c').html(data.data.ip);
        $('#userlocation-c').html(`${data.data.location[0]} ${data.data.location[1]} ${data.data.location[2]}`);
        if(data.data.location[4]) $('#userisp-c').html(data.data.location[4]);
        else $('#userisp').css("display", "none");
        $('#loading-tab2').css("display", "none");
        $('#tab2-s').css("display", "inline-block");
    },
    error: function(xhr, status, error) {
        $("#userip").css("display", "none");
        $('#userlocation').css("display", "none");
        $('#userisp').css("display", "none");
        $('#loading-tab2').css("display", "none");
        $('#tab2-s').css("display", "inline-block");
    }
});

setInterval(function(){ $('#usernowtime').html(`${new Date()}`) }, 100);
$('#usersys').html(getUserOSInfo());

// CDN 节点
$.ajax({
    url: "/cdn-cgi/trace",
    success: function(data, status) {
        let areas = {"TNR":"Antananarivo, Madagascar","CPT":"Cape Town, South Africa","CMN":"Casablanca, Morocco","DAR":"Dar Es Salaam, Tanzania","JIB":"Djibouti City, Djibouti","DUR":"Durban, South Africa","JNB":"Johannesburg, South Africa","KGL":"Kigali, Rwanda","LOS":"Lagos, Nigeria","LAD":"Luanda, Angola","MPM":"Maputo, MZ","MBA":"Mombasa, Kenya","MRU":"Port Louis, Mauritius","RUN":"Réunion, France","BLR":"Bangalore, India","BKK":"Bangkok, Thailand","BWN":"Bandar Seri Begawan, Brunei","CEB":"Cebu, Philippines","CTU":"Chengdu, China","MAA":"Chennai, India","CGP":"Chittagong, Bangladesh","CKG":"Chongqing, China","CMB":"Colombo, Sri Lanka","DAC":"Dhaka, Bangladesh","SZX":"Dongguan, China","FUO":"Foshan, China","FOC":"Fuzhou, China","CAN":"Guangzhou, China","HGH":"Hangzhou, China","HAN":"Hanoi, Vietnam","HNY":"Hengyang, China","SGN":"Ho Chi Minh City, Vietnam","HKG":"Hong Kong, China","HYD":"Hyderabad, India","ISB":"Islamabad, Pakistan","CGK":"Jakarta, Indonesia","TNA":"Jinan, China","KHI":"Karachi, Pakistan","KTM":"Kathmandu, Nepal","CCU":"Kolkata, India","KUL":"Kuala Lumpur, Malaysia","LHE":"Lahore, Pakistan","NAY":"Langfang, China","LYA":"Luoyang, China","MFM":"Macau","MLE":"Malé, Maldives","MNL":"Manila, Philippines","BOM":"Mumbai, India","NAG":"Nagpur, India","NNG":"Nanning, China","DEL":"New Delhi, India","KIX":"Osaka, Japan","PNH":"Phnom Penh, Cambodia","TAO":"Qingdao, China","ICN":"Seoul, South Korea","SHA":"Shanghai, China","SHE":"Shenyang, China","SJW":"Shijiazhuang, China","SIN":"Singapore, Singapore","SZV":"Suzhou, China","TPE":"Taipei, China","PBH":"Thimphu, Bhutan","TSN":"Tianjin, China","NRT":"Tokyo, Japan","ULN":"Ulaanbaatar, Mongolia","VTE":"Vientiane, Laos","WUH":"Wuhan, China","WUX":"Wuxi, China","XIY":"Xi'an, China","EVN":"Yerevan, Armenia","CGO":"Zhengzhou, China","CSX":"Zuzhou, China","AMS":"Amsterdam, Netherlands","ATH":"Athens, Greece","BCN":"Barcelona, Spain","BEG":"Belgrade, Serbia","TXL":"Berlin, Germany","BRU":"Brussels, Belgium","OTP":"Bucharest, Romania","BUD":"Budapest, Hungary","KIV":"Chișinău, Moldova","CPH":"Copenhagen, Denmark","ORK":"Cork, Ireland","DUB":"Dublin, Ireland","DUS":"Düsseldorf, Germany","EDI":"Edinburgh, United Kingdom","FRA":"Frankfurt, Germany","GVA":"Geneva, Switzerland","GOT":"Gothenburg, Sweden","HAM":"Hamburg, Germany","HEL":"Helsinki, Finland","IST":"Istanbul, Turkey","KBP":"Kyiv, Ukraine","LIS":"Lisbon, Portugal","LHR":"London, United Kingdom","LUX":"Luxembourg City, Luxembourg","MAD":"Madrid, Spain","MAN":"Manchester, United Kingdom","MRS":"Marseille, France","MXP":"Milan, Italy","DME":"Moscow, Russia","MUC":"Munich, Germany","LCA":"Nicosia, Cyprus","OSL":"Oslo, Norway","CDG":"Paris, France","PRG":"Prague, Czech Republic","KEF":"Reykjavík, Iceland","RIX":"Riga, Latvia","FCO":"Rome, Italy","LED":"Saint Petersburg, Russia","SOF":"Sofia, Bulgaria","ARN":"Stockholm, Sweden","TLL":"Tallinn, Estonia","SKG":"Thessaloniki, Greece","VIE":"Vienna, Austria","VNO":"Vilnius, Lithuania","WAW":"Warsaw, Poland","ZAG":"Zagreb, Croatia","ZRH":"Zürich, Switzerland","ARI":"Arica, Chile","ASU":"Asunción, Paraguay","BOG":"Bogotá, Colombia","EZE":"Buenos Aires, Argentina","CWB":"Curitiba, Brazil","FOR":"Fortaleza, Brazil","GUA":"Guatemala City, Guatemala","LIM":"Lima, Peru","MDE":"Medellín, Colombia","PTY":"Panama City, Panama","POA":"Porto Alegre, Brazil","UIO":"Quito, Ecuador","GIG":"Rio de Janeiro, Brazil","GRU":"São Paulo, Brazil","SCL":"Santiago, Chile","CUR":"Willemstad, Curaçao","GND":"St. George's, Grenada","AMM":"Amman, Jordan","BGW":"Baghdad, Iraq","GYD":"Baku, Azerbaijan","BEY":"Beirut, Lebanon","DOH":"Doha, Qatar","DXB":"Dubai, United Arab Emirates","KWI":"Kuwait City, Kuwait","BAH":"Manama, Bahrain","MCT":"Muscat, Oman","ZDM":"Ramallah","RUH":"Riyadh, Saudi Arabia","TLV":"Tel Aviv, Israel","IAD":"Ashburn, VA, United States","ATL":"Atlanta, GA, United States","BOS":"Boston, MA, United States","BUF":"Buffalo, NY, United States","YYC":"Calgary, AB, Canada","CLT":"Charlotte, NC, United States","ORD":"Chicago, IL, United States","CMH":"Columbus, OH, United States","DFW":"Dallas, TX, United States","DEN":"Denver, CO, United States","DTW":"Detroit, MI, United States","HNL":"Honolulu, HI, United States","IAH":"Houston, TX, United States","IND":"Indianapolis, IN, United States","JAX":"Jacksonville, FL, United States","MCI":"Kansas City, MO, United States","LAS":"Las Vegas, NV, United States","LAX":"Los Angeles, CA, United States","MFE":"McAllen, TX, United States","MEM":"Memphis, TN, United States","MEX":"Mexico City, Mexico","MIA":"Miami, FL, United States","MSP":"Minneapolis, MN, United States","MGM":"Montgomery, AL, United States","YUL":"Montréal, QC, Canada","BNA":"Nashville, TN, United States","EWR":"Newark, NJ, United States","ORF":"Norfolk, VA, United States","OMA":"Omaha, NE, United States","PHL":"Philadelphia, United States","PHX":"Phoenix, AZ, United States","PIT":"Pittsburgh, PA, United States","PAP":"Port-Au-Prince, Haiti","PDX":"Portland, OR, United States","QRO":"Queretaro, MX, Mexico","RIC":"Richmond, Virginia","SMF":"Sacramento, CA, United States","SLC":"Salt Lake City, UT, United States","SAN":"San Diego, CA, United States","SJC":"San Jose, CA, United States","YXE":"Saskatoon, SK, Canada","SEA":"Seattle, WA, United States","STL":"St. Louis, MO, United States","TPA":"Tampa, FL, United States","YYZ":"Toronto, ON, Canada","YVR":"Vancouver, BC, Canada","TLH":"Tallahassee, FL, United States","YWG":"Winnipeg, MB, Canada","ADL":"Adelaide, SA, Australia","AKL":"Auckland, New Zealand","BNE":"Brisbane, QLD, Australia","MEL":"Melbourne, VIC, Australia","NOU":"Noumea, New caledonia","PER":"Perth, WA, Australia","SYD":"Sydney, NSW, Australia"};
        let area  = data.split("colo=")[1].split("\n")[0];
        
        endTime = new Date().getTime();
        $('#ftinfo').prepend(`当前 CDN 节点: <code>${areas[area]}</code>&nbsp;&nbsp;|&nbsp;&nbsp;加载耗时: <code>${endTime-startTime}ms</code>`);
    },
    error: function(){
        endTime = new Date().getTime();
        $('#ftinfo').append(`加载耗时：<code>${endTime-startTime}ms</code>`); 
    }
});    
