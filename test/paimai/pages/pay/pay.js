// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bigPic:'../../images/pic.png',
    smallPic: '../../images/pic.png',
    startPrice: 99,
    endPrice: 499,
    time:1,
    nowPrice:0,
    protocol:true
  },

  onLoad: function (options) {
    this.setData({
      startPrice: this.data.startPrice.toFixed(2),
      endPrice: this.data.endPrice.toFixed(2),
      nowPrice: parseInt(this.data.startPrice),
    })
  },
  sliderchange(e) {
    this.setData({
      nowPrice: e.detail.value,
    })
    console.log(e.detail.value)
  }
})