// 作物管理入口

const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let openid = wxContext.OPENID;
  const _ = db.command;
  switch (event.action) {
    case 'get':
      let crops = await db
        .collection('temp_crops')
        .where({
          ownerId: openid,
        })
        .orderBy('startTime', 'desc')
        .get();
      return { crops };

    case 'add':
      let res = await db.collection('temp_crops').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          name: event.data.name,
          category: event.data.category,
          startTime: new Date(event.data.startTime),
          endTime: new Date(event.data.endTime),
          ownerId: openid,
          location: {
            geo: db.Geo.Point(event.data.longitude, event.data.latitude),
            detail: event.data.location,
          },
          status: '种植中',
          display: true,
          logs: [
            {
              detail: '开始种植',
              imgUrl: event.data.imgUrl,
              time: new Date(event.data.startTime),
            },
          ],
        },
      });
      return { res };

    case 'delete':
      let delete_collection_res = await db
        .collection('temp_collections')
        .where({
          _id: event.data._id,
        })
        .remove();

      let delete_crops_res = await db
        .collection('temp_crops')
        .where({
          ownerId: openid,
          _id: event.data._id,
        })
        .remove();
      return { delete_crops_res, delete_collection_res };

    case 'finish':
      let finish_res = await db
        .collection('temp_crops')
        .where({
          ownerId: openid,
          _id: event.data._id,
        })
        .update({
          data: {
            status: '已完成',
          },
        });

      return { finish_res };
    case 'addLogs':
      let addLogs_res = await db
        .collection('temp_crops')
        .where({
          ownerId: openid,
          _id: event.data._id,
        })
        .update({
          data: {
            logs: _.push({
              detail: event.data.detail,
              time: new Date(event.data.time),
              imgUrl: event.data.imgUrl,
            }),
          },
        });
      return { addLogs_res };

    case 'getSingleCrops':
      //获取对应ID作物信息
      let singleCrop = await db
        .collection('temp_crops')
        .where({
          ownerId: openid,
          _id: event.data.id,
        })
        .orderBy('startTime', 'desc')
        .get();

      //获取对应生产者昵称
      let ownerNickName = await db
        .collection('temp_users')
        .where({
          openid: singleCrop.data[0].ownerId,
        })
        .get();
      return { singleCrop, ownerNickName };

    case 'findNearCrops':
      // 聚合查询地理位置，从近到远，单位：米
      /*return [
                {
                    ...cropsInfo,
                    distances: @String
                }
            ]*/

      const res_find_near = await db
        .collection('temp_crops')
        .aggregate()
        .geoNear({
          distanceField: 'distance', // 输出的每个记录中 distance 即是与给定点的距离
          spherical: true,
          near: db.Geo.Point(event.data.longitude, event.data.latitude).toJSON(),
          query: {
            display: true,
          },
          minDistance: 0,
          maxDistance: 10000,
          limit: 5,
          key: 'location.geo', // 若只有 location 一个地理位置索引的字段，则不需填
        })
        .end();

      return { res_find_near };
  }
};
