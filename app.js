//app.js
const wxUrl = require('./config.js').wxUrl
const userUrl = require('./config.js').userUrl
const appid = require('./config.js').appid


App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 登录
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
            console.log(res.data)
            //将SESSIONID 保存到本地storage
            wx.setStorageSync('jiaoxue_OPENID', res.data.openid)
            wx.request({
              url:
                userUrl + 'getInfo',
              data: {
                'openid': res.data.openid,
              },
              success: function (res1) {
                wx.setStorageSync('userInfo', res1.data.data)
              },
            })
          
            var server = wx.getStorageSync('server')
            if ((!res.data.is_register) && server == 1)
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
 
    var server;
    if (wx.getStorageSync('jiaoxue_OPENID') == '') server = 0;
    else server = 1;
    wx.setStorageSync('server', server)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    question: [{ "question": "今天是白天吗", "option": { "A": "是的", "B": "不是", "C": "今天是阴天" } }, { "question": "今天星期几", "option": { "A": "周一", "B": "周二", "C": "周三" } }, { "question": "美元兑人民币汇率多少", "option": { "A": "6.12", "B": "6.23", "C": "7.0" } }, { "question": "这里是哪里", "option": { "A": "中国", "B": "美国", "C": "日本" } }, { "question": "从北极向下看，地球自传方向如何", "option": { "A": "顺时针", "B": "逆时针", "C": "不清楚" } }, { "question": "2018年全国高考时间是？", "option": { "A": "6.7", "B": "6.8", "C": "6.7-6.8" } }]
  },

  onPullDownRefresh: function () {
    wx.showToast({
      title: '刷新成功',
      icon: 'success'
    })
  },

})

