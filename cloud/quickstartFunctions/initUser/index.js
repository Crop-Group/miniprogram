//初始化作物入口
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  const initData = [
    {
      name: '绿甘蓝(卷心菜)',
      category: '植物性作物',
      startTime: new Date('2022-03-04T03:58:31Z'),
      endTime: new Date('2022-08-02T00:00:00Z'),
      ownerId: openid,
      location: {
        geo: new db.Geo.Point(113.50721353830252, 23.46903992497691),
        detail: '广东省广州市从化区Guangcong South Rd从化有南种植果场(广州市从化区广从南路)',
      },
      status: '种植中',
      display: false,
      logs: [
        {
          detail: '开始种植',
          imgUrl: 'cloud://cropgroup-8ghd7kpx9d029224.6372-cropgroup-8ghd7kpx9d029224-1312622365/init/IMG_4262.jpg',
          time: new Date('2022-03-04T03:58:31Z'),
        },
        {
          detail: '喷洒多菌灵溶液',
          imgUrl: 'cloud://cropgroup-8ghd7kpx9d029224.6372-cropgroup-8ghd7kpx9d029224-1312622365/init/IMG_4263.jpg',
          time: new Date('2022-03-08T04:04:59Z'),
        },
        {
          detail: '装箱',
          imgUrl: 'cloud://cropgroup-8ghd7kpx9d029224.6372-cropgroup-8ghd7kpx9d029224-1312622365/init/IMG_4266.JPG',
          time: new Date('2022-07-02T09:23:21Z'),
        },
        {
          imgUrl: 'cloud://cropgroup-8ghd7kpx9d029224.6372-cropgroup-8ghd7kpx9d029224-1312622365/init/IMG_4268.JPG',
          time: new Date('2022-07-20T07:12:31Z'),
          detail: '打包出品',
        },
      ],
    },
    {
      name: '辣椒🌶️',
      category: '植物性作物',
      startTime: new Date('2022-05-07T02:56:45Z'),
      endTime: new Date('2022-09-15T00:00:00Z'),
      ownerId: openid,
      location: {
        geo: new db.Geo.Point(113.50702667236328, 23.47102165222168),
        detail: '广东省广州市从化区广从南路从化有南种植果场',
      },
      status: '种植中',
      display: false,
      logs: [
        {
          detail: '开始种植',
          imgUrl: 'cloud://cropgroup-8ghd7kpx9d029224.6372-cropgroup-8ghd7kpx9d029224-1312622365/init/IMG_4253.jpg',
          time: new Date('2022-05-07T02:56:45Z'),
        },
        {
          detail: '施农家肥',
          time: new Date('2022-06-01T03:01:33Z'),
          imgUrl: 'cloud://cropgroup-8ghd7kpx9d029224.6372-cropgroup-8ghd7kpx9d029224-1312622365/init/IMG_4252.jpg',
        },
        {
          detail: '采摘',
          time: new Date('2022-07-09T03:01:53Z'),
          imgUrl: 'cloud://cropgroup-8ghd7kpx9d029224.6372-cropgroup-8ghd7kpx9d029224-1312622365/init/IMG_4254.jpg',
        },
        {
          detail: '辣椒装袋',
          time: new Date('2022-07-29T01:28:47Z'),
          imgUrl: 'cloud://cropgroup-8ghd7kpx9d029224.6372-cropgroup-8ghd7kpx9d029224-1312622365/init/IMG_4259.JPG',
        },
      ],
    },
  ];
  // 删除原有数据
  let del_res = await db
    .collection('crops')
    .where({
      ownerId: openid,
    })
    .remove();
  const crops = [];
  const imgUrl = initData.map((x, idx) => {
    crops.push({
      index: idx,
      url: x.logs[0].imgUrl,
    });
  });
  // 新增数据 没有一次增加多条记录接口 用最笨的方法
  // TODO: 数据库添加优化
  const add_res_1 = await db.collection('crops').add({
    data: initData[0],
  });
  const add_res_2 = await db.collection('crops').add({
    data: initData[1],
  });

  return { crops, add_res_1, add_res_2 };
};
