/**
 * Created by Bright on 2018/12/14.
 */

(function ($) {

    var blankImg = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';

    //================ CustomLabel ====================
    //var instance;
    function CustomLabel(opts) {
        /*if(instance){
            $.extend(instance.opts,opts);
            return instance;
        }*/
        Page.pages=[];
        opts = $.extend({
            mode: 'normal',// normal, preview
            name: '这个叫模板名称',
            size: [10, 10] // cm
        }, opts);
        this.init(opts);
        //return Instance=this;
    }

    window.CustomLabel = CustomLabel;

    // static
    CustomLabel.components = [];
    CustomLabel.addComponents = function (arr) {
        CustomLabel.components = CustomLabel.components.concat(arr);
    };
    CustomLabel.addPropsPanelField = function (name, handler) {
        PropsPanel.fields[name] = handler;
    };
    //
    CustomLabel.prototype.init = function (opts) {
        this.opts = opts || this.opts;
        this.context = {};
        this.components = CustomLabel.components;
        this.pages = [];
        this.widgets = [];
        if (this.opts.mode == 'normal') {
            this.initLayout();
            this.initEvent();
        }
    };

    //
    CustomLabel.prototype.onSave = function (data) {
        //
    };

    //
    CustomLabel.prototype.initLayout = function (opts) {
        this.opts = opts || this.opts;
        this.container = $("<div class='cl-container'></div>");
        this.propPanel = $("<div class='cl-props'></div>");
        this.wrap = $("<div class='cl-wrap'></div>");
        this.initComponentsLayout();
        this.initTopMenuLayout();
        this.container.append([this.propPanel, this.wrap]);
        //this.addPage();
    };


    //
    CustomLabel.prototype.fillData = function (data) {
        Page.pages.forEach(function(page){
            page.widgets.forEach(function (widget) {
                widget.fill({
                    data:data
                });
            })
        });
    };

    //
    CustomLabel.prototype.addPage = function () {
        var that =this;
        var page = new Page({
            size: this.opts.size
        });
        page.onContentMenu = function (e) {
            showContextMenu(e, ["清空当前页"].concat(Page.pages.map(function (n) {
                return '复制所有到页面：' + (n._index + 1);
            })), [function () {
                page.clear();
            }].concat(Page.pages.map(function (_page) {
                return function () {
                    page.widgets.forEach(function (widget) {
                        that.addWidget(_page, widget.getOption());
                    });
                };
            })));
        };
        this.wrap.append(page.getElem());
        return page;
    };

    //
    CustomLabel.prototype.initTopMenuLayout = function () {
        var that = this;
        this.topMenu = $("<div class='cl-top-menu'><label>模板名称</label><span>" + this.opts.name + "</span><label>规格尺寸</label><span>" + this.opts.size[0] + "cm*" + this.opts.size[1] + "cm</span><div class='cl-top-menu-btn'><a href='javascript:void(0);' class='btn-add'>新增页面</a><a href='javascript:void(0);' class='btn-clear'>清空</a><a href='javascript:void(0);' class='btn-preview'>预览打印</a><a href='javascript:void(0);' class='btn-save'>保存</a></div></div>");
        this.container.find('.cl-top-menu').remove();

        this.topMenu.find("a.btn-add").on("click", function () {
            that.addPage();
        });
        this.topMenu.find("a.btn-preview").on("click", function () {
            that.preview();
        });
        this.topMenu.find("a.btn-clear").on("click", function () {
            that.clear();
        });
        this.topMenu.find("a.btn-save").on("click", function () {
            var data = that.getData();
            that.onSave(data);
        });
        this.container.append(this.topMenu);
    };

    //
    CustomLabel.prototype.initComponentsLayout = function () {
        var that = this;
        this.leftMenu = $("<div class='cl-left-menu'></div>");
        var components = this.components,
            groups = [],
            html = '<div><select class="cl-component-group-select">';
        for (var i = 0; i < components.length; i++) {
            var obj = components[i];
            if (groups.indexOf(obj.group) < 0) {
                groups.push(obj.group);
                html += '<option value="' + obj.group + '">' + obj.group + '</option>';
            }
        }
        html += '</select></div><div class="cl-component-group-container"></div>';
        this.leftMenu.append(html).find('.cl-component-group-select').on('change', function () {
            that.showComponentsByGroup($(this).val());
        });
        that.showComponentsByGroup(groups[0]);
        this.container.append(this.leftMenu);
    };

    //
    CustomLabel.prototype.getElem = function () {
        return this.container;
    };
    //
    CustomLabel.prototype.remove = function () {
        this.container.remove();
    };

    //
    CustomLabel.prototype.getData = function () {

        var data=Page.pages.map(function(page){
            return page.widgets.map(function(widget){
                return widget.getOption();
            });
        });
        return {
            config:this.opts,
            widgets:data
        };
    };
    //
    CustomLabel.prototype.addWidget = function (page,opts) {
        var widget = page.addWidget(opts);
        this.initWidget(widget);
    };
    //
    CustomLabel.prototype.addWidgets = function (page,widgets) {
        var that = this;
        widgets.forEach(function (widget) {
            that.addWidget(page,widget);
        });
    };
    //
    CustomLabel.prototype.addPageWidgets = function (list) {
        var that = this;
        list.forEach(function (widgets) {
            var page = that.addPage();
            that.addWidgets(page,widgets);
        });
    };

    //
    CustomLabel.prototype.getHtml = function () {
        var that = this;
        var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Custom Label</title><link rel="stylesheet" href="./css/custom-label.css"><link rel="stylesheet" href="./css/components.css">';
        html += '<style>html,body{padding: 0;margin: 0;height: 100%;background: #fff;}</style></head><body>';
        html += Page.pages.map(function (page) {
            var str = '<div class="preview-page" style="position: relative;width: ' + that.opts.size[0] + 'cm;height: '+ that.opts.size[0] + 'cm">';
            str += page.widgets.map(function (widget) {
                    return widget.getHtml();
                }).join('');
            str += '</div>';
            return str;
        }).join('');
        html += '</body></html>';
        return html;
    };

    //
    CustomLabel.prototype.preview = function () {
        var opener = window.open("about:blank");
        opener.document.write(this.getHtml());
    };

    //
    CustomLabel.prototype.clear = function () {
        Page.pages.forEach(function (page) {
            page.clear();
        });
    };

    //
    CustomLabel.prototype.showComponentsByGroup = function (group) {
        var components = this.components.filter(function (n) {
            return n.group == group;
        });
        var html = '';
        for (var i = 0; i < components.length; i++) {
            var obj = components[i];
            html += '<div class="cl-component-group-item" draggable="true" data-name="' + obj.name + '" data-group="' + obj.group + '"><img class="cl-component-group-item-icon" src="' + (obj.icon || blankImg) + '"/><span>' + obj.label + '</span><img class="cl-component-group-item-drag" src="'+blankImg+'"/></div>';
        }
        this.componentContainer = this.leftMenu.find(".cl-component-group-container").html(html);
        this.initComponents();
    };
    //
    CustomLabel.prototype.initComponents = function () {
        var that = this;

        this.componentContainer.find(".cl-component-group-item").on("dragstart-bak", function (e) {
            var self = $(this),
                name = self.data().name;
            e.originalEvent.dataTransfer.setData("text",name);
        }).on("mousedown", function (e) {
            setCapture(e);
            e.stopPropagation();
            var self = $(this),
                name = self.data().name,
                offset = self.offset(),
                position = getMousePosition(e),
                clone = self.clone(),
                random = getRandomString();
            clone.addClass('cl-component-group-item-selected').css({
                position: 'absolute',
                left: position.x,
                top: position.y,
                marginLeft: -position.x + offset.left,
                marginTop: -position.y + offset.top,
                width: self.width(),
                height: self.height(),
                zIndex: 3
            }).appendTo(document.body);
            //
            var $doc = $(document);
            $doc.on('mouseup.cl.page-' + random, function (e) {
                releaseCapture(e);
                $doc.removeClass("cl-no-select").off('mouseup.cl.page-' + random).off('mousemove.cl.page-' + random);
                clone.remove();
            }).on('mousemove.cl.page-' + random, function (e) {
                position = getMousePosition(e);
                clone.css({
                    left: position.x,
                    top: position.y
                });
            });
            //
            var widget;
            Page.startDrop();
            Page.onDragMove = function (page, position) {
                if(widget){
                    widget.css(position);
                }
            };
            Page.onDragEnter = function (page) {
                clone.hide();
                widget = page.addWidget(name);
            };
            Page.onDragLeave = function (page) {
                clone.show();
                widget.remove();
                widget=null;
            };
            Page.onDrop = function (page, position) {
                widget.reset();
                that.initWidget(widget);
            };
        }).find('.cl-component-group-item-drag').on("mousedown",function(e){
            e.preventDefault();
        });


        return;
        this.componentContainer.find(">.cl-component-group-item").on("mousedown", function (e) {
            e.stopPropagation();
            $(document.body).addClass("cl-no-select");
            var self = $(this),
                offset = self.offset(),
                position = getMousePosition(e),
                clone = self.clone();
            clone.addClass('cl-component-group-item-selected').css({
                position: 'absolute',
                left: position.x,
                top: position.y,
                marginLeft: -position.x + offset.left,
                marginTop: -position.y + offset.top,
                width: self.width(),
                height: self.height(),
                zIndex: 3
            }).appendTo(document.body);
            that.context.mainContainerPosition = that.getMainContainerPosition();
            that.context.currentComponent = clone;
            var widget = that.createWidget(self.data().name);
            widget.select();
            widget.getElem().hide();
            that.context.currentWidget = widget;
        });
    };
    CustomLabel.prototype.initWidget=function(widget){
        var that=this;
        widget.onSelected = function (opts) {
            that.showProps(this, opts);
        };
        widget.onCancelSelect = function () {
            that.hideProps();
        };
        widget.onContentMenu = function (e, opts) {
            showContextMenu(e, ["删除"].concat(Page.pages.map(function (n) {
                return '复制到页面：' + (n._index + 1);
            })).concat(Page.pages.map(function (n) {
                return '移动到页面：' + (n._index + 1);
            })), [function () {
                widget.remove();
            }].concat(Page.pages.map(function (page) {
                return function(){
                    that.addWidget(page,opts);
                };
            })).concat(Page.pages.map(function (page) {
                return function(){
                    that.addWidget(page,opts);
                    widget.remove();
                };
            })));
        }
    };
    //
    CustomLabel.prototype.initEvent = function () {
        var that = this;

    };

    CustomLabel.prototype.showProps = function (widget, opts) {
        var that = this;
        that.propPanel.stop().animate({
            marginRight: 0
        }, "fast");
        var propsPanel = new PropsPanel(opts);
        propsPanel.onUpdate = function (config) {
            widget.update(config);
        };
        that.propPanel.html('').append(propsPanel.getElem());
    };

    CustomLabel.prototype.hideProps = function () {
        var that = this;
        that.propPanel.stop().animate({
            marginRight: -200
        }, "fast");
    };

    //================ page ====================
    function Page(opts) {
        this.opts = $.extend({
            name: '' + (Page.pages.length+1),
            size:[10,10] //cm
        }, opts);
        this._index = Page.pages.push(this) - 1;
        this.widgets=[];
        this.init();
    }

    Page.pages = [];
    Page.onDrop=function(){};
    Page.onDragMove=function(){};
    Page.onDragEnter=function(){};
    Page.onDragLeave=function(){};
    Page.startDrop=function(){
        for (var i = 0; i < Page.pages.length; i++) {
            (function(page){
                page.startDrop();
                page.onDrop=function(position){
                    Page.onDrop(page,position);
                };
                page.onDragMove=function(position){
                    Page.onDragMove(page,position);
                };
                page.onDragEnter=function(position){
                    Page.onDragEnter(page,position);
                };
                page.onDragLeave=function(position){
                    Page.onDragLeave(page,position);
                };
            })(Page.pages[i]);
        }
    };

    Page.reInit = function () {
        for (var i = 0; i < Page.pages.length; i++) {
            (function (page, n) {
                page._index = n;
                page.elem.find(".cl-page-name>span").html(n+1);
            })(Page.pages[i], i);
        }
    };


    Page.prototype.init = function () {
        var that=this;
        this.elem = $("<div class='cl-page'><a class='cl-page-name'><i>x</i><span>"+(this._index+1)+"</span></a><div class='cl-page-container'></div></div>");
        this.container = this.elem.find('.cl-page-container');
        this.elem.css({
            width: that.opts.size[0] + 'cm',
            height: that.opts.size[1] + 'cm'
        });
        this.initEvent();
    };

    Page.prototype.onDrop = function () {};
    Page.prototype.onDragMove = function () {};
    Page.prototype.onDragEnter = function () {};
    Page.prototype.onDragLeave = function () {};
    Page.prototype.onContentMenu=function(e){};

    Page.prototype.getElem = function () {
        return this.elem;
    };

    Page.prototype.initEvent = function () {
        var that=this;
        that.elem.find('.cl-page-name').on("click",function(e){
            that.remove();
        });
        this.container.on("contextmenu",function(e){
            e.preventDefault();
            e.stopPropagation();
            that.onContentMenu(e);
        });
    };

    Page.prototype.remove = function () {
        this.elem.remove();
        Page.pages.splice(this._index,1);
        Page.reInit();
    };

    Page.prototype.clear = function () {
        while(this.widgets.length){
            this.widgets[0].remove();
        }
    };

    Page.prototype.getWidgetIndex = function (widget) {
        for (var i = 0; i < this.widgets.length; i++) {
            var obj = this.widgets[i];
            if(widget.opts.id==obj.opts.id){
                return i;
            }
        }
    };

    Page.prototype.addWidget = function (name) {
        var that = this;
        var widget = new Widget(name);
        this.widgets.push(widget);
        widget.onRemove=function(){
            that.widgets.splice(that.getWidgetIndex(widget),1);
        };
        this.container.append(widget.render());
        return widget;
    };

    Page.prototype.addWidgets = function (widgets) {
        var that = this;
        widgets.forEach(function(widget){
            that.addWidget(widget);
        });
    };

    Page.prototype.startDrop = function () {
        var that = this,
            $doc = $(document),
            containerRect = this.getContainerPosition(),
            status = 0,
            random = getRandomString();
        $doc.on('mouseup.cl.page-' + random, function (e) {
            releaseCapture(e);
            $doc.removeClass("cl-no-select").off('mouseup.cl.page-' + random).off('mousemove.cl.page-' + random);
            var containerPosition = that.checkInContainer(getMousePosition(e));
            if (containerPosition) {
                that.onDrop(containerPosition);
            }
        }).on('mousemove.cl.page-' + random, function (e) {
            var position = getMousePosition(e),
                containerPosition = that.checkInContainer(position, containerRect);
            if (containerPosition) {
                if (!status) {
                    that.onDragEnter();
                    status = 1;
                }
                that.onDragMove(containerPosition);
            } else {
                if (status) {
                    that.onDragLeave();
                    status = 0;
                }
            }
        });
    };

    Page.prototype.checkInContainer = function (p, rectPosition) {
        var position = rectPosition || this.getContainerPosition(),
            p1 = position.p1,
            p2 = position.p2;
        if (p.x > p1.left && p.x < p2.left && p.y > p1.top && p.y < p2.top) {
            return {
                left: p.x - p1.left,
                top: p.y - p1.top
            };
        }
    };

    Page.prototype.getContainerPosition = function () {
        var p1 = this.container.offset(),
            p2 = {
                left: p1.left + this.container.width(),
                top: p1.top + this.container.height(),
            };
        return {
            p1: p1,
            p2: p2
        };
    };


    //================ propsPanel ====================

    function PropsPanel(opts) {
        this.opts = $.extend({
            label: '未命名'
        }, opts);
        this.group = {
            _default_: []
        };
        this.init();
    }

    PropsPanel.onUpdate = function () {

    };

    //
    PropsPanel.fields = {
        "text": function (data, update) {
            var elem = $('<div><div class="cl-props-label">' + data.label + '</div><div class="cl-props-item"><input type="text" class="text-box" value="' + data.value + '" /></div></div>');
            elem.find('input').on('keyup', function () {
                update($(this).val());
            });
            return elem;
        }
    };


    PropsPanel.prototype.init = function (opts) {
        this.opts = opts || this.opts;
        this.elem = $('<div class="cl-props-panel"><div class="cl-props-panel-name">' + this.opts.label + '</div><div class="cl-props-tabs"></div><div class="cl-props-container"></div></div>');
        this.tabs = this.elem.find('.cl-props-tabs');
        this.container = this.elem.find('.cl-props-container');
        this.initTabs();
        this.initEvent();
    };

    PropsPanel.prototype.getElem = function () {
        return this.elem;
    };

    PropsPanel.prototype.initEvent = function () {
        this.elem.on('mousedown', function (e) {
            e.stopPropagation();
        });
    };

    PropsPanel.prototype.initTabs = function () {
        var that = this, group = this.group, count = 0;
        for (var name in this.opts.config.props) {
            var prop = this.opts.config.props[name];
            prop.name = name;
            if (prop.group && !group[prop.group]) {
                group[prop.group] = [];
                count++;
            }
            if (prop.group) {
                group[prop.group].push(prop);
            } else {
                group._default_.push(prop);
            }
        }
        if (count > 0) {
            var html = '';
            for (var name in group) {
                if (group[name].length) {
                    html += '<span data-group="' + name + '">' + (name == '_default_' ? '基本' : name) + '</span>';
                }
            }
            this.tabs.html('').append(html);
        }
        var tabItems = this.tabs.find('>*').on('click', function (e) {
            var self = $(this), name = self.data().group;
            that.initFields(name);
        }).eq(0).click();
        if (tabItems.length < 2) {
            tabItems.hide();
        }
    };

    PropsPanel.prototype.initFields = function (groupName) {
        var that = this, list = this.group[groupName];
        this.container.html('');
        for (var i = 0; i < list.length; i++) {
            var obj = list[i];
            that.initField(obj);
        }
    };

    PropsPanel.prototype.initField = function (field) {
        var that = this, handler = PropsPanel.fields[field.type];
        if (handler) {
            this.container.append(handler(field, function (val) {
                if(typeof val != "undefined"){
                    field.value = val;
                }
                that.opts.config.props[field.name] = field;
                that.onUpdate(that.opts);
            }));
        }
    };

    //================ widget ====================
    function Widget(opts) {
        if (typeof opts == "string") {
            opts = {
                name:opts
            };
        }
        this.opts = $.extend({
            id: getRandomString(),
            config: {
                data: {},
                props: {},
                css: {}
            },
            dataFormat:function(data){
                return data;
            },
            option: {
                resize: true,
                move: true
            }
        }, Widget.getBaseConfig(opts.name));
        if (opts.config && opts.config.props) {
            opts.config.props = this.formatProps(opts.config.props);
        }
        //$.extend(this.opts,opts);
        this.opts.config = JSON.parse(JSON.stringify(opts.config||this.opts.config));
        this.defaultConfig = JSON.parse(JSON.stringify(this.opts.config));
        this.init();
    }

    Widget.getComponents = function() {
        return CustomLabel.components.map(function (obj) {
            return {
                name: obj.name,
                label: obj.label,
                config: obj.config,
                dataFormat: obj.dataFormat,
                option: obj.option,
                render: obj.render
            };
        });
    };

    Widget.getBaseConfig = function(name) {
        return $.extend({},Widget.getComponents().filter(function (obj) {
            return obj.name == name;
        })[0]);
    };

    Widget.prototype.onSelected = function (config) {
    };
    Widget.prototype.onCancelSelect = function () {
    };
    Widget.prototype.onUpdate = function (config) {
    };
    Widget.prototype.onRemove = function (config) {
    };

    Widget.prototype.onContentMenu=function(){};

    Widget.prototype.init = function (opts) {
        this.opts = opts || this.opts;
        this.elem = $("<div class='cl-widget' data-id='" + this.opts.id + "'><div class='cl-widget-drag'></div><div class='cl-widget-resize'></div><div class='cl-widget-container'></div></div>").css(this.opts.config.css).data("_id_",this.opts.id);
        this.container = this.elem.find('.cl-widget-container');
        this.btnResize = this.elem.find('.cl-widget-resize');
        if(!this.opts.option.resize){
            this.btnResize.remove();
        }
        this.initEvent();
    };

    Widget.prototype.getElem = function () {
        return this.elem;
    };

    Widget.prototype.getHtml = function () {
        return this.elem.get(0).outerHTML;
    };

    Widget.prototype.getId = function () {
        return this.opts.id;
    };

    Widget.prototype.getConfig = function () {
        return this.opts.config;
    };

    Widget.prototype.getOption = function () {
        var that = this;
        return {
            name: that.opts.name,
            config: {
                data: that.opts.config.data,
                props: (function(props){
                    var obj={};
                    Object.keys(props).forEach(function(n){
                        obj[n]=props[n].value;
                    });
                    return obj;
                })(that.opts.config.props),
                css: that.opts.config.css
            }
        };
    };

    Widget.prototype.formatProps = function (data) {
        var props=JSON.parse(JSON.stringify(this.opts.config.props));
        for (var name in data) {
            if (props[name]) {
                props[name].value = data[name];
            }
        }
        return props;
    };

    Widget.prototype.fill = function (config) {
        config.data && $.extend(this.opts.config.data, this.opts.dataFormat(config.data));
        config.css && $.extend(this.opts.config.css, config.css);
        config.props && $.extend(this.opts.config.props, this.formatProps(config.props));
        this.update();
    };

    Widget.prototype.css = function (css) {
        $.extend(this.opts.config.css, css);
        this.elem.css(css);
        return this;
    };

    Widget.prototype.reset = function () {
        this.css(this.defaultConfig.css);
        return this;
    };

    Widget.prototype.render = function (data) {
        $.extend(this.opts.config.data, data);
        return this.originalRender();
    };

    Widget.prototype.originalRender = function (config) {
        $.extend(this.opts.config, config);
        this.container.html('').append(this.opts.render.call(this,this.opts.config));
        return this.elem;
    };

    Widget.prototype.update = function (config) {
        this.originalRender(config);
    };

    var lastSelectedWidget = null;
    var $doc = $(document);
    Widget.prototype.initEvent = function (data) {
        var that = this;
        this.elem.on('mousedown', function (e) {
            setCapture(e);
            e.stopPropagation();
            var self = $(this),
                offset = self.offset(),
                width = self.outerWidth(),
                height = self.outerHeight(),
                parent = self.parent(),
                parentOffset = parent.offset(),
                parentWidth = parent.innerWidth(),
                parentHeight = parent.innerHeight(),
                startPosition = getMousePosition(e),
                position = startPosition,
                leftFix = (startPosition.x - offset.left),
                topFix = (startPosition.y - offset.top),
                maxX = parentWidth - width,
                maxY = parentHeight - height,
                maxWidth = parentOffset.left + parentWidth - offset.left,
                maxHeight = parentOffset.top + parentHeight - offset.top,
                x = 0,
                y = 0,
                isResize = e.target == that.btnResize[0];
            parent.addClass("cl-no-select");
            that.select();
            $doc.on('mouseup.cl.id-' + that.opts.id, function (e) {
                releaseCapture(e);
                parent.removeClass("cl-no-select");
                $(this).off('mouseup.cl.id-' + that.opts.id).off('mousemove.cl.id-' + that.opts.id);
                that.update();
                that.onUpdate.call(that, that.opts.config);
            }).on('mousemove.cl.id-' + that.opts.id, function (e) {
                position = getMousePosition(e);
                if (isResize && that.opts.option.resize) {
                    width = position.x - offset.left + 5;
                    height = position.y - offset.top + 5;
                    if (width < 10) {
                        width = 10;
                    }
                    if (height < 10) {
                        height = 10;
                    }
                    if (width > maxWidth) {
                        width = maxWidth;
                    }
                    if (height > maxHeight) {
                        height = maxHeight;
                    }
                    that.css({
                        width: width,
                        height: height
                    });
                } else if(that.opts.option.move) {
                    x = position.x - parentOffset.left - leftFix;
                    y = position.y - parentOffset.top - topFix;
                    if (x < 0) {
                        x = 0;
                    }
                    if (x > maxX) {
                        x = maxX;
                    }
                    if (y < 0) {
                        y = 0;
                    }
                    if (y > maxY) {
                        y = maxY;
                    }
                    that.css({
                        left: x,
                        top: y
                    });
                }
            });
        }).on("contextmenu",function (e) {
            e.preventDefault();
            e.stopPropagation();
            that.onContentMenu(e,that.getOption());
        });
    };

    Widget.prototype.show = function () {
        this.elem.show();
    };

    Widget.prototype.hide = function () {
        this.elem.hide();
    };

    Widget.prototype.remove = function () {
        this.elem.remove();
        this.onRemove(this);
    };

    Widget.prototype.select = function () {
        var that = this;
        if (this.elem.hasClass('cl-widget-selected')) {
            // this.cancelSelect();
        } else {
            this.elem.addClass('cl-widget-selected');
            if (lastSelectedWidget) {
                lastSelectedWidget.cancelSelect();
            }
            lastSelectedWidget = this;
            $doc.on('mousedown.widget.cancel' + that.opts.id, function () {
                that.cancelSelect();
                $(this).off('mousedown.widget.cancel' + that.opts.id);
            });
            this.onSelected.call(this, this.opts);
        }
    };
    Widget.prototype.cancelSelect = function () {
        $(document.body).off('mousedown.widget.cancel' + lastSelectedWidget.opts.id);
        this.elem.removeClass('cl-widget-selected');
        this.onCancelSelect();
    };
    //================ contextMenu ===============

    function showContextMenu(e, menus, callbacks) {
        var position = getMousePosition(e);
        var elem = $('<div class="cl-context-menu"></div>');
        var html = '';
        for (var i = 0; i < menus.length; i++) {
            var obj = menus[i];
            html += '<a href="javascript:void(0);">' + obj + '</a>';
        }
        elem.appendTo(document.body).css({
            top: position.y,
            left: position.x
        }).html(html).find(">a").on("click", function () {
            var self = $(this), index = self.index();
            elem.remove();
            callbacks[index] && callbacks[index]();
        }).on("mouseup", function (e) {
            e.stopPropagation();
        });
        var random = getRandomString();
        var $doc = $(document).on("mouseup." + random, function () {
            elem.remove();
            $doc.off("mouseup." + random);
        });
    }

    //================ common ====================

    function getRandomString(){
        return "cl"+Math.random().toString(16).substr(2);
    }

    function getMousePosition(ev) {
        if (ev.pageX || ev.pageY) {
            return {x: ev.pageX, y: ev.pageY};
        }
        return {
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    }

    function setCapture(e) {
        //设置捕获范围
        if (e.target.setCapture) {
            e.target.setCapture();
        } else if (window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }
    }

    function releaseCapture(e) {
        //取消捕获范围
        if (e.target.releaseCapture) {
            e.target.releaseCapture();
        } else if (window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }
    }


})(jQuery);
