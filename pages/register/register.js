// pages/register/register.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: ' ',
    phone: 0,
    school: 'temp',
    num: 12,
    year: 12,
  },
  changeName: function(temp) {
    this.setData({
      name: temp.detail.value
    })
    console.log('name', this.data.name)
  },

  changePhone: function(temp) {
    this.setData({
      phone: temp.detail.value
    })
    console.log('phone', this.data.phone)
  },
  notfinishSubmit: function(e) {


  },


  bindsumit: function(e) {

    wx.request({
      url: 'http://zjgsujiaoxue.applinzi.com/index.php/Api/User/register_by_openid',
      data: {
        openid: wx.getStorageSync('jiaoxue_OPENID'),
        globalData: JSON.stringify(app.globalData.userInfo),
        name: this.data.name,
        tel: this.data.phone,
        school: this.data.school,
        num: this.data.num,
        enter_year: this.data.year
      },
      success: res => {
        console.log('res', res)
        if (res.data.is_register) {
          wx.showModal({
            title: '提示',
            content: res.data.data,
            showCancel: false,
            success: function(res) {
              wx.navigateBack({})
              wx.navigateBack({})
            }
          })
        }
      },
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})