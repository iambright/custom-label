/**
 * Created by Bright on 2019/1/14.
 */

//============属性面板字段=======================================================

// 文本框
// text 默认有了
// 文本域
CustomLabel.addPropsPanelField("textArea", function (data, update) {
    var elem = $('<div><div class="cl-props-label">' + data.label + '</div><div class="cl-props-item"><textarea>' + data.value + '</textarea></div></div>');
    elem.find('textarea').on('keyup', function () {
        update($(this).val());
    });
    return elem;
});

// 下拉框
CustomLabel.addPropsPanelField("select", function (data, update) {
    var elem = $('<div><div class="cl-props-label">' + data.label + '</div><div class="cl-props-item"><select>' + data.option.map(function (obj) {
            return '<option value="' + obj.value + '">' + obj.text + '</option>';
        }) + '</select></div></div>');
    elem.find('select').on('change', function () {
        update($(this).val());
    });
    return elem;
});

// 多选框
CustomLabel.addPropsPanelField("checkbox", function (data, update) {
    var elem = $('<div><div class="cl-props-label">' + data.label + '</div><div class="cl-props-item">' + data.option.map(function (obj) {
            return '<div><input type="checkbox" id="checkbox_edit_' + obj.value + '" class="checkbox" value="' + obj.value + '"/><label for="checkbox_edit_' + obj.value + '">' + obj.text + '</label></div>';
        }).join('') + '</div></div>');
    var checkboxList = elem.find('.checkbox').on('click', function () {
        var val = [];
        checkboxList.each(function () {
            var self = $(this);
            if (self.prop("checked")) {
                val.push(self.val());
            }
        });
        update(val);
    }).each(function(){
        var self = $(this);
        if(data.value.indexOf(self.val())>-1){
            self.prop("checked",true);
        }
    });
    return elem;
});

//============组件=======================================================


CustomLabel.addComponents([
    {
        name: 'x-line',
        group: '常用元素',
        icon: '',
        label: '水平直线',
        config: {
            props: {
                width: {
                    group: '文字', // 属性分类
                    label: "宽度",
                    type: "text",
                    value: "100%"
                },
                weight: {
                    group: '文字', // 属性分类
                    label: "线条粗细",
                    type: "select",
                    option: [
                        {text: '1px', value: 1},
                        {text: '2px', value: 2},
                        {text: '3px', value: 3},
                        {text: '4px', value: 4},
                        {text: '5px', value: 5}
                    ],
                    value: 1
                },
                style: {
                    group: '文字', // 属性分类
                    label: "线条样式",
                    type: "select",
                    option: [
                        {text: '实线', value: 'solid'},
                        {text: '虚线', value: 'dashed'},
                        {text: '点线', value: 'dotted'},
                        {text: '双实线', value: 'double'}
                    ],
                    value: 'solid'
                }
            },
            css: {
                width: '100%',
                height:'5px',
                left:0
            }
        },
        option:{
            resize:false,
            move:true
        },
        render: function (config) {
            this.css({
                width:config.props.width.value
            });
            return '<div style="width:100%;height:0px;border-top:' + (config.props.weight.value) + 'px ' + (config.props.style.value) + ' #000;overflow:hidden;"></div>';
        }
    },
    {
        name: 'y-line',
        group: '常用元素',
        icon: '',
        label: '垂直直线',
        config: {
            //data:{},
            props: {
                height: {
                    group: '文字', // 属性分类
                    label: "高度",
                    type: "text",
                    value: "100%"
                },
                weight: {
                    group: '文字', // 属性分类
                    label: "线条粗细",
                    type: "select",
                    option: [
                        {text: '1px', value: 1},
                        {text: '2px', value: 2},
                        {text: '3px', value: 3},
                        {text: '4px', value: 4},
                        {text: '5px', value: 5}
                    ],
                    value: 1
                },
                style: {
                    group: '文字', // 属性分类
                    label: "线条样式",
                    type: "select",
                    option: [
                        {text: '实线', value: 'solid'},
                        {text: '虚线', value: 'dashed'},
                        {text: '点线', value: 'dotted'},
                        {text: '双实线', value: 'double'}
                    ],
                    value: 'solid'
                }
            },
            css: {
                width:'5px',
                height: '100%',
                top:0
            }
        },
        option:{
            resize:false,
            move:true
        },
        render: function (config) {
            this.css({
                height:config.props.height.value
            });
            return '<div style="width:0;height:100%;border-left:' + (config.props.weight.value) + 'px ' + (config.props.style.value) + ' #000;overflow:hidden;"></div>';
        }
    },
    {
        name: 'local-text',
        group: '常用元素', // 组件分类
        icon: '',
        label: '自定义文本框',// 属性面板名字
        config: {
            data: { // 后端接口返回数据
                text: "自定义文本"
            },
            props: { // 属性面板配置
                text: {
                    group: '文字', // 属性分类
                    label: "文本内容",
                    type: "text",
                    value: '文本内容'
                }
            },
            css: { // 默认外观信息
                width: '100px',
                fontSize: '12px',
            }
        },
        render: function (config) {
            var obj = $('<div>' + config.props.text.value + '</div>');
            return obj;
        }
    },
    {
        name: 'round',
        group: '常用元素',
        icon: '',
        label: '圆形框',
        config: {
            props: { // 属性面板配置
                text: {
                    group: '文字', // 属性分类
                    label: "文本内容",
                    type: "text",
                    value: 'A'
                },
                fontSize: {
                    group: '文字', // 属性分类
                    label: "字体大小",
                    type: "select",
                    option: [
                        {text: '12px', value: 12},
                        {text: '15px', value: 15},
                        {text: '18px', value: 18},
                        {text: '21px', value: 21},
                        {text: '24px', value: 24}
                    ],
                    value: 12
                },
                borderWidth: {
                    group: '文字', // 属性分类
                    label: "边框粗细",
                    type: "select",
                    option: [
                        {text: '1px', value: 1},
                        {text: '2px', value: 2},
                        {text: '3px', value: 3},
                        {text: '4px', value: 4},
                        {text: '5px', value: 5}
                    ],
                    value: 1
                }
            },
            css: { // 默认外观信息
                width: '30px',
                height: '30px',
                fontSize: '12px',
            }
        },
        render: function (config) {
            var width = this.getElem().width();
            this.css({
                height: width
            });
            var obj = $('<div style="width:100%;height:100%;text-align:center;border:'+config.props.borderWidth.value+'px solid #000;border-radius: 100px;">' + config.props.text.value + '</div>').css({
                lineHeight: (width-config.props.borderWidth.value*2) + 'px',
                fontSize: config.props.fontSize.value + 'px'
            });
            return obj;
        }
    },
    {
        name: 'image',
        group: '常用元素',
        icon: '',
        label: '本地图片',
        config: {
            props: { // 属性面板配置
                src: {
                    group: '文字', // 属性分类
                    label: "图片地址",
                    type: "text",
                    value: './img/img_default.jpg'
                }
            },
            css: { // 默认外观信息
                width: '100px',
                height: '100px',
                fontSize: '12px',
            }
        },
        render: function (config) {
            var obj = $('<img style="width: 100%;height: 100%;display: block;" src="' + config.props.src.value + '"/>');
            return obj;
        }
    }
]);


