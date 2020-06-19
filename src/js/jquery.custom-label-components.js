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
        type: 'default',
        name: 'default',
        group: '默认',
        label: '默认'
    }, opts || {})

    /**
     * @property {string} xLine       - 水平直线
     * @property {string} yLine       - 垂直直线
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
        case 'image':
            $.extend(_default, {
                config: {
                    data: {
                        imgPath: _default.image || './img/img_product.jpg'
                    }
                }
            })
            break
    }

    return $.extend(true, {}, this[_default.type], _default)
}

CreateComponent.prototype = {
    xLine: {
        icon: 'icon-resize-horizontal',
        config: {
            data: {},
            props: {
                width: {
                    group: '文字',
                    label: '宽度',
                    type: 'text',
                    value: '100%'
                },
                weight: {
                    group: '文字',
                    label: '线条粗细',
                    type: 'select',
                    option: [
                        { label: '1px', value: 1 },
                        { label: '2px', value: 2 },
                        { label: '3px', value: 3 },
                        { label: '4px', value: 4 },
                        { label: '5px', value: 5 },
                        { label: '6px', value: 6 }
                    ],
                    value: 2
                },
                style: {
                    group: '文字', // 属性分类
                    label: '线条样式',
                    type: 'select',
                    option: [
                        { label: '实线', value: 'solid' },
                        { label: '虚线', value: 'dashed' },
                        { label: '点线', value: 'dotted' },
                        { label: '双实线', value: 'double' }
                    ],
                    value: 'solid'
                }
            },
            css: { width: '100%', height: '5px', left: 0 }
        },
        option: { resize: false, move: true },
        render: function (config) {
            this.css({ width: config.props.width.value })
            var $elem = $('<div class="cl-widget-container"></div>')
                .css({
                    width: '100%',
                    height: 0,
                    borderTop: config.props.weight.value + 'px ' + config.props.style.value + ' #000',
                    overflow: 'hidden'
                })
            return $elem
        }
    },
    yLine: {
        icon: 'icon-resize-vertical',
        config: {
            props: {
                height: {
                    group: '文字',
                    label: '高度',
                    type: 'text',
                    value: '100%'
                },
                weight: {
                    group: '文字',
                    label: '线条粗细',
                    type: 'select',
                    option: [
                        { label: '1px', value: 1 },
                        { label: '2px', value: 2 },
                        { label: '3px', value: 3 },
                        { label: '4px', value: 4 },
                        { label: '5px', value: 5 },
                        { label: '5px', value: 6 }
                    ],
                    value: 2
                },
                style: {
                    group: '文字', // 属性分类
                    label: '线条样式',
                    type: 'select',
                    option: [
                        { label: '实线', value: 'solid' },
                        { label: '虚线', value: 'dashed' },
                        { label: '点线', value: 'dotted' },
                        { label: '双实线', value: 'double' }
                    ],
                    value: 'solid'
                }
            },
            css: { width: '5px', height: '100%', top: 0 }
        },
        option: { resize: false, move: true },
        render: function (config) {
            this.css({ height: config.props.height.value })
            var $elem = $('<div class="cl-widget-container"></div>')
                .css({
                    width: 0,
                    height: '100%',
                    borderLeft: config.props.weight.value + 'px ' + config.props.style.value + ' #000',
                    overflow: 'hidden'
                })
            return $elem
        }
    },
    default: {
        icon: 'icon-type',
        config: {
            data: {
                text: '自定义文本'
            },
            props: {
                text: {
                    group: '文字',
                    label: '文本内容',
                    type: 'textarea',
                    value: '文本内容'
                },
                content: {
                    group: '文字', // 属性分类
                    label: '文本',
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
                            wordBreak: 'break-all',
                            whiteSpace: 'pre'
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
            css: { width: '100px', fontSize: '12px' }
        },
        render: function (config) {
            var elemCss = $.extend({}, config.props.content.value.css, config.props.border.value.css)
            var $elem = $('<div class="cl-widget-container"></div>')
                .text(config.props.text.value)
                .css(elemCss)
            return $elem
        }
    },
    round: {
        icon: 'icon-circle-o',
        config: {
            props: {
                text: {
                    group: '文字',
                    label: '文本内容',
                    type: 'text',
                    value: 'A'
                },
                fontSize: {
                    group: '文字',
                    label: '字体大小',
                    type: 'select',
                    option: [
                        { label: '12px', value: 12 },
                        { label: '15px', value: 15 },
                        { label: '18px', value: 18 },
                        { label: '21px', value: 21 },
                        { label: '24px', value: 24 }
                    ],
                    value: 12
                },
                borderWidth: {
                    group: '文字', // 属性分类
                    label: '边框粗细',
                    type: 'select',
                    option: [
                        { label: '1px', value: 1 },
                        { label: '2px', value: 2 },
                        { label: '3px', value: 3 },
                        { label: '4px', value: 4 },
                        { label: '5px', value: 5 }
                    ],
                    value: 1
                }
            },
            css: { width: '30px', height: '30px' }
        },
        render: function (config) {
            var width = this.getElem().width()
            this.css({ height: width })

            var $elem = $('<div class="cl-widget-container">' + config.props.text.value + '</div>')
                .css({
                    border: config.props.borderWidth.value + 'px solid #000',
                    borderRadius: '50%',
                    lineHeight: (width - config.props.borderWidth.value * 2) + 'px',
                    fontSize: config.props.fontSize.value + 'px',
                    textAlign: 'center'
                })
            return $elem
        }
    },
    text: {
        icon: 'icon-type',
        config: {
            data: {
                field: 'common',
                text: '固定字段值'
            },
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
            return res.data[this.name]
        },
        render: function (config) {
            var $title = $('<label></label>')
                .toggleClass('js-hide', !config.props.title.value.visible)
                .text(config.props.title.value.text)
                .css(config.props.title.value.css)

            var $content = $('<eccang data-name="' + this.opts.name + '.' + config.data.field + '"></eccang>')
                .text(config.data.text)

            var elemCss = $.extend(config.props.content.value.css, config.props.border.value.css)
            var $elem = $('<div class="cl-widget-container"></div>')
                .css(elemCss)
                .append([$title, $content])

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
                        css: {
                            fontSize: '16px',
                            fontFamily: 'Helvetica',
                            textAlign: 'left',
                            fontWeight: 'normal',
                            lineHeight: 'normal',
                            wordBreak: 'break-all'
                        }
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
            var elemCss = $.extend(config.props.content.value.css, config.props.border.value.css)
            var $elem = $('<div class="cl-widget-container"></div>')
                .css(elemCss)

            var fieldCss = config.props.fieldStyle.value[0].checked
                ? { display: 'block' }
                : { paddingRight: '5px', display: 'inline' }
            var dateName = this.opts.name
            $.each(config.props.fields.value, function (index, item) {
                if (item.checked) {
                    $('<eccang data-name="' + dateName + '.' + item.name + '"></eccang>')
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
        render: function (config) {
            var $title = $('<label></label>')
                .toggleClass('js-hide', !config.props.title.value.visible)
                .text(config.props.title.value.text)
                .css(config.props.title.value.css)

            
            var dataName = this.opts.name
            var d = new Date()
            var year = '<eccang data-name="' + dataName + '.year">' + d.getFullYear() + '</eccang>'
            var month = '<eccang data-name="' + dataName + '.month">' + (d.getMonth() + 1) + '</eccang>'
            var day = '<eccang data-name="' + dataName + '.date">' + (d.getDate() + 1) + '</eccang>'
            var yearVisible = config.props.content.value.yearVisible
            var separator = config.props.content.value.separator
            var contentText = yearVisible ? year + separator : ''
            contentText += month + separator + day
            var $content = $('<span></span>')
                .html(contentText)

            var elemCss = $.extend(config.props.content.value.css, config.props.border.value.css)
            var $elem = $('<div class="cl-widget-container"></div>')
                .css(elemCss)
                .append([$title, $content])

            return $elem
        }
    },
    qrcode: {
        icon: 'icon-qr-code',
        config: {
            data: { imgPath: './img/img_qrcode.png' },
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
            var width = this.getElem().width()
            var height = config.props.code.value.visible
                ? width + 20
                : width
            this.css({ height: height })

            var $qrcode = $('<img>')
                .attr('src', config.data.imgPath)
                .css('width', '100%')

            var $code = $('<p></p>')
                .append([
                    '<span>' + config.props.code.value.prefix + '</span>',
                    '<eccang data-name="' + this.opts.name + '">888888</eccang>'
                ])
                .toggleClass('js-hide', !config.props.code.value.visible)
                .css(config.props.code.value.css)
            
            var $elem = $('<div class="cl-widget-container"></div>')
                .append([$qrcode, $code])

            return $elem
        }
    },
    barcode: {
        icon: 'icon-bar-code',
        config: {
            data: { imgPath: './img/img_barcode.jpg' },
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
            var $barcode = $('<img>')
                .attr('src', config.data.imgPath)
                .css('width', '100%')

            var $code = $('<p></p>')
                .append([
                    '<span>' + config.props.code.value.prefix + '</span>',
                    '<eccang data-name="' + this.opts.name + '">888888</eccang>'
                ])
                .toggleClass('js-hide', !config.props.code.value.visible)
                .css(config.props.code.value.css)
            
            var $elem = $('<div class="cl-widget-container"></div>')
                .append([$barcode, $code])

            return $elem
        }
    },
    image: {
        icon: 'icon-image',
        config: {
            data: { imgPath: './img/img_product.jpg' },
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
            var $productImg = $('<img>')
                .css('width', '100%')
                .attr('src', config.data.imgPath)
            
            var $elem = $('<eccang class="cl-widget-container" data-name="' + this.opts.name + '"></eccang>')
                .append([$productImg])
                .css(config.props.border.value.css)

            return $elem
        }
    },
    localImage: {
        icon: 'icon-image',
        config: {
            data: { },
            props: {
                imagePath: {
                    group: '上传',
                    label: '本地图片',
                    type: 'fileUpload',
                    option: {
                        maxSize: 1024000,
                        reg: 'image/\\w+'
                    },
                    value: ''
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
            return null
        },
        render: function (config) {
            var $productImg = $('<img>')
                .css('width', '100%')
                .attr('src', config.props.imagePath.value ? config.props.imagePath.value : './img/img_default.jpg')
            
            var $elem = $('<div class="cl-widget-container"></div>')
                .append([$productImg])
                .css(config.props.border.value.css)

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
                left: 0,
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
            var dataName = this.opts.name

            // thead
            var $theadTr = $('<tr></tr>')
            var tdLength = 0
            $.each(config.props.fields.value || [], function (index, field) {
                if (field.checked) {
                    tdLength++
                    $('<th>' + field.text + '</th>')
                        .attr('width', field.width || 'auto')
                        .css('overflow', 'hidden')
                        .appendTo($theadTr)
                }
            })
            var $thead = $('<thead></thead>')
                .toggleClass('js-hide', !config.props.thead.value.visible)
                .css(config.props.thead.value.css)
                .append($theadTr)

            // tbody
            var $tbody = $('<tbody></tbody>')
            $.each(config.data || [], function (i, item) {
                var $tr = $('<tr></tr>')
                $.each(config.props.fields.value || [], function (j, field) {
                    if (field.checked) {
                        var $td = $('<td></td>')
                        $td
                            .attr('width', field.width || 'auto')
                            .append('<eccang data-name="' + dataName +'.' + field.name + '">' + item[field.name] + '</eccang>')
                            .appendTo($tr)
                    }
                })
                $tr.appendTo($tbody)
            })

            // tfoot
            var $tfoot = $('<tfoot><tr><td colspan="' + tdLength + '">' + config.props.tfoot.value.text + '</td></tr></tfoot>')
                .toggleClass('js-hide', !config.props.tfoot.value.visible)
                .css(config.props.tfoot.value.css)

            // table
            var $table = $('<table></table>')
                .append([$thead, $tbody, $tfoot])
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

            var $elem = $('<div class="cl-widget-container"></div>')
                .append([$table])

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
                left: 0,
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
            var dataName = this.opts.name
            var tableRows = []
            $.each(config.props, function (key, item) {
                if (item.type === 'tableRow') {
                    tableRows.push(item.value)
                }
            })

            // thead
            var $theadTr = $('<tr></tr>')
            $.each(tableRows || [], function (key, row) {
                $('<th></th>')
                    .text(row.text)
                    .attr('width', row.width)
                    .css('white-space', 'pre')
                    .appendTo($theadTr)
            })
            $thead = $('<thead></thead>')
                .append([$theadTr])
                .toggleClass('js-hide', !config.props.thead.value.visible)
                .css(config.props.thead.value.css)

            // tbody
            var $tbody = $('<tbody></tbody>')
            $.each(config.data || [], function (i, item) {
                var $tr = $('<tr></tr>')
                $.each(tableRows || [], function (j, row) {
                    var $td = $('<td width="' + row.width + '"></td>')
                    if (row.type === 'const') {
                        $td.append('<span style="white-space:pre">' + row.const + '</span>')
                    } else {
                        $.each(row.fields || [], function (k, field) {
                            $td.append('<eccang data-name="' + dataName +'.' + field + '" style="padding-right:5px">' + item[field] + '</eccang>')
                        })
                    }
                    $td.appendTo($tr)
                })
                $tr.appendTo($tbody)
            })

            // table
            var $table = $('<table></table>')
                .append([$thead, $tbody])
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

            var $elem = $('<div class="cl-widget-container"></div>')
                .append([$table])

            return $elem
        }
    }
}

CustomLabel.addComponents([
    new CreateComponent({ group: '构图元素', type: 'xLine', name: 'x-line', label: 'xLine - 水平直线' }),
    new CreateComponent({ group: '构图元素', type: 'yLine', name: 'y-line', label: 'yLine - 垂直直线' }),
    new CreateComponent({ group: '构图元素', type: 'default', name: 'custom-text', label: 'default - 自定义文本框' }),
    new CreateComponent({ group: '构图元素', type: 'round', name: 'round', label: 'round - 圆形框' }),
    new CreateComponent({ type: 'text', name: 'common', label: 'text - 固定字段' }),
    new CreateComponent({ type: 'date', name: 'date', label: 'date - 打印日期' }),
    new CreateComponent({ type: 'qrcode', name: 'qrcode', label: 'qrcode - 商品二维码' }),
    new CreateComponent({ type: 'barcode', name: 'barcode', label: 'barcode - 商品条形码' }),
    new CreateComponent({ type: 'info', name: 'sender-info', label: 'info - 地址信息' }),
    new CreateComponent({ type: 'table', name: 'table-01', label: 'table - 普通表格' }),
    new CreateComponent({ type: 'declaration', name: 'table-02', label: 'declaration - 报关物品' }),
    new CreateComponent({ group: '构图元素', type: 'localImage', name: 'image-01', label: 'localImage - 本地图片' }),
    new CreateComponent({ type: 'image', name: 'image-02', label: 'image - 商品图片' }),
    new CreateComponent({ type: 'image', name: 'image-03', image: './img/TagPictures/tag01.jpg' }),
])
