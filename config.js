//小程序配置文件

 var apiUrl ="https://yejie.applinzi.com/index.php/Api"

var appid = "wx92ed16e58a76633a"

var config ={
  apiUrl,
  appid,
  wxUrl:`${apiUrl}/Weixin/`,
  userUrl: `${apiUrl}/User/`,
  courseId:10017
};

module.exports = config