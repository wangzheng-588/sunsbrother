const api = require('../../api/api.js')
const app = getApp()
import {$wuxToast} from '../../wux/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        balance: 0,
        serId: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            balance: options.canBePresented,
            serId: options.serId
        })
    },
    applyCash: function (e) {
        let money = e.detail.value.money
        let params = {
            recSerId: this.data.serId,
            recMoney: money
        }
        api._post('/front/record/applyCash', app.globalData.accessToken, params)
            .then(res => {
                if (res.status === 200) {
                    wx.switchTab({
                        url: '../index/index',
                    })
                }
                $wuxToast().show({
                    type: 'text',
                    duration: 1500,
                    color: '#fff',
                    text: res.msg
                })
            })
    }
})
