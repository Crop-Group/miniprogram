import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './BackNavigate.scss';

interface BackNavigateConfig {
  title?: string;
  darkMode?: boolean;
}

/**
 * 顶部返回导航
 *
 * props如下所示
 *
 * title optional 导航标题
 *
 * title required 黑夜模式 打开则标题栏白色 否则为黑色
 */
export default function BackNavigate(props: BackNavigateConfig) {
  const { title, darkMode } = props;
  const navigateBack = () => {
    let currentPages = Taro.getCurrentPages();
    if (currentPages.length >= 2) {
      Taro.navigateBack();
    } else {
      Taro.switchTab({
        url: '/pages/home/index',
      });
    }
  };
  return (
    <View className='flex flex-row justify-between' style={{ color: darkMode ? 'white' : 'black' }}>
      <View className='logo-back flex items-end h-full justify-center' onClick={() => navigateBack()}>
        {'<'}
      </View>
      <View className='title-navigate'>{title}</View>
      <View className='blank'></View>
    </View>
  );
}
