// pages/register/personal.js
const userUrl = require('../../config.js').userUrl
const wxUrl = require('../../config.js').wxUrl
const appid = require('../../config.js').appid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    person: {},
  },

  changepic: function() {
    wx.showToast({
      title: '头像暂不支持修改',
      icon: "none"
    })

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.login({
      success: res => {
        // 发送res.code 到后台换取openId, sessionKey, unionId
        wx.request({
          url:
            wxUrl + 'code_to_openidv2',
          data: {
            'code': res.code,
            'from': 'wx92ed16e58a76633a'
          },
          success: function (res) {
            var server=wx.getStorageSync('server');
            if ((!res.data.is_register)&&server==1)
              wx.showModal({
                title: '未注册',
                content: '请前往注册',
                showCancel: false,
                success: function (res) {
                  wx.navigateTo({
                    url: '/pages/register/userlogin',
                  })
                }
              })
            if (server == 0)
              wx.showModal({
                title: '数据库未启用',
                content: '部分功能暂停',
                showCancel: false,
              })
          },
          fail: function (res) {
            console.log('res' + res)
          }
        })
      }
    })


    this.setData({
      person: wx.getStorageSync('userInfo'),
    })

    console.log(this.data.person)
  },



  onShow: function() {
    this.setData({
      person: wx.getStorageSync('userInfo'),

    })
  },


  onPullDownRefresh: function() {
    var that = this
    this.onLoad();
  },

  onShareAppMessage: function() {
    return {
      title: '分享给更多小伙伴！',
      path: '/pages/index/index',
      imageUrl: '/images/beiwanglu.png'
    }
  },
})