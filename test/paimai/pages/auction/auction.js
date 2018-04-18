Page({
  data: {
    imgUrls: [
      "../../images/pic.png",
      "../../images/pic2.png",
      "../../images/pic3.png"
    ],
    friendsArr: [
      { pic: "../../images/head.png", price: 99, status: 0 },
      { pic: "../../images/head.png", price: 99, status: 0 },
      { pic: "../../images/head.png", price: 399, status: 1 },
      { pic: "../../images/head.png", price: 199, status: 1 },
      { pic: "../../images/head.png", price: 499, status: 0 },
      { pic: "../../images/head.png", price: 99, status: 0 }
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 200,
    duration: 200,
    nowPage: 1,
    allPage: 0,
    startPrice: 99,
    endPrice: 499,
    disPrice: 499,
    goodsName: "迪奥同款春秋小开衫高端大气上档次",
    goodsSize: "S/M/L/XL",
    goodsNum: 1,
    endTime: "00天54分33秒",
    animationPay: {},
    pay_bigPic: '../../images/pic.png',
    pay_smallPic: '../../images/pic.png',
    pay_startPrice: 99,
    pay_endPrice: 499,
    pay_time: 1,
    pay_nowPrice: 0,
    pay_protocol: true,
    lastX: 0,
    lastY: 0,
    text: "没有滑动",
    currentGesture: 0,

  },
  onLoad: function () {
    this.setData({
      allPage: this.data.imgUrls.length,
      startPrice: this.data.startPrice.toFixed(2),
      endPrice: this.data.endPrice.toFixed(2),
      disPrice: this.data.disPrice.toFixed(2),
      pay_startPrice: this.data.pay_startPrice.toFixed(2),
      pay_endPrice: this.data.pay_endPrice.toFixed(2),
      pay_nowPrice: parseInt(this.data.pay_startPrice),
    })
  },
  sliderchange(e) {
    this.setData({
      pay_nowPrice: e.detail.value,
    })
    console.log(e.detail.value)
  },
  change(e) {
    this.setData({
      nowPage: e.detail.current + 1
    })
  },
  showPay() {
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
  hidePay() {
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

})