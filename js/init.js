/**
 * Created by Bright on 2018/12/14.
 */

$(function () {
    var elem = $(".container");
    var customLabel;

    $(".btn-add-new").on('click',function (e) {
        customLabel = new CustomLabel({
            name: '这是测试模板',
            size: [10, 10] // 尺寸，单位厘米
        });
        customLabel.onSave = function (data) {
            console.log("onSave:", data);
            console.log("onSave:", JSON.stringify(data));
        };
        customLabel.addPage();
        elem.html('').append(customLabel.getElem());
    });

    $(".btn-remove").on('click',function (e) {
        customLabel.remove();
    });

    $(".btn-add-new-by-config").on('click',function (e) {
        $.get("./data/config.json?random="+Math.random()).then(function(data){
            customLabel = new CustomLabel(data.config);
            customLabel.addPageWidgets(data.widgets);
            customLabel.onSave = function (data) {
                console.log("onSave:", data);
                console.log("onSave:", JSON.stringify(data));
            };
            elem.html('').append(customLabel.getElem());
        });
    });

    $(".btn-fill-data").on('click',function (e) {
        $.get("./data/data.json?random="+Math.random()).then(function(data){
            customLabel.fillData(data);
        });
    });
    $(".btn-get-html").on('click',function (e) {
        alert(customLabel.getHtml());
    });
    $(".btn-get-data").on('click',function (e) {
        alert(JSON.stringify(customLabel.getData()));
    });


    $(".btn-finish").on('click',function (e) {

        // 第一步获取模板
        $.get("./data/config.json?random="+Math.random()).then(function(data){
            // 第二步初始化
            var customLabel = new CustomLabel(data.config);
            customLabel.addPageWidgets(data.widgets);
            // 第三步填充订单信息
            $.get("./data/data.json?random="+Math.random()).then(function(data){
                customLabel.fillData(data);
                // 第四步打印
                var html = customLabel.getData();
                // 拿到html去打印
                // send(html)
            });
        });

    });


});
