App({
  onLaunch: function(options) {
    // 展示本地存储能力
    let logs = wx.getStorageSync('logs') || []
    // 在数组头部添加
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })    
  },

  onShow: function (options){
    // 判断小程序是否由分享进入小程序
    let scene = options.scene
    // console.log(scene)
    if (scene === 1007 || scene === 1008) {
      this.globalData.share = true
    } else {
      this.globalData.share = false
    }

    // 适配不同设备导航栏高度
    wx.getSystemInfo({
      success: (res) => {
        // console.log(res)
        // let model = res.model
        let system = res.system
        let navigationHeight = 0
        if (system.indexOf('iOS') !== -1) {
          // iOS
          navigationHeight = 42
        } else {
          // 安卓
          navigationHeight = 48
        }
        this.globalData.navigationHeight = navigationHeight // 导航栏高度
        this.globalData.statusBarHeight = res.statusBarHeight // 状态栏高度
      }
    })
  },

  globalData: {
    share: false,
    userInfo: null,
    statusBarHeight: 0,
    navigationHeight: 0
  }
})