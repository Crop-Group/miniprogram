import { View } from '@tarojs/components';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import cls from 'classnames';
import Taro from '@tarojs/taro';
import { Footer } from '../Footer';

interface LayoutProps {
  menuBarElement?: React.ReactNode;
  background?: React.ReactNode;
  showFooter?: boolean;
  showFooterBottom?: boolean;
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
 * showFooter 对应是否显示footer底部栏
 *
 * showFooterBottom 对应是否将footer设置为底部显示
 *
 * menuBarElement 是菜单栏的React元素
 *
 * background 是全屏背景的React元素
 */
export default function Layout(props: LayoutProps & PropsWithChildren) {
  // TODO 页脚Footer是否也集成进来，留一个开关供显式或隐藏
  const { children, itemsCenter, justifyCenter, menuBarElement, background, showFooter, showFooterBottom } = props;

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
    'h-full',
    'box-border',
  );

  useEffect(() => {
    const { top, height } = Taro.getMenuButtonBoundingClientRect();
    const h = (top - statusbarHeight) * 2 + height;
    setPillHeight(h);
  }, [statusbarHeight]);

  return (
    <React.Fragment>
      {background && <View className='fixed -z-1 h-full w-full'>{background}</View>}
      <View style={{ paddingTop: `${menuBarElement ? 0 : statusbarHeight}px` }}>
        {menuBarElement && (
          <View
            className='sticky top-0'
            style={{ height: `${pillHeight + statusbarHeight}px`, paddingTop: `${statusbarHeight}px`, width: '100%' }}
          >
            {menuBarElement}
          </View>
        )}
        <View className={viewClass}>{children}</View>
        {showFooter && <Footer showFooterBottom={showFooterBottom} />}
      </View>
    </React.Fragment>
  );
}
