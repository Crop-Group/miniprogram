import Taro from '@tarojs/taro';
import { Image, Swiper, View, ScrollView, SwiperItem } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import cls from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { Crop } from '../../../../store/crops';
import { CropsStoreContext, UserStoreContext } from '../../../../store/providers';
import './Swiper.scss';
import CropCard from './CropCard';

interface TabItem {
  content: string;
  filter: (item: Crop) => boolean;
}

const CropSwiper = () => {
  const tabItem: TabItem[] = [
    {
      content: '全部',
      filter: () => true,
    },
    {
      content: '种植中',
      filter: (item: Crop) => item.details.status === '种植中',
    },
    {
      content: '已完成',
      filter: (item: Crop) => item.details.status === '已完成',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const cropsStore = useContext(CropsStoreContext);
  const userStore = useContext(UserStoreContext);

  const [refresherTriggered, setRefresherTriggered] = useState(false);

  useEffect(() => {
    if (userStore.isLogin) {
      cropsStore.fetch();
    }
  }, [cropsStore, userStore.isLogin]);

  return (
    <View className='h-full flex flex-col'>
      <View className='flex w-9/10 mx-1/20'>
        <ScrollView scrollX scrollWithAnimation className='whitespace-nowrap'>
          {tabItem.map((item, i) => (
            <View
              key={i}
              className={cls('max-w-max inline-block mr-8 category', {
                ['category-active']: currentIndex === i,
              })}
              onClick={() => {
                setCurrentIndex(i);
              }}
            >
              <View>{item.content}</View>
              <View
                className={cls('h-2 mt-1 rounded', {
                  ['underline-active']: currentIndex === i,
                })}
              ></View>
            </View>
          ))}
        </ScrollView>
        <View className='flex items-center'>
          <Image
            src={require('../../../../images/res/crop/map.svg')}
            mode='heightFix'
            className='h-4/5'
            onClick={() => {
              console.log('Navigate to map page');
              Taro.navigateTo({ url: `/pages/crop/map/index` });
            }}
          />
        </View>
      </View>
      <Swiper current={currentIndex} onChange={(e) => setCurrentIndex(e.detail.current)} className='flex-1'>
        {tabItem.map((item, i) => (
          <SwiperItem className='w-full' key={i}>
            <ScrollView
              scrollY
              className='w-full h-full'
              refresherEnabled
              refresherTriggered={refresherTriggered}
              onRefresherRefresh={async () => {
                setRefresherTriggered(true);
                if (userStore.isLogin) {
                  await cropsStore.fetch();
                } else {
                  await new Promise((r) => setTimeout(() => r(1), 0));
                }
                setRefresherTriggered(false);
              }}
              refresherBackground='rgba(0,0,0,0)'
            >
              {cropsStore.crops.filter(item.filter).length === 0 ? (
                <View className='flex flex-col h-full items-center justify-center'>
                  <Image
                    className='h-24'
                    mode='heightFix'
                    src={require('../../../../images/res/crop/underground.svg')}
                  ></Image>
                  <View className='mt-8' style={{ fontWeight: '500', fontSize: '14pt' }}>
                    土地空空的
                  </View>
                  <View className='mt-8'>欢迎来到羊谷</View>
                  <View className='mt-2'>来点击右下角+添加作物吧</View>
                </View>
              ) : (
                cropsStore.crops.filter(item.filter).map((crop, index) => <CropCard crop={crop} key={index} />)
              )}
            </ScrollView>
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  );
};

export default observer(CropSwiper);
