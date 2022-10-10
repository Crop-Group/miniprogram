import { View, Image, Text, Input, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction, useCallback, useContext, useMemo, useState } from 'react';
import { CropsStoreContext, UserStoreContext } from '../../../../../store/providers';

interface ILogModalProp {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  id: string;
}

const LogModal = (props: ILogModalProp) => {
  const { setShowModal, id } = props;

  const [imgPath, setImgPath] = useState('');
  const [text, setText] = useState('');

  const isValid = useMemo(() => text.length > 0 && imgPath.length > 0, [imgPath, text]);

  // FIXME: this is a lazy-init
  const [buttonDisable, setButtonDisable] = useState(() => !isValid);

  const cropStore = useContext(CropsStoreContext);
  const userStore = useContext(UserStoreContext);

  const addLog = useCallback(async () => {
    try {
      setButtonDisable(true);
      const crop = cropStore.crops.find((v) => v.details._id === id);
      await crop?.addLog(imgPath, text, userStore.userID);
      await Taro.showModal({
        title: '提示',
        content: '添加成功',
        showCancel: false,
      });
    } catch (e) {
      await Taro.showModal({
        title: '提示',
        content: '添加失败，请重新添加',
        showCancel: false,
      });
    } finally {
      setShowModal(false);
      setButtonDisable(false);
    }
  }, [cropStore.crops, id, imgPath, setShowModal, text, userStore.userID]);

  return (
    <View className='fixed top-0 left-0 h-full w-full flex flex-col justify-center items-center z-20 bg-black bg-opacity-50'>
      <View className='bg-white rounded-xl w-8/10 flex flex-col items-center p-12'>
        <View className='flex justify-between w-full'>
          <Text>添加记录</Text>
          <Text
            onClick={() => {
              setShowModal(false);
            }}
          >
            返回
          </Text>
        </View>
        <View
          className='bg-black bg-opacity-10 flex justify-center items-center mt-8'
          style={{ width: '100px', height: '100px' }}
          onClick={async () => {
            const media = await Taro.chooseMedia({
              count: 1,
              mediaType: ['image'],
              sourceType: ['camera'],
            });
            console.log(media);
            setImgPath(media.tempFiles[0].tempFilePath);
          }}
        >
          {imgPath.length !== 0 && <Image src={imgPath} className='w-full h-full' mode='aspectFill'></Image>}
          {imgPath.length === 0 && (
            <View className='text-white' style={{ fontSize: '30pt' }}>
              +
            </View>
          )}
        </View>
        <View
          style={{ backgroundColor: '#f6f7fb', border: '#ededef 1rpx solid' }}
          className='w-full rounded-xl py-6 px-4 my-10'
        >
          <Input placeholder='填写操作记录' onInput={(e) => setText(e.detail.value)}></Input>
        </View>
        <Button
          onClick={() => {
            addLog();
          }}
          className='w-full'
          disabled={buttonDisable}
        >
          {isValid ? '提交' : '请完善信息'}
        </Button>
      </View>
    </View>
  );
};

export default observer(LogModal);
