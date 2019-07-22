Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: String
  },

  /**
 * 组件的初始数据
 */
  data: {
    y: -50
  },

  // 外部样式
  externalClasses: ['gravity-picture-class'],

  // 组件生命周期
  lifetimes: {
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      wx.stopGyroscope({
        success(res) { }
      })
    },
  },

  // 组件所在页面的生命周期
  pageLifetimes: {
    // 页面显示
    show: function () {
      let _this = this
      wx.startGyroscope({
        interval: 'ui',
        success(res) {
          wx.onGyroscopeChange(function (res) {
            let rx = res.x
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
    // 页面隐藏
    hide: function () {
      wx.stopGyroscope({
        success(res) { }
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
