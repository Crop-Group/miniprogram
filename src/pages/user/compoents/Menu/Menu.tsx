import { View, Image, Text } from '@tarojs/components';
import './Menu.scss';
import AboutLogo from '../../../../images/res/user/menu/about.svg';
import CollectionLogo from '../../../../images/res/user/menu/collection.svg';
import CropLogo from '../../../../images/res/user/menu/crop.svg';
import GuideLogo from '../../../../images/res/user/menu/guide.svg';
import ScanLogo from '../../../../images/res/user/menu/scan.svg';
import { Menu } from '.';

interface ItemConfig {
  logo: string;
  title: string;
  description?: string;
}

/**
 * 用户页菜单
 */
export default function UserInfo() {
  const MenuItem: Array<ItemConfig> = [
    {
      logo: CropLogo,
      title: '查看作物',
    },
    {
      logo: CollectionLogo,
      title: '我的收藏',
    },
    {
      logo: ScanLogo,
      title: '扫码溯源',
      description: '追溯作物源头',
    },
    {
      logo: AboutLogo,
      title: '关于羊谷',
    },
    {
      logo: GuideLogo,
      title: '新手引导',
    },
  ];
  return (
    <View className='flex flex-col items-start w-full my-8 bg-white'>
      {MenuItem.map((x, idx) => {
        return (
          <>
            <View className='flex flex-row items-center w-full justify-between menu-item'>
              {/* 左盒子 */}
              <View className='flex justify-center ml-10'>
                <Image className='logo-menu mr-6' src={x.logo}></Image>
                {x.title}
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
