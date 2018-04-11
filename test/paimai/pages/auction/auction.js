Page({
  data: {
    imgUrls: [
      "../../images/pic.png",
      "../../images/pic2.png",
      "../../images/pic3.png"
    ],
    friendsArr:[
      { pic: "../../images/head.png",price:99,status:0},
      { pic: "../../images/head.png", price: 99, status: 0 },
      { pic: "../../images/head.png", price: 399, status: 1 },
      { pic: "../../images/head.png", price: 199, status: 1 },
      { pic: "../../images/head.png", price: 499, status: 0 },
      { pic: "../../images/head.png", price: 99, status: 0 }
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 300,
    duration: 300,
    nowPage:1,
    allPage:0,
    startPrice:99,
    endPrice:499,
    disPrice:499,
    goodsName:"迪奥同款春秋小开衫高端大气上档次",
    goodsSize:"S/M/L/XL",
    goodsNum:1,
    endTime:"00天54分33秒"
  },
  onLoad: function () {
    this.setData({
      allPage: this.data.imgUrls.length,
      startPrice: this.data.startPrice.toFixed(2),
      endPrice: this.data.endPrice.toFixed(2),
      disPrice: this.data.disPrice.toFixed(2)
    })
  },
  change(e) {
    this.setData({
      nowPage: e.detail.current+1
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})