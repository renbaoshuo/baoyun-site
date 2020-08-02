/**
 * 样式处理文件
 */

// ------------------------------

/** 
 * 加载完成后调整背景高度
 */
$(document).ready(function(){
    $('#bg').height($(document).height());
});

/**
 * 如果屏幕过窄，则去除 “客户端信息” 板块
 */
$(document).ready(function(){
    if($(document).width() < 500) {
        $('#tab-label2').hide();
        $('#tab-label1').width($('#tab-labels').width()/3);
        $('#tab-label3').width($('#tab-labels').width()/3);
        $('#tab-label4').width($('#tab-labels').width()/3);
    }
});

/**
 * tab 切换
 */
$(document).ready(function(){
    $('#tab1').css("display", "inline-block");
    $('#tab2').css("display", "none");
    $('#tab3').css("display", "none");
    $('#tab4').css("display", "none");
    $('#tab2-1').click(function(){
        $('#tab2').css("display", "none");
        $('#tab1').css("display", "inline-block");
        $('#tab3').css("display", "none");
        $('#tab4').css("display", "none");
    });
    $('#tab2-2').click(function(){
        $('#tab1').css("display", "none");
        $('#tab2').css("display", "inline-block");
        $('#tab3').css("display", "none");
        $('#tab4').css("display", "none");
    });
    $('#tab2-3').click(function(){
        $('#tab1').css("display", "none");
        $('#tab2').css("display", "none");
        $('#tab3').css("display", "inline-block");
        $('#tab4').css("display", "none");
    });
    $('#tab2-4').click(function(){
        $('#tab1').css("display", "none");
        $('#tab2').css("display", "none");
        $('#tab3').css("display", "none");
        $('#tab4').css("display", "inline-block");
    });
});
