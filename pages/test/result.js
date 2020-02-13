// pages/test/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:'知道啦',
    flag:0
  },
clickthis:function()
{
  if(this.data.flag==0)
  {
    this.setData({
      word:'对呀',
      flag:1
    })
    return
  }
  if (this.data.flag == 1) {
    this.setData({
      word: '就是这样哒',
      flag: 2
    })
    return
  }
  if (this.data.flag == 2) {
    wx.showModal({
      title: '不错哒',
      content: '选择了正确的答案了的',
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