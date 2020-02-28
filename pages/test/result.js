// pages/test/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:'嗯嗯',
    flag:0
  },
clickthis:function()
{
  if(this.data.flag==0)
  {
    this.setData({
      word:'以后常来！',
      flag:1
    })
    return
  }
  if (this.data.flag == 1) {
    this.setData({
      word: '谢谢光临',
      flag: 2
    })
    return
  }
  if (this.data.flag == 2) {
    wx.showModal({
      title: '回答正确',
      content: '恭喜！',
      showCancel: false,
      success: function (res) {
        wx.navigateBack({})
        wx.navigateBack({})
        wx.reLaunch({
          url: 'pages/index/index',
        })
      }
    })
    return
  }
},

})