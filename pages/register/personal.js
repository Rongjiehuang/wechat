// pages/register/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    person:{ }
  },

  changepic:function(){
    wx.showToast({
      title: '头像不支持修改哒哒',
      icon:"none"
    })

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
          },
        })
      }
    })
    this.setData({
      person:wx.getStorageSync('userInfo')
    })
    console.log(this.data.person)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      person: wx.getStorageSync('userInfo')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that=this
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})