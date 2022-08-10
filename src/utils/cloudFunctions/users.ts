import Taro from '@tarojs/taro';
import { CloudFunctionsResult } from './.config';

/**
 * @description
 * 用户登录
 * @example
 * const handleLogin = async () => {
        const _ = await login()
        console.log(_)
        // {
        //   status: 1,  
        //   result: {
        //     nickName: '',
        //     avatarUrl: '',
        //     ...
        // }
        //}
    }
 */

const login = async (): Promise<CloudFunctionsResult> => {
  try {
    const _ = await Taro.getUserProfile({
      desc: '获取用户头像、昵称，作物数据',
    });
    const nickName = _.userInfo['nickName'];
    const avatarUrl = _.userInfo['avatarUrl'];

    const __ = await Taro.cloud.callFunction({
      name: 'tempFunctions',
      data: {
        type: 'users',
        data: {
          nickName: nickName,
        },
      },
    });
    __.result = typeof __.result === 'string' ? {} : __.result;
    return {
      status: 1,
      result: {
        ...__.result,
        nickName,
        avatarUrl,
      },
      errMsg: __.errMsg,
    };
  } catch (e) {
    return {
      status: 0,
      result: {},
      errMsg: e,
    };
  }
};

export { login };
