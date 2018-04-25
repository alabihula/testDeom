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
    hidden: true

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

    let promise1 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '../../images/pic.png',
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });
    let promise2 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '../../images/head.png',
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });
    Promise.all([
      promise1, promise2
    ]).then(res => {
      console.log(res)
      const ctx = wx.createCanvasContext('shareImg')

      //主要就是计算好各个图文的位置
      ctx.drawImage('../../' + res[0].path, 0, 0, t.getPx(660), t.getPx(900))
      ctx.drawImage('../../' + res[1].path, t.getPx(460), t.getPx(700), t.getPx(200), t.getPx(200))

      ctx.setTextAlign('left')
      ctx.setFillStyle('black')
      ctx.setFontSize(t.getPx(20));
      ctx.fillText('来自', 10, 20)
      t.drawText(ctx,'来自巴黎了圣诞节福利的时间飞机上的垃圾分类第三讲法律上的距离放假了实地缴费历史的记录',10,400-100,150);
      ctx.setFontSize(t.getPx(40))
      ctx.fillText('￥359', 10, 400 - 10)

      ctx.stroke()
      ctx.draw()
    })
  },

  /**
  * 生成分享图
 */
  share: function () {
    var that = this
    wx.showLoading({
      title: '努力生成中...'
    })
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 600,
      height: 800,
      destWidth: 600,
      destHeight: 800,
      canvasId: 'shareImg',
      success: function (res) {
        console.log(res.tempFilePath);
        that.setData({
          prurl: res.tempFilePath,
          hidden: false
        })
        wx.hideLoading()
      },
      fail: function (res) {
        console.log(res)
      }
    })

    // wx.openSetting({
    //   success: (res) => {
    //     console.log('success');
    //   }
    // })
  },
  getPx(rpx) {
    return (wx.getSystemInfoSync().windowWidth/750)*rpx;
  },
  drawText(ctx,t, x, y, w) {

    var chr = t.split("");
    var temp = "";
    var row = [];
    ctx.fillStyle = "black";
    ctx.textBaseline = "middle";

    for (var a = 0; a < chr.length; a++) {
      if (ctx.measureText(temp).width < w) {
        ;
      }
      else {
        row.push(temp);
        temp = "";
      }
      temp += chr[a];
    }

    row.push(temp);

    for (var b = 0; b < row.length; b++) {
      ctx.fillText(row[b], x, y + (b + 1) * 20);
    }
  },

  checkAuth() {
    var t = this;
    wx.getSetting({
      success(res) {
        console.log(res);
        if (!res.authSetting['scope.writePhotosAlbum']) {
          console.log('yes111');
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              console.log('yes');
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum();
            },
            fail() {
              wx.openSetting({
                success: (res) => {

                }
              })
            }
          })
        } else {
          t.save();
        }
      }
    })
  },
  /**
  * 保存到相册
 */
  save: function () {
    var that = this
    //生产环境时 记得这里要加入获取相册授权的代码
    wx.saveImageToPhotosAlbum({
      filePath: that.data.prurl,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好哒',
          confirmColor: '#72B9C3',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              that.setData({
                hidden: true
              })
            }
          }
        })
      }
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