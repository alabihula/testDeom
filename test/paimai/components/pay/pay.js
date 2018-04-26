// components/pay/pay.js
Component({
  properties:{
    pay_startPrice:{
      type: Number,
    },
    pay_endPrice: {
      type: Number,
    },
    pay_nowPrice: {
      type: Number,
    },
    pay_smallPic: {
      type: String,
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    animationPay:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  methods:{
    _sliderchange(e) {
      this.setData({
        pay_nowPrice: e.detail.value,
      })
      console.log(e.detail.value)
    },
    _showPay() {
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })

      animation.translateY(0).opacity(1).step()

      this.setData({
        animationPay: animation.export()
      })
    },
    _hidePay() {
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })

      animation.translateY('100%').opacity(0).step()

      this.setData({
        animationPay: animation.export()
      })
    }
  }
})