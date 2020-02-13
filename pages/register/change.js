// pages/register/change.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: '',
    userinfo: wx.getStorageSync('userInfo'),
    tempArray: {
      name: '姓名',
      phone: '手机号',
      list1: '椰杰备忘',
      list2: '椰椰备忘',
      list3: '杰杰备忘',
      list4: '备忘4'
    },
    changeWhat:'',
    afterchange: '',
     concent: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      concent: this.data.userinfo[options.changeWhat],
      tips: '请输入' + this.data.tempArray[options.changeWhat],
      changeWhat: options.changeWhat
    })
    if (options.changeWhat == 'list1') this.setData({ afterchange: "school" });
    else if (options.changeWhat == 'list2') this.setData({ afterchange: "number" });
    else if (options.changeWhat == 'list3') this.setData({ afterchange: "enter_year" });
    else if (options.changeWhat == 'phone') this.setData({ afterchange: "tel" });
    else if (options.changeWhat == 'name') this.setData({ afterchange: "name" });
    this.setData({
      concent: this.data.userinfo[this.data.afterchange]
    }) 
  },

  concentchange: function(res) {
    this.setData({
      concent: res.detail.value
    })
  },

  baocun: function() {
    console.log("here", this.data.changeWhat)
    wx.showModal({
      title: '再确认一次!',
      content: '确定修改吗',
      success: res =>  {
    wx.request({
      url: "https://zjgsujiaoxue.applinzi.com/index.php/Api/User/updateInfo",
    
      data: {
        openid: wx.getStorageSync('jiaoxue_OPENID'),
        change: this.data.afterchange ,
        value: this.data.concent
      },
      success: res => {
        if (res.data.success) {
          this.data.userinfo[this.data.afterchange] = this.data.concent,
            wx.setStorageSync('userInfo', this.data.userinfo),
            wx.navigateBack()
          wx.showToast({
            title: '成功！下拉刷新',
            icon: "success"
          })
        } else {
          wx.showToast({
            title: '修改失败',
            icon: 'none'
          })
          wx.navigateBack()
        }
      }
    })
      }
    })
   
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