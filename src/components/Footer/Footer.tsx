import { View, Text, Image } from '@tarojs/components';
import './Footer.scss';
import GreyLogo from '../../images/bin/logo-grey.svg';

/**
 * 底部LOGO简介栏
 *
 * 布局为flex且居中
 *
 * 独占一整行
 */
export default function Footer() {
  return (
    <View className='flex flex-col items-center justify-center mt-4 mb-4'>
      <View className='flex flex-row'>
        <Image style='width: 24px;height: 24px;' src={GreyLogo} />
        <Text className='logo-text'>羊谷</Text>
      </View>
      <Text className='footer-text'>数字化生产溯源工具</Text>
    </View>
  );
}
