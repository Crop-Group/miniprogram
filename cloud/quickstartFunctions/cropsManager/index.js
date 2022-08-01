// 作物管理入口

const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    let openid = wxContext.OPENID;
    const _ = db.command;
    switch (event.action) {
        case 'get':
            let crops = await db.collection('crops').where({
                ownerId: openid
            }).
            orderBy('startTime', 'desc').get();
            return { crops }

        case 'add':
            
            let res = await db.collection('crops').add({
                // data 字段表示需新增的 JSON 数据
                data: {
                    name: event.data.name,
                    category: event.data.category,
                    startTime: new Date(event.data.startTime),
                    endTime: new Date(event.data.endTime),
                    ownerId: openid,
                    location: {
                        geo: db.Geo.Point(event.data.longitude, event.data.latitude),
                        detail: event.data.location
                    },
                    status: '种植中',
                    display: true,
                    logs: [
                        {
                            detail: "开始种植",
                            imgUrl: event.data.imgUrl,
                            time: new Date(event.data.startTime)
                        }
                    ]
                }
            });
            return { res } 

        case 'delete':
            let delete_res = await db.collection('crops').where({
                ownerId: openid,
                _id: event._id
            }).remove()
            return { delete_res }
        case 'finish':
            let finish_res = await db.collection('crops').where({
                ownerId: openid,
                _id: event._id
              }).update({
                data: {
                  status: '已完成'
                }
              })
              
            return { finish_res  }
        case 'addLogs':
            
            let addLogs_res = await db.collection('crops').where({
                ownerId: openid,
                _id: event._id,
              }).update({
                data: {
                  logs: _.push({
                    detail: event.data.detail,
                    time: new Date(event.data.time),
                    imgUrl: event.data.imgUrl,
                  })
                }
              })
            return { addLogs_res }

        case 'getTrace':
            // TODO: 需要改进为联表查询
            //获取有没有收藏
            let collection = await db.collection('user').where({
                openid: openid,
            }).get()
            
            //如果匿名用户扫码则返回空值
            if(!collection.data.length)
            {
                collection.data = [{
                    collection: []
                }]
            }
            //获取对应作物信息
            let cropsInfo = await db.collection('crops').where({
                _id: event._id
              }).get()

            //获取对应生产者昵称
            let ownerNickName = await db.collection('user').where({
                openid: cropsInfo.data[0].ownerId
            }).get()
              
            return { 
                collection: collection.data[0].collection,
                cropsInfo: cropsInfo.data[0],
                ownerNickName: ownerNickName.data[0].nickName
            }

        case 'addCollection':
            
            let addCollection_res = await db.collection('user').where({
                openid: openid
              }).update({
                data: {
                  collection: _.push(event._id)
                }
              })
            return { addCollection_res }

        case 'removeCollection':
            
            //使用最简单的方法移除指定元素
            let userCollection = await db.collection('user').where({
                openid: openid,
            }).get()
            
            let collect = userCollection.data[0].collection;
            let _filter = collect.filter(v => v !== event._id )
            let remove_res = await db.collection('user').where({
                openid: openid,
            }).update({
                data: {
                    collection: _filter
                }
            })
            return { remove_res }
        case 'getCollections':

            let userCollections = await db.collection('user').
            aggregate().match({
                openid: openid
            })
            .lookup({
                from: 'crops',
                localField: 'collection',
                foreignField: '_id',
                as: 'collections'
            }).end()

            return { userCollections }

        case 'findNearCrops':
            // 聚合查询地理位置，从近到远，单位：米
            /*return [
                {
                    ...cropsInfo,
                    distances: @String
                }
            ]*/

            const res_find_near = await db.collection('crops').aggregate()
            .geoNear({
                distanceField: 'distance', // 输出的每个记录中 distance 即是与给定点的距离
                spherical: true,
                near: db.Geo.Point(event.longitude, event.latitude).toJSON(),
                query:{
                    display: true,
                },
                minDistance: 0,
                maxDistance: 10000,
                limit: 5,
                key: 'location.geo', // 若只有 location 一个地理位置索引的字段，则不需填
            })
            .end()


            return { res_find_near }

 
    }
};
