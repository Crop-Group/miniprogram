import { View, Text, Image } from '@tarojs/components';
import cls from 'classnames';
import './Footer.scss';
import GreyLogo from '../../images/bin/logo-grey.svg';

interface FooterConfig {
  showFooterBottom?: boolean;
}

/**
 * 底部LOGO简介栏
 *
 * 布局为flex且居中
 *
 * 独占一整行
 *
 * props如下
 *
 * showFooterBottom 底部显示标签 position: fixed
 */
export default function Footer(props: FooterConfig) {
  const { showFooterBottom } = props;
  const FooterClass = cls(
    {
      fixed: showFooterBottom,
      'bottom-6': showFooterBottom,
      'w-full': showFooterBottom,
    },
    'flex',
    'flex-col',
    'mb-4',
    'items-center',
    'justify-center',
  );

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
