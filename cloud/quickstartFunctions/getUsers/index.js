// 获取用户ID，若不存在用户则新建用户
// 返回经过MD5编码的UserID以及用户所属谷物

const cloud = require('wx-server-sdk');
const { md5 } = require('./md5.js');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // 获取基础信息
    const wxContext = cloud.getWXContext();
    let openid = wxContext.OPENID;
    let userID = md5(`${openid}cropgroup`, 16).toUpperCase(); 
    let checkUserID = await db.collection('user').where({
        openid: openid
    }).get()

    let crops = await db.collection('crops').where({
        ownerId: openid
    }).get();
    if(checkUserID.data.length === 0)
    {
        db.collection('user').add({
        data:{
            openid: openid,
            userid: userID,
            nickName: event.nickName,
            collection: []
        }})
        return {
            userID,
            crops,
            collection: []
        }
    }
    let collection = await db.collection('user').where({
        openid: openid
    }).get()
    return {
        userID,
        crops,
        collection: collection.data[0].collection
    }
};
