const dateTimePicker = require('../../utils/dateTimePicker.js');
const api = require('../../api/api.js')
const app = getApp()
Page({
    data: {
        isChecked: false,
        dateTime: null,
        index: 0,
        resData: [],
        money: 0.1,
        cateName: '',
        brandName: '',
        height: 0,
        isSuns: false,
        isexpiration: false,
        typeId: '',
        failList: [],
        uploadVoucherPhotos: [],
        uploadFailPhotos: [],
        uploadUrl: app.baseUrl + '/upload/uploadVoucherImg',
        showRemoveIcon: false,
        formType: 'submit'
    },
    changeDateTime(e) {
        this.setData({dateTime: e.detail.value});
    },
    changeDateTimeColumn(e) {
        var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

        this.setData({
            dateTimeArray: dateArr,
            dateTime: arr
        });
    },
    click: function () {
        this.setData({
            isChecked: true
        });
    },
    onLoad: function (options) {
        let typeId = options.typeId
        this.setData({
            typeId: typeId
        })
        let that = this
        // 获取系统信息
        wx.getSystemInfo({
            success: function (res) {
                // 可使用窗口宽度、高度
                // 计算主体部分高度,单位为px
                that.setData({
                    // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
                    height: res.windowHeight - res.windowWidth / 750 * 98
                })
            }
        })
        // 生命周期函数--监听页面加载
        isChecked: (options.isChecked == "true" ? true : false),
            this.data.brandName = options.brandName
        this.data.cateName = options.cateName
        // 获取完整的年月日 时分秒，以及默认显示的数组
        var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        // 精确到分的处理，将数组的秒去掉
        var lastArray = obj.dateTimeArray.pop();
        var lastTime = obj.dateTime.pop();

        this.setData({
            dateTimeArray: obj.dateTimeArray,
            dateTime: obj.dateTime,
            isChecked: true
        });

        //获取故障原因列表
        // if (this.data.typeId === '') {

        // } else{

        // }
        let params = {
            typeId: this.data.typeId
        }
        api._post('/front/failure/getFailureList', params)
            .then(res => {
                let list = res.data
                this.setData({
                    failList: list
                })
            })
    },
    serviceSelection() {
        this.setData({
            isChecked: true
        })
    },

    handlerIsExpiration: function (e) {
        let isHide = e.currentTarget.dataset.isexpiration != '0'
        if (isHide) {
            this.setData({
                uploadVoucherPhotos: []
            })
        }
        this.setData({
            isexpiration: isHide
        });
    },
    handlerisSuns: function (e) {
        this.setData({
            isSuns: e.currentTarget.dataset.issuns == '0' ? false : true
        });
    },
    selectFail: function (e) {
        let index = e.currentTarget.dataset.index;
        this.data.failList[index].checked = !this.data.failList[index].checked
        this.setData({
            failList: this.data.failList
        })
    },
    subscribe: function (e) {
        let that = this
        if (!this.data.isexpiration) {
            if (this.data.uploadVoucherPhotos.length === 0) {
                wx.showToast({
                    title: '保修凭证不能空',
                    icon: 'error',
                    duration: 2000
                })
                return false;
            }

        }

        if (this.data.uploadFailPhotos.length === 0) {
            wx.showToast({
                title: '故障图片不能空',
                icon: 'error',
                duration: 2000
            })
            return false;
        }

        let username = e.detail.value.username
        let phone = e.detail.value.phone
        let address = e.detail.value.address
        let remark = e.detail.value.remark
        let photosStr = this.data.uploadVoucherPhotos.toString()
        let voucherImages = this.data.uploadVoucherPhotos.toString()


        if (username === '' || username === undefined) {
            wx.showToast({
                title: '请输入名字',
                icon: 'none'
            })
            return false;
        }
        if (phone === '' || phone === undefined) {
            wx.showToast({
                title: '请输入手机号',
                icon: 'none'
            })
            return false;
        }
        if (!app.isPoneAvailable(phone)) {
            wx.showToast({
                title: '请输入正确手机号',
                icon: 'none'
            })
            return false;
        }
        if (address === '' || address === undefined) {
            wx.showToast({
                title: '请输入地址',
                icon: 'none'
            })
            return false;
        }
        if (this.data.failList.length === 0) {
            wx.showToast({
                title: '故障原因不能空',
                icon: 'none'
            })
            return false;
        }
        let time = that.data.dateTimeArray[0][that.data.dateTime[0]] + '-' + that.data.dateTimeArray[1][that.data.dateTime[1]] + '-' + that.data.dateTimeArray[2][that.data.dateTime[2]] + ' ' + that.data.dateTimeArray[3][that.data.dateTime[3]] + ':' + that.data.dateTimeArray[4][that.data.dateTime[4]] + ':00'


        if (time === '' || time === undefined) {
            wx.showToast({
                title: '请输入具体安装时间',
                icon: 'none'
            })
            return false;
        }
        let failStr = ''
        for (let i = 0; i < this.data.failList.length; i++) {
           failStr += this.data.failList[i].fcName + ','
        }
        let params = {
            orderIsexpiration: this.data.isexpiration,
            orderType: 1,
            orderFailureCause: failStr + remark,
            orderIsxs: this.data.isSuns,
            orderCateName: this.data.cateName,
            orderBraName: this.data.brandName,
            orderUserName: username,
            orderPhone: phone,
            orderAddress: address,
            appointmentTime: time,
            photosStr: photosStr,
            voucherImages: voucherImages
        }
        api._post('/front/order/submitOrder', params).then(res => {
            if (res.status === 200) {
                let orderId = res.data
                let params = {
                    productName: '格力空调上门安装预约费',
                    out_trade_no: orderId,
                    total_fee: '1',
                    accessToken: app.globalData.accessToken
                }

                let payTemppara = {
                    orderId: orderId,
                    total: 1
                }
                api._post('/front/pay/wxPayTemp', payTemppara).then(res => {
                    if (res.status === 200) {
                        wx.switchTab({
                            url: '../index/index',
                        })
                    }
                })

                //支付功能已完成 ，暂时关闭支付功能
                // api._post('/front/pay/wxPay',params).then(res => {
                //    if (res.status === 200) {
                //      let payParams = {
                //        timeStamp: res.data.timeStamp,
                //        nonceStr: res.data.nonceStr,
                //        package: res.data.package,
                //        signType: 'MD5',
                //        paySign: res.data.paySign
                //      }
                //      wx.requestPayment(
                //        {
                //          timeStamp: res.data.timeStamp,
                //          nonceStr: res.data.nonceStr,
                //          package: res.data.package,
                //          signType: 'MD5',
                //          paySign: res.data.paySign,
                //          'success': function (res) {
                //            console.log('success:' + res)
                //          },
                //          'fail': function (res) {
                //            console.log(res)
                //          },
                //          'complete': function (res) {
                //            console.log('complete:' + res)
                //          }
                //        })
                //    }
                // })
            }
        })
    },
    onChange(e) {
        const {file} = e.detail
        if (file.status === 'uploading') {
            this.setData({
                progress: 0,
            })
            wx.showLoading()
        } else if (file.status === 'done') {
            this.setData({
                imageUrl: file.url,
            })
        }
    },
    onSuccess(e) {

    },
    onFail(e) {
        console.log('fail')
        this.data.uploadVoucherPhotos = e
        this.setData({
            uploadVoucherPhotos: e
        })
        console.log(this.data.uploadVoucherPhotos)
    },
    onComplete(e) {
        wx.hideLoading()
        console.log(e)
        const result = e.detail
        console.log(result.statusCode)
        if (result.statusCode === 200) {

            let data = JSON.parse(result.data)
            if (data.status === 200) {
                let photo = {
                    url: api.baseUrl + data.data
                }
                this.data.uploadVoucherPhotos.push(photo)
                this.setData({
                    uploadVoucherPhotos: this.data.uploadVoucherPhotos
                })
            }
        }
    },
    onProgress(e) {
        this.setData({
            progress: e.detail.file.progress,
        })
    },
    onPreview(e) {
        const {file, fileList} = e.detail
        wx.previewImage({
            current: file.url,
            urls: fileList.map((n) => n.url),
        })
    },
    onRemove(e) {
        const {file, fileList} = e.detail
        wx.showModal({
            content: '确定删除？',
            success: (res) => {
                if (res.confirm) {
                    this.setData({
                        uploadVoucherPhotos: fileList.filter((n) => n.url !== file.url),
                    })
                }
            },
        })
    },
    onChange(e) {
        const {file} = e.detail
        if (file.status === 'uploading') {
            this.setData({
                progress: 0,
            })
            wx.showLoading()
        } else if (file.status === 'done') {
            this.setData({
                imageUrl: file.url,
            })
        }
    },
    onFailSuccess(e) {

    },
    onFailFail(e) {

    },
    onFailComplete(e) {
        wx.hideLoading()
        console.log(e)
        const result = e.detail
        if (result.statusCode === 200) {

            let data = JSON.parse(result.data)
            if (data.status === 200) {
                let photo = {
                    url: api.baseUrl + data.data
                }
                this.data.uploadFailPhotos.push(photo)
                this.setData({
                    uploadFailPhotos: this.data.uploadFailPhotos
                })
            }
        }
    },
    onFailProgress(e) {
        this.setData({
            progress: e.detail.file.progress,
        })
    },
    onFailPreview(e) {
        const {file, fileList} = e.detail
        wx.previewImage({
            current: file.url,
            urls: fileList.map((n) => n.url),
        })
    },
    onFailRemove(e) {
        const {file, fileList} = e.detail
        wx.showModal({
            content: '确定删除？',
            success: (res) => {
                if (res.confirm) {
                    this.setData({
                        uploadFailPhotos: fileList.filter((n) => n.url !== file.url),
                    })
                }
            },
        })
    }
})
