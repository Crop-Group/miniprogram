import Taro from '@tarojs/taro';

export function getFuzzyLocation(
  opt: Taro.getFuzzyLocation.Option,
): Promise<Taro.getFuzzyLocation.SuccessCallbackResult> {
  return new Promise((resolve, reject) => {
    Taro.getFuzzyLocation({
      ...opt,
      success: (result) => resolve(result),
      fail: (reason) => reject(reason),
    });
  });
}
