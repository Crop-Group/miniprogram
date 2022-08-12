import { View, Text, Image } from '@tarojs/components';
import cls from 'classnames';
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
  const FooterClass = cls('w-full', 'flex', 'flex-col', 'mb-4', 'items-center', 'justify-center');

  return (
    <View className={FooterClass}>
      <View className='flex flex-row justify-center items-center'>
        <Image className='logo-grey' src={GreyLogo} />
        <Text className='logo-text'>羊谷</Text>
      </View>
      <Text className='footer-text'>数字化生产溯源工具</Text>
    </View>
  );
}
