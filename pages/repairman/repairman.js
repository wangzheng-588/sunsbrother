// pages/repairman/repairman.js
const app = getApp();
const api = require('../../api/api.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        serName: '',
        serId: '',
        phone: '',
        balance: 0,
        canBePresented: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let params = {
            userId: app.globalData.userId
        }
        api._post("/front/serman/getSerManInfo", app.globalData.accessToken, params)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    that.setData({
                        serName: res.data.serName,
                        serId: res.data.serId,
                        phone: res.data.serPhone,
                        balance: res.data.serBalance,
                        canBePresented: res.data.canBePresented
                    })
                }
            })
    },
    jumpWithdrawCashPage: function () {
        wx.navigateTo({
            url: '../withdrawCash/withdrawCash?serId=' + this.data.serId + '&canBePresented=' + this.data.canBePresented
        })
    }
})
