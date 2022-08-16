import { View, Image, Text } from '@tarojs/components';
import ScanLogo from '../../../../images/res/user/menu/scan.svg';
import './CropsInfo.scss';

interface cropsProps {
  collectionNum: number;
  cropsNum: number;
}

/**
 * 作物数量栏
 * 包含(作物数量、我的收藏)
 */
export default function CropsInfo(props: cropsProps) {
  const { collectionNum, cropsNum } = props;

  return (
    <View className='w-full flex flex-col justify-center items-center my-4'>
      <View className='flex flex-row items-center bg-white container justify-center' style='width: 90%'>
        <View className='crops-container flex flex-col'>
          <Text className='num flex flex-row items-center justify-center'> {cropsNum} </Text>
          <Text className='description'> 我的作物 </Text>
        </View>
        <Image className='logo-scan' src={ScanLogo}></Image>
        <View className='collection-container flex flex-col'>
          <Text className='num flex flex-row items-center justify-center'> {collectionNum} </Text>
          <Text className='description'> 我的收藏 </Text>
        </View>
      </View>
    </View>
  );
}
