// components/share/share.js
Component({
  properties: {
    hidden: {
      type: Boolean
    }, 
    pay_bigPic: {
      type: String
    },
    share_pic: {
      type: String
    },
    pay_nowPrice: {
      type: Number
    },
    endPrice: {
      type: Number
    },
    userInfo:{
      type:Object
    },
    goodsName:{
      type:String
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onLoad() {
  
  },
  methods: {
    _hideShare: function () {
      this.setData({
        hidden: true
      })
    },
    _share() {
      var t = this
      console.log(t.data.avatarUrl);
      wx.showLoading({
        title: '努力生成中...'
      })
      //生成背景图 分享图 头像
      let promise1 = new Promise(function (resolve, reject) {
        wx.getImageInfo({
          src: t.data.pay_bigPic,
          success: function (res) {
            resolve(res);
          }
        })
      });
      let promise2 = new Promise(function (resolve, reject) {
        wx.getImageInfo({
          src: t.data.share_pic,
          success: function (res) {
            resolve(res);
          }
        })
      });
      Promise.all([
        promise1, promise2
      ]).then(res => {
        console.log(res)
        const ctx = wx.createCanvasContext('shareImg',this)
        console.log(ctx)
        //主要就是计算好各个图文的位置
        ctx.drawImage('../../' + res[0].path, 0, 0, t.getPx(660), t.getPx(900))
        ctx.setTextAlign('left')
        ctx.setFillStyle('rgba(0,0,0,0.4)')
        ctx.fillRect(0, 0, t.getPx(660), t.getPx(50))
        ctx.setFillStyle('white')
        ctx.setFontSize(t.getPx(25));
        ctx.fillText('来自' + t.data.userInfo.nickName + '的分享', t.getPx(10), t.getPx(30))

        ctx.setFillStyle('rgba(0,0,0,0.5)')
        ctx.fillRect(0, t.getPx(700), t.getPx(660), t.getPx(700))
        ctx.drawImage('../../' + res[1].path, t.getPx(460), t.getPx(700), t.getPx(200), t.getPx(200))

        t.drawText(ctx, t.data.goodsName, t.getPx(10), t.getPx(900 - 200), t.getPx(400));

        ctx.setFontSize(t.getPx(40))
        ctx.fillText('￥' + t.data.pay_nowPrice, t.getPx(10), t.getPx(900 - 40))
        ctx.setFontSize(t.getPx(30))
        ctx.setFillStyle('#ccd4d9')
        var l = String(t.data.endPrice).split('').length;
        ctx.fillText('￥' + t.data.endPrice, t.getPx(150), t.getPx(900 - 40))
        ctx.setStrokeStyle('#ccd4d9')
        ctx.moveTo(t.getPx(150), t.getPx(900 - 40))
        ctx.lineTo(t.getPx(150 + l * 22), t.getPx(900 - 40))

        ctx.stroke()
        ctx.draw()

        t.setData({
          hidden: false
        })
        wx.hideLoading()
      })
    },
    getPx(rpx) {
      return (wx.getSystemInfoSync().windowWidth / 750) * rpx;
    },
    drawText(ctx, t, x, y, w) {
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

    _checkAuth() {
      var t = this;
      wx.getSetting({
        success(res) {
          console.log(res);
          if (!res.authSetting['scope.writePhotosAlbum']) {
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
          },this)
        },
        fail: function (res) {
          console.log(res)
        }
      },this)
    }
  }
})