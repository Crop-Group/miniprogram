import { View, Image, Text } from '@tarojs/components';
import { useContext, useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { UserStoreContext } from '../../../../store/providers';
import './UserInfo.scss';

/**
 * 用户信息
 */
function UserInfo() {
  const userStore = useContext(UserStoreContext);

  const welcomeText = !userStore.isLogin ? '点击登录畅享羊谷之旅' : '欢迎来到羊谷';
  const nickName = userStore.isLogin ? userStore.nickName : '用户未登录';
  const avatarUrl = userStore.isLogin
    ? userStore.avatarUrl
    : 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';

  return (
    <View className='flex flex-row items-start w-full p-4' style='padding-left: 25px;'>
      <Image
        className='rounded-full border-2 border-white'
        style='width: 56px;height: 56px;'
        src={avatarUrl}
        onClick={() => {
          if (!userStore.isLogin) {
            console.log('click login');
            userStore.login();
          }
        }}
      />
      <View className='flex flex-col justify-center' style='height: 56px; margin-left: 5px'>
        <Text className='nick-name'> {nickName} </Text>
        <Text className='welcome-info'> {welcomeText} </Text>
      </View>
    </View>
  );
}

export default observer(UserInfo);
