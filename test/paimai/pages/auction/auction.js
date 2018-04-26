
const app = getApp()
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
    goodsName: "迪奥同款春秋小开衫高端大气上档次多少分地方大幅度发",
    goodsSize: "S/M/L/XL",
    goodsNum: 1,
    endTime: "00天54分33秒",
    animationPay: {},
    pay_bigPic: '../../images/pic.png',
    pay_smallPic: '../../images/pic.png',
    share_pic: '../../images/qrocde.png',
    pay_startPrice: 99,
    pay_endPrice: 499,
    pay_time: 1,
    pay_nowPrice: 0,
    pay_protocol: true,
    hidden: true,
    userInfo:{}

  },
  onLoad: function () {
    var t = this;
    this.setData({
      allPage: this.data.imgUrls.length,
      startPrice: this.data.startPrice.toFixed(2),
      endPrice: this.data.endPrice.toFixed(2),
      disPrice: this.data.disPrice.toFixed(2),
      pay_startPrice: this.data.pay_startPrice.toFixed(2),
      pay_endPrice: this.data.pay_endPrice.toFixed(2),
      pay_nowPrice: parseInt(this.data.pay_startPrice),
    })

    //头像
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(res.userInfo);
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    }
  },

  /**
  * 生成分享图
 */
  share: function () {
    this.selectComponent("#shareCom")._share();
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
    this.selectComponent("#payCom")._showPay();
    return;
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
    this.selectComponent("#payCom")._hidePay();
    return;
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