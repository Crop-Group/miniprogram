// 获取用户ID，若不存在用户则新建用户
// 返回经过MD5编码的UserID

const cloud = require('wx-server-sdk');
const { md5 } = require('./md5.js');
const { config } = require('../app.config');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

const collection_name = config.debug ? 'temp_users' : 'users';

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // 获取用户基础信息
  const wxContext = cloud.getWXContext();
  let openid = wxContext.OPENID;
  let userID = md5(`${openid}cropgroup`, 16).toUpperCase();
  let checkUserID = await db
    .collection('user')
    .where({
      openid: openid,
    })
    .get();

  if (checkUserID.data.length === 0) {
    db.collection(collection_name).add({
      data: {
        openid: openid,
        userid: userID,
        nickName: event.data.nickName,
      },
    });
    return {
      userID,
    };
  }

  return {
    userID,
  };
};
