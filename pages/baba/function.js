// pages/baba/function.js

const userUrl = require('../../config.js').userUrl

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  baoshi: function () {

    wx.navigateTo({
      url: "../times/times",
    })
  },

  ceju: function () {

    wx.navigateTo({
      url: "../location/getloc",
    })
  },

  ceshi: function () {
    wx.navigateTo({
      url: "../test/test",
    })
  },

  zhuce: function () {
    wx.navigateTo({
      url: "../register/userlogin",
    })
  },
  dashang: function () {
    wx.navigateTo({
      url: "../baba/dashang",
    })
  },


  test:function()
  {
    wx.showToast({
      title: '正在连接服务器',
      icon: "loading"
    })

    wx.request({
      url: userUrl + 'havetest',
      data:{
        'good':'A',
        'bad':'B'
      },
   success:function(res)
   {  
     console.log(res.data.have_a_test)
     wx.showToast({
       title: '云服务器正常',
       icon: "success"
     })
   },
    fail:function(){
      wx.showToast({
        title: '云服务器异常',
        icon: "none"
      })
    }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '分享给更多小伙伴！',
      path: '/pages/index/index',
      imageUrl: '/images/beiwanglu.png'
    }
  }
})