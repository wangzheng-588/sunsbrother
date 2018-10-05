var app = getApp();
const api = require('../../api/api.js')
Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function () {
        let that = this
        wx.getStorage({
            key: 'userId',
            success: function (res) {
                app.globalData.userId = res.data
            }
        })
        wx.getStorage({
            //获取数据的key
            key: 'accessToken',
            success: function(res) {
                console.log('获取到的token'+res.data)
                that.setData({
                    //
                    accessToken: res.data
                })
                app.globalData.accessToken = res.data
                wx.switchTab({
                    url: '../index/index'
                })
            },
            /**
             * 失败会调用
             */
            fail: function(res) {
                console.log(res)
            }
        })

    },
    bindGetUserInfo: function (e) {
        console.log(e)
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            var that = this;
            //插入登录的用户的相关信息到数据库

            let param = {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
                signature: e.detail.signature,
                code: app.globalData.code
            }
            api._post('/front/user/login','', param).then(res => {
                console.log(res)
                if (res.status === 200) {
                    //授权成功后，跳转进入小程序首页
                    app.globalData.accessToken = res.data.accessToken
                    app.globalData.userId = res.data.userId
                    wx.setStorageSync('accessToken', res.data.accessToken)
                    wx.setStorageSync('userId', res.data.userId)
                    // this.queryUsreInfo(res.data.accessToken)
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                }

            })
            // wx.request({
            //   url: getApp().globalData.urlPath + 'front/login/registerUser',
            //   data: {
            //     openid: getApp().globalData.openid,
            //     nickName: e.detail.userInfo.nickName,
            //     avatarUrl: e.detail.userInfo.avatarUrl,
            //     province: e.detail.userInfo.province,
            //     city: e.detail.userInfo.city
            //   },
            //   header: {
            //     'content-type': 'application/json'
            //   },
            //   success: function (res) {
            //     //从数据库获取用户信息
            //     that.queryUsreInfo();
            //     console.log("插入小程序登录用户信息成功！");
            //   }
            // });

        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”')
                    }
                }
            })
        }
    },
    //获取用户信息接口
    queryUsreInfo: function (token) {

        if (token !== '' && token !== undefined) {
            api._post('/front/user/getUserInfo','', {
                accessToken: token
            }).then(res => {
                console.log('这是服务器登录状态');
                console.log(res)
                if (res.status === 200) {
                    console.log('这是服务器登录状态');
                    console.log(res)
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                }
            })
        }
    },

})
