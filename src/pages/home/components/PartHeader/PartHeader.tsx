import { View, Text } from '@tarojs/components';

import './index.scss';

interface lineInfo {
  title: string;
  tabColor: string;
}

const PartHeader = (props: lineInfo) => {
  const { title, tabColor } = props;
  return (
    <View className='flex flex-col w-full mt-10 mb-8'>
      <View className='font-bold flex flex-col ml-12'>
        <Text className='text-bold text-4xl ml-4'>{title}</Text>
        <View className='h-2 w-20 rounded-4xl mt-4 mr-4 ml-12 z-100' style={'background:' + tabColor}></View>
        <View className='grey-line ml-2'></View>
      </View>
    </View>
  );
};

export default PartHeader;
