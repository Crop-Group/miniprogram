// 收藏记录管理入口

const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let openid = wxContext.OPENID;
  switch (event.action) {
    case 'get':
      //获取全部收藏
      let res_get = db
        .collection('temp_collections')
        .aggregate()
        .match({
          ownerId: openid,
        })
        .lookup({
          from: 'temp_crops',
          localField: 'cropId',
          foreignField: '_id',
          as: 'crops',
        })
        .end();

      return { res_get };

    case 'getSingle':
      //获取单个作物是否被收藏

      let res_get_single = await db
        .collection('temp_crops')
        .where({
          ownerId: openid,
          cropId: event.data.id,
        })
        .get();

      if (res_get_single.length === 0) {
        return { if_collection: false };
      }

      return { if_collection: true };

    case 'deleteSingle':
      //删除收藏
      let res_delete = await db
        .collection('temp_crops')
        .where({
          ownerId: openid,
          cropId: event.data.id,
        })
        .remove();

      return { res_delete };

    case 'addSingle':
      //添加收藏
      let res_add = await db.collection('temp_crops').add({
        ownerId: openid,
        cropId: event.data.id,
      });
      return { res_add };
  }
};
