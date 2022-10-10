import { Swiper, SwiperItem, Text, View, Image } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { BackNavigate } from '../../../components/BackNavigate';
import { Layout } from '../../../components/Layout';
import { CropsCollectionStoreContext, CropsStoreContext } from '../../../store/providers';
import DetailCard from './components/DetailCard';
import { LogModal } from './components/LogModal';
import './index.scss';

const CropDetail = () => {
  const router = useRouter();

  const cropStore = useContext(CropsStoreContext);
  const collectionStore = useContext(CropsCollectionStoreContext);

  const crop = cropStore.crops.find((v) => v.details._id === router.params.id);

  const [currentIndex, setCurrentIndex] = useState(1);

  // 各种Modal与友好提示
  const [showModal, setShowModal] = useState(false);

  const showActionList = async () => {
    try {
      const isInCollection = await collectionStore.include(crop!.details._id); // TODO more graceful?
      const itemList =
        crop!.details.status === '种植中'
          ? ['添加记录', '删除作物', '标记完成', `${isInCollection ? '取消' : '加入'}收藏`]
          : ['删除作物', `${isInCollection ? '取消' : '加入'}收藏`];
      const { tapIndex } = await Taro.showActionSheet({
        itemList,
      });

      console.log(itemList[tapIndex]);

      switch (itemList[tapIndex]) {
        case '添加记录': {
          setShowModal(true);
          break;
        }
        case '删除作物': {
          const res = await Taro.showModal({
            title: '是否删除该作物',
            content: '该操作不可撤回',
          });
          if (res.confirm) {
            await cropStore.delete(crop!.details._id);
            await Taro.showToast({
              title: '删除成功',
            });
          }
          break;
        }
        case '标记完成': {
          const res = await Taro.showModal({
            title: '是否标记完成',
            content: '该操作操作不可撤回',
          });
          if (res.confirm) {
            await crop!.markAsFinish(crop!.details._id);
            await Taro.showToast({
              title: '标记成功',
            });
          }
          break;
        }
        case '取消收藏': {
          await collectionStore.remove(crop!.details._id);
          Taro.showToast({
            title: '取消收藏成功',
          });
          break;
        }
        case '加入收藏': {
          await collectionStore.add(crop!.details._id);
          Taro.showToast({
            title: '收藏成功',
          });
          break;
        }
      }
    } catch (e) {
      console.log('Failed on showActionSheet, reason', e);
    }
  };

  const showMap = () => {
    const coordinates = crop?.details.location.geo.coordinates;
    if (coordinates) {
      Taro.openLocation({
        longitude: coordinates[0],
        latitude: coordinates[1],
      });
    }
  };

  if (crop === undefined) {
    return (
      <Layout justifyCenter itemsCenter showFooter menuBarElement={<BackNavigate></BackNavigate>}>
        <Text>没有找到稻谷</Text>
        <Text>请点击左上角返回</Text>
      </Layout>
    );
  }

  return (
    <Layout showFooter menuBarElement={<BackNavigate title='详情'></BackNavigate>}>
      {showModal && <LogModal id={router.params.id as string} setShowModal={setShowModal} />}

      {/* 图片 */}
      <View className='banner-img relative'>
        <Swiper className='h-full' onChange={(e) => setCurrentIndex(e.detail.current + 1)}>
          {crop.details.logs.map((v, i) => (
            <SwiperItem key={i}>
              <View className='w-full h-full'>
                <Image className='w-full h-full' mode='aspectFill' src={v.imgUrl}></Image>
              </View>
            </SwiperItem>
          ))}
        </Swiper>
        <View
          className='absolute bottom-4 left-4 z-10 rounded-3xl text-white px-4 opacity-40 bg-black'
          style={{ fontWeight: '200' }}
        >
          {`${currentIndex}/${crop.details.logs.length}`}
        </View>
      </View>

      <View className='mx-6 mt-6'>
        {/* 大体信息 */}
        <View className='relative mb-6'>
          {/* 信息 */}
          <View>
            <View style={{ fontWeight: '600', fontSize: '21px' }}>{crop.details.name}</View>
            <View className='rounded-md border-black'>{crop.details.category}</View>
            <View>
              {dayjs(crop.details.startTime).format('YYYY.MM.DD')}-{dayjs(crop.details.endTime).format('YYYY.MM.DD')}
            </View>
            <View
              className='flex'
              style={{ fontSize: '10pt' }}
              onClick={() => {
                showMap();
              }}
            >
              {/*FIXME>对齐</FIXME> */}
              <Image className='w-8' src={require('../../../images/res/crop/location-1-default.svg')} mode='widthFix' />
              <View className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
                {crop.details.location.detail}
              </View>
              <View className='flex-shrink-0' style={{ color: '#13227a' }}>
                地图/导航
              </View>
            </View>
          </View>

          {/* logo */}
          <View
            className='icon-tool bg-white absolute -right-6 -top-6 rounded-full h-28 w-28 flex justify-center items-center transform -translate-y-1/2 -translate-x-1/4'
            onClick={showActionList}
          >
            <Image src={require('../../../images/res/crop/tools.svg')} className='w-1/2' mode='widthFix' />
          </View>
        </View>

        {/* 时间线 */}
        {crop.details.logs.map((log, i) => (
          <DetailCard log={log} key={i} />
        ))}
      </View>
    </Layout>
  );
};

export default observer(CropDetail);
