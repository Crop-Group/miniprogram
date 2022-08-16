import { View } from '@tarojs/components';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useDidShow } from '@tarojs/taro';
import './index.scss';
import { Layout } from '../../components/Layout';
import { HomeBackGround } from '../../components/Background';
import { UserInfo } from './components/UserInfo';
import { CropsInfo } from './components/CropsInfo';
import { Menu } from './components/Menu';
import { CropsCollectionStoreContext, CropsStoreContext } from '../../store/providers';

function User() {
  const cropsStore = useContext(CropsStoreContext);
  const collectionStore = useContext(CropsCollectionStoreContext);

  // 发起查询收藏作物请求
  useDidShow(() => {
    cropsStore.fetch();
    collectionStore.fetch();
  });

  return (
    <Layout
      itemsCenter
      menuBarElement={<View className='flex justify-center items-center h-full'></View>}
      background={<HomeBackGround />}
      showFooter
    >
      <UserInfo />
      <CropsInfo collectionNum={collectionStore.length} cropsNum={cropsStore.length}></CropsInfo>
      <Menu />
    </Layout>
  );
}

export default observer(User);
