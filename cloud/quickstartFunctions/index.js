const getUsers = require('./getUsers/index');
const getNews = require('./getNews/index');
const cropsManager = require('./cropsManager/index')
const getRichTextNews = require('./getNews/rich-text-news');
const initUser = require('./initUser/index')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getUsers':
       return await getUsers.main(event, context);
    case 'getNews':
       return await getNews.main(event, context);
    case 'getRichTextNews':
        return await getRichTextNews.main(event, context);
    case 'cropsManager':
        try{
            return await cropsManager.main(event, context);
        }catch(e)
        {
            return [e]
        }
    case 'initUser':
        return await initUser.main(event, context)
  }
};
