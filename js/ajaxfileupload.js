/**
 * 131108-xxj-ajaxFileUpload.js 无刷新上传图片 jquery 插件，支持 ie6-ie10
 * 依赖：jquery-1.6.1.min.js
 * 主方法：ajaxFileUpload 接受 json 对象参数
 * 参数说明：
 * fileElementId：必选,上传文件域ID
 * url：必选，发送请求的URL字符串
 * fileFilter：可选，限定上传文件的格式（.jpg,.bmp,.gif,.png）
 * fileSize:可选，0 为无限制(IE浏览器不兼容)
 * data:可选，将和文件域一同post的参数（json对象）
 * 其它：$.ajax 的参数均为可选参数
 * 注：如遇到‘无法访问’的脚本错误提示则需要在响应流中加一段脚块一同输出：<script ...>document.domain = 'xxx.com';</script>
 */
jQuery.extend({
    // 创建 iframe 元素,接受提交及响应
    createUploadIframe: function(id, uri) {
        // create frame
        var frameId = 'jUploadFrame' + id
        var io = null

        if (window.ActiveXObject) {
            // fix ie9 and ie 10-------------
            if (jQuery.browser.version === '9.0' || jQuery.browser.version === '10.0') {
                io = document.createElement('iframe')
                io.id = frameId
                io.name = frameId
            } else if (jQuery.browser.version === '6.0' || jQuery.browser.version === '7.0' || jQuery.browser.version === '8.0') {
                io = document.createElement('<iframe id="' + frameId + '" name="' + frameId + '" />')
                if (typeof uri === 'boolean') {
                    io.src = 'javascript:false'
                } else if (typeof uri === 'string') {
                    io.src = uri
                }
            }
        } else {
            io = document.createElement('iframe')
            io.id = frameId
            io.name = frameId
        }
        io.style.position = 'absolute'
        io.style.top = '-1000px'
        io.style.left = '-1000px'
        document.body.appendChild(io)

        return io
    },
    // 创建 from 元素，用于提交的表单
    createUploadForm: function(id, fileElementId, postData) {
        // create form<span style="white-space:pre">   </span>
        var formId = 'jUploadForm' + id
        var fileId = 'jUploadFile' + id
        var form = $('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>')
        var oldElement = jQuery('#' + fileElementId)
        var newElement = oldElement.clone(true)

        newElement[0].files = oldElement[0].files
        oldElement.attr('id', fileId)
        oldElement.before(newElement)
        oldElement.appendTo(form)

        // 添加自定义参数
        if (postData) {
            // 递归遍历JSON所有键值
            var recurJson = function (json) {
                for (var i in json) {
                    $('<input name="' + i + '" id="' + i + '" value="' + json[i] + '" />').appendTo(form)
                    if (typeof json[i] === 'object') {
                        recurJson(json[i])
                    }
                }
            }

            recurJson(postData)
        }
        // set attributes
        $(form).css('position', 'absolute')
        $(form).css('top', '-1200px')
        $(form).css('left', '-1200px')
        $(form).appendTo('body')
        return form
    },
    // 上传文件
    // s 参数：json对象
    ajaxFileUpload: function(s) {
        s = jQuery.extend({ fileFilter: '', fileSize: 0 }, jQuery.ajaxSettings, s)

        // 文件筛选
        var fielName = $('#' + s.fileElementId).val()
        var extention = fielName.substring(fielName.lastIndexOf('.') + 1).toLowerCase()

        if (s.fileFilter && s.fileFilter.indexOf(extention) < 0) {
            alert('仅支持 (' + s.fileFilter + ') 为后缀名的文件!')
            return
        }

        // 文件大小限制
        if (s.fileSize > 0) {
            var fs = 0
            try {
                if (window.ActiveXObject) {
                    // IE浏览器
                    var image = new Image()
                    image.dynsrc = fielName
                    fs = image.fileSize
                } else {
                    fs = $('#' + s.fileElementId)[0].files[0].size
                }
            } catch (e) {}

            if (fs > s.fileSize) {
                alert('当前文件大小 (' + fs + ') 超过允许的限制值 (' + s.fileSize + ')！')
                return
            }
        }
        var id = new Date().getTime()
        // 创建 form 表单元素
        var form = jQuery.createUploadForm(id, s.fileElementId, s.data)
        // 创建 iframe 贞元素
        // var io = jQuery.createUploadIframe(id, s.secureuri)
        var frameId = 'jUploadFrame' + id
        var formId = 'jUploadForm' + id

        // 监测是否有新的请求
        if (s.global && !jQuery.active++) {
            // 触发 AJAX 请求开始时执行函数。Ajax 事件。
            jQuery.event.trigger('ajaxStart')
        }

        var requestDone = false

        // 创建请求对象
        var xml = {}

        // 触发 AJAX 请求发送前事件
        if (s.global) {
            jQuery.event.trigger('ajaxSend', [xml, s])
        }

        // 上载完成的回调函数
        var uploadCallback = function(isTimeout) {
            var io = document.getElementById(frameId)

            try {
                // 存在跨域脚本访问问题，如遇到‘无法访问’提示则需要在响应流中加一段脚块：<script ...>document.domain = 'xxx.com';</script>
                // 兼容各个浏览器，可取得子窗口的 window 对象
                if (io.contentWindow) {
                    xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null
                    xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document
                } else if (io.contentDocument) {
                    // contentDocument Firefox 支持，> ie8 的ie支持。可取得子窗口的 document 对象。
                    xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null
                    xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document
                }
            } catch (e) {
                jQuery.handleErrorExt(s, xml, null, e)
            }

            if (xml || isTimeout === 'timeout') {
                requestDone = true
                var status
                try {
                    status = isTimeout !== 'timeout' ? 'success' : 'error'
                    // Make sure that the request was successful or notmodified
                    if (status !== 'error') {
                        // 处理数据（运行XML通过httpData不管回调）
                        var data = jQuery.uploadHttpData(xml, s.dataType)

                        // If a local callback was specified, fire it and pass it the data
                        if (s.success) {
                            s.success(data, status)
                        }

                        // Fire the global callback
                        if (s.global) {
                            jQuery.event.trigger('ajaxSuccess', [xml, s])
                        }
                    } else {
                        jQuery.handleErrorExt(s, xml, status)
                    }
                } catch (e) {
                    status = 'error'
                    jQuery.handleErrorExt(s, xml, status, e)
                }

                // The request was completed
                if (s.global) {
                    jQuery.event.trigger('ajaxComplete', [xml, s])
                }

                // Handle the global AJAX counter
                if (s.global && !--jQuery.active) {
                    jQuery.event.trigger('ajaxStop')
                }

                // Process result
                if (s.complete) {
                    s.complete(xml, status)
                }

                jQuery(io).unbind()
                setTimeout(function() {
                    try {
                        $(io).remove()
                        $(form).remove()
                    } catch (e) {
                        jQuery.handleErrorExt(s, xml, null, e)
                    }
                }, 100)

                xml = null
            }
        }

        // 超时检查，s.timeout 毫秒后调用 uploadCallback 回调函数提示请求超时
        if (s.timeout > 0) {
            setTimeout(function() {
            // Check to see if the request is still happening
                if (!requestDone) uploadCallback('timeout')
            }, s.timeout)
        }

        try {
            // 设置动态 form 表单的提交参数
            var fm = $('#' + formId)
            $(fm).attr('action', s.url)
            $(fm).attr('method', 'POST')
            $(fm).attr('target', frameId)
            if (fm.encoding) {
                fm.encoding = 'multipart/form-data'
            } else {
                fm.enctype = 'multipart/form-data'
            }
            $(fm).submit()
        } catch (e) {
            jQuery.handleErrorExt(s, xml, null, e)
        }

        // 向动态表单的页面加载事件中注册回调函数
        if (window.attachEvent) {
            document.getElementById(frameId).attachEvent('onload', uploadCallback)
        } else {
            document.getElementById(frameId).addEventListener('load', uploadCallback, false)
        }
        return {
            abort: function() {}
        }
    },
    // 上传文件
    uploadHttpData: function(r, type) {
        var data = !type
        data = type === 'xml' || data ? r.responseXML : r.responseText

        switch (type) {
            case 'script': // If the type is "script", eval it in global context
                jQuery.globalEval(data)
                break
            case 'json': // Get the JavaScript object, if JSON is used.
                eval('data = ' + data)
                break
            case 'html': // evaluate scripts within html
                jQuery('<div>').html(data).evalScripts()
                break
        }

        return data
    },
    handleErrorExt: function(s, xhr, status, e) {
        // If a local callback was specified, fire it
        if (s.error) {
            s.error.call(s.context || s, xhr, status, e)
        }

        // Fire the global callback
        if (s.global) {
            (s.context ? jQuery(s.context) : jQuery.event).trigger('ajaxError', [xhr, s, e])
        }
    }
})
