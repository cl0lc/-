Page({

  /**
   * 页面的初始数据
   */
  data: {
    startBtnState: false,
    endBtnState: true,
    y: -50
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },

  start: function() {
    let _this = this
    wx.startGyroscope({
      interval: 'ui',
      success(res) {
        _this.setData({
          startBtnState: true,
          endBtnState: false
        })
        wx.onGyroscopeChange(function (res) {
          let rx = res.x
          // 小程序宽度最大为100%
          // 只有当变化超过阀值
          if (Math.abs(rx) > 0.1) {
            let y = _this.data.y
            y += rx * 2
            // console.log(y)
            if (y < 0 && y > -100) {
              _this.setData({
                y
              })
            }
          }
        })
      }
    })
  },

  end: function() {
    let _this = this
    wx.stopGyroscope({
      success(res) {
        _this.setData({
          startBtnState: false,
          endBtnState: true
        })
      }
    })
  }
})