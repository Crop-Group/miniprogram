// 获取用户ID，若不存在用户则新建用户
// 返回经过MD5编码的UserID以及用户所有谷物

const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  // 获取新闻内容
    let news = await db.collection('news').where({}).
        orderBy('publishTime', 'desc').
    limit(7).get();

    return {
        news
    }
};
