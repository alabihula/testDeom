// pages/myAuction/myAuction.js
Page({
  data: {
    nowTab:'tab1',
    tabArr1:[
      { headPic: '../../images/head.png', price: 9999, pic: '../../images/pic.png', des: '迪奥同款春秋小开衫',price2:888,endTime:'0天8小时9分9秒',isGet:0},
      { headPic: '../../images/head.png', price: 9999, pic: '../../images/pic.png', des: '迪奥同款春秋小开衫', price2: 877, endTime: '0天8小时9分9秒',isGet: 1}
    ],
    tabArr2:[
      { headPic: '../../images/head.png', price: 9999, pic: '../../images/pic.png', des: '迪奥同款春秋小开衫', endTime: '0天8小时9分9秒' },
      { headPic: '../../images/head.png', price: 9999, pic: '../../images/pic.png', des: '迪奥同款春秋小开衫', endTime: '0天8小时9分9秒' }
    ],
    tabArr3: [
      { headPic: '../../images/head.png', price: 9999, pic: '../../images/pic.png', des: '迪奥同款春秋小开衫', price2: 888, endTime: '0天8小时9分9秒', payStatus: '成交' },
      { headPic: '../../images/head.png', price: 9999, pic: '../../images/pic.png', des: '迪奥同款春秋小开衫', price2: 877, endTime: '0天8小时9分9秒', payStatus: '出局' },
      { headPic: '../../images/head.png', price: 9999, pic: '../../images/pic.png', des: '迪奥同款春秋小开衫', price2: 877, endTime: '0天8小时9分9秒', payStatus: '流拍' }
    ],
  },
  onLoad: function (options) {
  
  },
  changeMenu(e) {
    console.log(e);
    this.setData({
      nowTab: e.target.dataset.id
    })
  }
 
})