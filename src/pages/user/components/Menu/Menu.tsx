import { View, Image, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './Menu.scss';
import AboutLogo from '../../../../images/res/user/menu/about.svg';
import CollectionLogo from '../../../../images/res/user/menu/collection.svg';
import CropLogo from '../../../../images/res/user/menu/crop.svg';
import GuideLogo from '../../../../images/res/user/menu/guide.svg';
import ScanLogo from '../../../../images/res/user/menu/scan.svg';

interface ItemConfig {
  logo: string;
  title: string;
  navigateType: 'pages' | 'tabbar' | 'scan';
  pagePath?: string;
  description?: string;
}

/**
 * 用户页菜单
 *
 * ItemConfig 内置5个参数
 *
 * logo string required 图标路径模块
 *
 * title string requried 菜单标题
 *
 * navigateType 'pages' | 'tabbar' | 'scan' requried 跳转类型: 页面间跳转 ｜ tabBar跳转 ｜ 扫码
 *
 * pagePath string optional 页面路径
 *
 * description string optional 右侧功能描述
 *
 */
export default function UserInfo() {
  const jumpToPages = (item: ItemConfig) => {
    if (item.navigateType === 'pages') {
      Taro.navigateTo({
        url: item.pagePath ?? '',
      });
    }
    if (item.navigateType === 'tabbar') {
      Taro.switchTab({
        url: item.pagePath ?? '',
      });
    }
  };
  const MenuItem: Array<ItemConfig> = [
    {
      logo: CropLogo,
      title: '查看作物',
      navigateType: 'tabbar',
      pagePath: '/pages/crop/index',
    },
    {
      logo: CollectionLogo,
      title: '我的收藏',
      navigateType: 'pages',
    },
    {
      logo: ScanLogo,
      title: '扫码溯源',
      description: '追溯作物源头',
      navigateType: 'scan',
    },
    {
      logo: AboutLogo,
      title: '关于羊谷',
      navigateType: 'pages',
      pagePath: '/pages/user/about/index',
    },
    {
      logo: GuideLogo,
      title: '新手引导',
      navigateType: 'pages',
      pagePath: '/pages/guide/index',
    },
  ];
  return (
    <View className='flex flex-col items-start w-full my-8 bg-white'>
      {MenuItem.map((x, idx) => {
        return (
          <>
            <View
              className='flex flex-row items-center w-full justify-between menu-item'
              onClick={() => jumpToPages(x)}
            >
              {/* 左盒子 */}
              <View className='flex justify-center ml-10'>
                <Image className='h-10 w-10 mr-6' src={x.logo}></Image>
                <Text className='leading-10 align-middle'>{x.title}</Text>
              </View>
              {/* 右盒子 */}
              <View className='flex flex-row justify-center mr-4'>
                <Text className='menu-description flex flex-col justify-center'>{x.description}</Text>
                <Text className='next"'>{'>'}</Text>
              </View>
            </View>
            {idx < MenuItem.length - 1 ? <View className='hr w-full' style='height: 1px'></View> : ''}
          </>
        );
      })}
    </View>
  );
}
