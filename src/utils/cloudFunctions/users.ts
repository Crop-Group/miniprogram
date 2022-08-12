import Taro from '@tarojs/taro';
import { LoginResultPromise, InitUserPromise } from '../../../types/functions';

/**
 * @description
 * 用户登录
 * @param 无请求参数
 * @example
 * const handleLogin = async () => {
        const _ = await login()
        console.log(_)
        // {
        //   status: 1,  
        //   result: {
        //     nickName: 'nickName',
        //     avatarUrl: 'avatarUrl',
        //     userID: '*****'.
        // }
        //}
    }
 */

const login = async (): LoginResultPromise => {
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
    __.result = (typeof __.result === 'string' ? {} : __.result) ?? {};
    return {
      status: 1,
      result: {
        userID: __.result.userID,
        nickName,
        avatarUrl,
      },
      errMsg: __.errMsg,
    };
  } catch (e) {
    return {
      status: 0,
      errMsg: e,
    };
  }
};

/**
 * @description
 * 初始化用户
 * @param 无请求参数
 * @example
 * const handleInitUser = async () => {
        const _ = await initUser()
        console.log(_)
        // {
        //   status: 1,  
        //   result: {
        //     nickName: 'nickName',
        //     avatarUrl: 'avatarUrl',
        //     userID: '*****'.
        // }
        //}
    }
 */

const initUser = async (): InitUserPromise => {
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
    const ___ = await Taro.cloud.callFunction({
      name: 'tempFunctions',
      data: {
        type: 'initUser',
        data: {
          nickName: nickName,
        },
      },
    });

    ___.result = (typeof ___.result === 'string' ? {} : ___.result) ?? {};

    return {
      status: 1,
      result: {
        ...___.result,
        nickName,
        avatarUrl,
      },
      errMsg: ___.errMsg,
    };
  } catch (e) {
    return {
      status: 0,
      errMsg: e,
    };
  }
};

export { login, initUser };
