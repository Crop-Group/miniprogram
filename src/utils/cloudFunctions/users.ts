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
    result: {
      userID: __.result.userID,
      nickName,
      avatarUrl,
    },
    errMsg: __.errMsg,
  };
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
        //     userID: '*****',
        //     crops: Array<{
        //          index: 0,
        //          imgUrl: ''***
        //      }
        }>
        // }
        //}
    }
 */

const initUser = async (): InitUserPromise => {
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
  __.result = (typeof __.result === 'string' ? {} : __.result) ?? {};
  ___.result = (typeof ___.result === 'string' ? {} : ___.result) ?? {};

  return {
    result: {
      ...___.result,
      userID: __.result.userID,
      nickName,
      avatarUrl,
    },
    errMsg: ___.errMsg,
  };
};

export { login, initUser };
