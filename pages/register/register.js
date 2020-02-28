// pages/register/register.js
const userUrl = require('../../config.js').userUrl
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: ' ',
    phone: 0,
    school: '暂未输入',
    num: 1,
    year: 2020,
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
    wx.showModal({
      title: '即将提交',
      content: '确定修改吗',
      success: res => {
        wx.request({
          url: userUrl + 'register_by_openid',
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
            } else {
              wx.showModal({
                title: 'res.data.data' + '失败',
                content: res.data.data,
                showCancel: false,
                success: function(res) {
                  wx.navigateBack({})
                  wx.navigateBack({})
                }
              })
            }
          }
        })
      }
    })
  },


  onLoad: function() {
    var server = wx.getStorageSync('server');
    if (server == 0)
      wx.showModal({
        title: '数据库未启用',
        content: '部分功能暂停',
        showCancel: false,
        success: function () {
          wx.navigateBack({})
          wx.navigateBack({})
        }
      })
  }


})