const api = require('../../api/api.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        problemValue: 0,
        speedValue: 0,
        serValue: 0,
        order: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let orderId = options.orderId;
        let params = {
            orderId: orderId
        }
        api._post('/front/order/getOrderDetail',app.globalData.accessToken,params).then(res => {
            if (res.status === 200) {
                this.setData({
                    order: res.data
                })
            }
        })
    },
    sliderProblemChange(e) {
        this.setData({
            problemValue: e.detail.value
        })
    },
    sliderSpeedChange(e) {
        this.setData({
            speedValue: e.detail.value
        })
    },
    sliderSerChange(e) {
        this.setData({
            serValue: e.detail.value
        })
    },
    evaluateSerman() {
        if (this.data.order.orderSerId === '') {
            return false
        }
        if (this.data.order.orderId === '') {
            return false
        }
        let params = {
            serId: this.data.order.orderSerId,
            serStar: this.data.problemValue+this.data.speedValue+this.data.serValue,
            orderId: this.data.order.orderId
        }
        api._post("/front/serman/evaluateSerman",app.globalData.accessToken,params).then(res => {
            if (res.status === 200) {
                wx.switchTab({
                    url: '../index/index'
                })
            }
        })
    }
})
