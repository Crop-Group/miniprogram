import Taro, { usePageScroll } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useState, useContext, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { UserStoreContext } from '../../store/providers';
import './index.scss';
import { getNews } from '../../utils/index';
import { HomeImage } from './components/HomeImage/index';
import { MyCrops } from './components/MyCrops/index';
import { News } from './components/News/index';

const LogoBar = (props) => {
  const { barOpacity } = props;
  const bgColorStyle = `background: rgb(255, 255, 255, ${barOpacity})`;
  return (
    <View className='flex flex-row justify-start items-end h-full'>
      <View className='absolute h-full -z-1 h-full w-full' style={bgColorStyle}></View>
      <View className='flex flex-row items-center ml-12'>
        <Image className='header-logo mb-6' src={require('../../images/bin/logo.svg')} />
        <Text className='text-primary text-logo font-bold mb-3'>羊谷</Text>
      </View>
    </View>
  );
};

function Home() {
  const [userInfo, setUserInfo] = useState({
    nickName: '点击一键登录',
    avatarUrl:
      'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    userID: '畅享数字化生产工具',
  });
  const [newsList, setNewsList] = useState([]);
  const userStore = useContext(UserStoreContext);
  const [barOpacity, setBarOpacity] = useState(0);

  const updateNews = async () => {
    const news = await getNews();
    setNewsList(news.result);
  };

  useEffect(() => {
    if (userStore.isLogin) {
      console.log('homePage:', '已经登录');
      setUserInfo({
        nickName: userStore.nickName,
        avatarUrl: userStore.avatarUrl,
        userID: userStore.userID,
      });
    }
    updateNews();
  }, [userStore.isLogin]);

  usePageScroll((res) => {
    const opacity = res.scrollTop / 200;
    setBarOpacity(opacity);
  });

  return (
    <Layout itemsCenter menuBarElement={<LogoBar barOpacity={barOpacity} />} showBackGround showFooter enableScroll>
      <View className='w-full justify-between mt-16 flex flex-row items-center'>
        <View className='flex flex-col'>
          <Text className='text-title font-bold ml-12'>数字化生产</Text>
          <Text className='text-title font-bold ml-12'>全生命溯源工具</Text>
        </View>
        <View
          className='bg-secondary rounded-l-4xl py-2 px-4 flex flex-row justify-center items-center'
          onClick={() => {
            Taro.navigateTo({
              url: '/pages/guide/index',
            });
          }}
        >
          <Image className='w-12 h-12' src={require('../../images/res/index/book.svg')}></Image>
          <Text className='text-white font-bold text-2xl'>新手引导</Text>
        </View>
      </View>
      <View
        className='flex flex-row w-full justify-start mt-10 items-center'
        onClick={() => {
          if (!userStore.isLogin) {
            console.log('click login');
            userStore.login();
          }
        }}
      >
        <View className='ml-12'>
          <Image
            className='w-30 h-30 rounded-full border-white border-solid border-4'
            mode='aspectFill'
            src={userInfo.avatarUrl}
          ></Image>
        </View>
        <View className='flex flex-col ml-8'>
          <Text className='font-bold text-3xl'>{userInfo.nickName}</Text>
          <Text className='text-2xl opacity-50 mt-2'>{userInfo.userID}</Text>
        </View>
      </View>
      <HomeImage
        homeImage={newsList.length ? newsList[0].background_image : undefined}
        storyDescription={newsList.length ? newsList[0].description : undefined}
        _id={newsList.length ? newsList[0]._id : undefined}
      />
      <MyCrops />
      <News newsList={newsList} />
    </Layout>
  );
}

export default observer(Home);
