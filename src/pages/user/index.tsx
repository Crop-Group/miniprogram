import { View, Text } from '@tarojs/components';
import React, { useEffect, useMemo, useState } from 'react';
import { useDidShow } from '@tarojs/taro';
import './index.scss';
import { Layout } from '../../components/Layout';
import { HomeBackGround } from '../../components/Background';
import { UserInfo } from './components/UserInfo';
import { CropsInfo } from './components/CropsInfo';
import { Menu } from './components/Menu';

export default function User() {
  const [userInfo, setUserinfo] = useState({
    avatarUrl:
      'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    nickName: '用户未登录',
    welcomeInfo: '点击登录畅享羊谷之旅',
  });
  const [cropsInfo, setCropsinfo] = useState({
    collectionNum: 0,
    cropsNum: 0,
  });
  const [test, setTest] = useState(1);
  //TODO: 发起查询作物请求
  useDidShow(() => {
    setTest(test + 1);
  });

  useEffect(() => {
    console.log(test);
  }, [test]);

  return (
    <Layout
      itemsCenter
      menuBarElement={<View className='flex justify-center items-center h-full'></View>}
      background={<HomeBackGround />}
      showFooter
      showFooterBottom
    >
      <UserInfo nickName={userInfo.nickName} avatarUrl={userInfo.avatarUrl} welcomeInfo={userInfo.welcomeInfo} />
      <CropsInfo collectionNum={cropsInfo.collectionNum} cropsNum={cropsInfo.cropsNum}></CropsInfo>
      <Menu />
    </Layout>
  );
}
