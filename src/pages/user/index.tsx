import { View } from '@tarojs/components';
import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useDidShow } from '@tarojs/taro';
import './index.scss';
import { Layout } from '../../components/Layout';
import { HomeBackGround } from '../../components/Background';
import { UserInfo } from './components/UserInfo';
import { CropsInfo } from './components/CropsInfo';
import { Menu } from './components/Menu';
import { CropsCollectionStoreContext, CropsStoreContext, UserStoreContext } from '../../store/providers';

function User() {
  const cropsStore = useContext(CropsStoreContext);
  const collectionStore = useContext(CropsCollectionStoreContext);
  const userStore = useContext(UserStoreContext);

  useEffect(() => {
    if (userStore.isLogin) {
      console.log('userPage:', '已经登录');
      cropsStore.fetch();
      collectionStore.fetch();
    }
  }, [userStore.isLogin, cropsStore, collectionStore]);

  // 发起查询收藏作物请求
  useDidShow(() => {
    if (userStore.isLogin) {
      cropsStore.fetch();
      collectionStore.fetch();
    }
  });

  return (
    <Layout
      itemsCenter
      menuBarElement={<View className='flex justify-center items-center h-full'></View>}
      background={<HomeBackGround />}
      showFooter
    >
      <UserInfo />
      <CropsInfo
        collectionNum={userStore.isLogin ? collectionStore.length : 0}
        cropsNum={userStore.isLogin ? cropsStore.length : 0}
      ></CropsInfo>
      <Menu />
    </Layout>
  );
}

export default observer(User);
