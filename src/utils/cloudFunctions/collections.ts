import Taro from '@tarojs/taro';
import { CollectionPromise } from '../../../types/functions';

/**
 * @description
 * 获取全量收藏数据
 * @param 无请求参数
 */

const getCollections = async (): CollectionPromise => {
  try {
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
      status: 1,
      result: {
        crops: _.result.res_get.list,
      },
      errMsg: _.errMsg,
    };
  } catch (e) {
    return {
      status: 0,
      errMsg: e,
    };
  }
};

export { getCollections };
