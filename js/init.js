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
        $.get("./data/config.json").then(function(data){
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
        $.get("./data/data.json").then(function(data){
            customLabel.fillData(data);
        });
    });
    $(".btn-get-html").on('click',function (e) {
        alert(customLabel.getHtml());
    });
    $(".btn-get-data").on('click',function (e) {
        alert(JSON.stringify(customLabel.getData()));
    });
});
