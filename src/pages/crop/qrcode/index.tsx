import { View, Text, Image } from '@tarojs/components';
import { Layout } from '../../../components/Layout';
import { Footer } from '../../../components/Footer';
import { HomeBackGround } from '../../../components/Background';

const QRCode = () => {
  return (
    <Layout background={<HomeBackGround />} menuBarElement={<View></View>} itemsCenter>
      <View className='flex flex-col relative rounded-3xl shadow-xl p-8 bg-white w-8/10 mt-18 mb-8'>
        <View className='absolute bg-white top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded-full shadow-2xl flex flex-col w-36 h-36 items-center justify-center'>
          <Image
            src={require('../../../images/res/crop/forward.svg')}
            mode='widthFix'
            className='left-1/2 h-28 w-28 rounded-full'
          />
        </View>

        <Text className='text-center mt-16 font-medium'>situ2001</Text>
        <Text className='text-center opacity-60' style={{ fontSize: '10pt' }}>
          FFFF114514
        </Text>
        <View className='border border-1 transform scale-y-50 my-1 border-black border-dashed opacity-20' />
        <View className='flex'>
          <Text className='opacity-60' style={{ fontSize: '10pt' }}>
            作物名称
          </Text>
          <Text className='ml-auto font-medium'>辣椒🌶</Text>
        </View>
        <View className='flex'>
          <Text className='opacity-60' style={{ fontSize: '10pt' }}>
            起止时间
          </Text>
          <Text className='ml-auto font-medium'>1145.1.4-1919.8.10</Text>
        </View>
        <View className='flex'>
          <Text className='opacity-60' style={{ fontSize: '10pt' }}>
            状态
          </Text>
          <Text className='ml-auto font-medium' style={{ color: 'green' }}>
            已完成
          </Text>
        </View>
        <View className='flex justify-center'>
          <Image className='h-full mr-2' mode='heightFix' src={require('../../../images/res/crop/location-2.svg')} />
          <Text
            className='opacity-50 max-w-2/3 overflow-hidden overflow-ellipsis whitespace-nowrap'
            style={{ fontSize: '10pt' }}
          >
            下北泽下北泽下北泽下北泽下北泽下北泽下北泽下北泽下北泽下北泽下北泽
          </Text>
        </View>
      </View>

      <View className='w-8/10 rounded-3xl bg-white flex-grow flex flex-col items-center'>
        <View className='border border-solid border-black w-36 h-36'>QR-Code</View>
        <View className='w-4/5 border border-dashed mt-3' style={{ borderColor: '#72A884' }}></View>
        <View className='mt-8' style={{ color: '#72A884', fontSize: '9pt' }}>
          FFFF1919810
        </View>
        <View className='mt-auto'>
          <Footer />
        </View>
      </View>

      <View className='flex my-4'>
        <View className='rounded-full shadow-2xl bg-white w-24 h-24 flex justify-center items-center m-4'>
          <Image mode='widthFix' className='w-1/2' src={require('../../../images/res/crop/close.svg')} />
        </View>
        <View className='rounded-full shadow-2xl bg-white w-24 h-24 flex justify-center items-center m-4'>
          <Image src={require('../../../images/res/crop/forward.svg')} mode='widthFix' className='w-1/2' />
        </View>
      </View>
    </Layout>
  );
};

export default QRCode;
