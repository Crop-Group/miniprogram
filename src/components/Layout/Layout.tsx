import { View } from '@tarojs/components';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import cls from 'classnames';
import Taro from '@tarojs/taro';

interface LayoutProps {
  menuBarElement?: React.ReactNode;
  background?: React.ReactNode;
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
 * menuBarElement 是菜单栏的React元素
 *
 * background 是全屏背景的React元素
 */
export default function Layout(props: LayoutProps & PropsWithChildren) {
  // TODO 页脚Footer是否也集成进来，留一个开关供显式或隐藏
  const { children, itemsCenter, justifyCenter, menuBarElement, background } = props;

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
      <View style={{ paddingTop: `${statusbarHeight + (menuBarElement ? 0 : pillHeight)}px` }}>
        {menuBarElement && <View style={{ height: `${pillHeight}px`, width: '100%' }}>{menuBarElement}</View>}
        <View className={viewClass}>{children}</View>
      </View>
    </React.Fragment>
  );
}
