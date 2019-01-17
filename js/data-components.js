/**
 * Created by Bright on 2019/1/14.
 */

//============自定义属性面板字段=======================================================

/* // 例子
 CustomLabel.addPropsPanelField("textArea", function (data, update) {
 var elem = $('<div><div class="cl-props-label">' + data.label + '</div><div class="cl-props-item"><textarea>' + data.value + '</textarea></div></div>');
 elem.find('textarea').on('keyup', function () {
 update($(this).val());
 });
 return elem;
 });
 */

// 可编辑多选框
CustomLabel.addPropsPanelField("checkbox-edit", function (data, update) {
    var elem = $('<div><div class="cl-props-label">' + data.label + '</div><div class="cl-props-item">' + data.option.map(function (obj) {
            return '<div><input type="checkbox" id="checkbox_edit_' + obj.value + '" class="checkbox" value="' + obj.value + '"/><label for="checkbox_edit_' + obj.value + '"><input class="text-box" type="text" value="' + obj.text + '"></label></div>';
        }).join('') + '</div></div>');
    var checkboxList = elem.find('.checkbox').on('click', function () {
        var val = [];
        checkboxList.each(function () {
            var self = $(this), index = self.parent().index();
            if (self.prop("checked")) {
                //val.push(self.val());
                val.push(data.option[index]);
            }
        });
        update(val);
    }).each(function () {
        var self = $(this);
        if (data.value.filter(function (n) {
                return n.value == self.val()
            }).length) {
            self.prop("checked", true);
        }
    });
    elem.find('.text-box').on('change', function (e) {
        var self = $(this), val = self.val(), index = self.parent().parent().index(), item = data.option[index];
        item.text = val;
        data.value.forEach(function (n) {
            if (n.value == item.value) {
                n.text = val;
            }
        });
        update(data.value);
    });
    return elem;
});


//============自定义组件=======================================================


CustomLabel.addComponents([
    {
        name: 'sub-order',
        group: '订单信息',
        icon: '',
        label: '子订单列表',
        config: {
            // 模板默认显示的数据
            data: [
                {
                    orderNo: '12345678',
                    createTime: '2019-01-15',
                    status: 1
                }
            ],
            props: { // 属性面板配置
                fields: {
                    group: '字段', // 属性分类
                    label: "显示字段",
                    type: "checkbox-edit",
                    option: [
                        {text: '订单编号', value: 'orderNo'},
                        {text: '时间', value: 'createTime'},
                        {text: '状态', value: 'status'},
                    ],
                    value: [{text: '订单编号', value: 'orderNo'}, {text: '时间', value: 'createTime'}]
                },
                rowNum: {
                    group: '字段', // 属性分类
                    label: "显示行数",
                    type: "text",
                    value: 2
                }
            },
            css: { // 默认外观信息
                width: '100%',
                height: 'auto',
                left: 0,
                fontSize: '12px',
            }
        },
        dataFormat: function (data) { // 数据mapping，将请求接口的数据mapping到自己需要的格式和字段
            return data.data.subOrderList.map(function (item) {
                return {
                    orderNo: item.orderNum,
                    createTime: item.createTime,
                    status: item.status,
                };
            });
        },
        render: function (config) {
            /*var html = '<table class="order-table"><thead><tr>' + config.props.fields.value.map(function (n) {
             return '<th>' + config.props.fields.option.filter(function (o) {
             return o.value == n
             })[0].text + '</th>';
             }).join('') + '</tr></thead><tbody>' + config.data.map(function (item) {
             return '<tr>' + config.props.fields.value.map(function (n) {
             return '<td><ec id="ec_order_'+n+'">' + item[n] + '</ec></td>';
             }).join('') + '</tr>';
             }).join('') + '</tbody></table>';*/

            var html = '<table class="order-table"><thead><tr>' + config.props.fields.value.map(function (n) {
                    return '<th>' + n.text + '</th>';
                }).join('') + '</tr></thead><tbody>' + Array.apply(null, Array(~~config.props.rowNum.value)).map(function () {
                    var item = config.data[0];
                    return '<tr>' + config.props.fields.value.map(function (n) {
                            return '<td><ec id="ec_order_' + n.value + '">' + item[n.value] + '</ec></td>';
                        }).join('') + '</tr>';
                }).join('') + '</tbody></table>';
            var obj = $(html);


            return obj;
        }
    },
    {
        name: 'goods-list',
        group: '订单信息',
        icon: '',
        label: '商品列表',
        config: {
            // 模板默认显示的数据
            data: [
                {
                    goodsId: '12345678',
                    name: 'Sony A7R3',
                    createTime: '2019-01-15',
                    status: 1
                }
            ],
            props: { // 属性面板配置
                fields: {
                    group: '字段', // 属性分类
                    label: "显示字段",
                    type: "checkbox",
                    option: [
                        {text: '商品编号', value: 'goodsId'},
                        {text: '商品名称', value: 'name'},
                        {text: '时间', value: 'createTime'},
                        {text: '状态', value: 'status'},
                    ],
                    value: ['goodsId','name','createTime',]
                }
            },
            css: { // 默认外观信息
                width: '100%',
                height: 'auto',
                left: 0,
                fontSize: '12px',
            }
        },
        dataFormat: function (data) { // 数据mapping，将请求接口的数据mapping到自己需要的格式和字段
            return data.data.goodsList.map(function (item) {
                return {
                    goodsId: item.goodsId,
                    name: item.name,
                    createTime: item.createTime,
                    status: item.status,
                };
            });
        },
        render: function (config) {
            var html = '<table class="order-table"><thead><tr>' + config.props.fields.value.map(function (n) {
                    return '<th>' + config.props.fields.option.filter(function (o) {
                            return o.value == n
                        })[0].text + '</th>';
                }).join('') + '</tr></thead><tbody>' + config.data.map(function (item) {
                    return '<tr>' + config.props.fields.value.map(function (n) {
                            return '<td><ec id="ec_order_' + n + '">' + item[n] + '</ec></td>';
                        }).join('') + '</tr>';
                }).join('') + '</tbody></table>';
            var obj = $(html);
            return obj;
        }
    },
    {
        name: 'order-address',
        group: '地址信息',
        icon: '',
        label: '收件人地址',
        config: {
            // 模板默认显示的数据
            data: {
                username: "上帝",
                phone: "13888888888",
                email: "test@gmail.com",
                post: "518000",
                country: "中华人民共和国",
                state: "南山区 ",
                city: "深圳",
                address1: "高新南二道",
                address2: "科技园"
            },
            props: { // 属性面板配置
                fields: {
                    group: '字段', // 属性分类
                    label: "显示字段",
                    type: "checkbox",
                    option: [
                        {text: '客户姓名', value: 'username'},
                        {text: '电话', value: 'phone'},
                        {text: '电子邮件', value: 'email'},
                        {text: '邮编', value: 'post'},
                        {text: '国家', value: 'country'},
                        {text: '地区', value: 'state'},
                        {text: '城市', value: 'city'},
                        {text: '地址1', value: 'address1'},
                        {text: '地址2', value: 'address2'},
                    ],
                    value: ['username', 'phone', 'email', 'post', 'country', 'state', 'city', 'address1', 'address2']
                }
            },
            css: { // 默认外观信息
                width: 'auto',
                height: 'auto',
                fontSize: '12px',
            }
        },
        dataFormat: function (data) { // 数据mapping，将请求接口的数据mapping到自己需要的格式和字段
            var userInfo = data.data.userInfo;
            return {
                username: userInfo.username,
                phone: userInfo.phone,
                email: userInfo.email,
                post: userInfo.post,
                country: userInfo.country,
                state: userInfo.state,
                city: userInfo.city,
                address1: userInfo.address1,
                address2: userInfo.address2
            };
        },
        render: function (config) {
            var html = '<div>';
            if (config.props.fields.value.indexOf("address1") > -1) {
                html += '地址1：' + config.data.address1 + '<br>';
            }
            if (config.props.fields.value.indexOf("address2") > -1) {
                html += '地址2：' + config.data.address2 + '<br>';
            }
            if (config.props.fields.value.indexOf("phone") > -1) {
                html += '电话：' + config.data.phone + '<br>';
            }
            if (config.props.fields.value.indexOf("email") > -1) {
                html += '电子邮件：' + config.data.email + '<br>';
            }
            if (config.props.fields.value.indexOf("post") > -1) {
                html += '邮编：' + config.data.post + '<br>';
            }
            if (config.props.fields.value.indexOf("country") > -1) {
                html += '国家：' + config.data.country + '<br>';
            }
            if (config.props.fields.value.indexOf("city") > -1) {
                html += '城市：' + config.data.city + '<br>';
            }
            if (config.props.fields.value.indexOf("state") > -1) {
                html += '地区：' + config.data.state + '<br>';
            }
            if (config.props.fields.value.indexOf("username") > -1) {
                html += '客户姓名：' + config.data.username + '<br>';
            }
            html += '</div>';
            var obj = $(html);
            return obj;
        }
    }
]);


