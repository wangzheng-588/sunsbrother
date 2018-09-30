// pages/PC-1/myorder.js
const api = require('../../api/api.js')
import { $wuxDialog } from '../../wux/index'
Page({
    data: {
        // tab切换
        currentTab: 0,
        orderList: [],
        height: '650rpx',
        orderStatus: '' //订单状态(0、待分配、1、待接单，2、待维修，3、正在维修，4、已评价，5、取消订单,6、已完成)
    },
    swichNav: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current,
            })
        }
        if (this.data.currentTab == 0) {
            this.setData({
                orderStatus: ''
            })
        } else if (this.data.currentTab == 1){
            this.setData({
                orderStatus: 1
            })
        }
        else if (this.data.currentTab == 2){
            this.setData({
                orderStatus: 2
            })
        } else if (this.data.currentTab == 3){
            this.setData({
                orderStatus: 3
            })
        }else if (this.data.currentTab == 4){
            this.setData({
                orderStatus: 4
            })
        }
        this.getOrderList(this.data.orderStatus)
    },
    swiperChange: function (e) {
        console.log(e);
        this.setData({
            currentTab: e.detail.current,
        })
    },
    onLoad: function (e) {
        var that = this
        wx.getSystemInfo({
            success: function (res) {
                // 可使用窗口宽度、高度
                // 计算主体部分高度,单位为px
                that.setData({
                    // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
                    height: res.windowHeight - res.windowWidth / 750 * 100 + 'px'
                })
            }
        })
       this.getOrderList(null)
    },
    getOrderList(orderStatus) {
        let params = {}
        if (orderStatus === undefined || orderStatus === null) {
            params.userId = "1"
        } else {
            params.userId = "1"
            params.orderStatus = orderStatus
        }
        api._post('/front/order/getOrderListForUserId', params).then(res => {
            console.log(res)
            if (res.status === 200) {
                this.setData({
                    orderList: res.data
                })
            }
        }).catch(e => {
        })
    },
    cancelOrder(e){
        let that = this
        let orderId = e.target.dataset.orderid
        $wuxDialog().confirm({
            resetOnClose: true,
            closable: true,
            title: '提示',
            content: '确定要删除此订单吗？',
            onConfirm(e) {
                let params = {
                    orderId: orderId
                }
                api._post('/front/order/cancelOrder', params).then(res => {
                    if (res.status === 200) {
                        that.getOrderList(that.data.orderStatus)
                    }
                })
            },
            onCancel(e) {
            },
        })
    },
    finishRepair(e){
        let that = this
        let orderId = e.target.dataset.orderid
        $wuxDialog().confirm({
            resetOnClose: true,
            closable: true,
            title: '提示',
            content: '确定维修完成吗？',
            onConfirm(e) {
                let params = {
                    orderId: orderId
                }
                api._post('/front/order/finishRepair', params).then(res => {
                    if (res.status === 200) {
                        that.getOrderList(that.data.orderStatus)
                    }
                })
            },
            onCancel(e) {
            },
        })
    },
    jumpToEvaluate(e) {
        let that = this
        let orderId = e.target.dataset.orderid

    }
})
