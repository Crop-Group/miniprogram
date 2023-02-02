import { Progress, View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { observer } from 'mobx-react-lite';
import { Crop } from '../../../../store/crops';
import './CropCard.scss';

dayjs.extend(duration);

interface ICropCardProp {
  crop: Crop;
}

// onClick to navigate.

const CropCard = ({ crop }: ICropCardProp) => {
  const dateStart = dayjs(crop.details.startTime);
  const dateEnd = dayjs(crop.details.endTime);
  const dateCurrent = dayjs();
  const currentToEndDuration = dayjs.duration(dateEnd.diff(dateCurrent)); // if < 0?

  let percent = 100 * (dateCurrent.diff(dateStart) / dateEnd.diff(dateStart));
  percent = percent > 100 || crop.details.status === '已完成' ? 100 : percent;

  return (
    <View className='mx-1/20 w-9/10 my-4'>
      {/* 谷物图片 */}
      <View>
        <View className='w-24 h-24 ml-4 transform translate-y-4'>
          <Image src={crop.details.logs[0].imgUrl} className='rounded-full h-full w-full' mode='aspectFill' />
        </View>
      </View>
      <View className='card flex'>
        {/* Main */}
        <View
          className='flex flex-col flex-grow mx-4 my-auto pt-6 pb-6'
          onClick={() => {
            console.log('Main clicked');
            Taro.navigateTo({ url: `/pages/crop/detail/index?id=${crop.details._id}` });
          }}
        >
          {/* 三个时间 */}
          <View className='flex justify-between'>
            {/* 开始时间 */}
            <View>
              <View className='year-text opacity-40'>{dateStart.year()}</View>
              <View className='month-day-text'>{dateStart.format('MM-DD')}</View>
            </View>
            {/* 剩余时间 */}
            <View className='flex items-center'>
              <Image src={require('../../../../images/res/crop/clock.svg')} className='h-1/3 mr-2' mode='heightFix' />
              <Text className='remaining-day-text opacity-40'>
                {currentToEndDuration.days() < 0 || currentToEndDuration.months() < 0 // more graceful approach?
                  ? '剩00月00天'
                  : currentToEndDuration.format('剩MM月DD天')}
              </Text>
            </View>
            {/* 结束时间 */}
            <View>
              <View className='year-text opacity-40'>{dateEnd.year()}</View>
              <View className='month-day-text'>{dateEnd.format('MM-DD')}</View>
            </View>
          </View>
          {/* 进度条 */}
          <View className='py-1'>
            <Progress strokeWidth={4} percent={percent} duration={10} activeColor={percent >= 100 ? 'green' : 'red'} />
          </View>
          {/* 左名字 右状态*/}
          <View className='flex justify-between opacity-60'>
            {/* 名字 */}
            <View>{crop.details.name}</View>
            {/* 状态 */}
            <View style={{ color: `${percent >= 100 ? 'green' : 'black'}` }}>{crop.details.status}</View>
          </View>
        </View>
        {/* QR Code */}
        <View
          className='qr-code-card flex-shrink-0 w-1/10 flex items-center justify-center'
          style={{ backgroundColor: '#f1f1f1' }}
          onClick={() => {
            console.log('QR Code icon clicked');
            Taro.navigateTo({ url: `/pages/crop/qrcode/index?id=${crop.details._id}` });
          }}
        >
          <View className='w-1/2'>
            <Image src={require('../../../../images/res/crop/qr-code.svg')} mode='widthFix' className='w-full' />
          </View>
        </View>
      </View>
    </View>
  );
};

export default observer(CropCard);
