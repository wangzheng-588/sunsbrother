const app = getApp()
const api = require('../../api/api.js')
Page({ 
    data: {
      cateItems: [],
      curNav: 1,
      curIndex: 0
  },
  onLoad: function (e) {
    let cateId = e.cateId
    let index = e.index
    // 获取一级分类
    var that = this
    api._post('/front/category/getCategoryList').then(res => {
      console.log(res)
     let cateList = res.data
      for (let i = 0;i<cateList.length;i++) {
        if (cateList[i].children.length>0){
          cateList[i].ishaveChild = true;
        } else{
          cateList[i].ishaveChild = false;
        }
      }
      that.setData({
        cateItems: cateList,
        curNav: cateId ? cateId : 0,
        curIndex: index ? index: 0
      })
    }).catch(e => {
    })
  },
    //事件处理函数  
    switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
    index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  }
}) 
