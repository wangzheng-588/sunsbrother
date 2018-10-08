// pages/class/class.js
const app = getApp();
const api = require('../../api/api.js');
import {$wuxToast} from '../../wux/index'
Page({
    /*data: {
      showView: true
    },
    onChangeShowState:function(){
      var that=this;
      that.setData({
        showView:(!that.data.showView)
      })
    } */
    data: {
        currentTab: 0,
        orderStatus: '',
        orderList: [],
        serId: '',
        cateItems: [
            {
                cate_id: 1,
                cate_name: "全部订单",
                cate_current: 0
            },
            {
                cate_id: 2,
                cate_name: "有效订单",
                cate_current: 1
            },
            {
                cate_id: 3,
                cate_name: "失效订单",
                cate_current: 2
            }
        ],
        curNav: 1,
        curIndex: 0
    },
    onLoad: function (options) {
        let serId = options.serId;
        this.setData({
            serId: serId,
            orderStatus: ''
        })
        this.getOrderList(serId,'')
    },
    getOrderList:function(serId,orderStatus){
        const params = {
            serId: serId,
            status: orderStatus
        }
        api._post('/front/order/getOrderBySerIdForStatus',app.globalData.accessToken,params)
            .then(res => {
                this.setData({
                    orderList: res.data
                })
            })
    },
    //事件处理函数
    switchRightTab: function (e) {
        // 获取item项的id，和数组的下标值
        let id = e.target.dataset.id;
        let index = parseInt(e.target.dataset.index);
        // 把点击到的某一项，设为当前index
        this.setData({
            curNav: id,
            curIndex: index
        })
        console.log(index)
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
            let orderStatus = ''
            switch (parseInt(index)) {
                case 0:
                    orderStatus = '';
                    break;
                case 1:
                    orderStatus = 1;
                    break;
                case 2:
                    break
            }
            this.setData({
                orderStatus: orderStatus
            })
            this.getOrderList(this.data.serId,orderStatus)
        }
    },
    switchOrderStatus:function (e) {
        let index = e.target.dataset.index;
        let orderStatus = '';
        switch (parseInt(index)) {
            case 1:
                orderStatus = 1;
                break;
            case 2:
                orderStatus = 2;
                break;
            case 3:
                orderStatus = 3;
                break;
            case 4:
                orderStatus = 4;
                break;
        }
        this.setData({
            orderStatus: orderStatus
        })
        this.getOrderList(this.data.serId,orderStatus)
    },
    recOrder: function (e) {
        console.log(e.target.dataset)
        let orderId = e.target.dataset.orderid
        let params = {
            orderId: orderId,
            serId: this.data.serId
        }
        api._post('/front/serman/recOrder',app.globalData.accessToken,params)
            .then(res => {
                if (res.status === 200) {
                    this.getOrderList(this.data.serId,this.data.orderStatus)
                }
                $wuxToast().show({
                    type: 'text',
                    duration: 1500,
                    color: '#fff',
                    text: res.msg
                })
            })
    },
    noRecOrder: function (e) {
        let orderId = e.target.dataset.orderid
        let params = {
            orderId: orderId,
            serId: this.data.serId
        }
        api._post('/front/serman/noRecOrder',app.globalData.accessToken,params)
            .then(res => {
                if (res.status === 200) {
                    this.getOrderList(this.data.serId,this.data.orderStatus)
                }
                $wuxToast().show({
                    type: 'text',
                    duration: 1500,
                    color: '#fff',
                    text: res.msg
                })
            })
    },
    //开始维修
    startRepair: function (e) {
        let orderId = e.target.dataset.orderid
        let params = {
            orderId: orderId
        }
        api._post('/front/serman/startRepair',app.globalData.accessToken,params)
            .then(res => {
                if (res.status === 200) {
                    this.getOrderList(this.data.serId,this.data.orderStatus)
                }
                $wuxToast().show({
                    type: 'text',
                    duration: 1500,
                    color: '#fff',
                    text: res.msg
                })
            })
    },
    //开始维修
    finishRepair: function (e) {
        let orderId = e.target.dataset.orderid
        let params = {
            orderId: orderId
        }
        api._post('/front/serman/finishRepair',app.globalData.accessToken,params)
            .then(res => {
                if (res.status === 200) {
                    this.getOrderList(this.data.serId,this.data.orderStatus)
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
