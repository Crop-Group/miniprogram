import Taro from '@tarojs/taro';
import { ArticlePromise } from '../../../types/functions';

/**
 * @description
 * 获取新闻列表
 * @param 无请求参数
 * @example
 * const _ = await getNews()
 */

const getNews = async (): Promise<ArticlePromise> => {
  try {
    const _ = await Taro.cloud.callFunction({
      name: 'tempFunctions',
      data: {
        type: 'news',
      },
    });
    _.result = (typeof _.result === 'string' ? {} : _.result) ?? {};
    return {
      status: 1,
      result: {
        news: _.result.news.data,
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
