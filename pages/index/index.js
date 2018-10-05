
/*轮播图*/
var app = getApp()
const api = require('../../api/api.js')
Page({
  data: {
    imgUrls: [],
    cateList: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {}
  },
  onLoad: function () {
    console.log('token:' + app.globalData.accessToken)
    var that =this
    api._post('/front/index/index',app.globalData.accessToken).then(res => {
      that.setData({
        imgUrls: res.data.bannerList.rows,
        categoryList: res.data.categoryList,
        reProductList: res.data.reProductList,
        homeAdList: res.data.homeAdList
      })
    }).catch(e => {
    })
  },
  goToCatePage: function(e) {
    let index = parseInt(e.currentTarget.dataset.index);
    if (index === 4) {
      wx.switchTab({
        url: '../category/category',
      })
    } else{
      console.log(this.data.categoryList[index])
      wx.switchTab({
        url: '../category/category?cateId=' + this.data.categoryList[index].cateId+'&index='+index,
      })
    }

  }
})
