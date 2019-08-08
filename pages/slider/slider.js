// pages/slider/slider.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: [200, 300]
  },

  valChange(e){
    this.setData({
      price: e.detail
    })
  }
})