// pages/home/home.js
const app = getApp();
const api = require('../../api/api.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userIsSer: false,
        nickname: '',
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let params = {
            userId: app.globalData.userId
        }
        api._post('/front/user/getUserInfo',app.globalData.accessToken,params).then(res => {
            if (res.status === 200) {
                console.log(res)
                this.setData({
                    nickname: res.data.userNickname,
                    userIsSer: res.data.userIsSer,
                    userInfo: res.data.userHeadUrl
                })
            }
        })
    },
    jumpRepairmanPage: function (res) {
        console.log(this.data.userIsSer)
        if (this.data.userIsSer) {
            wx.navigateTo({
                url: '../repairman/repairman'
            })
        } else {
            wx.navigateTo({
                url: '../repairmanreg/repairmanreg'
            })
        }
    }
})
