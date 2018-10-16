const app = getApp()
const dateTimePicker = require('../../utils/dateTimePicker.js');
// 在需要使用的js文件中，导入js
const util = require('../../utils/util.js');
const api = require('../../api/api.js')
Page({
  data: {
    dateTime: null,
    times: '12:00',
    index: 0,
    resData: [],
    money: 0.1,
    cateName: '',
    brandName: ''
  },
  changeDateTime(e) {
    this.setData({
      dateTime: e.detail.value
    })
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime,
      dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    })
  },
  onLoad: function(e) {
    this.data.brandName = e.brandName
    this.data.cateName = e.cateName
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj.dateTimeArray.pop();
    var lastTime = obj.dateTime.pop();

    this.setData({
      dateTimeArray: obj.dateTimeArray,
      dateTime: obj.dateTime
    })
  },
  subscribe: function(e) {
    let that = this
    let username = e.detail.value.username
    let phone = e.detail.value.phone
    let address = e.detail.value.address
    let remark = e.detail.value.remark
    if (username === '' || username === undefined) {
      wx.showToast({
        title: '请输入名字',
        icon: 'none'
      })
      return false
    }
    if (phone === '' || phone === undefined) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return false
    }
    if (!app.isPoneAvailable(phone)) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none'
      })
      return false
    }
    if (address === '' || address === undefined) {
      wx.showToast({
        title: '请输入地址',
        icon: 'none'
      })
      return false
    }
    let time = that.data.dateTimeArray[0][that.data.dateTime[0]] + '-' + that.data.dateTimeArray[1][that.data.dateTime[1]] + '-' + that.data.dateTimeArray[2][that.data.dateTime[2]] + ' ' + that.data.dateTimeArray[3][that.data.dateTime[3]] + ':' + that.data.dateTimeArray[4][that.data.dateTime[4]] + ':00'

    console.log('当前时间 ：' + time)
    if (time === '' || time === undefined) {
      wx.showToast({
        title: '请输入具体安装时间',
        icon: 'none'
      })
      return false;
    }
    let params = {
      orderType: 0,
      orderCateName: this.data.cateName,
      orderBraName: this.data.brandName,
      orderUserName: username,
      orderPhone: phone,
      orderAddress: address,
      appointmentTime: time,
      orderRemark: remark,
      orderUserId: app.globalData.userId
    }

    api._post('/front/order/submitOrder', app.globalData.accessToken, params).then(res => {
      if (res.status === 200) {
        let orderId = res.data
        let params = {
          productName: '格力空调上门安装预约费',
          out_trade_no: orderId,
          total_fee: '1',
          accessToken: app.globalData.accessToken
        }

        // let payTemppara = {
        //   orderId: orderId,
        //   total: 1
        // }
        // api._post('/front/pay/wxPayTemp',app.globalData.accessToken, payTemppara).then(res => {
        //   if (res.status === 200) {
        //     wx.switchTab({
        //       url: '../index/index',
        //     })
        //   }
        // })

        //支付功能已完成 ，暂时关闭支付功能
        api._post('/front/pay/wxPay', app.globalData.accessToken, params).then(res => {
          if (res.status === 200) {
            let payParams = {
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: 'MD5',
              paySign: res.data.paySign
            }
            wx.requestPayment({
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: 'MD5',
              paySign: res.data.paySign,
              'success': function(res) {
                console.log('success:' + res)
              },
              'fail': function(res) {
                console.log(res)
              },
              'complete': function(res) {
                console.log('complete:' + res)
              }
            })
          }
          wx.switchTab({
            url: '../myorder/myorder',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        })
      }
    })
  }
})