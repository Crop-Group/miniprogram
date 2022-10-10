import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import './index.scss';
import { Layout } from '../../components/Layout';
import { HomeBackGround } from '../../components/Background';
import { Weather } from './components/Weather';
import { Swiper } from './components/Swiper';

function Index() {
  return (
    <Layout background={<HomeBackGround />} showFooter>
      <View className='w-9/10 ml-1/20 mr-1/20 mt-4'>
        <Weather />
        <View className='py-2'></View>
      </View>
      <View className='w-full mt-4 flex-1'>
        <Swiper />
      </View>
      {/* 圆圈加号 */}
      <View
        className='icon-add absolute bottom-20 right-0 mr-1/20 rounded-full w-24 h-24 flex justify-center items-center'
        onClick={() => {
          Taro.navigateTo({
            url: `/pages/crop/add/index`,
          });
        }}
      >
        <Image src={require('../../images/res/crop/add.svg')} mode='widthFix' className='w-1/2' />
      </View>
    </Layout>
  );
}

export default observer(Index);
