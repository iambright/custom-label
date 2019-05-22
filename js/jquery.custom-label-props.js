/**
 * Created by Bright on 2019/1/14.
 */

//= ===========自定义属性面板字段=======================================================

// 输入框
CustomLabel.addPropsPanelField('text', function (data, update) {
    var $elem = $([
        '<div class="cl-form-group">',
            '<label class="cl-form-group-label">' + data.label + '：</label>',
            '<input class="cl-input" type="text" data-widget-type="text" value="' + data.value + '">',
        '</div>'
    ].join(''))

    $elem.on('keyup', '[data-widget-type="text"]', function () {
        update(this.value)
    })

    return $elem
})

// 文本域
CustomLabel.addPropsPanelField('textarea', function (data, update) {
    var $elem = $([
        '<div class="cl-form-group">',
            '<label class="cl-form-group-label">' + data.label + '：</label>',
            '<textarea class="cl-textarea" data-widget-type="textarea">' + data.value + '</textarea>',
        '</div>'
    ].join(''))

    $elem.on('keyup', '[data-widget-type="textarea"]', function () {
        update($(this).val())
    })

    return $elem
})

// 下拉框
CustomLabel.addPropsPanelField('select', function (data, update) {
    var $elem = $([
        '<div class="cl-form-group">',
            '<label class="cl-form-group-label">' + data.label + '：</label>',
            '<select class="cl-select" data-widget-type="select">',
                createOptionTpl(data.option, data.value),
            '</select>',
        '</div>'
    ].join(''))

    $elem.on('change', '[data-widget-type="select"]', function () {
        update($(this).val())
    })

    return $elem
})

// 单选框
CustomLabel.addPropsPanelField('checkbox', function (prop, update) {
    var value = prop.value
    var $elem = $([
        '<div>',
            '<label class="cl-checkbox">',
                '<input type="checkbox" data-widget-type="checkbox">',
                '<span>' + prop.label + '</span>',
            '</label>',
        '</div>'
    ].join(''))

    $elem
        .on('change', '[type="checkbox"]', function () {
            value = $(this).is(':checked')
            update(value)
        })
        .find('[type="checkbox"]')
        .prop('checked', value)

    return $elem
})

// 可编辑多选框
CustomLabel.addPropsPanelField('checkboxList', function (prop, update) {
    var value = prop.value
    var option = prop.option
    var $elem = $('<div></div>')

    // init data
    if (typeof option.title === 'string' && option.title) {
        $elem.html('<div class="cl-props-label">' + option.title + '</div>')
    }

    $.each(value || [], function (index, item) {
        var $checkbox = $([
            '<label class="cl-checkbox">',
                item.checked
                    ? '<input type="checkbox" data-widget-name="' + item.name + '" data-widget-type="checkbox" checked>'
                    : '<input type="checkbox" data-widget-name="' + item.name + '" data-widget-type="checkbox">',
                '<span>' + item.label + '</span>',
            '</label>'
        ].join(''))

        var $input = $([
            '<div class="cl-form-group">',
                item.checked
                    ? '<input class="cl-input" type="text" data-widget-name="' + item.name + '" data-widget-type="text" value="' + item.text + '">'
                    : '<input class="cl-input" type="text" data-widget-name="' + item.name + '" data-widget-type="text" value="' + item.text + '" disabled>',
            '</div>'
        ].join(''))

        if (option.edit) {
            $elem.append([$checkbox, $input])
        } else {
            $elem.append($checkbox)
        }
    })

    // init event
    $elem
        .on('change', '[data-widget-type="checkbox"]', function () {
            var name = $(this).data('widgetName')
            var checked = $(this).is(':checked')

            $elem.find('[data-widget-name="' + name + '"][data-widget-type="text"]')
                .prop('disabled', !checked)

            $.each(value || [], function (index, item) {
                if (item.name === name) {
                    item.checked = checked
                }
            })

            update(value)
        })
        .on('keyup', '[data-widget-type="text"]', function () {
            var name = $(this).data('widgetName')
            var text = this.value
            $.each(value || [], function (index, item) {
                if (item.name === name) {
                    item.text = text
                }
            })

            update(value)
        })

    return $elem
})

// 边框
CustomLabel.addPropsPanelField('border', function (prop, update) {
    var value = prop.value
    var keyMap = { Top: '上', Bottom: '下', Left: '左', Right: '右' }
    var optionValues = ['0px', '1px', '2px', '3px', '4px', '5px']
    var $elem = $('<div></div>')
    var html = ''

    for (var key in value.config) {
        html += [
            '<label class="cl-checkbox">',
                '<input type="checkbox" data-widget-position="' + key + '" data-widget-name="disabled" data-widget-type="checkbox">',
                '显示' + keyMap[key] + '边框',
            '</label>',
            '<div class="cl-form-group-inline">',
                '<div class="cl-form-group">',
                    '<label class="cl-form-group-label">' + keyMap[key] + '边框厚度：</label>',
                    '<select class="cl-select" data-widget-position="' + key + '" data-widget-name="border" data-widget-type="select">',
                        createOptionTpl(optionValues),
                    '</select>',
                '</div>',
                '<div class="cl-form-group">',
                    '<label class="cl-form-group-label">' + keyMap[key] + '边框边距：</label>',
                    '<select class="cl-select" data-widget-position="' + key + '" data-widget-name="padding" data-widget-type="select">',
                        createOptionTpl(optionValues),
                    '</select>',
                '</div>',
            '</div>'
        ].join('')
    }

    $elem.html(html)

    // init data
    $elem.find('[data-widget-position]').each(function () {
        var name = $(this).data('widgetName')
        var type = $(this).data('widgetType')
        var position = $(this).data('widgetPosition')
        var disabled = value.config[position].disabled

        switch (type) {
            case 'checkbox':
                $(this).prop('checked', !disabled)
                break
            case 'select':
                $(this).prop('disabled', disabled).val(value.config[position][name])
                break
        }
    })

    // init event
    $elem
        .on('change', '[data-widget-type="checkbox"]', function () {
            var position = $(this).data('widgetPosition')
            var disabled = !$(this).is(':checked')

            $('[data-widget-position="' + position + '"]:not([data-widget-type="checkbox"])').prop('disabled', disabled)

            value.css['border' + position] = disabled ? 0 : value.config[position].border + ' solid #000'
            value.css['padding' + position] = disabled ? 0 : value.config[position].padding
            value.config[position].disabled = disabled

            update(value)
        })
        .on('change', '[data-widget-name="border"]', function () {
            var name = $(this).data('widgetName')
            var position = $(this).data('widgetPosition')

            value.config[position][name] = this.value
            value.css[name + position] = this.value + ' solid #000'

            update(value)
        })
        .on('change', '[data-widget-name="padding"]', function () {
            var name = $(this).data('widgetName')
            var position = $(this).data('widgetPosition')

            value.config[position][name] = this.value
            value.css[name + position] = this.value

            update(value)
        })

    return $elem
})

CustomLabel.addPropsPanelField('date', function (prop, update) {
    var value = prop.value
    var $elem = $([
        '<div>',
            '<label class="cl-checkbox">',
                value.yearVisible
                    ? '<input type="checkbox" data-widget-value="yearVisible" checked>'
                    : '<input type="checkbox" data-widget-value="yearVisible">',
                '显示年份',
            '</label>',
            '<div class="cl-form-group">',
                '<label class="cl-form-group-label">日期分割符号：</label>',
                '<select class="cl-select" data-widget-value="separator">',
                    createOptionTpl([
                        { value: '-', label: '中横杠（-）' },
                        { value: '/', label: '斜　线（/）' },
                        { value: '.', label: '逗　点（.）' }
                    ], value.separator || '-'),
                '</select>',
            '</div>',
            '<div class="cl-form-group">',
                '<label class="cl-form-group-label">日期对齐方式：</label>',
                '<select class="cl-select" data-widget-name="textAlign" data-widget-type="select">',
                    createOptionTpl([
                        { value: 'left', label: '左对齐' },
                        { value: 'center', label: '居中' },
                        { value: 'right', label: '右对齐' }
                    ], value.css.textAlign),
                '</select>',
            '</div>',
            '<div class="cl-form-group">',
                '<label class="cl-form-group-label">日期文字字体：</label>',
                '<select class="cl-select" data-widget-name="fontFamily" data-widget-type="select">',
                    createOptionTpl(['Arial', 'Helvetica', 'Tahoma', 'Verdana', 'Lucida Grande', 'Times New Roman', 'Georgia'], value.css.fontFamily),
                '</select>',
            '</div>',
            '<div class="cl-form-group">',
                '<label class="cl-form-group-label">日期文字尺寸：</label>',
                '<select class="cl-select" data-widget-name="fontSize" data-widget-type="select">',
                    createOptionTpl(['6px', '8px', '9px', '10px', '11px', '12px', '14px', '16px', '18px', '24px', '30px', '36px', '48px', '60px', '72px'], value.css.fontSize),
                '</select>',
            '</div>',
            '<div class="cl-form-group">',
                '<label class="cl-form-group-label">日期行间距：</label>',
                '<select class="cl-select" data-widget-name="lineHeight" data-widget-type="select">',
                    createOptionTpl([
                        { value: 'normal', label: '默认' },
                        { value: '1', label: '1倍' },
                        { value: '1.5', label: '1.5倍' },
                        { value: '2', label: '2倍' },
                        { value: '2.5', label: '2.5倍' },
                        { value: '3', label: '3倍' }
                    ], value.css.lineHeight),
                '</select>',
            '</div>',
            '<label class="cl-checkbox">',
                value.css.fontWeight === 'bold'
                    ? '<input type="checkbox" data-widget-name="fontWeight" data-widget-type="checkbox" data-widget-default="normal" data-widget-value="bold" checked>'
                    : '<input type="checkbox" data-widget-name="fontWeight" data-widget-type="checkbox" data-widget-default="normal" data-widget-value="bold">',
                '日期文字加粗',
            '</label>',
        '</div>'
    ].join(''))

    $elem
        .on('keyup', '[data-widget-type="text"]', function () {
            var name = $(this).data('widgetName')
            value.css[name] = this.value
            update(value)
        })
        .on('change', '[data-widget-type="select"]', function () {
            var name = $(this).data('widgetName')
            value.css[name] = this.value
            update(value)
        })
        .on('change', '[data-widget-type="checkbox"]', function () {
            var name = $(this).data('widgetName')
            value.css[name] = $(this).is(':checked')
                ? $(this).data('widgetValue') || true
                : $(this).data('widgetDefault') || false
            update(value)
        })
        .on('change', '[data-widget-config="yearVisible"]', function () {
            value.yearVisible = $(this).is(':checked')
            update(value)
        })
        .on('change', '[data-widget-config="separator"]', function () {
            value.separator = this.value
            update(value)
        })

    return $elem
})

// 文本样式
CustomLabel.addPropsPanelField('fontStyle', function (prop, update) {
    var _default = {
        display: 'block',
        textAlign: 'left',
        paddingBottom: '0px',
        fontFamily: 'Arial',
        fontSize: '12px',
        fontWeight: 'normal',
        lineHeight: 'normal'
    }
    var value = prop.value
    var label = prop.label
    var css = $.extend(_default, value.css || {})

    var $elem = $('<div></div>')
    var $formGroup = {}

    // 是否显示 - visible
    $formGroup['visible'] = $([
        '<label class="cl-checkbox">',
            value.visible
                ? '<input type="checkbox" data-widget-value="visible" checked>'
                : '<input type="checkbox" data-widget-value="visible">',
            '<span>显示' + label + '</span>',
        '</label>'
    ].join(''))
    $formGroup['visible'].find('[data-widget-value="visible"]')
        .change(function () {
            var visible = $(this).is(':checked')
            value.visible = visible
            update(value)
        })

    // 文字文本 - text
    $formGroup['text'] = $([
        '<div class="cl-form-group">',
            '<label class="cl-form-group-label">' + label + '文本：</label>',
            '<input class="cl-input" type="text" data-widget-name="text" data-widget-type="text" value="' + value.text + '">',
        '</div>'
    ].join(''))

    // 整行显示 - display
    $formGroup['display'] = $([
        '<label class="cl-checkbox">',
            css.display === 'block'
                ? '<input type="checkbox" data-widget-name="display" data-widget-type="checkbox" data-checked-value="block" data-unchecked-value="inline" checked>'
                : '<input type="checkbox" data-widget-name="display" data-widget-type="checkbox" data-checked-value="block" data-unchecked-value="inline">',
            '<span>' + label + '整行显示</span>',
        '</label>'
    ].join(''))
    $formGroup['display'].find('[data-widget-name]')
        .change(function () {
            var display = $(this).is(':checked') ? 'block' : 'none'
            $formGroup['textAlign'].css('display', display)
            $formGroup['paddingBottom'].css('display', display)
        })

    // 对齐方式 - textAlign
    $formGroup['textAlign'] = $([
        '<div class="cl-form-group">',
            '<label class="cl-form-group-label">' + label + '对齐方式：</label>',
            '<select class="cl-select" data-widget-name="textAlign" data-widget-type="select">',
                createOptionTpl([
                    { value: 'left', label: '左对齐' },
                    { value: 'center', label: '居中' },
                    { value: 'right', label: '右对齐' }
                ], css.textAlign),
            '</select>',
        '</div>'
    ].join(''))
    $formGroup['textAlign'].css('display', css.display === 'inline' ? 'none' : 'block')

    // 与内容间距 - paddingBottom
    $formGroup['paddingBottom'] = $([
        '<div class="cl-form-group">',
            '<label class="cl-form-group-label">' + label + '与内容间距：</label>',
            '<select class="cl-select" data-widget-name="paddingBottom" data-widget-type="select">',
                createOptionTpl(['0px', '1px', '2px', '3px', '4px', '5px'], css.paddingBottom),
            '</select>',
        '</div>'
    ].join(''))
    $formGroup['paddingBottom'].css('display', css.display === 'inline' ? 'none' : 'block')

    // 文字字体 - fontFamily
    $formGroup['fontFamily'] = $([
        '<div class="cl-form-group">',
            '<label class="cl-form-group-label">' + label + '文字字体：</label>',
            '<select class="cl-select" data-widget-name="fontFamily" data-widget-type="select">',
                createOptionTpl(['Arial', 'Helvetica', 'Tahoma', 'Verdana', 'Lucida Grande', 'Times New Roman', 'Georgia'], css.fontFamily),
            '</select>',
        '</div>'
    ].join(''))

    // 文字尺寸 - fontSize
    $formGroup['fontSize'] = $([
        '<div class="cl-form-group">',
            '<label class="cl-form-group-label">' + label + '文字尺寸：</label>',
            '<select class="cl-select" data-widget-name="fontSize" data-widget-type="select">',
                createOptionTpl(['6px', '8px', '9px', '10px', '11px', '12px', '14px', '16px', '18px', '24px', '30px', '36px', '48px', '60px', '72px'], css.fontSize),
            '</select>',
        '</div>'
    ].join(''))

    // 行间距 - lineHeight
    $formGroup['lineHeight'] = $([
        '<div class="cl-form-group">',
            '<label class="cl-form-group-label">' + label + '行间距：</label>',
            '<select class="cl-select" data-widget-name="lineHeight" data-widget-type="select">',
                createOptionTpl([
                    { value: 'normal', label: '默认' },
                    { value: '1', label: '1倍' },
                    { value: '1.5', label: '1.5倍' },
                    { value: '2', label: '2倍' },
                    { value: '2.5', label: '2.5倍' },
                    { value: '3', label: '3倍' }
                ], css.lineHeight),
            '</select>',
        '</div>'
    ].join(''))

    // 文字加粗 - fontWeight
    $formGroup['fontWeight'] = $([
        '<label class="cl-checkbox">',
            css.fontWeight === 'bold'
                ? '<input type="checkbox" data-widget-name="fontWeight" data-widget-type="checkbox" data-checked-value="bold" data-unchecked-value="normal" checked>'
                : '<input type="checkbox" data-widget-name="fontWeight" data-widget-type="checkbox" data-checked-value="bold" data-unchecked-value="normal">',
            '<span>' + label + '文字加粗</span>',
        '</label>'
    ].join(''))

    // 前缀 - prefix
    $formGroup['prefix'] = $([
        '<div class="cl-form-group">',
            '<label class="cl-form-group-label">' + label + '前缀：</label>',
            '<input class="cl-input" type="text" data-widget-name="prefix" data-widget-type="text" value="' + value.prefix + '">',
        '</div>'
    ].join(''))

    // init data
    $.each(prop.option || [], function (index, item) {
        $formGroup[item]
            .appendTo($elem)
            .find('[data-widget-name]')
            .prop('disabled', !value.visible)
    })

    // init event
    $elem
        .on('change', '[data-widget-value="visible"]', function () {
            var checked = $(this).is(':checked')
            for (var key in $formGroup) {
                $formGroup[key].find('[data-widget-type]').prop('disabled', !checked)
            }
        })
        .on('keyup', '[data-widget-type="text"]', function () {
            var widgetName = $(this).data('widgetName')
            var widgetValue = this.value
            value[widgetName] = widgetValue
            update(value)
        })
        .on('change', '[data-widget-type="checkbox"]', function () {
            var widgetName = $(this).data('widgetName')
            var checkedValue = $(this).data('checkedValue')
            var uncheckedValue = $(this).data('uncheckedValue')
            var checked = $(this).is(':checked')
            value.css[widgetName] = checked ? checkedValue : uncheckedValue
            update(value)
        })
        .on('change', '[data-widget-type="select"]', function () {
            var widgetName = $(this).data('widgetName')
            var widgetValue = this.value
            value.css[widgetName] = widgetValue
            update(value)
        })

    return $elem
})

// 表格内容
CustomLabel.addPropsPanelField('tableRow', function (prop, update) {
    var option = prop.option
    var label = prop.label
    var value = prop.value
    var $elem = $('<div></div>')

    var theadText = $([
        '<div class="cl-form-group">',
            '<label class="cl-form-group-label">' + label + '表头文字：</label>',
            '<textarea class="cl-textarea" data-widget-name="text" data-widget-type="textarea">' + value.text + '</textarea>',
        '</div>'
    ].join(''))
    theadText.appendTo($elem)

    var $typeSelect = $([
        '<div class="cl-form-group">',
            '<label class="cl-form-group-label">' + label + '显示内容：</label>',
            '<select class="cl-select" data-widget-name="type" data-widget-type="select">',
                createOptionTpl([
                    { label: '多字段组合', value: 'fields' },
                    { label: '自定义内容', value: 'const' }
                ], value.type),
            '</select>',
        '</div>'
    ].join(''))

    var $checkboxList = $('<div class="cl-form-group"><label class="cl-form-group-label">选择显示字段：</label></div>')
    $.each(option.fields || [], function (index, item) {
        var $checkbox = $([
            '<label class="cl-checkbox">',
                '<input type="checkbox" data-widget-field="' + item.field + '">',
                '<span>' + item.label + '</span>',
            '</label>'
        ].join(''))
        $checkbox.appendTo($checkboxList)
    })
    $.each(value.fields || [], function (index, field) {
        $checkboxList.find('[data-widget-field="' + field + '"]')
            .prop('checked', true)
    })

    var $textarea = $([
        '<label class="cl-form-group-label">自定义文字内容：</label>',
        '<textarea class="cl-textarea" data-widget-name="const" data-widget-type="textarea">' + value.const + '</textarea>'
    ].join(''))

    // init document
    switch (value.type) {
        case 'fields':
            $elem.append([$typeSelect, $checkboxList])
            break
        case 'const':
            $elem.append([$typeSelect, $textarea])
            break
    }

    // init event
    $elem
        .on('keyup', '[data-widget-type="textarea"]', function () {
            var widgetName = $(this).data('widgetName')
            value[widgetName] = this.value
            update(value)
        })
        .on('change', '[data-widget-type="select"]', function () {
            var widgetName = $(this).data('widgetName')
            value[widgetName] = this.value
            update(value)
        })
        .on('change', '[data-widget-field]', function () {
            var fields = []
            $checkboxList.find('[data-widget-field]').each(function () {
                var widgetField = $(this).data('widgetField')
                var isChecked = $(this).is(':checked')
                if (isChecked) {
                    fields.push(widgetField)
                }
                $(this).prop('disabled', false)
            })

            if (fields.length === 1) {
                $checkboxList.find('[data-widget-field="' + fields[0] + '"]')
                    .prop('disabled', true)
            }

            value.fields = fields
            update(value)
        })
        .on('change', '[data-widget-name="type"]', function() {
            switch (this.value) {
                case 'fields':
                    $textarea.remove()
                    $elem.append($checkboxList)
                    break
                case 'const':
                    $checkboxList.remove()
                    $elem.append($textarea)
                    break
            }
        })

    return $elem
})

// 文件上传
CustomLabel.addPropsPanelField('fileUpload', function (prop, update) {
    var prop = $.extend({
        option: {
            maxSize: 1024000,
            reg: ''
        }
    }, prop)

    var value = prop.value
    var label = prop.label
    var option = prop.option
    var host = 'http://172.16.0.126:888'
    var $elem = $('<div></div>')

    var $fileUpload = $([
        '<div class="cl-form-group">',
            '<label class="cl-form-group-label">选择' + label + '：</label>',
            '<input class="cl-input" id="templetfile" type="file" value="' + value + '">',
        '</div>'
    ].join(''))
    $fileUpload
        .on('change', '[type="file"]', function () {
            if (window.File && window.FileList) {
                var	files = document.getElementById("templetfile").files;

                // 限制上传文件大小
                if (files[0].size >= option.maxSize) {
                    alert('图片容量过大，单张图片容量不能大于1MB！')
                    return false
                }

                //文件格式过滤
                var reg = new RegExp(option.reg, 'i')
                if(option.reg && !reg.test(files[0].type)){
                    console.log('请上传正确类型的文件')
                    return false
                }

                $.ajaxFileUpload({
                    url: host + '/api/upload_img',
                    secureuri: false,
                    fileElementId: 'file',
                    dataType: 'json',
                    success: function (data, status) {
                        console.log('上传成功')
                        console.log(data)
                    },
                    error: function (data, status, e) {
                        console.log('上传失败')
                    }
                })
            } else {
                alert('浏览器无法上传')
            }
        })
        .appendTo($elem)

    return $elem
})

// ================ common ====================
function createOptionTpl(options, value) {
    return options.map(function (option) {
        if (typeof option === 'object') {
            return option.value === value
                ? '<option value="' + option.value + '" selected>' + option.label + '</option>'
                : '<option value="' + option.value + '">' + option.label + '</option>'
        } else {
            return option === value
                ? '<option value="' + option + '" selected>' + option + '</option>'
                : '<option value="' + option + '">' + option + '</option>'
        }
    }).join('')
}
