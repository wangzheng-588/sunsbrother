// pages/repairman/repairman.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uploadZPhotos: [],
        uploadFPhotos: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        wx.hideLoading()
        console.log(e)
        const result = e.detail
        if (result.statusCode === 200) {

            let data = JSON.parse(result.data)
            if (data.status === 200) {
                let photo = {
                    url: api.baseUrl + data.data
                }
                this.data.uploadFailPhotos.push(photo)
                this.setData({
                    uploadFailPhotos: this.data.uploadFailPhotos
                })
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
                        uploadFailPhotos: fileList.filter((n) => n.url !== file.url),
                    })
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
                imageUrl: file.url,
            })
        }
    },
    onFSuccess(e) {

    },
    onFFail(e) {

    },
    onFComplete(e) {
        wx.hideLoading()
        console.log(e)
        const result = e.detail
        if (result.statusCode === 200) {

            let data = JSON.parse(result.data)
            if (data.status === 200) {
                let photo = {
                    url: api.baseUrl + data.data
                }
                this.data.uploadFailPhotos.push(photo)
                this.setData({
                    uploadFailPhotos: this.data.uploadFailPhotos
                })
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
                        uploadFailPhotos: fileList.filter((n) => n.url !== file.url),
                    })
                }
            },
        })
    }
})
