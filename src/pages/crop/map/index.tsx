import { Map, View, Image, Text } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { BackNavigate } from '../../../components/BackNavigate';
import { Layout } from '../../../components/Layout';

const CropMap = () => {
  return (
    <Layout menuBarElement={<BackNavigate title='详情'></BackNavigate>} itemsCenter>
      <Map className='absolute h-full w-full' latitude={23} longitude={114} />
      <View className='absolute bottom-8 min-h-88 w-9/10 bg-white rounded-2xl shadow-2xl flex'>
        <View className='rounded-2xl w-1/3 flex justify-center items-center bg-gray-300 m-4'>图片</View>
        <View className='flex flex-col flex-grow mx-4 my-8'>
          <Text className='font-medium'>辣椒🌶</Text>
          <Text>114.5.14-1919.8.10</Text>
          <View>
            <Image className='h-2/3 mr-2' mode='heightFix' src={require('../../../images/res/crop/location-2.svg')} />
            <Text className='opacity-60'>下北泽</Text>
          </View>
          <View className='border self-start px-2 py-1 border-orange-400 text-orange-400 text-xl border-solid rounded-md border-1'>
            植物性作物
          </View>
          <View className='ml-auto mt-auto'>种植中</View>
        </View>
      </View>
    </Layout>
  );
};

export default observer(CropMap);
