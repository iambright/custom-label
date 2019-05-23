/**
 * Created by Bright on 2018/12/14.
 */

$(function () {
    var elem = $('.container')
    var $initForm = $('#initForm')
    var customLabel = null
    var host = 'http://172.16.0.126:8000'
    var init = function (option, widgets) {
        option = option || {}
        widgets = widgets || []

        customLabel = new CustomLabel(option)

        if (widgets.length) {
            customLabel.addPageWidgets(widgets)
        } else {
            customLabel.addPage()
        }

        elem.html('').append(customLabel.getElem())
        customLabel.onSave = function (data) {
            var postData = {
                id: data.config.id || undefined,
                configs: JSON.stringify(data.widgets),
                formData: customLabel.getHtml()
            }
            console.log(JSON.stringify(postData))
            // TODO 保存
        }
    }

    $.ajaxSetup({
        global: true,
        headers : { 'token': 'tag_tool' },
        dataType: 'json',
        error: function (res) {
            alert(res.message)
        }
    })

    $('.test-menu')
        .on('click', '.btn-add-new', function () {
            $('#initForm').modal({ 
                escapeClose: false,
                clickClose: false,
                showClose: false,
                fadeDuration: 100
            })
        })
        .on('click', '.btn-add-new-by-config', function () {
            // 加载数据
            $.ajax({
                method: 'GET',
                url: '/api/temps/1',
                data: {},
                success: function (res) {
                    var option = {
                        id: res.data.id,
                        name: res.data.name,
                        type: res.data.temp_group_name,
                        typeID: res.data.temp_group_id,
                        size: [res.data.width, res.data.height]
                    }
                    var widgets = JSON.parse(res.data.configs)

                    if (widgets.length) {
                        init(option, widgets)
                    } else {
                        init(option)
                    }
                }
            })
        })
        .on('click', '.btn-fill-data', function () {
            // 填充实例
            $.ajax({
                method: 'GET',
                url: '/api/data',
                data: {},
                success: function (res) {
                    customLabel.fillData(res)
                }
            })
        })
        .on('click', '.btn-get-data', function () {
            // 获取模板数据
            console.log(JSON.stringify(customLabel.getData()))
        })
        .on('click', '.btn-get-html', function () {
             // 获取HTML
            console.log(customLabel.getHtml())
        })

    $initForm
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
            var name = $initForm.find('[name="name"]').val()
            var typeID = $initForm.find('[name="typeID"]').val()
            var typeName = $initForm.find('[name="typeID"]>[value="' + typeID + '"]').text()
            var sizeType = $initForm.find('[name="sizetype"]:checked').val()
            var size = $initForm.find('[name="size"]:checked').val()
            var width = $initForm.find('[name="width"]').val()
            var height = $initForm.find('[name="height"]').val()

            if (sizeType === '1') {
                size = size.split(',')
            } else {
                size = [width, height]
            }

            init({
                id: 1,
                name: name,
                type: typeName,
                typeID: typeID,
                size: size
            })

            $.modal.close()
        })

    $.ajax({
        method: 'GET',
        url: '/api/temp_groups',
        data: {},
        success: function (res) {
            if (res.data && res.data.length) {
                var optionTpl = ''
                $.each(res.data, function (index, item) {
                    optionTpl += '<option value="' + item.id + '">' + item.name + '</option>'
                })
                $initForm.find('select[name="type"]').html(optionTpl)
            }
            $initForm.modal({ 
                escapeClose: false,
                clickClose: false,
                showClose: false,
                fadeDuration: 100
            })
        }
    })
})
