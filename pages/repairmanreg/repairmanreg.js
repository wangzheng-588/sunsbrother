// pages/repairman/repairman.js
import {$wuxActionSheet, $wuxSelect, $wuxToast} from '../../wux/index'

const app = getApp()
const api = require('../../api/api.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uploadZPhotos: [],
        uploadFPhotos: [],
        gender: '男',
        isSuns: true,
        fdisable: false,
        sdisable: false,
        zdisable: false,
        categoryList: [],
        cateValue: '',
        cateTitle: '',
        uploadSPhotos: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        api._post('/front/category/getCategoryList', app.globalData.accessToken).then(res => {
            if (res.status === 200) {
                console.log(res.data)
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].children.length > 0) {
                        let children = res.data[i].children
                        for (let j = 0; j < children.length; j++) {
                            this.data.categoryList.push({title: children[j].cateName, value: children[j].cateId})
                        }
                    }
                }
                this.setData({
                    categoryList: this.data.categoryList
                });
                console.log(this.data.categoryList)
            }
        })
    },

    onZChange(e) {
        const {file} = e.detail
        if (file.status === 'uploading') {
            this.setData({
                progress: 0,
            })
            wx.showLoading()
        } else if (file.status === 'done') {
            this.setData({
                imageUrl: file.url,
            })
        }
    },
    onZSuccess(e) {

    },
    onZFail(e) {

    },
    onZComplete(e) {
        let that = this;
        wx.hideLoading()
        console.log(e)
        const result = e.detail
        if (result.statusCode === 200) {

            let data = JSON.parse(result.data)
            if (data.status === 200) {
                let photo = {
                    url: api.baseUrl + data.data
                }
                this.data.uploadZPhotos.push(photo)
                that.setData({
                    uploadZPhotos: this.data.uploadZPhotos
                })
                if (that.data.uploadZPhotos.length >= 1) {
                    console.log('大于1')
                    that.setData({
                        zdisable: true
                    })
                }
            }
        }
    },
    onZProgress(e) {
        this.setData({
            progress: e.detail.file.progress,
        })
    },
    onZPreview(e) {
        const {file, fileList} = e.detail
        wx.previewImage({
            current: file.url,
            urls: fileList.map((n) => n.url),
        })
    },
    onZRemove(e) {
        const {file, fileList} = e.detail
        wx.showModal({
            content: '确定删除？',
            success: (res) => {
                if (res.confirm) {
                    this.setData({
                        uploadZPhotos: fileList.filter((n) => n.url !== file.url),
                    })
                    if (that.data.uploadZPhotos.length === 0) {
                        that.setData({
                            zdisable: true
                        })
                    }
                }
            },
        })
    },
    onFChange(e) {
        const {file} = e.detail
        if (file.status === 'uploading') {
            this.setData({
                progress: 0,
            })
            wx.showLoading()
        } else if (file.status === 'done') {
            this.setData({
                imageUrl: file.url
            })
        }
    },
    onFSuccess(e) {

    },
    onFFail(e) {

    },
    onFComplete(e) {
        let that = this;
        wx.hideLoading()

        const result = e.detail
        if (result.statusCode === 200) {

            let data = JSON.parse(result.data)
            if (data.status === 200) {
                let photo = {
                    url: api.baseUrl + data.data
                }
                that.data.uploadFPhotos.push(photo)
                that.setData({
                    uploadFPhotos: this.data.uploadFPhotos
                })
                if (that.data.uploadFPhotos.length >= 1) {
                    console.log('大于1')
                    that.setData({
                        fdisable: true
                    })
                }
                console.log(that.data.uploadFPhotos.length)
                console.log(this.data.fdisable)
            }
        }
    },
    onFProgress(e) {
        this.setData({
            progress: e.detail.file.progress,
        })
    },
    onFPreview(e) {
        const {file, fileList} = e.detail
        wx.previewImage({
            current: file.url,
            urls: fileList.map((n) => n.url),
        })
    },
    onFRemove(e) {
        const {file, fileList} = e.detail
        wx.showModal({
            content: '确定删除？',
            success: (res) => {
                if (res.confirm) {
                    this.setData({
                        uploadFPhotos: fileList.filter((n) => n.url !== file.url),
                        fdisable: false
                    })
                    if (this.data.uploadFPhotos.length === 0) {
                        this.setData({
                            fdisable: true
                        })
                    }
                }
            },
        })
    },
    onSChange(e) {
        const {file} = e.detail
        if (file.status === 'uploading') {
            this.setData({
                progress: 0,
            })
            wx.showLoading()
        } else if (file.status === 'done') {
            this.setData({
                imageUrl: file.url,
            })
        }
    },
    onSSuccess(e) {

    },
    onSFail(e) {

    },
    onSComplete(e) {
        let that = this;
        wx.hideLoading()
        console.log(e)
        const result = e.detail
        if (result.statusCode === 200) {

            let data = JSON.parse(result.data)
            if (data.status === 200) {
                let photo = {
                    url: api.baseUrl + data.data
                }
                this.data.uploadSPhotos.push(photo)
                that.setData({
                    uploadSPhotos: this.data.uploadSPhotos
                })
                if (that.data.uploadSPhotos.length >= 1) {
                    that.setData({
                        sdisable: true
                    })
                }
            }
        }
    },
    onSProgress(e) {
        this.setData({
            progress: e.detail.file.progress,
        })
    },
    onSPreview(e) {
        const {file, fileList} = e.detail
        wx.previewImage({
            current: file.url,
            urls: fileList.map((n) => n.url),
        })
    },
    onSRemove(e) {
        const {file, fileList} = e.detail
        wx.showModal({
            content: '确定删除？',
            success: (res) => {
                if (res.confirm) {
                    this.setData({
                        uploadSPhotos: fileList.filter((n) => n.url !== file.url),
                    })
                    if (that.data.uploadSPhotos.length === 0) {
                        that.setData({
                            sdisable: true
                        })
                    }
                }
            },
        })
    },
    choiceGender: function (e) {
        const that = this
        $wuxActionSheet().showSheet({
            titleText: '选择性别',
            buttons: [{
                text: '男'
            },
                {
                    text: '女'
                },
            ],
            buttonClicked(index, item) {
                if (index === 0) {
                    that.setData({
                        gender: '男'
                    })
                } else if (index === 1) {
                    that.setData({
                        gender: '女'
                    })
                }
                return true
            },
            cancelText: '取消',
            cancel() {
            },
            destructiveButtonClicked() {
            },
        })
    },
    chioceIsSuns: function (e) {
        const that = this
        $wuxActionSheet().showSheet({
            titleText: '选择性别',
            buttons: [{
                text: '是'
            },
                {
                    text: '否'
                },
            ],
            buttonClicked(index, item) {
                if (index === 0) {
                    that.setData({
                        isSuns: true
                    })
                } else if (index === 1) {
                    that.setData({
                        isSuns: false
                    })
                }
                return true
            },
            cancelText: '取消',
            cancel() {
            },
            destructiveButtonClicked() {
            },
        })
    },
    chioceCategory: function (e) {
        $wuxSelect('#wux-select').open({
            value: this.data.cateValue,
            multiple: true,
            toolbar: {
                title: '请选择维修分类',
                confirmText: '确定',
            },
            options: this.data.categoryList,
            onConfirm: (value, index, options) => {
                console.log(value, index, options)
                this.setData({
                    cateValue: value,
                    cateTitle: index.map((n) => options[n].title),
                })
            },
        })
    },
    repairSerReg: function (e) {
        console.log(app.globalData.userId)
        let that = this
        let username = e.detail.value.username
        let phone = e.detail.value.phone
        let address = e.detail.value.address
        let presentOffice = e.detail.value.presentOffice
        let year = e.detail.value.year
        if (username === '' || username === undefined) {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '名字不能为空'
            })
            return;
        }
        if (this.data.gender === '' || this.data.gender === undefined) {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '性别不能为空'
            })
            return;
        }
        if (phone === '' || phone === undefined) {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '电话不能为空'
            })
            return;
        }
        if (address === '' || address === undefined) {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '地址不能为空'
            })
            return;
        }
        if (presentOffice === '' || presentOffice === undefined) {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '地址不能为空'
            })
            return;
        }
        if (year === '' || year === undefined) {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '维修年限不能为空'
            })
            return;
        }
        if (this.data.isSuns === '' || this.data.isSuns === undefined) {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '维修年限不能为空'
            })
            return;
        }
        if (this.data.cateValue === '' || this.data.cateValue === undefined) {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '维修分类不能为空'
            })
            return;
        }
        if (this.data.uploadFPhotos.length===0 || this.data.uploadFPhotos === undefined) {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '身份证反面照片不能为空'
            })
            return;
        }
        if (this.data.uploadZPhotos.length===0 || this.data.uploadZPhotos === undefined) {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '身份证正面照片不能为空'
            })
            return;
        }
        if (this.data.uploadSPhotos.length===0 || this.data.uploadSPhotos === undefined) {
            $wuxToast().show({
                type: 'text',
                duration: 1500,
                color: '#fff',
                text: '手持身份证照片不能为空'
            })
            return;
        }
        let userSex = true
        if (this.data.gender === '男') {
            userSex = true;
        } else {
            userSex = false;
        }

        let skillList = ''
        for (let i = 0; i < this.data.cateValue.length; i++) {
            skillList += this.data.cateValue + ',';
        }

        let params = {
            serName: username,
            serSex: userSex,
            serPhone: phone,
            serPresentOffice: presentOffice,
            serYear: year,
            serPhotoZPath: this.data.uploadZPhotos[0].url,
            serPhotoFPath: this.data.uploadFPhotos[0].url,
            userId: app.globalData.userId,
            serIsSuns: this.data.isSuns,
            serPhotoSPath: this.data.uploadSPhotos[0].url,
            skillList: skillList
        }
        api._post('/front/serman/doRegServiceMan',app.globalData.accessToken,params).then(res => {
            console.log(res)
        })
    }
})
