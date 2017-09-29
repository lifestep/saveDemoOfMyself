//set global request position
var myRequestIp = "<URL host>"

// create a editor
var E = window.wangEditor
var editor = new E('#editor')
editor.customConfig.customUploadImg = function(files, insert) {
    updateAndInsert(files[0], files[0].name, insert) // 支持一张图片
}
editor.create()
editor.txt.append('<p>注意：<b>图片只支持单张上传</b>，点击图片可以更改尺寸，但是不同浏览器兼容不同，部分浏览器为点击即可以进行拉伸，但是也有点击后，图片出现边框，没有可拉伸方式，可以点击菜单栏上传图片按钮，进行缩放</p>')

// 自定义上传阿里云 并插入 图片
function updateAndInsert(f, fileValue, insert) {

    axios.post(myRequestIp + 'user/findAliyun')
        .then(getUpdatacondit => {
            let getedData = getUpdatacondit.data.response
            let client = new OSS.Wrapper({
                region: 'oss-cn-hangzhou',
                accessKeyId: getedData.accessKeyId,
                accessKeySecret: getedData.accessKeySecret,
                stsToken: getedData.securityToken,
                expiration: getedData.expiration,
                bucket: 'hy-zhiyin'
            })
            let format = fileValue.slice(fileValue.indexOf("."))
            let stackTime = new Date()
            let obj = getedData.imgName + '-' + stackTime.getTime() // 生成文件名
            let filename = obj + format //命名

            client.multipartUpload(filename, f).then(result => {
                    insert('http://hy-zhiyin.oss-cn-hangzhou.aliyuncs.com/' + result.name)
                }).catch(err => {
                    console.log(err, '图片上传失败')
                })
                //	===end 阿里云=========
        })
        .catch(data => {
            console.log(data, '获取key失败')
        })
}

document.getElementById('btn1').addEventListener('click', function() {
    // 读取 html
    alert(editor.txt.html())
}, false)

document.getElementById('btn2').addEventListener('click', function() {
    // 读取 text
    alert(editor.txt.text())
}, false)