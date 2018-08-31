import baseURL from "../assets/js/ip"

const Upload = {}

Upload.install = function(Vue, options) {

    Vue.prototype.$uploadFile = class Uploader {
      /**
       *Creates an instance of Uploader.
       * @param {*} type : number 0 -> video, 1 -> image
       * @param {*} fileValue: file value by input
       * @param {*} fileEle: active uploader by click with DOM
       * @param {*} callback: success to upload with callback
       * @param {*} startFn: start to upload will be active
       * @param {*} errorFn: some error with over size or other
       */
      constructor (type, fileValue, fileEle, callback, startFn, errorFn) {
            this.type = type
            this.fileValue = fileValue
            this.fileEle = fileEle
            this.callback = callback
            this.startFn = startFn
            this.errorFn = errorFn
            this.uploader = null

            this.init()
        }

        static parseResponse(str) {
          let parseStr = str.slice(str.indexOf('{') + 1, str.lastIndexOf('}'))
          let parseArr = parseStr.split(',')
          let parseObj = {}
          for (let i = 0; i < parseArr.length; i++) {
            let item = parseArr[i].split('=')
            let fir = item[0].replace(/(^\s+|\s+$)/gim, '')
            parseObj[fir] = item[1]
          }
          return parseObj
        }

        sendRequest() {
          return new Promise((resolve, reject) => {
            let xmlhttp = null
            if (window.XMLHttpRequest) {
              xmlhttp=new XMLHttpRequest()
            } else if (window.ActiveXObject) {
              xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
            }
        
            if (xmlhttp!=null) {
              xmlhttp.onreadystatechange = () => {
                // console.log(xmlhttp.readyState, xmlhttp.status)
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                  // console.log('received from server')
                  resolve(xmlhttp.responseText)
                }
              }
              if (this.type + '' === '0') {
                xmlhttp.open( "POST", baseURL + '/video/testuploadvideoH', true )
              } else {
                xmlhttp.open( "POST", baseURL + '/commodity/testuploadimgH', true )
              }
              xmlhttp.send( null );
            } else {
              reject(null);
            }
          })
        }

        /**
         * @param max selecting field
         * @param num output size
         */
        randomName (max, num) {
          let strPattern = 'abcdefghijklmnopqrstuvwxyz1234567890'
          let str = ''
          for (var i = 0; i < max; i++) {
            str += strPattern[this.randomInt(0, 35)];
          }
          let parentStr = str + Date.parse(new Date())
          let outputStr = ''
          for (var i = 0; i < num; i++) {
            outputStr += parentStr[this.randomInt(0, parentStr.length-1)];
          }
          return outputStr + Date.parse(new Date()) / 1000 % 1000000
        }

        randomInt (from, to) {
          return Number.parseInt((to - from + 1) * Math.random()) + from
        }

        getSuffix(filename) {
          let pos = filename.lastIndexOf('.')
          let suffix = ''
          if (pos != -1) {
              suffix = filename.substring(pos)
          }
          return suffix;
        }

        init () {
          switch (this.type + "") {
              case '0':
                  this.uploadVideo(this.fileValue, this.fileEle, this.startFn, this.errorFn, this.callback)
                  break;
              case '1':
                  this.uploadImg(this.fileValue, this.fileEle, this.startFn, this.errorFn, this.callback)
                  break;
          }
        }

        uploadVideo(fileValue, fileEle, startFn, errorFn, callback) {
          let that = this
          let accessid = ''
          let host = ''
          let policyBase64 = ''
          let signature = ''
          let filename = this.randomName(100, 20)
          let key = ''
          let expire = 0

          let set_upload_param = async (up, name) => {
              let body = await this.sendRequest()
              let obj = eval ("(" + body + ")")
              host = obj['host']
              policyBase64 = obj['policy']
              accessid = obj['accessid']
              signature = obj['signature']
              expire = parseInt(obj['expire'])
              key = obj['dir']
              filename = this.randomName(100, 20)

              let uploadName
              if (name) {
                uploadName = filename + this.getSuffix(name)
              } else {
                uploadName = '${filename}'
              }
              up.setOption({
                  'url': host,
                  'multipart_params': {
                      'key' : key + uploadName,
                      'policy': policyBase64,
                      'OSSAccessKeyId': accessid, 
                      'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
                      'signature': signature
                  }
              })
              up.start()
          }
          this.uploader = new plupload.Uploader({
              url : 'http://oss.aliyuncs.com',
              runtimes : 'html5,flash,silverlight,html4',
              browse_button : fileEle,
              multi_selection: false,
              filters: {
                  mime_types : [ //只允许上传图片和zip文件
                      { title : "Video files", extensions : "mp4" }
                  ],
                  max_file_size : '200mb', //最大只能上传200mb的文件
                  prevent_duplicates : true //不允许选取重复文件
              },
              flash_swf_url : '/control-system/static/plupload-2.1.2/js/Moxie.swf',
              silverlight_xap_url : '/control-system/static/plupload-2.1.2/js/Moxie.xap',


              init: {
                  init: function (up) {
                      console.log('initing')
                  },
                  PostInit: function (up) {
                      console.log('post initing')
                  },
                  FilesAdded: function(up, files) {
                      plupload.each(files, function(file) {
                          // console.log(file.id, file.name, file.size);
                      })
                      set_upload_param(up, files[files.length - 1] ? files[files.length - 1].name : '')
                      
                  },
                  Browse: function (up) {
                    console.log('Browse')
                  },
                  BeforeUpload: function(up, file) {
                      // set_upload_param(up, file.name)
                  },
                  UploadFile: function(up, file) {
                    if (startFn) {
                      startFn()
                    }
                  },
                  UploadProgress: function(up, file) {
                    if (startFn) {
                      startFn(file.percent)
                    }
                    // console.log('progress: ', file.id, file.percent)
                  },

                  FileUploaded: function(up, file, info) {
                      // console.log('uploaded')
                      // console.log(info.status)
                      if (info.status >= 200 || info.status < 200)
                      {
                          // console.log('success: ', file, info)
                          // return result
                          if (callback) {
                            callback(up, {
                                msg: filename ? host + '/' + key + filename + that.getSuffix(file.name) : host + '/' + key + file.name,
                                shotcut: (filename ? host + '/' + key + filename + that.getSuffix(file.name) : host + '/' + key + file.name) + '?x-oss-process=video/snapshot,t_5000,f_jpg'
                            })
                          }
                      
                      }
                      else
                      {
                          // console.log('fail: ', file, info.response)
                      }
                  },
                  Destroy: function (up) {
                    console.log('destroyed')
                  },
                  Error: function(up, err) {
                      // console.log('error', err.response)
                      if (errorFn && typeof errorFn == 'function') {
                        errorFn(err.response)
                      }
                  }
              }
          })
          this.uploader.init()
        }

        uploadImg(fileValue, fileEle, startFn, errorFn, callback) {
          let that = this
          let accessid = ''
          let host = ''
          let policyBase64 = ''
          let signature = ''
          let filename = this.randomName(100, 20)
          let key = ''
          let expire = 0

          let set_upload_param = async (up, name) => {
              let body = await this.sendRequest()
              let obj = eval ("(" + body + ")")
              host = obj['host']
              policyBase64 = obj['policy']
              accessid = obj['accessid']
              signature = obj['signature']
              expire = parseInt(obj['expire'])
              key = obj['dir']
              filename = this.randomName(100, 20)

              let uploadName
              if (name) {
                uploadName = filename + this.getSuffix(name)
              } else {
                uploadName = '${filename}'
              }
              up.setOption({
                  'url': host,
                  'multipart_params': {
                      'key' : key + uploadName,
                      'policy': policyBase64,
                      'OSSAccessKeyId': accessid, 
                      'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
                      'signature': signature
                  }
              })
              up.start()
          }
          this.uploader = new plupload.Uploader({
              url : 'http://oss.aliyuncs.com',
              runtimes : 'html5,flash,silverlight,html4',
              browse_button : fileEle,
              multi_selection: false,
              filters: {
                  mime_types : [ //只允许上传图片和zip文件
                    {title : "Image files", extensions : "jpg,jpeg,gif,png"}
                  ],
                  max_file_size : '200mb', //最大只能上传200mb的文件
                  prevent_duplicates : true //不允许选取重复文件
              },
              flash_swf_url: '/control-system/static/plupload-2.1.2/js/Moxie.swf',
              silverlight_xap_url: '/control-system/static/plupload-2.1.2/js/Moxie.xap',


              init: {
                  init: function (up) {
                      console.log('initing')
                  },
                  PostInit: function (up) {
                      console.log('post initing')
                  },
                  FilesAdded: function(up, files) {
                      plupload.each(files, function(file) {
                          // console.log(file.id, file.name, file.size);
                      })
                      set_upload_param(up, files[files.length - 1] ? files[files.length - 1].name : '')
                      
                  },
                  Browse: function (up) {
                    console.log('Browse')
                  },
                  BeforeUpload: function(up, file) {
                      // set_upload_param(up, file.name)
                  },
                  UploadFile: function(up, file) {
                    if (startFn) {
                      startFn()
                    }
                  },
                  UploadProgress: function(up, file) {
                    if (startFn) {
                      startFn(file.percent)
                    }
                    // console.log('progress: ', file.id, file.percent)
                  },

                  FileUploaded: function(up, file, info) {
                      // console.log('uploaded')
                      // console.log(info.status)
                      if (info.status >= 200 || info.status < 200)
                      {
                          // console.log('success: ', file, info)
                          // return result
                          if (callback) {
                            callback(up, (filename ? host + '/' + key + filename + that.getSuffix(file.name) : host + '/' + key + file.name))
                          }
                      
                      }
                      else
                      {
                          // console.log('fail: ', file, info.response)
                      }
                  },
                  Destroy: function (up) {
                    console.log('destroyed')
                  },
                  Error: function(up, err) {
                      // console.log('error', err.response)
                      if (errorFn && typeof errorFn == 'function') {
                        errorFn(err.response)
                      }
                  }
              }
          })
          this.uploader.init()
        }
    }
}

export default Upload