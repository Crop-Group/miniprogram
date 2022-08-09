// 获取新闻信息

const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

exports.main = async (event, context) => {
  // 获取富文本新闻的内容
  let news = await db.collection('articles').where({}).orderBy('_createTime', 'desc').get();

  return {
    news,
  };
};
