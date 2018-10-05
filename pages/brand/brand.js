const api = require('../../api/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    idx: -1,
    typeId: '',
    brandName: '',
    cateName: '',
    orientationList: [
      { id: "0", region: "#" },
      { id: "1", region: "A" },
      { id: "2", region: "B" },
      { id: "3", region: "C" },
      { id: "4", region: "D" },
      { id: "5", region: "E" },
      { id: "6", region: "F" },
      { id: "7", region: "G" },
      { id: "8", region: "H" },
      { id: "9", region: "I" },
      { id: "10", region: "J" },
      { id: "11", region: "K" },
      { id: "12", region: "L" },
      { id: "13", region: "M" },
      { id: "14", region: "N" },
      { id: "15", region: "O" },
      { id: "16", region: "P" },
      { id: "17", region: "Q" },
      { id: "18", region: "R" },
      { id: "19", region: "S" },
      { id: "20", region: "T" },
      { id: "21", region: "U" },
      { id: "22", region: "V" },
      { id: "23", region: "W" },
      { id: "24", region: "X" },
      { id: "25", region: "Y" },
      { id: "26", region: "Z" }
    ],
    act_addList: [],
    toView: 'inToView01',
  },

  scrollToViewFn: function (e) {
    var _id = e.target.dataset.id;
    this.setData({
      toView: 'inToView' + _id
    })
  },
  onLoad: function (options) {
    let that = this
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        // 可使用窗口宽度、高度
        // 计算主体部分高度,单位为px
        that.setData({
          // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
          height: res.windowHeight - res.windowWidth / 750 * 98
        })
      }
    })
    let cateId = options.cateId;
    that.data.cateName = options.cateName;
    let typeId = options.typeId;
    this.setData({
      typeId: typeId
    })
    let param = {
      cateId: cateId
    }
    api._post('/front/brand/getBrandListForCateId',app.globalData.accessToken, param).then(res => {
      this.setData({
        act_addList: res.data
      })
    })
  },
  goIndex: function(e){
    this.setData({
      idx: e.currentTarget.dataset.index,
      brandName: e.currentTarget.dataset.name
    })
  },
  // 跳转到安装界面
  jumpToInstallPage: function(e){
    let that = this;
    if (that.data.brandName === '' || that.data.brandName === undefined) {
      wx.showToast({
        title: '请选择品牌',
        icon: 'errot',
        duration: 2000
      })
      return false;
    }

    wx.navigateTo({
      url: '../install/install?brandName=' + that.data.brandName + '&cateName=' + that.data.cateName
    })
  },
   // 跳转到维修界面
   jumpToRepairPage: function(e){
    let that = this;
    if (that.data.brandName === '' || that.data.brandName === undefined) {
      wx.showToast({
        title: '请选择品牌',
        icon: 'errot',
        duration: 2000
      })
      return false;
    }

    wx.navigateTo({
      url: '../repair/repair?brandName=' + that.data.brandName + '&cateName=' + that.data.cateName + '&typeId=' + that.data.typeId
    })
  }
})
