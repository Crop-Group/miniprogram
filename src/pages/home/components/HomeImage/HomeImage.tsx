import solarLunar from 'solarLunar';
import { useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import cls from 'classnames';
import Taro from '@tarojs/taro';

interface storyInfo {
  homeImage?: string;
  storyDescription?: string;
  _id: string;
}

const HomeImage = (props: storyInfo) => {
  const { homeImage, storyDescription, _id } = props;
  const [solar2lunar, setSolar2lunarData] = useState({
    cDay: '--',
    gzYear: '--',
    monthCn: '--',
    ncWeek: '--',
    dayCn: '--',
  });
  const [isLoading, setIsLoading] = useState(true);
  const loadingClass = cls('rounded-7xl', 'w-165', 'h-190', 'relative', 'caret-gray-500', {
    'bg-loading': isLoading,
    'animate-pulse': !isLoading,
  });
  useEffect(() => {
    const localDate = new Date();
    const solar2lunarData = solarLunar.solar2lunar(
      localDate.getFullYear(),
      localDate.getMonth() + 1,
      localDate.getDate(),
    ); // 输入的日子为公历
    setSolar2lunarData(solar2lunarData);
  }, []);
  return (
    <View
      className='mt-6 flex flex-col items-center'
      onClick={() => {
        Taro.navigateTo({
          url: '/pages/article/index?_id=' + _id,
        });
      }}
    >
      <Image
        className={loadingClass}
        mode='aspectFill'
        src={homeImage ?? ''}
        onLoad={() => {
          setIsLoading(false);
          setTimeout(() => {
            setIsLoading(true);
          }, 2000);
        }}
      >
        <View className='absolute bottom-10 flex flex-row justify-between w-full text-white'>
          <View className='flex flex-col ml-10 justify-end mb-8'>
            <Text className='font-bold text-4xl text-shadow-lg'>{solar2lunar.ncWeek}</Text>
            <Text className='text-3xl text-shadow-lg mt-1'>
              {solar2lunar.gzYear}年 农历{solar2lunar.monthCn}
              {solar2lunar.dayCn}
            </Text>
          </View>
          <View className='mr-10'>
            <Text className='text-10xl text-shadow-lg'>{solar2lunar.cDay}</Text>
          </View>
        </View>
      </Image>

      <Text className='mt-6 opacity-60 font-bold'> {storyDescription ?? '---'} </Text>
      <View className='bg-black h-px scale-y-50 w-36 opacity-10 mt-6'></View>
    </View>
  );
};

export default HomeImage;
