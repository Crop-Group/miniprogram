import { View, Text } from '@tarojs/components';
import React, { useEffect, useMemo, useState } from 'react';
import './index.scss';
import { Layout } from '../../components/Layout';
import { HomeBackGround } from '../../components/Background';
import { Userinfo } from './compoents/Userinfo';

export default function User() {
  const [userInfo, setUserinfo] = useState({
    avatarUrl:
      'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    nickName: '用户未登录',
    welcomeInfo: '点击登录畅享羊谷之旅',
  });

  return (
    <Layout
      itemsCenter
      menuBarElement={<View className='flex justify-center items-center h-full'></View>}
      background={<HomeBackGround />}
      showFooter
    >
      <Userinfo nickName={userInfo.nickName} avatarUrl={userInfo.avatarUrl} welcomeInfo={userInfo.welcomeInfo} />
    </Layout>
  );
}
