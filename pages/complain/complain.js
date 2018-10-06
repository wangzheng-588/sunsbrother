const api = require('../../api/api.js')
const app = getApp()
import {$wuxToast} from '../../wux/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
    applyCash: function (e) {
    }
})
