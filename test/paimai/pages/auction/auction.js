
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
    var t = this
    console.log(t.data.avatarUrl);
    wx.showLoading({
      title: '努力生成中...'
    })
    //生成背景图 分享图 头像
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
      ctx.setFillStyle('rgba(0,0,0,0.4)')
      ctx.fillRect(0, 0, t.getPx(660), t.getPx(50))
      ctx.setFillStyle('white')
      ctx.setFontSize(t.getPx(25));
      ctx.fillText('来自' + t.data.userInfo.nickName + '的分享', t.getPx(10), t.getPx(30))

      ctx.setFillStyle('rgba(0,0,0,0.5)')
      ctx.fillRect(0, t.getPx(700), t.getPx(660), t.getPx(700))

      
      t.drawText(ctx, '来自巴黎了圣诞节福利的时间飞机上的垃圾分类第三讲法律上的距离放', t.getPx(10), t.getPx(900 - 200), t.getPx(400));
  
      ctx.setFontSize(t.getPx(40))
      ctx.fillText('￥' + t.data.pay_nowPrice, t.getPx(10), t.getPx(900 - 40))
      ctx.setFontSize(t.getPx(30))
      ctx.setFillStyle('#ccd4d9')
      var l = String(t.data.endPrice).split('').length;
      ctx.fillText('￥' + t.data.endPrice, t.getPx(150), t.getPx(900 - 40))
      ctx.setStrokeStyle('#ccd4d9')
      ctx.moveTo(t.getPx(150), t.getPx(900 - 40))
      ctx.lineTo(t.getPx(150+l*22), t.getPx(900 - 40))

      ctx.stroke()
      ctx.draw()

      t.setData({
        hidden: false
      })
      wx.hideLoading()
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
    ctx.setFillStyle('white')
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
    var t = this;
    wx.canvasToTempFilePath({
      canvasId: 'shareImg',
      success: function (res) {
        console.log(res.tempFilePath);

        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showModal({
              content: '图片已保存到相册，赶紧晒一下吧~',
              showCancel: false,
              confirmText: '好的',
              confirmColor: '#72B9C3',
              success: function (res) {
                if (res.confirm) {
                  t.setData({
                    hidden: true
                  })
                }
              }
            })
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 关闭分享
   */
   hideShare() {
     this.setData({
       hidden: true
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