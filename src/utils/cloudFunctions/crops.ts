import Taro from '@tarojs/taro';
import {
  GetCropsPromise,
  GetSingleCropsPromise,
  AddCropsPromise,
  DeleteCropsPromise,
  AddCropsLogPromise,
  FinishCropsPromise,
  FindNearCropsPromise,
} from '../../../types/functions';
import { getFuzzyLocation } from '../getFuzzyLocation';

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
    result: _.result.crops.data,
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
  /**查询不到作物返回 */
  if (_.result.singleCrop.data.length === 0) {
    return {
      result: undefined,
      errMsg: _.errMsg,
    };
  }
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
 * 增添作物数据, 无需传入开始种植时间
 * @param name: string 作物名称
 * @param userID: string 用户ID, 对应首页昵称第二行
 * @param imgUrl: string 本地图片路径
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
  endTime: string,
  latitude: number,
  longitude: number,
  location: string,
  category: string,
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
        category: category,
        startTime: new Date(),
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
    errMsg: __.errMsg,
  };
};

/**
 * @description
 * 删除作物, 此接口的返回参没有意义, 但是可以确保所给对应ID从数据库中移除
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
 * @param 无
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

const findNearCrops = async (): FindNearCropsPromise => {
  const location = await getFuzzyLocation({ type: 'wgs84' });
  const _ = await Taro.cloud.callFunction({
    name: 'tempFunctions',
    data: {
      type: 'crops',
      action: 'findNearCrops',
      data: {
        longitude: location.longitude,
        latitude: location.latitude,
      },
    },
  });
  _.result = (typeof _.result === 'string' ? {} : _.result) ?? {};

  return {
    result: _.result.res_find_near.list,
    errMsg: _.errMsg,
  };
};

export { getCrops, getSingleCrop, addSingleCrop, addSingleCropLog, deleteSingleCrop, finishSingleCrop, findNearCrops };
