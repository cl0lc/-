Component({

  externalClasses: ['slider-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    // 滑块最大值
    max: Number,
    // 滑块最小值
    min: Number,
    // 滑块初始值
    maxValue: Number,
    minValue: Number,
    // 步长(精度)
    step: {
      type: Number,
      value: 1
    },
    // 按钮颜色
    btnColor: {
      type: String,
      value: '#d81e06'
    },
    // 未选中的滑块背景色
    bgColor: {
      type: String,
      value: 'blue'
    },
    // 选中的滑块背景色
    activeBgColor: {
      type: String,
      value: '#d81e06'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    sliderWidth: 0, // 滑块宽度
    minX: 0, // 滑块可移动范围最小值
    maxX: 0, // 滑块可移动范围最大值
    left: 0, // 左按钮
    right: 0 // 右按钮
  },

  // 组件生命周期
  lifetimes: {
    attached: function() {
      let _this = this
      // 获取滑块主体的宽度
      let domQuery = this.createSelectorQuery()
      domQuery.selectAll('.slider-body,.slider-btn').boundingClientRect()
      domQuery.exec(function(res) {
        let data = _this.data
        // 滑块宽度
        let btn = res[0][0]
        let sliderBody = res[0][2]
        let btnWidth = btn.width
        let sliderWidth = sliderBody.width
        data.sliderWidth = sliderWidth - btnWidth * 2
        // 按钮移动范围
        data.minX = sliderBody.left
        data.maxX = sliderBody.right
        // 根据滑块初始值设置按钮位置
        let min = data.min
        let max = data.max
        let left = (data.minValue - min) / (max -min) * sliderWidth
        let right = (max - data.maxValue) / (max - min) * sliderWidth
        // 设置按钮初始位置
        _this.setData({
          left,
          right
        })
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    minValChange(e) {
      let x = e.touches[0].pageX
      let data = this.data
      let min = data.min // 最小值
      let minX = data.minX // 最小范围
      let sliderWidth = data.sliderWidth
      let maxLeft = sliderWidth - data.right // 当前最大范围
      // let left = x - data.minX
      let left = 0
      let minValue = min
      if (x > minX && x < maxLeft  + minX){
        minValue = parseInt(left / sliderWidth * (data.max - min) + min)
      }else {
        left = maxLeft
        minValue = data.maxValue
      }
      this.setData({
        left,
        minValue
      })
      let detail = [minValue, maxValue]
      this.triggerEvent('valChange', detail)
      
    },
    maxValChange(e) {
      let data = this.data
      let maxX = data.maxX
      let x = e.touches[0].pageX
      // 当在范围内滑动时
      let right = maxX - x
      if(right < 0) right = 0
      let sliderWidth = data.sliderWidth
      let maxValue = parseInt((sliderWidth - right) / sliderWidth * data.max)
      let minValue = data.minValue
      if (maxValue >= minValue) {
        this.setData({
          right,
          maxValue
        })
        let detail = [minValue, maxValue]
        this.triggerEvent('valChange', detail)
      }
    },
  }
})