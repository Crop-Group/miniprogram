import Taro from '@tarojs/taro';
import {
  CollectionPromise,
  SingleCollectionPromise,
  DeleteCollectionPromise,
  AddCollectionPromise,
} from '../../../types/functions';

/**
 * @description
 * 获取全量收藏数据
 * @param 无请求参数
 */

const getCollections = async (): CollectionPromise => {
  const _ = await Taro.cloud.callFunction({
    name: 'tempFunctions',
    data: {
      type: 'collections',
      action: 'get',
    },
  });
  _.result = (typeof _.result === 'string' ? {} : _.result) ?? {};
  console.log(_);
  return {
    result: {
      crops: _.result.res_get.list,
    },
    errMsg: _.errMsg,
  };
};

/**
 * @description
 * 获取单个作物是否被收藏
 * @param id: string
 * @returns status: number, result: {ifCollection: boolen},errMsg: string
 *
 */
const checkIfInCollection = async (id: string): SingleCollectionPromise => {
  const _ = await Taro.cloud.callFunction({
    name: 'tempFunctions',
    data: {
      type: 'collections',
      action: 'check',
      data: {
        id: id,
      },
    },
  });
  _.result = (typeof _.result === 'string' ? {} : _.result) ?? {};

  return {
    result: {
      ifCollection: _.result.if_collection,
    },
    errMsg: _.errMsg,
  };
};

/**
 * @description
 * 删除单个作物
 * @param id: string
 * @returns status: number, result: string,errMsg: string
 */

const removeSingleCollection = async (id: string): DeleteCollectionPromise => {
  const _ = await Taro.cloud.callFunction({
    name: 'tempFunctions',
    data: {
      type: 'collections',
      action: 'deleteSingle',
      data: {
        id: id,
      },
    },
  });
  _.result = (typeof _.result === 'string' ? {} : _.result) ?? {};
  return {
    result: _.result.res_delete.errMsg,
    errMsg: _.errMsg,
  };
};

/**
 * @description
 * 添加单个作物收藏
 * @param id: string
 * @returns status: number, result: string,errMsg: string
 */

const addSingleCollection = async (id: string): AddCollectionPromise => {
  const _ = await Taro.cloud.callFunction({
    name: 'tempFunctions',
    data: {
      type: 'collections',
      action: 'addSingle',
      data: {
        id: id,
      },
    },
  });
  _.result = (typeof _.result === 'string' ? {} : _.result) ?? {};

  return {
    result: _.result.res_add.errMsg,
    errMsg: _.errMsg,
  };
};
export { getCollections, checkIfInCollection, removeSingleCollection, addSingleCollection };
