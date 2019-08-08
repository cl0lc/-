const app = getApp()
let globalData = app.globalData
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    showBtn: {
      type: Number,
      value: 1
    },
    // 回退层级
    backLevel: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    share: globalData.share,
    statusBarHeight: globalData.statusBarHeight,
    navigationHeight: globalData.navigationHeight
  },

  lifetimes: {
    attached: function() {
      this.setData({
        share: app.globalData.share
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 返回
    back: function() {
      let backLevel = this.data.backLevel
      wx.navigateBack({
        delta: backLevel
      })
    },
    // 回到首页
    home: function() {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  }
})