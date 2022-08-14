import Taro from '@tarojs/taro';
import {
  GetCropsPromise,
  GetSingleCropsPromise,
  AddCropsPromise,
  DeleteCropsPromise,
  AddCropsLogPromise,
  FinishCropsPromise,
  FindNearCropsCallBack,
} from '../../../types/functions';

/**
 * @description
 * 获取crops全量数据
 * @param 无
 */
const getCrops = async (): GetCropsPromise => {
  const _ = await Taro.cloud.callFunction({
    name: 'tempFunctions',
    data: {
      type: 'crops',
      action: 'get',
    },
  });
  _.result = (typeof _.result === 'string' ? {} : _.result) ?? {};
  return {
    result: _.result.crops,
    errMsg: _.errMsg,
  };
};

/**
 * @description
 * 获取单个作物数据
 * 不存在作物则status为0
 * @param id: string 作物id
 * @returns {..., result: { ...Crops, ownerNickName: '***'//种植者名称 } }
 */
const getSingleCrop = async (id: string): GetSingleCropsPromise => {
  const _ = await Taro.cloud.callFunction({
    name: 'tempFunctions',
    data: {
      type: 'crops',
      action: 'getSingleCrops',
      data: {
        id: id,
      },
    },
  });
  _.result = (typeof _.result === 'string' ? {} : _.result) ?? {};

  return {
    result: {
      ..._.result.singleCrop.data[0],
      ownerNickName: _.result.ownerNickName.data[0].nickName,
    },
    errMsg: _.errMsg,
  };
};

/**
 * @description
 * 增添作物数据
 * @param name: string 作物名称
 * @param userID: string 用户ID, 对应首页昵称第二行
 * @param imgUrl: string 本地图片路径
 * @param startTime: string yyyy-MM-dd-HH-mm-ss eg: 2022-08-13T08:12:20.697Z, 建议开始时间设置不可修改, 可以直接传入 new Date()
 * @param endTime: string yyyy-MM-dd eg: 2022-10-02, 注意开始时间需要早于结束时间
 * @param latitude: number 纬度
 * @param longitude: number 经度
 * @param location: string 位置详情信息
 * @returns status: number, result: string,errMsg: string
 */
const addSingleCrop = async (
  name: string,
  userID: string,
  imgUrl: string,
  startTime: string,
  endTime: string,
  latitude: number,
  longitude: number,
  location: string,
): AddCropsPromise => {
  const _ = await Taro.cloud.uploadFile({
    cloudPath: `tmp/${userID}-${new Date().getTime()}.png`,
    filePath: imgUrl, // 文件路径
  });

  const __ = await Taro.cloud.callFunction({
    name: 'tempFunctions',
    data: {
      type: 'crops',
      action: 'add',
      data: {
        name: name,
        imgUrl: _.fileID,
        userID: userID,
        startTime: startTime,
        endTime: endTime,
        latitude: latitude,
        longitude: longitude,
        location: location,
      },
    },
  });
  __.result = (typeof __.result === 'string' ? {} : __.result) ?? {};
  return {
    result: __.result.res.errMsg,
    errMsg: _.errMsg,
  };
};

/**
 * @description
 * 删除作物
 * @param id: string 作物id
 * @returns status: number, result: string,errMsg: string
 */

const deleteSingleCrop = async (id: string): DeleteCropsPromise => {
  const _ = await Taro.cloud.callFunction({
    name: 'tempFunctions',
    data: {
      type: 'crops',
      action: 'delete',
      data: {
        id: id,
      },
    },
  });
  _.result = (typeof _.result === 'string' ? {} : _.result) ?? {};

  return {
    result: _.result.delete_crops_res.errMsg,
    errMsg: _.errMsg,
  };
};

/**
 * @description
 * 添加作物记录
 * @param id: string 作物id
 * @param imgUrl: string 本地图片路径
 * @param detail: string 记录详情
 * @param userID: string 用户ID, 即16hex编码后的结果, 建议状态管理储存
 * @returns status: number, result: string,errMsg: string
 */
const addSingleCropLog = async (id: string, imgUrl: string, detail: string, userID: string): AddCropsLogPromise => {
  const _ = await Taro.cloud.uploadFile({
    cloudPath: `tmp/${userID}-${new Date().getTime()}.png`,
    filePath: imgUrl, // 文件路径
  });
  const __ = await Taro.cloud.callFunction({
    name: 'tempFunctions',
    data: {
      type: 'crops',
      action: 'addLogs',
      data: {
        id: id,
        imgUrl: _.fileID,
        detail: detail,
        time: new Date(),
      },
    },
  });
  __.result = (typeof __.result === 'string' ? {} : __.result) ?? {};

  return {
    result: __.result.addLogs_res.errMsg,
    errMsg: _.errMsg,
  };
};

/**
 * @description
 * 标记作物完成
 * @param id: string 作物id
 * @returns status: number, result: string, errMsg: string
 */
const finishSingleCrop = async (id: string): FinishCropsPromise => {
  const _ = await Taro.cloud.callFunction({
    name: 'tempFunctions',
    data: {
      type: 'crops',
      action: 'finish',
      data: {
        id: id,
      },
    },
  });
  _.result = (typeof _.result === 'string' ? {} : _.result) ?? {};

  return {
    result: _.result.finish_res.errMsg,
    errMsg: _.errMsg,
  };
};

/**
 * @description
 * 查找周边作物
 * @param callback: (res: FindNearCropsCallBack) => {}
 * @example 
 * await findNearCrops((e)=>{
        console.log(e)
    });
    // {
    // errMsg: "cloud.callFunction:ok"
    // result: [{…}]
    // status: 1
    // }
 */

const findNearCrops = (callback: { (res: FindNearCropsCallBack): void }) => {
  Taro.getFuzzyLocation({
    type: 'wgs84',
    success: async (_) => {
      console.log('loca', _);
      const __ = await Taro.cloud
        .callFunction({
          name: 'tempFunctions',
          data: {
            type: 'crops',
            action: 'findNearCrops',
            data: {
              longitude: _.longitude,
              latitude: _.latitude,
            },
          },
        })
        .then();
      __.result = (typeof __.result === 'string' ? {} : __.result) ?? {};
      callback({
        result: __.result.res_find_near.list,
        errMsg: __.errMsg,
      });
    },
  });
};

export { getCrops, getSingleCrop, addSingleCrop, addSingleCropLog, deleteSingleCrop, finishSingleCrop, findNearCrops };
