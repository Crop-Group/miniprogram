import { useState, useEffect } from 'react';
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import './index.scss';
import { PartHeader } from '../PartHeader/index';
import { userStore, cropsStore } from '../../../../store/providers';

const MyCrops = () => {
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (userStore.isLogin) {
      console.log('MyCrops:', 'useEffect trigger');
      cropsStore.fetch();
    }
  }, [userStore.isLogin, cropsStore]);

  return (
    <View>
      <PartHeader title='我的羊谷' tabColor='#34A853'></PartHeader>
      <View className='w-full flex flex-row'>
        <View className='ml-12'>
          <Swiper className='h-78 w-78 rounded-6xl -z-0' autoplay={autoPlay}>
            {cropsStore.crops.map((e) => {
              return (
                <SwiperItem className='rounded-6xl'>
                  <Image className='rounded-6xl' mode='aspectFill' src={e.details.logs[0].imgUrl}></Image>
                </SwiperItem>
              );
            })}
          </Swiper>
          <View className='flex flex-col justify-between h-78 -mt-78 text-white'>
            <View className='flex flex-col z-100 p-6'>
              <Text className='text-xl py-1'>提供生产全程追溯</Text>
              <Text className='text-5xl font-bold py-1'>{cropsStore.length}棵</Text>
              <Text className='font-bold py-1'>作物正在托管中</Text>
            </View>
            <View
              className='bg-black h-22 w-full rounded-6xl z-100 opacity-80 flex flex-row justify-between items-center'
              style='background: rgba(109,114,120,0.49)'
            >
              <Image className='w-10 h-10 ml-6' src={require('../../../../images/res/index/last.svg')}>
                {' '}
              </Image>
              <Image
                className='w-12 h-12'
                src={
                  autoPlay
                    ? require('../../../../images/res/index/pause.svg')
                    : require('../../../../images/res/index/play.svg')
                }
                onClick={() => [setAutoPlay(!autoPlay)]}
              ></Image>
              <Image className='w-10 h-10 mr-6' src={require('../../../../images/res/index/next.svg')}>
                {' '}
              </Image>
            </View>
          </View>
        </View>

        <View className='flex flex-col h-78 justify-between ml-6'>
          <View
            className='bg-black rounded-6xl w-78 h-36 flex items-center justify-center'
            style='background: #44D7B6'
            onClick={() => {}}
          >
            <Image className='w-20 h-20' src={require('../../../../images/res/index/plus.svg')} />
            <Text className='text-4xl text-white p-3 text-bold'>新增作物</Text>
          </View>
          <View
            className='bg-black rounded-6xl w-78 h-36 flex items-center justify-center'
            style='background: #0091FF'
            onClick={() => {}}
          >
            <Image className='w-22 h-22' src={require('../../../../images/res/index/manage.svg')} />
            <Text className='text-4xl text-white p-3 text-bold'>追加记录</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default observer(MyCrops);
