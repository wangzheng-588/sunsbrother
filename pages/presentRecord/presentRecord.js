const api = require('../../api/api.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        recordList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let serId = options.serId;
        let params = {
            serId:serId
        }
        api._post("/front/record/getRecordList",app.globalData.accessToken, params).then(res => {
            if (res.status === 200) {
                console.log(res.data)
                this.setData({
                    recordList: res.data
                })
            }
        })
    }
})
