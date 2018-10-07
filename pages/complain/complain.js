const api = require('../../api/api.js')
const app = getApp()
import {$wuxToast} from '../../wux/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order: null,
        complaintNameList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let orderId = options.orderId;
        let params = {
            orderId: orderId
        };
        api._post('/front/order/getOrderDetail',app.globalData.accessToken,params).then(res => {
            if (res.status === 200) {
                this.setData({
                    order: res.data
                })
            }
        });
        api._post('/front/comp/getComplaintNameList', app.globalData.accessToken)
            .then(res => {
                console.log(res.data)
                this.setData({
                    complaintNameList: res.data
                })
            })
    },
    complaint: function (e) {
        let other = e.detail.value.remark
        let complaintStr = ''
        for (let i = 0; i<this.data.complaintNameList.length;i++) {
            if (this.data.complaintNameList[i].checked) {
                complaintStr += this.data.complaintNameList[i].caName +','
            }
        }

        console.log(this.data.order)
        if (complaintStr === '') {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '投诉原因不能为空'
            })
            return false
        }
        const params = {
            orderId: this.data.order.orderId,
            compReasons: complaintStr + other
        }
        api._post('/front/comp/saveComplain',app.globalData.accessToken,params)
            .then(res => {
                console.log(res)
            })
    },

    selectComplaint: function (e) {
        let index = e.currentTarget.dataset.index;
        this.data.complaintNameList[index].checked = !this.data.complaintNameList[index].checked
        this.setData({
            complaintNameList: this.data.complaintNameList
        })
        console.log(this.data.complaintNameList)
    }

})
