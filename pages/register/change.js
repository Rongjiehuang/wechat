// pages/register/change.js

const userUrl = require('../../config.js').userUrl
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
      list1: '中文备忘',
      list2: '密码1备忘(仅数字)',
      list3: '密码2备忘(仅数字)',
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
    console.log('concent', this.data.concent)
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
      url: userUrl + 'updateInfo',
    
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
})