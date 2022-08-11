const news = require('./news/index');
const users = require('./users/index');
const crops = require('./crops/index');
const initUser = require('./initUser/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'news':
      return await news.main(event, context);
    case 'users':
      return await users.main(event, context);
    case 'crops':
      return await crops.main(event, context);
    case 'initUser':
      return await initUser.main(event, context);
  }
};
