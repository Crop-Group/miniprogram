import { View, Text, Image } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { useContext } from 'react';
import dayjs from 'dayjs';
import { QRCode } from 'taro-code';
import { Layout } from '../../../components/Layout';
import { Footer } from '../../../components/Footer';
import { CropsStoreContext, UserStoreContext } from '../../../store/providers';
import { BackNavigate } from '../../../components/BackNavigate';

const QRCodePage = () => {
  // TODO resolve id here
  const router = useRouter();
  const cropStore = useContext(CropsStoreContext);
  const userStore = useContext(UserStoreContext);
  console.log(router.params);

  const crop = cropStore.crops.find((v) => v.details._id === router.params.id);

  if (!router.params.id || !crop) {
    return (
      <Layout menuBarElement={<BackNavigate title='未找到'></BackNavigate>} justifyCenter itemsCenter showFooter>
        Not found
      </Layout>
    );
  }

  return (
    <Layout showBackGround menuBarElement={<View></View>} itemsCenter>
      <View className='flex flex-col relative rounded-3xl shadow-xl p-8 bg-white w-8/10 mt-18 mb-8'>
        <View className='absolute bg-white top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded-full flex flex-col w-36 h-36 items-center justify-center'>
          <Image src={crop?.details.logs[0].imgUrl} mode='scaleToFill' className='left-1/2 h-32 w-32 rounded-full' />
        </View>

        <Text className='text-center mt-16 font-medium'># {userStore.nickName}</Text>
        <Text className='text-center uppercase opacity-60' style={{ fontSize: '10pt' }}>
          {userStore.userID}
        </Text>
        <View className='border border-1 transform scale-y-50 my-1 border-black border-dashed opacity-20' />
        <View className='flex'>
          <Text className='opacity-60' style={{ fontSize: '10pt' }}>
            作物名称
          </Text>
          <Text className='ml-auto font-medium'>{crop?.details.name}</Text>
        </View>
        <View className='flex'>
          <Text className='opacity-60' style={{ fontSize: '10pt' }}>
            起止时间
          </Text>
          <Text className='ml-auto font-medium'>
            {`${dayjs(crop?.details.startTime).format('YYYY.MM.DD')}-${dayjs(crop?.details.endTime).format(
              'YYYY.MM.DD',
            )}`}
          </Text>
        </View>
        <View className='flex'>
          <Text className='opacity-60' style={{ fontSize: '10pt' }}>
            状态
          </Text>
          <Text className='ml-auto font-medium' style={{ color: crop?.details.status === '已完成' ? 'green' : 'red' }}>
            {crop?.details.status}
          </Text>
        </View>
        <View className='flex justify-center'>
          <Image className='h-full mr-2' mode='heightFix' src={require('../../../images/res/crop/location-2.svg')} />
          <Text
            className='opacity-50 max-w-2/3 overflow-hidden overflow-ellipsis whitespace-nowrap'
            style={{ fontSize: '10pt' }}
          >
            {crop?.details.location.detail}
          </Text>
        </View>
      </View>

      <View className='w-8/10 rounded-3xl bg-white flex-grow flex flex-col items-center'>
        <QRCode className='my-8' size={200} text={router.params.id} />
        <View className='w-4/5 border border-dashed mt-3' style={{ borderColor: '#72A884' }}></View>
        <View className='mt-8 uppercase' style={{ color: '#72A884', fontSize: '9pt' }}>
          {router.params.id}
        </View>
        <View className='mt-auto'>
          <Footer />
        </View>
      </View>

      <View className='flex my-4'>
        <View
          className='rounded-full shadow-2xl bg-white w-24 h-24 flex justify-center items-center m-4'
          onClick={() => {
            Taro.navigateBack();
          }}
        >
          <Image mode='widthFix' className='w-1/2' src={require('../../../images/res/crop/close.svg')} />
        </View>
        <View className='rounded-full shadow-2xl bg-white w-24 h-24 flex justify-center items-center m-4'>
          <Image src={require('../../../images/res/crop/forward.svg')} mode='widthFix' className='w-1/2' />
        </View>
      </View>
    </Layout>
  );
};

export default QRCodePage;
