// pages/login/login.js
import {$wuxToast} from '../../wux/index'
const api = require('../../api/api.js')
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: ''
    },
    onLoad:function(e) {

    },
    phoneInput: function (e) {
        console.log(e.detail.value)
        this.setData({
            phone: e.detail.value
        })
    },
    sendCode: function (e) {
        if (this.data.phone === '') {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '手机号不能为空'
            });
            return false;
        }

        if (this.data.phone.length !== 11) {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '手机号位数不正确'
            });
            return false;
        }

        const params = {
            phone: this.data.phone
        }
        api._post("/front/login/sendCode",app.globalData.accessToken,params)
            .then(res => {
                if (res.status === 200) {
                    $wuxToast().show({
                        type: 'text',
                        duration: 1500,
                        color: '#fff',
                        text: '验证码发送成功'
                    });
                } else {
                    $wuxToast().show({
                        type: 'text',
                        duration: 1500,
                        color: '#fff',
                        text: '验证码发送失败'
                    });
                }
            })
    },
    register: function (e) {
        let phone = e.detail.value.phone;
        let code = e.detail.value.code;
        let pass = e.detail.value.pass;
        let checkPass = e.detail.value.checkPass;

        if (phone === '') {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '手机号不能为空'
            });
            return false;
        }

        if (code === '') {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '验证码不能为空'
            });
            return false;
        }

        if (pass === '') {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '密码不能为空'
            });
            return false;
        }

        if (checkPass === '') {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '确认密码不能为空'
            });
            return false;
        }

        if (pass.trim().length < 5) {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '密码不能小于5位'
            });
            return false;
        }

        if (checkPass!==pass) {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '两次输入的密码不一致，请重新输入'
            });
            return false;
        }

        const params = {
            phone: phone,
            code: code,
            password: pass
        }
        api._post("/front/login/phoneRegister",app.globalData.accessToken,params)
            .then(res => {
                if (res.status === 200) {
                    $wuxToast().show({
                        type: 'text',
                        duration: 1500,
                        color: '#fff',
                        text: '注册成功'
                    });
                wx.redirectTo({
                  url: '../login/login',
                  success: function(res) {},
                  fail: function(res) {},
                  complete: function(res) {},
                })
                } else {
                    $wuxToast().show({
                        type: 'text',
                        duration: 1500,
                        color: '#fff',
                        text: '注册失败'
                    });
                }
            })
    }

})
