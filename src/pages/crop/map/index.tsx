import Taro from '@tarojs/taro';
import { Map, View, Image, Text, MapProps } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { BackNavigate } from '../../../components/BackNavigate';
import { CropsStoreContext } from '../../../store/providers';
import { Layout } from '../../../components/Layout';

const iconPath = '/images/res/crop/map-icon.png';

const CropMap = () => {
  const cropsStore = useContext(CropsStoreContext);
  const [current, setCurrent] = useState<number>(0);
  const [markers, setMarkers] = useState<MapProps.marker[] | undefined>(undefined);

  const [latitude, setLatitude] = useState<number>(0); // TODO set a default location
  const [longitude, setLongitude] = useState<number>(0);

  useEffect(() => {
    // 1. get all crop from store
    const crops = cropsStore.crops;
    console.log(crops.length);
    if (crops.length === 0) {
      return;
    }
    // 2. if there is any crop, make map centralized to the location of the most recent crop
    const first = crops[0];
    setLongitude(first.details.location.geo.coordinates[0]);
    setLatitude(first.details.location.geo.coordinates[1]);
    setCurrent(0);
    console.log(first.details.location.geo.coordinates.toString());
    // 3. mark any other crops in the map
    const m: MapProps.marker[] = crops.map((c, i) => ({
      id: i,
      longitude: c.details.location.geo.coordinates[0],
      latitude: c.details.location.geo.coordinates[1],
      width: 23,
      height: 18,
      iconPath,
    }));
    setMarkers(m);
  }, [cropsStore.crops]);

  return (
    <Layout menuBarElement={<BackNavigate title='详情'></BackNavigate>} itemsCenter>
      <Map
        className='absolute h-full w-full'
        latitude={latitude}
        longitude={longitude}
        markers={markers}
        onMarkerTap={(e) => {
          setCurrent(Number(e.detail.markerId));
        }}
      />
      {cropsStore.crops.length > 0 && (
        <View
          className='absolute bottom-8 min-h-88 w-9/10 bg-white rounded-2xl shadow-2xl flex'
          onClick={() => {
            Taro.navigateTo({
              url: `/pages/crop/detail/index?id=${cropsStore.crops[current].details._id}`,
            });
          }}
        >
          <View className='rounded-2xl w-1/3 h-full flex justify-center items-center self-center m-4'>
            <Image
              className='h-full rounded-2xl'
              src={cropsStore.crops[current].details.logs[0].imgUrl}
              mode='widthFix'
            ></Image>
          </View>
          <View className='flex flex-col flex-grow mx-4 my-8'>
            <Text className='font-medium'>{cropsStore.crops[current].details.name}</Text>
            <Text style={{ color: '#AC8616' }}>{`${dayjs(cropsStore.crops[current].details.startTime).format(
              'YYYY.MM.DD',
            )}-${dayjs(cropsStore.crops[current].details.endTime).format('YYYY.MM.DD')}`}</Text>
            <View>
              <Image
                className='h-8 inline-block mr-2 align-middle'
                mode='heightFix'
                src={require('../../../images/res/crop/location-2.svg')}
              />
              <Text className='opacity-60 inline' style={{ fontSize: '14px' }}>
                {cropsStore.crops[current].details.location.detail}
              </Text>
            </View>
            <View
              className='border self-start px-2 py-1 text-xl border-solid rounded-md border-1'
              style={{ color: '#AC8616' }}
            >
              {cropsStore.crops[current].details.category}
            </View>
            <View
              className='ml-auto mt-auto'
              style={{
                color: cropsStore.crops[current].details.status === '已完成' ? 'green' : 'red',
              }}
            >
              {cropsStore.crops[current].details.status}
            </View>
          </View>
        </View>
      )}
    </Layout>
  );
};

export default observer(CropMap);
