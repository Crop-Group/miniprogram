import dayjs from 'dayjs';
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { Crops } from 'types/functions';
import { PartHeader } from '../PartHeader/index';

interface NearByCropsProps {
  nearByCrops: Array<Crops>;
}

const NearByCrops = (props: NearByCropsProps) => {
  const { nearByCrops } = props;
  return (
    <View className='w-162'>
      <PartHeader title='附近作物' tabColor='#0091FF'></PartHeader>
      <View>
        {nearByCrops.map((crop) => {
          console.log(crop);
          return (
            <View className='bg-white h-42 rounded-3xl shadow flex flex-row items-center'>
              <Image className='w-24 h-24 rounded-3xl mx-2' mode='aspectFit' src={crop.logs[0].imgUrl}></Image>
              <View>
                <View>{crop.name}</View>
                <View>{crop.location.detail}</View>
                <View className='flex justify-between'>
                  <View>{crop.status}</View>
                  <View>{crop.status}</View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default NearByCrops;
