/**
 * Created by Bright on 2018/12/14.
 */

(function ($) {
    /**
     * ================ CustomLabel ====================
     * @class
     * @param {object} opts
     * @param {string} opts.mode = [normal|preview] - 创建方式
     * @param {string} opts.name                    - 标签名称
     * @param {array}  opts.size                    - 标签大小，单位mm
     */
    function CustomLabel(opts) {
        Page.pages = []
        opts = $.extend({
            mode: 'normal',
            name: '模板名称',
            size: [100, 100]
        }, opts)
        this.init(opts)
    }

    // static
    CustomLabel.components = []
    CustomLabel.addComponents = function (arr) {
        CustomLabel.components = CustomLabel.components.concat(arr)
    }
    CustomLabel.addPropsPanelField = function (name, handler) {
        PropsPanel.fields[name] = handler
    }

    CustomLabel.prototype = {
        init: function (opts) {
            this.opts = opts || this.opts
            this.context = {}
            this.components = CustomLabel.components
            this.pages = []
            this.widgets = []
            switch (this.opts.mode) {
                case 'normal':
                    this.initLayout()
                    this.initEvent()
                    break
                case 'preview':
                    // TODO 直接打印
                    break
                default:
                    console.error('this mode was undefined')
            }
        },
        initLayout: function (opts) {
            this.opts = opts || this.opts
            this.container = $('<div class="cl-container"></div>')
            this.propPanel = $('<div class="cl-props"></div>')
            this.wrap = $('<div class="cl-wrap"></div>')
            this.initComponentsLayout()
            this.initTopMenuLayout()
            this.container.append([this.propPanel, this.wrap])
        },
        initEvent: function () {},
        initComponentsLayout: function () {
            var that = this
            var components = this.components
            var groups = []
            var optionTpl = components.map(function (component) {
                if (groups.indexOf(component.group) < 0) {
                    groups.push(component.group)
                    return '<option value="' + component.group + '">' + component.group + '</option>'
                }
            }).join('')
            var html = [
                '<div class="cl-component-group-select">',
                    '<select class="cl-select">',
                        optionTpl,
                    '</select>',
                '</div>'
            ].join('')

            this.leftMenu = $('<div class="cl-left-menu"></div>')
            this.leftMenu.append(html)
                .on('change', '.cl-component-group-select>select', function () {
                    that.componentContainer.remove()
                    that.showComponentsByGroup($(this).val())
                })

            this.showComponentsByGroup(groups[0])
            this.container.append(this.leftMenu)
        },
        initTopMenuLayout: function () {
            var that = this
            var topMenuTpl = [
                '<div class="cl-top-menu">',
                    '<label>模板名称</label>',
                    '<span>' + that.opts.name + '</span>',
                    '<label>规格尺寸</label>',
                    '<span>' + that.opts.size[0] + 'mm*' + that.opts.size[1] + 'mm</span>',
                    '<div class="cl-top-menu-btn">',
                        '<button class="cl-btn cl-btn-primary cl-radius btn-add">新增页面</button>',
                        '<button class="cl-btn cl-btn-primary cl-radius btn-preview">',
                            '<i class="iconfont icon-print cl-mr10"></i>打印',
                        '</button>',
                        '<button class="cl-btn cl-btn-default cl-radius btn-clear">',
                            '<i class="iconfont icon-trash cl-mr10"></i>清空',
                        '</button>',
                        '<button class="cl-btn cl-btn-success cl-radius btn-save">',
                            '<i class="iconfont icon-save cl-mr10"></i>保存',
                        '</button>',
                    '</div>',
                '</div>'
            ].join('')

            that.topMenu = $(topMenuTpl)
            that.topMenu
                .on('click', 'button.btn-add', function () {
                    // 新增页面
                    that.addPage()
                })
                .on('click', 'button.btn-preview', function () {
                    // 打印
                    that.preview()
                })
                .on('click', 'button.btn-clear', function () {
                    // 保存
                    that.clear()
                })
                .on('click', 'button.btn-save', function () {
                    // 清空
                    var data = that.getData()
                    that.onSave(data)
                })

            that.container.find('.cl-top-menu').remove()
            that.container.append(this.topMenu)
        },
        showComponentsByGroup: function (group) {
            var components = this.components.filter(function (n) {
                return n.group === group
            })
            var componentsTpl = components.map(function (component) {
                return component.image
                    ? [
                        '<div class="cl-component-group-item" draggable="true" data-name="' + component.name + '" data-group="' + component.group + '">',
                            '<img class="cl-component-group-item-image" src="' + component.image + '"/>',
                            '<img class="cl-component-group-item-drag" src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="/>',
                        '</div>'
                    ].join('')
                    : [
                        '<div class="cl-component-group-item" draggable="true" data-name="' + component.name + '" data-group="' + component.group + '">',
                            '<i class="cl-component-group-item-icon iconfont ' + component.icon + '"></i>',
                            '<span class="cl-component-group-item-span">' + component.label + '</span>',
                            '<img class="cl-component-group-item-drag" src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="/>',
                        '</div>'
                    ].join('')
            }).join('')

            this.componentContainer = $('<div class="cl-component-group-container"></div>')
            this.componentContainer
                .html(componentsTpl)
                .appendTo(this.leftMenu)

            this.initComponents()
        },
        onSave: function (data) {
            console.log('onSave:', data)
            console.log('onSave:', JSON.stringify(data))
            // TODO: 保存信息
        },
        fillData: function (data) {
            Page.pages.forEach(function (page) {
                page.widgets.forEach(function (widget) {
                    widget.fill({
                        data: data
                    })
                })
            })
        },
        addPage: function () {
            var page = new Page({
                size: this.opts.size
            })
            this.wrap.append(page.getElem())
            return page
        },
        getElem: function () {
            return this.container
        },
        remove: function () {
            this.container.remove()
        },
        getData: function () {
            var data = Page.pages.map(function (page) {
                return page.widgets.map(function (widget) {
                    return widget.getOption()
                })
            })

            return { config: this.opts, widgets: data }
        },
        addWidget: function (page, opts) {
            var widget = page.addWidget(opts)
            this.initWidget(widget)
        },
        addWidgets: function (page, widgets) {
            var that = this
            widgets.forEach(function (widget) {
                that.addWidget(page, widget)
            })
        },
        addPageWidgets: function (list) {
            var that = this
            list.forEach(function (widgets) {
                var page = that.addPage()
                that.addWidgets(page, widgets)
            })
        },
        getHtml: function () {
            var that = this
            var previewPages = Page.pages.map(function (page) {
                var widgetsTpl = page.widgets.map(function (widget) {
                    return widget.getHtml()
                }).join('')
                var $previewPage = $('<div class="preview-page">' + widgetsTpl + '</div>')

                $previewPage.css({
                    position: 'relative',
                    width: that.opts.size[0] + 'mm',
                    height: that.opts.size[0] + 'mm'
                })

                return $previewPage.prop('outerHTML')
            }).join('')

            return [
                '<!DOCTYPE html>',
                    '<html lang="en">',
                    '<head>',
                        '<meta charset="UTF-8">',
                        '<title>打印预览</title>',
                        '<link rel="stylesheet" href="./css/preview.css">',
                    '</head>',
                    '<body>' + previewPages + '</body>',
                '</html>'
            ].join('')
        },
        preview: function () {
            var opener = window.open('about:blank')
            opener.document.write(this.getHtml())
        },
        clear: function () {
            Page.pages.forEach(function (page) {
                page.clear()
            })
        },
        initComponents: function () {
            var that = this

            that.componentContainer.find('.cl-component-group-item')
                .on('dragstart-bak', function (e) {
                    var self = $(this)
                    var name = self.data().name
                    e.originalEvent.dataTransfer.setData('text', name)
                })
                .on('mousedown', function (e) {
                    setCapture(e)
                    e.stopPropagation()
                    var self = $(this)
                    var name = self.data().name
                    var offset = self.offset()
                    var position = getMousePosition(e)
                    var clone = self.clone()
                    var random = getRandomString()

                    clone.addClass('cl-component-group-item-selected').css({
                        position: 'absolute',
                        left: position.x,
                        top: position.y,
                        marginLeft: -position.x + offset.left,
                        marginTop: -position.y + offset.top,
                        width: self.width(),
                        height: self.height(),
                        zIndex: 3
                    }).appendTo(document.body)

                    $(document)
                        .on('mouseup.cl.page-' + random, function (e) {
                            releaseCapture(e)
                            $(document).removeClass('cl-no-select').off('mouseup.cl.page-' + random).off('mousemove.cl.page-' + random)
                            clone.remove()
                        })
                        .on('mousemove.cl.page-' + random, function (e) {
                            position = getMousePosition(e)
                            clone.css({
                                left: position.x,
                                top: position.y
                            })
                        })

                    var widget = null
                    Page.startDrop()
                    Page.onDragMove = function (page, position) {
                        if (widget) {
                            widget.css(position)
                        }
                    }
                    Page.onDragEnter = function (page) {
                        clone.hide()
                        widget = page.addWidget(name)
                    }
                    Page.onDragLeave = function () {
                        clone.show()
                        widget.remove()
                        widget = null
                    }
                    Page.onDrop = function () {
                        widget.reset()
                        that.initWidget(widget)
                    }
                })
                .find('.cl-component-group-item-drag').on('mousedown', function (e) {
                    e.preventDefault()
                })
        },
        initWidget: function (widget) {
            var that = this
            widget.onSelected = function (opts) {
                that.showProps(this, opts)
            }
            widget.onCancelSelect = function () {
                that.hideProps()
            }
        },
        showProps: function (widget, opts) {
            var that = this
            that.propPanel.stop().animate({
                marginRight: 0
            }, 'fast')
            var propsPanel = new PropsPanel(opts)
            propsPanel.onUpdate = function (config) {
                widget.update(config)
            }
            that.propPanel.html('').append(propsPanel.getElem())
        },
        hideProps: function () {
            var that = this
            that.propPanel.stop().animate({
                marginRight: -250
            }, 'fast')
        }
    }

    window.CustomLabel = CustomLabel

    // ================ page ====================
    function Page(opts) {
        this.opts = $.extend({
            name: '' + (Page.pages.length + 1),
            size: [100, 100] // mm
        }, opts)
        this._index = Page.pages.push(this) - 1
        this.widgets = []
        this.init()
    }

    Page.reInit = function () {
        for (var i = 0; i < Page.pages.length; i++) {
            (function (page, n) {
                page._index = n
                page.elem.find('.cl-page-name > span').html(n + 1)
            })(Page.pages[i], i)
        }
    }

    Page.pages = []
    Page.onDrop = function () {}
    Page.onDragMove = function () {}
    Page.onDragEnter = function () {}
    Page.onDragLeave = function () {}
    Page.startDrop = function () {
        for (var i = 0; i < Page.pages.length; i++) {
            (function (page) {
                page.startDrop()
                page.onDrop = function (position) {
                    Page.onDrop(page, position)
                }
                page.onDragMove = function (position) {
                    Page.onDragMove(page, position)
                }
                page.onDragEnter = function (position) {
                    Page.onDragEnter(page, position)
                }
                page.onDragLeave = function (position) {
                    Page.onDragLeave(page, position)
                }
            })(Page.pages[i])
        }
    }

    Page.prototype = {
        init: function () {
            this.initLayout()
            this.initEvent()
        },
        onDrop: function () {},
        onDragMove: function () {},
        onDragEnter: function () {},
        onDragLeave: function () {},
        getElem: function () {
            return this.elem
        },
        initLayout: function() {
            var that = this
            that.elem = $([
                '<div class="cl-page">',
                    '<a class="cl-page-name">',
                        '<i>x</i>',
                        '<span>' + (this._index + 1) + '</span>',
                    '</a>',
                '</div>'
            ].join(''))
            that.container = $('<div class="cl-page-container"></div>')

            that.container
                .css({ width: that.opts.size[0] + 'mm', height: that.opts.size[1] + 'mm' })
                .appendTo(that.elem)
        },
        initEvent: function () {
            var that = this
            that.elem.find('.cl-page-name').on('click', function() {
                that.remove()
            })
            that.container.on('contextmenu', function (e) {
                e.preventDefault()
                e.stopPropagation()
                showContextMenu(
                    e,
                    ['清空当前页'].concat(Page.pages.map(function (n) {
                        return '复制所有到页面：' + (n._index + 1)
                    })),
                    [function () {
                        that.clear()
                    }].concat(Page.pages.map(function (page) {
                        return function () {
                            that.widgets.forEach(function (widget) {
                                page.addWidget(widget.getOption())
                            })
                        }
                    }))
                )
            })
        },
        remove: function () {
            var that = this
            that.elem.remove()
            Page.pages.splice(this._index, 1)
            Page.reInit()
        },
        clear: function () {
            while (this.widgets.length) {
                this.widgets[0].remove()
            }
        },
        getWidgetIndex: function (widget) {
            for (var i = 0; i < this.widgets.length; i++) {
                var obj = this.widgets[i]
                if (widget.opts.id === obj.opts.id) {
                    return i
                }
            }
        },
        addWidget: function (name) {
            var that = this
            var widget = new Widget(name)
            this.widgets.push(widget)
            widget.onRemove = function () {
                that.widgets.splice(that.getWidgetIndex(widget), 1)
            }
            this.container.append(widget.render())
            return widget
        },
        addWidgets: function (widgets) {
            var that = this
            widgets.forEach(function (widget) {
                that.addWidget(widget)
            })
        },
        startDrop: function () {
            var that = this
            var $doc = $(document)
            var containerRect = this.getContainerPosition()
            var status = 0
            var random = getRandomString()
            $doc
                .on('mouseup.cl.page-' + random, function (e) {
                    releaseCapture(e)
                    $doc
                        .removeClass('cl-no-select')
                        .off('mouseup.cl.page-' + random)
                        .off('mousemove.cl.page-' + random)
                    var containerPosition = that.checkInContainer(getMousePosition(e))
                    if (containerPosition) {
                        that.onDrop(containerPosition)
                    }
                })
                .on('mousemove.cl.page-' + random, function (e) {
                    var position = getMousePosition(e)
                    var containerPosition = that.checkInContainer(position, containerRect)
                    if (containerPosition) {
                        if (!status) {
                            that.onDragEnter()
                            status = 1
                        }
                        that.onDragMove(containerPosition)
                    } else {
                        if (status) {
                            that.onDragLeave()
                            status = 0
                        }
                    }
                })
        },
        checkInContainer: function (p, rectPosition) {
            var position = rectPosition || this.getContainerPosition()
            var p1 = position.p1
            var p2 = position.p2
            if (p.x > p1.left && p.x < p2.left && p.y > p1.top && p.y < p2.top) {
                return {
                    left: p.x - p1.left,
                    top: p.y - p1.top
                }
            }
        },
        getContainerPosition: function () {
            var p1 = this.container.offset()
            var p2 = {
                left: p1.left + this.container.width(),
                top: p1.top + this.container.height()
            }

            return { p1: p1, p2: p2 }
        }
    }

    //= =============== propsPanel ====================

    function PropsPanel(opts) {
        this.opts = $.extend({
            label: '未命名'
        }, opts)
        this.group = {
            _default_: []
        }
        this.init()
    }

    PropsPanel.fields = {}
    PropsPanel.onUpdate = function () {}

    PropsPanel.prototype = {
        init: function (opts) {
            this.opts = opts || this.opts
            this.elem = $('<div class="cl-props-panel"></div>')
            this.tabs = $('<div class="cl-props-tabs"></div>')
            this.container = $('<div class="cl-props-container"></div>')

            this.elem
                .append('<div class="cl-props-panel-name">' + this.opts.label + '</div>')
                .append(this.tabs)
                .append(this.container)

            this.initTabs()
            this.initEvent()
        },
        getElem: function () {
            return this.elem
        },
        initEvent: function () {
            this.elem.on('mousedown', function (e) {
                e.stopPropagation()
            })
        },
        initTabs: function () {
            var that = this
            var groups = that.group
            var count = 0

            for (var name in that.opts.config.props) {
                var prop = that.opts.config.props[name]
                prop.name = name

                if (prop.group && !groups[prop.group]) {
                    groups[prop.group] = []
                    count++
                }

                if (prop.group) {
                    groups[prop.group].push(prop)
                } else {
                    groups._default_.push(prop)
                }
            }

            if (count > 0) {
                var html = ''
                for (var group in groups) {
                    var label = group === '_default_'
                        ? '基本'
                        : group

                    html += groups[group].length > 0
                        ? '<span class="cl-props-tab" data-group="' + group + '">' + label + '</span>'
                        : ''
                }

                this.tabs.html(html)
            }

            var tabItems = this.tabs.find('.cl-props-tab')
            tabItems.on('click', function () {
                var name = $(this).data('group')

                $(this)
                    .addClass('cl-props-tab-active')
                    .siblings().removeClass('cl-props-tab-active')

                that.initFields(name)
            }).eq(0).click()

            if (tabItems.length < 2) {
                tabItems.parent().hide()
            }
        },
        initFields: function (groupName) {
            var that = this
            var list = this.group[groupName]

            this.container.html('')
            for (var i = 0; i < list.length; i++) {
                var obj = list[i]
                that.initField(obj)
            }
        },
        initField: function (field) {
            var that = this
            var handler = PropsPanel.fields[field.type]

            if (handler) {
                this.container.append(handler(field, function (val) {
                    if (typeof val !== 'undefined') {
                        field.value = val
                    }
                    that.opts.config.props[field.name] = field
                    that.onUpdate(that.opts)
                }))
            }
        }
    }

    // ================ widget ====================
    function Widget(opts) {
        if (typeof opts === 'string') {
            opts = { name: opts }
        }

        this.opts = $.extend({
            id: getRandomString(),
            config: {
                data: {},
                props: {},
                css: {}
            },
            dataFormat: function (data) {
                return data
            },
            option: {
                resize: true,
                move: true
            }
        }, Widget.getBaseConfig(opts.name))

        if (opts.config && opts.config.props) {
            opts.config.props = this.formatProps(opts.config.props)
        }

        // $.extend(this.opts,opts);
        this.opts.config = JSON.parse(JSON.stringify(opts.config || this.opts.config))
        this.defaultConfig = JSON.parse(JSON.stringify(this.opts.config))
        this.init()
    }

    // static function
    Widget.getComponents = function () {
        return CustomLabel.components.map(function (obj) {
            return {
                name: obj.name,
                label: obj.label,
                config: obj.config,
                dataFormat: obj.dataFormat,
                option: obj.option,
                render: obj.render
            }
        })
    }

    // static function
    Widget.getBaseConfig = function (name) {
        return $.extend({}, Widget.getComponents().filter(function (obj) {
            return obj.name === name
        })[0])
    }

    // TODO
    Widget.prototype = {
        init: function (opts) {
            this.opts = opts || this.opts
            this.elem = $([
                '<div class="cl-widget" data-id="' + this.opts.id + '">',
                    '<div class="cl-widget-drag"></div>',
                    '<div class="cl-widget-resize"></div>',
                '</div>'
            ].join('')).css(this.opts.config.css).data('_id_', this.opts.id)
            this.btnResize = this.elem.find('.cl-widget-resize')
            if (!this.opts.option.resize) {
                this.btnResize.remove()
            }
            this.initEvent()
        },
        onSelected: function () {},
        onCancelSelect: function () {},
        onUpdate: function () {},
        onRemove: function () {},
        getElem: function () {
            return this.elem
        },
        getHtml: function () {
            return this.elem.get(0).outerHTML
        },
        getId: function () {
            return this.opts.id
        },
        getConfig: function () {
            return this.opts.config
        },
        getOption: function () {
            var that = this
            return {
                name: that.opts.name,
                config: {
                    data: that.opts.config.data,
                    props: (function (props) {
                        var obj = {}
                        Object.keys(props).forEach(function (n) {
                            obj[n] = props[n].value
                        })
                        return obj
                    })(that.opts.config.props),
                    css: that.opts.config.css
                }
            }
        },
        formatProps: function (data) {
            var props = JSON.parse(JSON.stringify(this.opts.config.props))
            for (var name in data) {
                if (props[name]) {
                    props[name].value = data[name]
                }
            }
            return props
        },
        fill: function (config) {
            config.data && $.extend(this.opts.config.data, this.opts.dataFormat(config.data))
            config.css && $.extend(this.opts.config.css, config.css)
            config.props && $.extend(this.opts.config.props, this.formatProps(config.props))
            this.update()
        },
        css: function (css) {
            $.extend(this.opts.config.css, css)
            this.elem.css(css)
            return this
        },
        reset: function () {
            this.css(this.defaultConfig.css)
            return this
        },
        render: function (data) {
            $.extend(this.opts.config.data, data)
            return this.originalRender()
        },
        originalRender: function (config) {
            $.extend(this.opts.config, config)
            this.elem.find(':not(.cl-widget-drag,.cl-widget-resize)').remove()
            this.elem.append(this.opts.render.call(this, this.opts.config))
            return this.elem
        },
        update: function (config) {
            this.originalRender(config)
        },
        initEvent: function () {
            var that = this
            this.elem
                .on('mousedown', function (e) {
                    setCapture(e)
                    e.stopPropagation()
                    var self = $(this)
                    var offset = self.offset()
                    var width = self.outerWidth()
                    var height = self.outerHeight()
                    var parent = self.parent()
                    var parentOffset = parent.offset()
                    var parentWidth = parent.innerWidth()
                    var parentHeight = parent.innerHeight()
                    var startPosition = getMousePosition(e)
                    var position = startPosition
                    var leftFix = (startPosition.x - offset.left)
                    var topFix = (startPosition.y - offset.top)
                    var maxX = parentWidth - width
                    var maxY = parentHeight - height
                    var maxWidth = parentOffset.left + parentWidth - offset.left
                    var maxHeight = parentOffset.top + parentHeight - offset.top
                    var x = 0
                    var y = 0
                    var isResize = e.target === that.btnResize[0]

                    parent.addClass('cl-no-select')
                    that.select()

                    $(document)
                        .on('mouseup.cl.id-' + that.opts.id, function (e) {
                            releaseCapture(e)
                            parent.removeClass('cl-no-select')
                            $(this)
                                .off('mouseup.cl.id-' + that.opts.id)
                                .off('mousemove.cl.id-' + that.opts.id)
                            that.update()
                            that.onUpdate(that.opts.config)
                        })
                        .on('mousemove.cl.id-' + that.opts.id, function (e) {
                            position = getMousePosition(e)
                            if (isResize && that.opts.option.resize) {
                                width = position.x - offset.left + 5
                                width = width < 10 ? 10 : width
                                width = width > maxWidth ? maxWidth : width

                                height = position.y - offset.top + 5
                                height = height < 10 ? 10 : height
                                height = height > maxHeight ? maxHeight : height

                                that.css({ width: width, height: height })
                            } else if (that.opts.option.move) {
                                x = position.x - parentOffset.left - leftFix
                                x = x < 0 ? 0 : x
                                x = x > maxX ? maxX : x

                                y = position.y - parentOffset.top - topFix
                                y = y < 0 ? 0 : y
                                y = y > maxY ? maxY : y

                                that.css({ left: x, top: y })
                            }
                        })
                })
                .on('contextmenu', function (e) {
                    e.preventDefault()
                    e.stopPropagation()
                    showContextMenu(
                        e,
                        ['删除'].concat(Page.pages.map(function (n) {
                            return '复制到页面：' + (n._index + 1)
                        })).concat(Page.pages.map(function (n) {
                            return '移动到页面：' + (n._index + 1)
                        })),
                        [function () {
                            that.remove()
                        }].concat(Page.pages.map(function (page) {
                            return function () {
                                page.addWidget(that.getOption())
                            }
                        })).concat(Page.pages.map(function (page) {
                            return function () {
                                page.addWidget(that.getOption())
                                that.remove()
                            }
                        }))
                    )
                })
        },
        show: function () {
            this.elem.show()
        },
        hide: function () {
            this.elem.hide()
        },
        remove: function () {
            this.elem.remove()
            this.onRemove(this)
        },
        lastSelectedWidget: null,
        select: function () {
            var that = this
            this.elem.addClass('cl-widget-selected')
            if (this.lastSelectedWidget) {
                this.lastSelectedWidget.cancelSelect()
            }
            this.lastSelectedWidget = this
            $(document).on('mousedown.widget.cancel' + that.opts.id, function () {
                that.cancelSelect()
                $(this).off('mousedown.widget.cancel' + that.opts.id)
            })
            this.onSelected(this.opts)
            // this.onSelected.call(this, this.opts)
        },
        cancelSelect: function () {
            $(document.body).off('mousedown.widget.cancel' + this.lastSelectedWidget.opts.id)
            this.elem.removeClass('cl-widget-selected')
            this.onCancelSelect()
        }
    }

    // ================ contextMenu ===============

    function showContextMenu(e, menus, callbacks) {
        var position = getMousePosition(e)
        var $doc = $(document)
        var $elem = $('<div class="cl-context-menu"></div>')
        var random = getRandomString()
        var html = ''

        $.each(menus, function(index, item) {
            html += '<a href="javascript:void(0);">' + menus[index] + '</a>'
        })

        $elem
            .css({ top: position.y, left: position.x })
            .html(html)
            .appendTo(document.body)

        $elem.find('>a')
            .on('click', function () {
                var self = $(this)
                var index = self.index()
                $elem.remove()
                callbacks[index] && callbacks[index]()
            })
            .on('mouseup', function (e) {
                e.stopPropagation()
            })

        $doc.on('mouseup.' + random, function () {
            $elem.remove()
            $doc.off('mouseup.' + random)
        })
    }

    // ================ common ====================

    function getRandomString() {
        return 'cl' + Math.random().toString(16).substr(2)
    }

    function getMousePosition(ev) {
        return ev.pageX || ev.pageY
            ? { x: ev.pageX, y: ev.pageY }
            : {
                x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                y: ev.clientY + document.body.scrollTop - document.body.clientTop
            }
    }

    // 设置捕获范围
    function setCapture(e) {
        if (e.target.setCapture) {
            e.target.setCapture()
        } else if (window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
        }
    }

    // 取消捕获范围
    function releaseCapture(e) {
        if (e.target.releaseCapture) {
            e.target.releaseCapture()
        } else if (window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
        }
    }
})(jQuery)
