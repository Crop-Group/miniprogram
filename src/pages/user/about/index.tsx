import Taro, { useShareAppMessage } from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';
import { Layout } from '../../../components/Layout';
import { HomeBackGround } from '../../../components/Background';
import Logo from '../../../images/bin/logo.svg';
import ContactLogo from '../../../images/res/user/about/contact.svg';
import ShareLogo from '../../../images/res/user/about/share.svg';
import { BackNavigate } from '../../../components/BackNavigate';
import './index.scss';

export default function About() {
  useShareAppMessage((_) => {
    return {
      title: '羊谷，数字化生产全生命溯源工具。',
      path: '/pages/home/index',
    };
  });
  return (
    <Layout menuBarElement={<BackNavigate darkMode />} background={<HomeBackGround />}>
      <view className='logo-box bg-white rounded-full flex flex-col items-center justify-center ml-20 mt-20'>
        <Image className='logo' src={Logo}></Image>
      </view>
      <View className='title ml-20 flex flex-col'>
        <Text>生产全链路溯源</Text>
        <Text>
          并致力于<Text style='color: #34A853'>推动数字化农业</Text>
        </Text>
      </View>
      <Text className='description ml-20'>
        羊谷是一款用于记录农产品生产过程的小程序，依托微信小程序平台，实现农业生产场景全程可追溯，连接人与自然，打造农业生产数字信息化的生态，通过云开发等工程技术，赋能种植、生产及追溯全过程。
      </Text>
      <View className='mt-4 ml-20 flex flex-row'>
        <Button className='logo-contact' openType='contact'>
          <Image src={ContactLogo} style='width: 60%; height: 60%'></Image>
        </Button>
        <Button className='logo-share' openType='share'>
          <Image src={ShareLogo} style='width: 60%; height: 60%'></Image>
        </Button>
      </View>
      <View
        className='footer'
        onClick={() => {
          Taro.navigateTo({
            url: '/pages/user/about/contract/index',
          });
        }}
      >
        隐私协议
      </View>
    </Layout>
  );
}
