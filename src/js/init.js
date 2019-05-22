/**
 * Created by Bright on 2018/12/14.
 */

$(function () {
    var elem = $('.container')
    var customLabel = ''

    function init (option, widgets) {
        option = option || {}
        widgets = widgets || []

        customLabel = new CustomLabel(option)

        if (widgets.length) {
            customLabel.addPageWidgets(widgets)
        } else {
            customLabel.addPage()
        }

        elem.html('').append(customLabel.getElem())
        customLabel.onSave = function () {
            console.log('onSave')
        }
    }

    $('.btn-add-new').on('click', function () {
        $('#initForm').modal({ 
            escapeClose: false,
            clickClose: false,
            showClose: false,
            fadeDuration: 100
        })
    })

    $('.btn-remove').on('click', function () {
        customLabel.remove()
    })

    // 创建实例
    $('.btn-add-new-by-config').on('click', function () {
        $.get('./data/config.json?random=' + Math.random()).then(function (data) {
            init(data.config, data.widgets)
        })
    })

    // 填充实例
    $('.btn-fill-data').on('click', function () {
        $.get('./data/data.json?random=' + Math.random()).then(function (data) {
            customLabel.fillData(data)
        })
    })

    // 获取模板数据
    $('.btn-get-data').on('click', function () {
        console.log(JSON.stringify(customLabel.getData()))
    })

    // 获取HTML
    $('.btn-get-html').on('click', function () {
        alert(customLabel.getHtml())
    })

    // 打印
    $('.btn-finish').on('click', function () {
        // 第一步获取模板
        $.get('./data/config.json?random=' + Math.random()).then(function (data) {
            // 第二步初始化
            customLabel = new CustomLabel(data.config)
            customLabel.addPageWidgets(data.widgets)
            // // 第三步填充订单信息
            // $.get('./data/data.json?random=' + Math.random()).then(function (data) {
            //     customLabel.fillData(data)
            //     // 第四步打印
            //     // var html = customLabel.getData();
            //     // console.log(html);
            //     // 拿到html去打印
            //     // send(html)
            // })
        })
    })

    $('.btn-reload').on('click', function () {
        window.location.reload()
    })

    $('#initForm')
        .on('change', '[name="sizetype"]', function() {
            var $sizetype1 = $('#sizetype1')
            var $sizetype2 = $('#sizetype2')
            switch (this.value) {
                case '1':
                    $sizetype1.show()
                    $sizetype2.hide()
                    break
                case '2':
                    $sizetype1.hide()
                    $sizetype2.show()
                    break
            }
        })
        .on('click', '.modal__btn_primary', function () {
            var name = $('#initForm').find('[name="name"]').val()
            var type = $('#initForm').find('[name="type"]').val()
            var sizeType = $('#initForm').find('[name="sizetype"]:checked').val()
            var size = $('#initForm').find('[name="size"]:checked').val()
            var width = $('#initForm').find('[name="width"]').val()
            var height = $('#initForm').find('[name="height"]').val()

            if (sizeType === '1') {
                size = size.split(',')
            } else {
                size = [width, height]
            }

            init({ name: name, type: type, size: size })
            $.modal.close()
        })
})
