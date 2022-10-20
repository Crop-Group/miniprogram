import { useContext } from 'react';
import { View, Text, Image, Input, Picker, Label, Button } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { Layout } from '../../../components/Layout';
import { HomeBackGround } from '../../../components/Background';
import { CropsStoreContext } from '../../../store/providers';
import './index.scss';
import Line from './Line';
import { BackNavigate } from '../../../components/BackNavigate';

const PageAddCrop = () => {
  const cropsStore = useContext(CropsStoreContext);

  return (
    <Layout background={<HomeBackGround />} menuBarElement={<BackNavigate title='添加作物'></BackNavigate>} itemsCenter>
      <View
        className='w-9/10 m-2 h-64 flex justify-center items-center opacity-40 bg-gray-400 rounded-xl'
        style={{ height: '390rpx' }}
      >
        <View className='text-white'>点击上传图片</View>
      </View>
      <View className='form-add w-9/10 flex-grow flex flex-col mt-6 rounded-3xl p-8'>
        <Label className='font-medium mb-4'>名称</Label>
        <Input type='text' placeholder='填写作物名称'>
          填写作物名称
        </Input>
        <Line />
        <Label className='font-medium mb-4'>作物类别</Label>
        <Picker range={['谷类作物', '豆类作物', '薯类作物', '糖料作物', '饮料作物', '植物性作物', '蔬菜', '其他']}>
          谷类作物
        </Picker>
        <Line />
        <View className='flex w-full'>
          <View className='flex flex-col w-1/2'>
            <Label className='font-medium mb-4'>栽种时间</Label>
            <Picker></Picker>
            <Line />
          </View>
          <View className='flex flex-col w-1/2'>
            <Label className='font-medium mb-4'>收成时间</Label>
            <Picker></Picker>
            <Line />
          </View>
        </View>
        <Label className='font-medium mb-4'>详细地址</Label>
        <View className='flex'>
          <View>选择作物位置信息</View>
          <Image
            mode='heightFix'
            className='ml-auto mr-1 w-10 h-full'
            src={require('../../../images/res/crop/location-2.svg')}
          />
        </View>
        <Line />
        <Button className='my-8 w-full'>请完善内容</Button>
      </View>
    </Layout>
  );
};

export default observer(PageAddCrop);
