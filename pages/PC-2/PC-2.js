Page({
  data: {
    // tab切换  
    currentTab: 0,
    number:[
      
    ],
    img:[
      {image:"../icon/家居-空调.png"},
    ]
  },
  swichNav: function (e) {
    console.log(e);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  swiperChange: function (e) {
    console.log(e);
    this.setData({
      currentTab: e.detail.current,
    })
  },
  data:{
    orderList:[
    ]
  }
})