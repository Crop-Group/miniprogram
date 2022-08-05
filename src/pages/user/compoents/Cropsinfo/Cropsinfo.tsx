import { View, Image, Text } from '@tarojs/components';
import './Userinfo.scss';

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
    <View className='flex flex-row items-start w-full' style='padding-left: 25px; width: 80%'>
      <View className='flex flex-col'>
        <Text> {collectionNum} </Text>
        <Text> 我的作物 </Text>
      </View>
      <Image src=''></Image>
      <View className='flex flex-col'>
        <Text> {cropsNum} </Text>
        <Text> 我的收藏 </Text>
      </View>
    </View>
  );
}
