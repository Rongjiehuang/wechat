// pages/location/getloc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moto:0,
    flag1:false,
    flag2: false,
   choosen:
   {
      latitude:0,
      longitude:0,
      address:'暂未选择'
   },

    got:
    {
      latitude: 0,
      longitude: 0,
      address: '暂未选择'
    },
  },
  chooseloc:function(temp)
  {
    let that=this
      wx.chooseLocation({
        success: function(res) {
          console.log(res)
            that.setData({
              choosen:res,
              flag1: true
            })
        },
        fail: function (res) {
          console.log('fail')
        }
      })
  },

  gotloc: function (temp) {
    let that = this
    wx.getLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          got: res,
          flag2: true
        })
      },
      fail: function (res) {
        console.log('fail')
      }

    })
  },

  calculate: function (e) {
    let lat1 = this.data.choosen.latitude 
    let lat2 = this.data.got.latitude 
    let lng1 = this.data.choosen.longitude 
    let lng2 = this.data.got.longitude 
    console.log(lat1) //计算两点位置距离 
    var rad1 = lat1 * Math.PI / 180.0; 
    var rad2 = lat2
    var a = rad1 - rad2; 
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0; 
    var r = 6378137; //地球半径 
    var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));
   
    distance = distance / 1000 
    distance = distance.toFixed(5) 

    this.setData({ motto: distance + 'km' })
  },


})