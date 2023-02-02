import { View, Image } from '@tarojs/components';
import { Crops } from 'types/functions';
import { PartHeader } from '../PartHeader/index';
import './index.scss';

interface NearByCropsProps {
  nearByCrops: Array<Crops>;
}
const textFormat = (logs, name, location) => {
  const name_format = name.length > 9 ? name.slice(0, 9) + '...' : name;
  const location_format = location.length > 17 ? location.slice(0, 17) + '...' : location;
  logs.map((x) => {
    x.format = `${new Date(x.time).getMonth() + 1}.${new Date(x.time).getDate()} ` + x.detail;
  });
  const logs_format = logs.map((x) => x.format).slice(0, 2);
  return {
    name_format,
    location_format,
    logs_format,
  };
};
const NearByCrops = (props: NearByCropsProps) => {
  const { nearByCrops } = props;
  return (
    <View className='w-162'>
      <PartHeader title='附近作物' tabColor='#0091FF'></PartHeader>
      <View>
        {nearByCrops.map((crop) => {
          const { name_format, location_format, logs_format } = textFormat(crop.logs, crop.name, crop.location.detail);
          return (
            <View className='near-crops-card'>
              <View className='flex flex-row justify-start items-center w-full'>
                <View className='flex flex-col px-1 h-full ml-5 w-1/5'>
                  <Image
                    style='border-radius:10px;height: 69px;width: 64px;border: 1px rgba(128, 128, 128, 0.308) solid;'
                    mode='aspectFill'
                    src={crop.logs[0].imgUrl}
                  ></Image>
                </View>
                <View className='flex flex-col justify-between ml-3' style='width:72%; height: 90%'>
                  <View className='flex flex-col' style='height:92%'>
                    <View className='flex flex-row'>
                      <View className='font-bold text-4xl'>{name_format}</View>
                      <View className='category-container'>
                        <View>{crop.category}</View>
                      </View>
                    </View>
                    <View className='text-2xl opacity-60 mb-2 mt-1'>{location_format}</View>
                  </View>
                  <View className='flex flex-row justify-between'>
                    {logs_format.map((item) => {
                      return (
                        <View className='logs-container'>
                          <View>{item}</View>
                        </View>
                      );
                    })}
                    <View className='flex flex-column justify-end opacity-60 h-full items-center text-2xl'>
                      {crop.status}
                    </View>
                  </View>
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
