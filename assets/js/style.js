/**
 * 样式处理文件
 */


// 样式修改
$(document).ready(function(){
    $('#bg').height($(document).height());
});

if($(document).width() < 500) {
    $('#tab-label2').hide();
    $('#tab-label1').width($('#tab-labels').width()/3);
    $('#tab-label3').width($('#tab-labels').width()/3);
    $('#tab-label4').width($('#tab-labels').width()/3);
}


