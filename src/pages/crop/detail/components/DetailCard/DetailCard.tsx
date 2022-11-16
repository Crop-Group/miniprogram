import { View, Image } from '@tarojs/components';
import React from 'react';
import { observer } from 'mobx-react-lite';
import dayjs from 'dayjs';
import Taro from '@tarojs/taro';

interface IProps {
  log: {
    detail: string;
    imgUrl: string;
    time: string;
  };
}

const DetailCard = ({ log }: IProps) => {
  const t = dayjs(log.time);

  return (
    <React.Fragment>
      <View className='flex items-center'>
        <View className='mr-4' style={{ fontSize: '24px', fontWeight: 'bold' }}>
          {t.format('HH:mm')}
        </View>
        <View className='card flex flex-1 p-4 rounded-xl'>
          <View className='flex-1'>
            <View>{log.detail}</View>
            <View>{t.format('YYYY.MM.DD HH:mm')}</View>
          </View>
          <View
            className='w-10 flex items-center'
            onClick={() => {
              Taro.previewImage({
                current: log.imgUrl,
                urls: [log.imgUrl],
              });
            }}
          >
            <Image src={require('../../../../../images/res/crop/image.svg')} mode='widthFix' className='w-full' />
          </View>
        </View>
      </View>
      <View className='underline m-6'></View>
    </React.Fragment>
  );
};

export default observer(DetailCard);
