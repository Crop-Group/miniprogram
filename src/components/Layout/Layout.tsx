import { View } from '@tarojs/components';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import cls from 'classnames';
import Taro from '@tarojs/taro';
import { Footer } from '../Footer';
import './index.scss';

interface LayoutProps {
  menuBarElement?: React.ReactNode;
  showBackGround?: boolean;
  showFooter?: boolean;
  itemsCenter?: boolean;
  justifyCenter?: boolean;
}

/**
 * 小程序全局布局，已处理了状态栏的高度与菜单栏的高度
 *
 * 布局为flex且direction为column
 *
 * props如下所示
 *
 * itemsCenter justifyCenter 对应flex的rules
 *
 * showBackGround 对应是否展示渐变的背景
 *
 * showFooter 对应是否显示footer底部栏
 *
 * menuBarElement 是菜单栏的React元素
 *
 */
export default function Layout(props: LayoutProps & PropsWithChildren) {
  const { children, itemsCenter, justifyCenter, menuBarElement, showBackGround, showFooter } = props;

  const statusbarHeight = useMemo(() => {
    const info = Taro.getSystemInfoSync();
    return info.statusBarHeight ?? 0;
  }, []);

  const [pillHeight, setPillHeight] = useState(0);

  const viewClass = cls(
    {
      'items-center': itemsCenter,
      'justify-center': justifyCenter,
    },
    'flex',
    'flex-col',
    'box-border',
  );

  const bodyClass = cls(
    {
      background: showBackGround,
    },
    'flex',
    'flex-col',
    'h-screen',
  );
  useEffect(() => {
    const { top, height } = Taro.getMenuButtonBoundingClientRect();
    const h = (top - statusbarHeight) * 2 + height;
    setPillHeight(h);
  }, [statusbarHeight]);

  return (
    <React.Fragment>
      <View className={bodyClass}>
        <View style={{ paddingTop: `${menuBarElement ? 0 : statusbarHeight}px` }}>
          {menuBarElement && (
            <View
              className='sticky top-0 z-100'
              style={{ height: `${pillHeight + statusbarHeight}px`, paddingTop: `${statusbarHeight}px`, width: '100%' }}
            >
              {menuBarElement}
            </View>
          )}
          <View className={viewClass}>{children}</View>
        </View>
        <View className='mt-auto'>{showFooter && <Footer />}</View>
      </View>
    </React.Fragment>
  );
}
