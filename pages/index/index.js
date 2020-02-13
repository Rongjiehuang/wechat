//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    mytext: 'Hello World',
    userInfo: {},
    soundflag: 0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },


  //事件处理函数
  playsound: function() {
    console.log(this.data.soundflag)
    if (this.data.soundflag == 0) {
      let audio = wx.createInnerAudioContext();
      audio.src = 'sound/ChinaX.wav';
      audio.play();
      this.setData({
        soundflag: 1,
        mytext: 'Sound Playing!'
      })
      return
    }
    if (this.data.soundflag == 1) {
      this.setData({
        mytext: '别点啦！小臭猫'
      })
    }

  },

  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onShareAppMessage: function() {
    return {
      title: '分享在看！',
      desc: '哒哒哒哒',
      path: '/pages/index/index',
      imageUrl:'/images/yeye.png'
    }

  },

})