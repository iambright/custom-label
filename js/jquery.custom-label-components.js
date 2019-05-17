/**
 * Created by Bright on 2019/1/14.
 */

// ============ 组件 =======================================================

/**
 * @author wwhyes <wwhyes@ecgtool.com>
 *
 * @property {object}   _default
 * @property {string}   _default.type                - 创建模板类型
 * @property {string}   _default.name                - 请求数据使用的字段名
 * @property {string}   _default.group               - 默认分组
 * @property {string}   _default.icon                - 默认图标
 * @property {string}   _default.label               - 默认名称
 * @property {object}   _default.config              -
 * @property {object}   _default.config.props        -
 * @property {string}   _default.config.props.groups - 右侧属性分组
 * @property {string}   _default.config.props.label  -
 * @property {string}   _default.config.props.type   -
 * @property {string}   _default.config.props.value  -
 * @property {object[]} _default.config.props.option -
 * @property {object}   _default.config.css          - 默认外观信息
 * @property {object}   _default.option              - 默认外观设置
 * @property {boolean}  _default.option.resize       - 可否改变大小
 * @property {boolean}  _default.option.move         - 可否移动
 * @property {callback} _default.dataFormat          - 数据mapping，将请求接口的数据mapping到自己需要的格式和字段
 * @property {callback} _default.render              - 返回组件HTML
 *
 * @func CreateComponent
 * @param {object} opts
 * @param {string} opts.type   - 创建模板类型
 * @param {string} opts.name   - 请求数据使用的字段名
 * @param {string} opts.group  - 组件分组
 * @param {string} opts.icon   - 组件图标
 * @param {string} opts.image  - 组件图片
 * @param {string} opts.label  - 组件名称
 * @param {ojbect} opts.config - 组件配置
 * @description 这是一个生成组件的方法
 */

function CreateComponent (opts) {
    var _default = $.extend({
        type: 'text',
        name: 'common',
        group: '常用元素',
        label: '自定义字段'
    }, opts || {})

    /**
     * @property {string} text        - 固定字段
     * @property {string} info        - 商品信息
     * @property {string} date        - 打印日期
     * @property {string} qrcode      - 二维码
     * @property {string} barcode     - 条形码
     * @property {string} image       - 产品图片
     * @property {string} table       - 配货清单
     * @property {string} declaration - 报关物品
     * @property {string} resetImage  - 预设图片
     */
    switch (_default.type) {
        case 'text':
            return $.extend(true, {}, this.text, _default)
        case 'info':
            return $.extend(true, {}, this.info, _default)
        case 'date':
            return $.extend(true, {}, this.date, _default)
        case 'qrcode':
            return $.extend(true, {}, this.qrcode, _default)
        case 'barcode':
            return $.extend(true, {}, this.barcode, _default)
        case 'image':
            return $.extend(true, {}, this.image, _default)
        case 'table':
            return $.extend(true, {}, this.table, _default)
        case 'declaration':
            return $.extend(true, {}, this.declaration, _default)
        case 'resetImage':
            return $.extend(true, {}, this.resetImage, { config: { data: { imgPath: _default.image } } }, _default)
    }
}

CreateComponent.prototype = {
    text: {
        icon: 'icon-type',
        config: {
            data: { text: '固定字段值' },
            props: {
                title: {
                    group: '标题',
                    label: '标题',
                    type: 'fontStyle',
                    option: [
                        'visible',
                        'text',
                        'display',
                        'textAlign',
                        'paddingBottom',
                        'fontFamily',
                        'fontSize',
                        'lineHeight',
                        'fontWeight'
                    ],
                    value: {
                        visible: true,
                        text: '自定义标题',
                        css: {
                            paddingRight: '10px',
                            display: 'inline-block',
                            fontFamily: 'Helvetica',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            textAlign: 'left',
                            marginBottom: '0px',
                            lineHeight: 'normal'
                        }
                    }
                },
                content: {
                    group: '内容', // 属性分类
                    label: '内容',
                    type: 'fontStyle',
                    option: [
                        'textAlign',
                        'fontFamily',
                        'fontSize',
                        'lineHeight',
                        'fontWeight'
                    ],
                    value: {
                        visible: true,
                        css: {
                            display: 'block',
                            fontSize: '16px',
                            fontFamily: 'Helvetica',
                            textAlign: 'left',
                            fontWeight: 'normal',
                            lineHeight: '1',
                            wordBreak: 'break-all'
                        }
                    }
                },
                border: {
                    group: '边框', // 属性分类
                    label: '边框',
                    type: 'border',
                    value: {
                        config: {
                            Top: { disabled: true, border: '0px', padding: '0px' },
                            Bottom: { disabled: true, border: '0px', padding: '0px' },
                            Left: { disabled: true, border: '0px', padding: '0px' },
                            Right: { disabled: true, border: '0px', padding: '0px' }
                        },
                        css: {
                            borderTop: 0,
                            borderBottom: 0,
                            borderLeft: 0,
                            borderRight: 0,
                            paddingTop: '0px',
                            paddingBottom: '0px',
                            paddingLeft: '0px',
                            paddingRight: '0px'
                        }
                    }
                }
            },
            css: { // 默认外观信息
                width: '200px',
                fontSize: '12px'
            }
        },
        dataFormat: function (res) {
            // return res.data[this.name]
        },
        render: function (config) {
            var $elem = $('<div class="cl-widget-container"></div>')
            var elemCss = $.extend(config.props.content.value.css, config.props.border.value.css)

            $elem.css(elemCss)

            var $title = $('<label data-name="title"></label>')
            $title
                .toggleClass('js-hide', !config.props.title.value.visible)
                .text(config.props.title.value.text)
                .css(config.props.title.value.css)
                .appendTo($elem)

            var $content = $('<span data-name="content"></span>')
            $content
                .text(config.data.text)
                .appendTo($elem)

            return $elem
        }
    },
    info: {
        icon: 'icon-list',
        config: {
            data: {},
            props: {
                content: {
                    group: '内容', // 属性分类
                    label: '文本内容',
                    type: 'fontStyle',
                    option: ['textAlign', 'fontFamily', 'fontSize', 'lineHeight'],
                    value: {
                        visible: true,
                        css: { fontSize: '16px', fontFamily: 'Helvetica', textAlign: 'left', fontWeight: 'normal', lineHeight: 'normal' }
                    }
                },
                fields: {
                    group: '字段',
                    label: '样式设置',
                    type: 'checkboxList',
                    option: { eidt: false, title: '字段样式设置：' },
                    value: [
                        { checked: true, name: 'username', label: '显示客户姓名', text: '大帝至尊' },
                        { checked: true, name: 'phone', label: '显示电话', text: '13800138000' },
                        { checked: true, name: 'email', label: '显示电子邮件', text: 'ddzz@email.com' },
                        { checked: true, name: 'post', label: '显示邮编', text: '518000' },
                        { checked: true, name: 'country', label: '显示国家', text: '中华人民共和国' },
                        { checked: true, name: 'province', label: '显示省份', text: '广东省' },
                        { checked: true, name: 'city', label: '显示城市', text: '深圳市' },
                        { checked: true, name: 'state', label: '显示地区', text: '南山区' },
                        { checked: true, name: 'address1', label: '显示地址1', text: '第一个地址' },
                        { checked: true, name: 'address2', label: '显示地址2', text: '第二个地址' }
                    ]
                },
                fieldStyle: {
                    group: '字段',
                    label: '字段换行设置：',
                    type: 'checkboxList',
                    option: { eidt: false, title: '字段换行设置：' },
                    value: [
                        { checked: true, name: 'display', label: '单字段换行' }
                    ]
                },
                border: {
                    group: '边框', // 属性分类
                    label: '边框',
                    type: 'border',
                    value: {
                        config: {
                            Top: { disabled: true, border: '0px', padding: '0px' },
                            Bottom: { disabled: true, border: '0px', padding: '0px' },
                            Left: { disabled: true, border: '0px', padding: '0px' },
                            Right: { disabled: true, border: '0px', padding: '0px' }
                        },
                        css: {
                            borderTop: 0,
                            borderBottom: 0,
                            borderLeft: 0,
                            borderRight: 0,
                            paddingTop: '0px',
                            paddingBottom: '0px',
                            paddingLeft: '0px',
                            paddingRight: '0px'
                        }
                    }
                }
            },
            css: {
                width: '250px',
                height: 'auto',
                fontSize: '12px'
            }
        },
        dataFormat: function (res) {
            return res.data.userInfo
        },
        render: function (config) {
            var $elem = $('<div class="cl-widget-container"></div>')
            var elemCss = $.extend(config.props.content.value.css, config.props.border.value.css)
            $elem.css(elemCss)

            var fieldCss = config.props.fieldStyle.value[0].checked
                ? { paddingRight: '5px', display: 'block' }
                : { paddingRight: '5px', display: 'inline-block' }

            $.each(config.props.fields.value, function (index, item) {
                if (item.checked) {
                    var $fieldSpan = $('<span></span>')
                    $fieldSpan
                        .text(item.text)
                        .css(fieldCss)
                        .appendTo($elem)
                }
            })

            return $elem
        }
    },
    date: {
        icon: 'icon-calendar',
        config: {
            data: {
                year: '2019',
                month: '05',
                day: '15'
            },
            props: { // 属性面板配置
                title: {
                    group: '标题', // 属性分类
                    label: '标题',
                    type: 'fontStyle',
                    option: [
                        'visible',
                        'text',
                        'display',
                        'textAlign',
                        'paddingBottom',
                        'fontFamily',
                        'fontSize',
                        'lineHeight',
                        'fontWeight'
                    ],
                    value: {
                        visible: true,
                        text: '自定义标题',
                        css: {
                            paddingRight: '10px',
                            display: 'inline-block',
                            fontFamily: 'Helvetica',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            textAlign: 'left',
                            marginBottom: '0px',
                            lineHeight: 'normal'
                        }
                    }
                },
                content: {
                    group: '日期', // 属性分类
                    label: '文本内容',
                    type: 'date',
                    value: {
                        yearVisible: true,
                        separator: '-',
                        css: {
                            fontSize: '16px',
                            fontFamily: 'Helvetica',
                            textAlign: 'left',
                            lineHeight: 'normal',
                            wordBreak: 'break-all'
                        }
                    }
                },
                border: {
                    group: '边框', // 属性分类
                    label: '上边框',
                    type: 'border',
                    value: {
                        config: {
                            Top: { disabled: true, border: '0px', padding: '0px' },
                            Bottom: { disabled: true, border: '0px', padding: '0px' },
                            Left: { disabled: true, border: '0px', padding: '0px' },
                            Right: { disabled: true, border: '0px', padding: '0px' }
                        },
                        css: {
                            borderTop: 0,
                            borderBottom: 0,
                            borderLeft: 0,
                            borderRight: 0,
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 0,
                            paddingRight: 0
                        }
                    }
                }
            },
            css: { // 默认外观信息
                width: '200px',
                fontSize: '12px'
            }
        },
        dataFormat: function (res) {
            return res.data[this.name]
        },
        render: function (config) {
            var $elem = $('<div class="cl-widget-container"></div>')
            var elemCss = $.extend(config.props.content.value.css, config.props.border.value.css)

            $elem.css(elemCss)

            var $title = $('<label data-name="title"></label>')
            $title
                .toggleClass('js-hide', !config.props.title.value.visible)
                .text(config.props.title.value.text)
                .css(config.props.title.value.css)
                .appendTo($elem)

            var $content = $('<span data-name="content"></span>')
            var year = config.data.year
            var month = config.data.month
            var day = config.data.day
            var yearVisible = config.props.content.value.yearVisible
            var separator = config.props.content.value.separator
            var contentText = yearVisible ? year + separator : ''
            contentText += month + separator + day
            $content
                .text(contentText)
                .appendTo($elem)

            return $elem
        }
    },
    qrcode: {
        icon: 'icon-qr-code',
        config: {
            data: { imgPath: '/img/img_qrcode.png' },
            props: {
                code: {
                    group: '代码',
                    label: '二维码代码',
                    type: 'fontStyle',
                    option: [
                        'visible',
                        'textAlign',
                        'fontFamily',
                        'fontSize',
                        'fontWeight',
                        'prefix'
                    ],
                    value: {
                        visible: false,
                        prefix: '',
                        css: {
                            fontFamily: 'Airal',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            whiteSpace: 'nowrap'
                        }
                    }
                }
            },
            css: {
                width: '50px',
                height: '50px'
            }
        },
        dataFormat: function (res) {
            return res.data[this.name]
        },
        render: function (config) {
            var $elem = $('<div class="cl-widget-container"></div>')

            var $qrcode = $('<img src="' + config.data.imgPath + '">')
            $qrcode
                .css('width', '100%')
                .appendTo($elem)

            var $code = $('<p><span>' + config.props.code.value.prefix + '</span><span>888888</span></p>')
            $code
                .toggleClass('js-hide', !config.props.code.value.visible)
                .css(config.props.code.value.css)
                .appendTo($elem)

            return $elem
        }
    },
    barcode: {
        icon: 'icon-bar-code',
        config: {
            data: { imgPath: '/img/img_barcode.jpg' },
            props: {
                code: {
                    group: '代码', // 属性分类
                    label: '条码代码',
                    type: 'fontStyle',
                    option: [
                        'visible',
                        'textAlign',
                        'fontFamily',
                        'fontSize',
                        'fontWeight',
                        'prefix'
                    ],
                    value: {
                        visible: true,
                        prefix: '',
                        css: {
                            fontFamily: 'Airal',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            whiteSpace: 'nowrap'
                        }
                    }
                }
            },
            css: { // 默认外观信息
                width: '150px',
                height: 'auto'
            }
        },
        dataFormat: function (res) {
            return res.data[this.name]
        },
        render: function (config) {
            var $elem = $('<div class="cl-widget-container"></div>')

            var $qrcode = $('<img src="' + config.data.imgPath + '">')
            $qrcode
                .css('width', '100%')
                .appendTo($elem)

            var $code = $('<p><span>' + config.props.code.value.prefix + '</span><span>888888</span></p>')
            $code
                .toggleClass('js-hide', !config.props.code.value.visible)
                .css(config.props.code.value.css)
                .appendTo($elem)

            return $elem
        }
    },
    image: {
        icon: 'icon-image',
        config: {
            data: { imgPath: '/img/img_product.jpg' },
            props: {
                border: {
                    group: '边框', // 属性分类
                    label: '边框',
                    type: 'border',
                    value: {
                        config: {
                            Top: { disabled: true, border: '0px', padding: '0px' },
                            Bottom: { disabled: true, border: '0px', padding: '0px' },
                            Left: { disabled: true, border: '0px', padding: '0px' },
                            Right: { disabled: true, border: '0px', padding: '0px' }
                        },
                        css: {
                            borderTop: 0,
                            borderBottom: 0,
                            borderLeft: 0,
                            borderRight: 0,
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 0,
                            paddingRight: 0
                        }
                    }
                }
            },
            css: { // 默认外观信息
                width: '200px',
                height: 'auto',
                fontSize: '12px'
            }
        },
        dataFormat: function (res) {
            return res.data[this.name]
        },
        render: function (config) {
            var $productImg = $('<img src="' + config.data.imgPath + '" style="width: 100%">')
            var $elem = $('<div class="cl-widget-container"></div>')
            $elem
                .css(config.props.border.value.css)
                .append($productImg)

            return $elem
        }
    },
    resetImage: {
        config: {
            data: { imgPath: '' },
            props: {
                border: {
                    group: '边框', // 属性分类
                    label: '边框',
                    type: 'border',
                    value: {
                        config: {
                            Top: { disabled: true, border: '0px', padding: '0px' },
                            Bottom: { disabled: true, border: '0px', padding: '0px' },
                            Left: { disabled: true, border: '0px', padding: '0px' },
                            Right: { disabled: true, border: '0px', padding: '0px' }
                        },
                        css: {
                            borderTop: 0,
                            borderBottom: 0,
                            borderLeft: 0,
                            borderRight: 0,
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 0,
                            paddingRight: 0
                        }
                    }
                }
            },
            css: { // 默认外观信息
                width: '200px',
                fontSize: '12px'
            }
        },
        dataFormat: function (res) {
            return res.data[this.name]
        },
        render: function (config) {
            var $img = $('<img src="' + config.data.imgPath + '" style="width: 100%;height: 100%">')
            var $elem = $('<div class="cl-widget-container"></div>')
            $elem
                .css(config.props.border.value.css)
                .append($img)

            return $elem
        }
    },
    table: {
        icon: 'icon-list-alt',
        config: {
            data: [
                { no: 1, qty: 1, product_name: '儿童用品 children products A001 x1', kg: '0.02' },
                { no: 2, qty: 1, product_name: '儿童用品 children products A001 x1', kg: '0.05' },
                { no: 3, qty: 1, product_name: '儿童用品 children products A001 x1', kg: '0.02' }
            ],
            props: {
                tableBorder: {
                    group: '表格',
                    label: '显示表格框线',
                    type: 'checkbox',
                    value: true
                },
                thead: {
                    group: '表格',
                    label: '表头',
                    type: 'fontStyle',
                    option: [
                        'visible',
                        'fontFamily',
                        'fontSize'
                    ],
                    value: {
                        visible: true,
                        css: {}
                    }
                },
                tfoot: {
                    group: '表格',
                    label: '脚注',
                    type: 'fontStyle',
                    option: ['visible', 'fontFamily', 'fontSize'],
                    value: {
                        visible: true,
                        text: '1个商品种类 3件商品',
                        css: {
                            textAlign: 'right'
                        }
                    }
                },
                fields: {
                    group: '字段',
                    label: '显示字段',
                    type: 'checkboxList',
                    option: { edit: true, title: false },
                    value: [
                        { checked: true, name: 'no', label: '序号', text: 'No', width: 40 },
                        { checked: true, name: 'qty', label: '数量', text: 'Qty', width: 40 },
                        { checked: true, name: 'product_name', label: '名称', text: 'DescriptionContents', width: 'auto' },
                        { checked: true, name: 'kg', label: '重量', text: 'Kg', width: 40 }
                    ]
                }
            },
            css: {
                width: '100%',
                height: 'auto'
            }
        },
        option: {
            resize: false,
            move: true
        },
        dataFormat: function (res) {
            return res.data[this.name]
        },
        render: function (config) {
            var $elem = $('<div class="cl-widget-container"></div>')
            var $table = $('<table></table>')
            $table
                .css({
                    width: '100%',
                    textAlign: 'center',
                    wordbreak: 'break-all',
                    tableLayout: 'fixed',
                    borderCollapse: 'collapse'
                })
                .attr({
                    border: config.props.tableBorder.value ? 1 : 0,
                    cellpadding: 0,
                    cellspacing: 0
                })
                .appendTo($elem)
            var tdLength = 0

            // thead
            var $thead = $('<thead></thead>')
            var $theadTr = $('<tr></tr>')
            $.each(config.props.fields.value || [], function (index, field) {
                if (field.checked) {
                    tdLength++
                    var $theadTh = $('<th>' + field.text + '</th>')
                    $theadTh
                        .attr('width', field.width || 'auto')
                        .css('overflow', 'hidden')
                        .appendTo($theadTr)
                }
            })
            $thead
                .toggleClass('js-hide', !config.props.thead.value.visible)
                .css(config.props.thead.value.css)
                .append($theadTr)
                .appendTo($table)

            // tbody
            var $tbody = $('<tbody></tbody>')
            $.each(config.data || [], function (i, item) {
                var $tr = $('<tr></tr>')
                $.each(config.props.fields.value || [], function (j, field) {
                    if (field.checked) {
                        var $td = $('<td>' + item[field.name] + '</td>')
                        $td
                            .attr('width', field.width || 'auto')
                            .appendTo($tr)
                    }
                })
                $tr.appendTo($tbody)
            })
            $tbody.appendTo($table)

            // tfoot
            var $tfoot = $('<tfoot><tr><td colspan="' + tdLength + '">' + config.props.tfoot.value.text + '</td></tr></tfoot>')
            $tfoot
                .toggleClass('js-hide', !config.props.tfoot.value.visible)
                .css(config.props.tfoot.value.css)
                .appendTo($table)

            return $elem
        }
    },
    declaration: {
        icon: 'icon-list-alt',
        config: {
            data: [
                { no: 1, qty: 1, product_name_cn: '儿童用品', product_name_en: 'children products', sku: 'A001', num: 'x1', kg: '0.02' },
                { no: 2, qty: 1, product_name_cn: '儿童用品', product_name_en: 'children products', sku: 'A001', num: 'x1', kg: '0.02' },
                { no: 3, qty: 1, product_name_cn: '儿童用品', product_name_en: 'children products', sku: 'A001', num: 'x1', kg: '0.02' }
            ],
            props: {
                tableBorder: {
                    group: '表格',
                    label: '显示表格框线',
                    type: 'checkbox',
                    value: true
                },
                thead: {
                    group: '表格',
                    label: '表头',
                    type: 'fontStyle',
                    option: [
                        'visible',
                        'fontFamily',
                        'fontSize'
                    ],
                    value: {
                        visible: true,
                        css: {}
                    }
                },
                row1: {
                    group: '字段',
                    label: '序号',
                    type: 'tableRow',
                    option: {
                        text: true
                    },
                    value: {
                        width: '40',
                        text: 'No',
                        fields: ['no']
                    }
                },
                row2: {
                    group: '字段',
                    label: '报关物品数量',
                    type: 'tableRow',
                    option: {
                        text: true
                    },
                    value: {
                        width: '40',
                        text: 'Qty',
                        fields: ['qty']
                    }
                },
                row3: {
                    group: '字段',
                    label: '报关品名',
                    type: 'tableRow',
                    option: {
                        text: true,
                        fields: [
                            { label: '申报品名中文', field: 'product_name_cn' },
                            { label: '申报品名英文', field: 'product_name_en' },
                            { label: '商品SKU', field: 'sku' },
                            { label: '商品数量', field: 'num' }
                        ]
                    },
                    value: {
                        width: 'auto',
                        text: 'DescriptionContents',
                        fields: ['product_name_cn', 'product_name_en'],
                        type: 'fields',
                        const: '自定义文本'
                    }
                }
            },
            css: {
                width: '100%',
                height: 'auto'
            }
        },
        option: {
            resize: false,
            move: true
        },
        dataFormat: function (res) {
            return res.data[this.name]
        },
        render: function (config) {
            var $elem = $('<div class="cl-widget-container"></div>')

            // table
            var $table = $('<table></table>')
            $table
                .css({
                    width: '100%',
                    textAlign: 'center',
                    wordbreak: 'break-all',
                    // tableLayout: 'fixed',
                    borderCollapse: 'collapse'
                })
                .attr({
                    border: config.props.tableBorder.value ? 1 : 0,
                    cellpadding: 0,
                    cellspacing: 0
                })
                .appendTo($elem)

            var tableRows = []
            $.each(config.props, function (key, item) {
                if (item.type === 'tableRow') {
                    tableRows.push(item.value)
                }
            })

            // thead
            var $thead = $('<thead></thead>')
            var $tr = $('<tr></tr>')
            $.each(tableRows || [], function (key, row) {
                var $th = $('<th></th>')
                $th
                    .text(row.text)
                    .attr('width', row.width)
                    .css('white-space', 'pre')
                    .appendTo($tr)
            })
            $tr.appendTo($thead)
            $thead
                .css(config.props.thead.value.css)
                .appendTo($table)

            // tbody
            var $tbody = $('<tbody></tbody>')
            $.each(config.data || [], function (i, item) {
                var $tr = $('<tr></tr>')
                $.each(tableRows || [], function (j, row) {
                    var $td = $('<td></td>')
                    if (row.type === 'const') {
                        $td.append('<span style="white-space:pre">' + row.const + '</span>')
                    } else {
                        $.each(row.fields || [], function (k, field) {
                            $td.append('<span style="padding-right:5px">' + item[field] + '</span>')
                        })
                    }
                    $td
                        .attr('width', row.width)
                        .appendTo($tr)
                })
                $tr.appendTo($tbody)
            })
            $tbody.appendTo($table)

            return $elem
        }
    }
}

CustomLabel.addComponents([
    {
        name: 'x-line',
        group: '常用元素',
        icon: 'icon-resize-horizontal',
        label: '水平直线',
        config: {
            data: {},
            props: {
                width: {
                    group: '文字', // 属性分类
                    label: '宽度',
                    type: 'text',
                    value: '100%'
                },
                weight: {
                    group: '文字', // 属性分类
                    label: '线条粗细',
                    type: 'select',
                    option: [
                        {
                            text: '1px',
                            value: 1
                        },
                        {
                            text: '2px',
                            value: 2
                        },
                        {
                            text: '3px',
                            value: 3
                        },
                        {
                            text: '4px',
                            value: 4
                        },
                        {
                            text: '5px',
                            value: 5
                        },
                        {
                            text: '6px',
                            value: 6
                        }
                    ],
                    value: 1
                },
                style: {
                    group: '文字', // 属性分类
                    label: '线条样式',
                    type: 'select',
                    option: [
                        {
                            text: '实线',
                            value: 'solid'
                        },
                        {
                            text: '虚线',
                            value: 'dashed'
                        },
                        {
                            text: '点线',
                            value: 'dotted'
                        },
                        {
                            text: '双实线',
                            value: 'double'
                        }
                    ],
                    value: 'solid'
                }
            },
            css: {
                width: '100%',
                height: '5px',
                left: 0
            }
        },
        option: {
            resize: false,
            move: true
        },
        render: function (config) {
            this.css({
                width: config.props.width.value
            })
            var $obj = $('<div class="cl-widget-container"></div>')
            $obj.css({
                width: '100%',
                height: 0,
                borderTop: config.props.weight.value + 'px ' + config.props.style.value + ' #000',
                overflow: 'hidden'
            })
            return $obj
        }
    },
    {
        name: 'y-line',
        group: '常用元素',
        icon: 'icon-resize-vertical',
        label: '垂直直线',
        config: {
            data: {},
            props: {
                height: {
                    group: '文字', // 属性分类
                    label: '高度',
                    type: 'text',
                    value: '100%'
                },
                weight: {
                    group: '文字', // 属性分类
                    label: '线条粗细',
                    type: 'select',
                    option: [
                        {
                            text: '1px',
                            value: 1
                        },
                        {
                            text: '2px',
                            value: 2
                        },
                        {
                            text: '3px',
                            value: 3
                        },
                        {
                            text: '4px',
                            value: 4
                        },
                        {
                            text: '5px',
                            value: 5
                        },
                        {
                            text: '5px',
                            value: 6
                        }
                    ],
                    value: 1
                },
                style: {
                    group: '文字', // 属性分类
                    label: '线条样式',
                    type: 'select',
                    option: [
                        {
                            text: '实线',
                            value: 'solid'
                        },
                        {
                            text: '虚线',
                            value: 'dashed'
                        },
                        {
                            text: '点线',
                            value: 'dotted'
                        },
                        {
                            text: '双实线',
                            value: 'double'
                        }
                    ],
                    value: 'solid'
                }
            },
            css: {
                width: '5px',
                height: '100%',
                top: 0
            }
        },
        option: {
            resize: false,
            move: true
        },
        render: function (config) {
            this.css({ height: config.props.height.value })
            return '<div class="cl-widget-container"><div style="width:0;height:100%;border-left:' + (config.props.weight.value) + 'px ' + (config.props.style.value) + ' #000;overflow:hidden;"></div></div>'
        }
    },
    {
        name: 'local-text',
        group: '常用元素', // 组件分类
        icon: 'icon-type',
        label: '自定义文本框', // 属性面板名字
        config: {
            data: { // 后端接口返回数据
                text: '自定义文本'
            },
            props: { // 属性面板配置
                text: {
                    group: '文字', // 属性分类
                    label: '文本内容',
                    type: 'text',
                    value: '文本内容'
                }
            },
            css: { // 默认外观信息
                width: '100px',
                fontSize: '12px'
            }
        },
        render: function (config) {
            var obj = $('<div class="cl-widget-container">' + config.props.text.value + '</div>')
            return obj
        }
    },
    {
        name: 'round',
        group: '常用元素',
        icon: 'icon-circle-o',
        label: '圆形框',
        config: {
            props: { // 属性面板配置
                text: {
                    group: '文字', // 属性分类
                    label: '文本内容',
                    type: 'text',
                    value: 'A'
                },
                fontSize: {
                    group: '文字', // 属性分类
                    label: '字体大小',
                    type: 'select',
                    option: [
                        {
                            text: '12px',
                            value: 12
                        },
                        {
                            text: '15px',
                            value: 15
                        },
                        {
                            text: '18px',
                            value: 18
                        },
                        {
                            text: '21px',
                            value: 21
                        },
                        {
                            text: '24px',
                            value: 24
                        }
                    ],
                    value: 12
                },
                borderWidth: {
                    group: '文字', // 属性分类
                    label: '边框粗细',
                    type: 'select',
                    option: [
                        {
                            text: '1px',
                            value: 1
                        },
                        {
                            text: '2px',
                            value: 2
                        },
                        {
                            text: '3px',
                            value: 3
                        },
                        {
                            text: '4px',
                            value: 4
                        },
                        {
                            text: '5px',
                            value: 5
                        }
                    ],
                    value: 1
                }
            },
            css: { // 默认外观信息
                width: '30px',
                height: '30px'
            }
        },
        render: function (config) {
            var width = this.getElem().width()
            var obj = $('<div class="cl-widget-container">' + config.props.text.value + '</div>')

            this.css({ height: width })
            obj.css({
                border: config.props.borderWidth.value + 'px solid #000',
                borderRadius: '50%',
                lineHeight: (width - config.props.borderWidth.value * 2) + 'px',
                fontSize: config.props.fontSize.value + 'px',
                textAlign: 'center'
            })
            return obj
        }
    },
    {
        name: 'image',
        group: '常用元素',
        icon: 'icon-image',
        label: '本地图片',
        config: {
            props: { // 属性面板配置
                src: {
                    group: '文字', // 属性分类
                    label: '图片地址',
                    type: 'text',
                    value: './img/img_default.jpg'
                }
            },
            css: { // 默认外观信息
                width: '133px',
                height: '95px'
            }
        },
        render: function (config) {
            var obj = $('<div class="cl-widget-container"><img style="width: 100%;height: 100%;display: block;" src="' + config.props.src.value + '"></div>')
            return obj
        }
    },
    new CreateComponent({ type: 'text', name: 'common', label: 'text-固定字段' }),
    new CreateComponent({ type: 'date', name: 'date', label: 'date-打印日期' }),
    new CreateComponent({ type: 'image', name: 'productImage', label: 'image-商品图片' }),
    new CreateComponent({ type: 'qrcode', name: 'qrcode', label: 'qrcode-商品二维码' }),
    new CreateComponent({ type: 'barcode', name: 'barcode', label: 'barcode-商品条形码' }),
    new CreateComponent({ type: 'resetImage', name: 'reset-01', image: './img/TagPictures/tag01.jpg' }),
    new CreateComponent({ type: 'info', name: 'sender-info', label: 'info-地址信息' }),
    new CreateComponent({ type: 'table', name: 'table-01', label: 'table-普通表格' }),
    new CreateComponent({ type: 'declaration', name: 'table-02', label: 'table-报关物品' })
])
