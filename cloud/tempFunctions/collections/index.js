// 收藏记录管理入口

const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let openid = wxContext.OPENID;
  // switch (event.action) {
  //   case 'get':
  //     console.log(0);
  // }
};
