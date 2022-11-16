import { useContext, useState } from 'react';
import { View, Image, Input, Picker, Label, Button, Text } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import dayjs from 'dayjs';
import Taro from '@tarojs/taro';
import { Layout } from '../../../components/Layout';
import { CropsStoreContext, UserStoreContext } from '../../../store/providers';
import Line from './Line';
import { BackNavigate } from '../../../components/BackNavigate';

const CATEGORY = ['谷类作物', '豆类作物', '薯类作物', '糖料作物', '饮料作物', '植物性作物', '蔬菜', '其他'];

const PageAddCrop = () => {
  const cropsStore = useContext(CropsStoreContext);
  const userStore = useContext(UserStoreContext);

  const [imgPath, setImgPath] = useState<string | undefined>();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [name, setName] = useState<string>('');
  const [dateStart] = useState(dayjs().format('YYYY-MM-DD'));
  const [dateEnd, setDateEnd] = useState(dayjs().format('YYYY-MM-DD'));
  const [enabled, setEnabled] = useState<boolean>(true);
  const [location, setLocation] = useState<undefined | Taro.chooseLocation.SuccessCallbackResult>(undefined);

  const isValid = imgPath && name && location;

  const handleAdd = async () => {
    if (location === undefined) {
      return;
    }
    try {
      setEnabled(false);
      await cropsStore.add(
        name,
        userStore.userID, // TODO category missing...
        imgPath!,
        dateEnd,
        Number(location.latitude),
        Number(location.longitude),
        location?.address,
      );
      await Taro.showToast({
        title: '添加成功',
        icon: 'error',
      });
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(0);
        }, 1000);
      });
      Taro.navigateBack();
    } catch (e) {
      await Taro.showToast({
        title: '添加失败，请稍后重试',
        icon: 'error',
      });
    } finally {
      setEnabled(true);
    }
  };

  return (
    <Layout showBackGround menuBarElement={<BackNavigate title='添加作物'></BackNavigate>} itemsCenter>
      <View
        className='w-9/10 m-2 h-64 flex justify-center items-center bg-gray-400 rounded-xl shadow-xl'
        style={{ height: '390rpx', opacity: imgPath ? '1' : '0.6' }}
        onClick={async () => {
          const result = await Taro.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['camera'],
          });
          console.log(result.tempFiles);
          setImgPath(result.tempFiles[0].path);
        }}
      >
        {!imgPath && <View className='text-white'>点击上传图片</View>}
        {imgPath && <Image className='h-full w-full rounded-xl' mode='aspectFill' src={imgPath} />}
      </View>
      <View className='shadow-xl shadow-gray-400 w-9/10 flex-grow flex flex-col mt-6 rounded-3xl p-8'>
        <Label className='font-medium mb-4'>名称</Label>
        <Input
          type='text'
          placeholder='填写作物名称'
          onInput={(e) => {
            setName(e.detail.value);
          }}
        >
          {name}
        </Input>
        <Line />
        <Label className='font-medium mb-4'>作物类别</Label>
        <Picker
          range={CATEGORY}
          value={categoryIndex}
          onChange={(e) => {
            console.log(e.detail.value);
            setCategoryIndex(Number(e.detail.value));
          }}
        >
          {CATEGORY[categoryIndex]}
        </Picker>
        <Line />
        <View className='flex justify-between'>
          <View className='flex flex-col flex-grow mr-4'>
            <Label className='font-medium mb-4'>栽种时间</Label>
            <View className='flex'>
              <Picker
                disabled
                value={dateStart}
                start={dateStart}
                mode='date'
                onChange={() => {}}
                onClick={() => {
                  Taro.showToast({
                    title: '栽种日期不可修改',
                    icon: 'error',
                  });
                }}
              >
                {dateStart}
              </Picker>
              <Text className='ml-auto mr-auto'>{'>'}</Text>
            </View>
            <Line />
          </View>
          <View className='flex flex-col flex-grow'>
            <Label className='font-medium mb-4'>收成时间</Label>
            <View className='flex'>
              <Picker
                value={dateEnd}
                start={dateEnd}
                mode='date'
                onChange={(e) => {
                  console.log(e.detail.value);
                  setDateEnd(e.detail.value);
                }}
              >
                {dateEnd}
              </Picker>
              <Text className='ml-auto mr-auto'>{'>'}</Text>
            </View>
            <Line />
          </View>
        </View>
        <Label className='font-medium mb-4'>详细地址</Label>
        <View
          className='flex opacity-60'
          onClick={async () => {
            const result = await Taro.chooseLocation({});
            console.log('Choose location', result.address);
            setLocation(result);
          }}
        >
          <View>{location ? location.address : '选择作物位置信息'}</View>
          <Image
            mode='heightFix'
            className='ml-auto mr-1 w-10 h-full'
            src={require('../../../images/res/crop/location-2.svg')}
          />
        </View>
        <Line />
        <Button disabled={!(isValid && enabled)} className='my-8 w-full' onClick={handleAdd}>
          添加
        </Button>
      </View>
    </Layout>
  );
};

export default observer(PageAddCrop);
