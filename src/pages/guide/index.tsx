import { View, Text, Swiper, SwiperItem, Label, Image } from '@tarojs/components';
import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Taro from '@tarojs/taro';
import './index.scss';
import { findNearCrops } from '../../utils/index';
import { UserStoreContext } from '../../store/providers';

interface IGuideList {
  index: number;
  title: string;
  logoUrl: string;
  content: string;
}

function Guide() {
  const [currentPage, setCurrentPage] = useState(0);
  const [nextLogoRight, setNextLogoRight] = useState(0);
  const [nextLogoTop, setNextLogoTop] = useState(0);

  const [initStatus, setInitStatus] = useState(false);
  const userStore = useContext(UserStoreContext);
  const handleLogin = async () => {
    await userStore.initWithCrops();
    setInitStatus(true);
  };

  const toNext: () => void = () => {
    const NextPlay = currentPage + 1 > 5 ? 5 : currentPage + 1;
    setCurrentPage(NextPlay);
  };
  const toSkip: () => void = () => {
    setCurrentPage(5);
  };
  const handleChange: (option: any) => void = (option) => {
    setCurrentPage(option.detail.current);
  };

  useEffect(() => {
    const windowInfo = Taro.getWindowInfo();
    setNextLogoRight(windowInfo.screenWidth * 0.1);
    setNextLogoTop(windowInfo.screenHeight * 0.85);
  }, [nextLogoRight]);

  const guideList: Array<IGuideList> = [
    {
      index: 0,
      title: '添加属于你的作物',
      logoUrl: require('../../images/res/guide/guide-1.svg'),
      content: '在「养谷」页右下角点击加号\n填写栽种的作物信息\n即可以完成添加',
    },
    {
      index: 1,
      title: '管理种植过程',
      logoUrl: require('../../images/res/guide/guide-2.svg'),
      content: '添加作物后关键在于记录的管理\n为了产品追溯，需要拍摄作物图片\n请注意记录添加后不可修改',
    },
    {
      index: 2,
      title: '查看作物地图',
      logoUrl: require('../../images/res/guide/guide-3.svg'),
      content: '先前添加的作物会出现在作物地图\n您可以便携查看作物方位\n您也可以查看详情跟好友分享',
    },
    {
      index: 3,
      title: '追溯生产过程',
      logoUrl: require('../../images/res/guide/guide-4.svg'),
      content:
        '作物发布之后全过程的信息被\n收录保存在云端提供追溯\n您可以将生成二维码贴至实物\n也可以直接在微信中分享作物～',
    },
  ];

  return (
    <View className='container h-full'>
      <Swiper autoplay={false} className='h-full' current={currentPage} onChange={handleChange}>
        <SwiperItem>
          <View className='guide'>
            <View className='left-box'>
              <View className='logo-box'>
                <View id='container-logo'>
                  <Image className='logo' src={require('../../images/bin/logo.svg')}></Image>
                </View>
                <View id='container-logo-title'>
                  <Text>羊谷</Text>
                </View>
              </View>
              <View className='intro'>
                <Label style='font-family:PingFangSC-Semibold;font-size:62rpx;color:#010B04;'>新手引导</Label>
                <Label style='font-family:PingFangSC-Semibold;font-size:40rpx;color:#010B04;'>探索数字化栽种过程</Label>
                <Text style='opacity:0.8;font-family:PingFangSC-Regular;font-size:32rpx;color:#010B04;Text-align:justify;width:300rpx;margin-top:10rpx;'>
                  新手引导从这里开始，引导将带你从主体功能入手，熟悉羊谷小程序的功能使用。
                </Text>
              </View>
              <View>
                <View
                  className='startButton flex flex-col justify-center items-center'
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                  }}
                >
                  开启教程
                </View>
              </View>
            </View>
            <View className='right-box'></View>
          </View>
        </SwiperItem>
        {guideList.map((x) => {
          return (
            <SwiperItem>
              <View className='green-box'>
                <View className='main-container'>
                  <View className='logo-circle'>
                    <View className=''>
                      <Image src={x.logoUrl} style='width: 200rpx; height:200rpx'></Image>
                    </View>
                  </View>
                  <View className='guide-content'>
                    <Label className='guide-title'>{x.title}</Label>
                    <Text className='guide-text'>{x.content}</Text>
                  </View>
                </View>
              </View>
            </SwiperItem>
          );
        })}

        <SwiperItem>
          <View className='guide-after'>
            <View className='left-box'></View>
            <View className='right-box'>
              <View className='intro'>
                <Label style='font-family:PingFangSC-Semibold;font-size:62rpx;color:#010B04;'>完成新手教程</Label>
                <Label style='font-family:PingFangSC-Semibold;font-size:40rpx;color:#010B04;'>一起探索数字化进程</Label>
                <Text style='opacity:0.8;font-family:PingFangSC-Regular;font-size:32rpx;color:#010B04;Text-align:justify;width:320rpx;margin-top:10rpx;'>
                  您可以点击初始化作物，我们会为您在云端创建谷物供您体验。如果您已经对羊谷功能了如指掌，则可以直接完成教程。
                </Text>
              </View>
              <View className='button-container'>
                <View
                  className='tapButton flex items-center justify-center'
                  onClick={handleLogin}
                  style={
                    !initStatus ? 'color: white;background-color: #34A853;' : 'color: white;background-color: #c5c5c5;'
                  }
                >
                  {initStatus ? '初始化完毕' : '初始化作物'}
                </View>
                <View
                  className='tapButton mt-4 flex items-center justify-center'
                  onClick={() => {
                    Taro.navigateBack();
                  }}
                  style={
                    initStatus ? 'color: white;background-color: #34A853;' : 'color: white;background-color: #c5c5c5;'
                  }
                >
                  完成教程
                </View>
              </View>
            </View>
          </View>
        </SwiperItem>
      </Swiper>
      <View
        style={
          'right: ' +
          nextLogoRight +
          'px;' +
          'top:' +
          nextLogoTop +
          'px;' +
          'display:' +
          (currentPage > 0 && currentPage < 5 ? 'flex' : 'none')
        }
        className='next-container fixed'
        onClick={toNext}
      >
        <View className='next-background'>
          <Image src={require('../../images/res/guide/next.svg')} style='width: 24px;height: 60px;'></Image>
        </View>
      </View>
      <View
        style={
          'left: ' +
          (nextLogoRight + 10) +
          'px;' +
          'top:' +
          (nextLogoTop + 20) +
          'px;display:' +
          (currentPage > 0 && currentPage < 5 ? 'flex' : 'none')
        }
        className='skip-container fixed'
        onClick={toSkip}
      >
        <View className='skip-title'>跳过</View>
      </View>
    </View>
  );
}

export default observer(Guide);
