//app.js
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
            'https://zjgsujiaoxue.applinzi.com/index.php/Api/Weixin/code_to_openidv2',
          data: {
            'code': res.code,
            'from': 'wx148bdf3c0c0268d9'
          },
          success: function (res) {
            console.log(res.data)
//将SESSIONID 保存到本地storage
            wx.setStorageSync('jiaoxue_OPENID', res.data.openid)
            wx.request({
              url:
                'https://zjgsujiaoxue.applinzi.com/index.php/Api/User/getInfo',
              data: {
                'openid': res.data.openid,
              },
              success: function (res1) {
                wx.setStorageSync('userInfo', res1.data.data)
              },
            })
            
            if(!res.data.is_register)
            wx.showModal({
              title: '未注册',
              content: '请前往注册',
              showCancel:false,
              success: function (res) {
                wx.navigateTo({
                    url: '/pages/register/userlogin',
                  })  
              }
            })

          },
          fail: function (res) {
            console.log('res' + res)
          }
        })
      }
    })


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
    question: [{ "question": "椰椰是谁呀", "option": { "A": "大臭臭", "B": "小猫", "C": "憨憨" } }, { "question": "谁下五子棋最厉害呀", "option": { "A": "杰杰", "B": "杰杰儿", "C": "还是小杰宝" } }, { "question": "椰椰多大呀", "option": { "A": "18", "B": "椰椰不是宝宝的", "C": "21" } }, { "question": "wowowo", "option": { "A": "yewowoye", "B": "贴贴", "C": "抱抱的" } }, { "question": "小杰宝是不是要全面超越呀", "option": { "A": "对呀", "B": "就是这样哒", "C": "知道没呀" } }, { "question": "椰椰还差杰杰多少杯奶茶呀 说说", "option": { "A": "3", "B": "30", "C": "300" } }]
  },

 onPullDownRefresh: function () {
   wx.showToast({
     title: '刷新成功',
     icon: 'success'
   })
  },

})

