import Taro from '@tarojs/taro';
import { CloudFunctionsResult } from './.config';

/**
 * @description
 * 获取新闻列表
 */

const getNews = async (): Promise<CloudFunctionsResult> => {
  try {
    const _ = await Taro.cloud.callFunction({
      name: 'tempFunctions',
      data: {
        type: 'news',
      },
    });
    _.result = typeof _.result === 'string' ? {} : _.result;
    return {
      status: 1,
      result: {
        ..._.result,
      },
      errMsg: _.errMsg,
    };
  } catch (e) {
    return {
      status: 0,
      result: {},
      errMsg: e,
    };
  }
};

export { getNews };
