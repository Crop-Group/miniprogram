export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/crop/index',
    'pages/crop/detail/index',
    'pages/crop/qrcode/index',
    'pages/crop/map/index',
    'pages/user/index',
    'pages/guide/index',
    'pages/user/about/index',
    'pages/user/about/contract/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom',
  },
  permission: {
    'scope.userLocation': {
      desc: '小程序需要获取你的实时位置',
    },
    'scope.userFuzzyLocation': {
      desc: '小程序需要获取你的位置',
    },
  },
  requiredPrivateInfos: ['chooseLocation', 'getFuzzyLocation'],
  tabBar: {
    selectedColor: '#34A853',
    borderStyle: 'white',
    list: [
      {
        text: '发现',
        pagePath: 'pages/home/index',
        iconPath: 'images/tabBar/product-before.png',
        selectedIconPath: 'images/tabBar/product-after.png',
      },
      {
        text: '养谷',
        pagePath: 'pages/crop/index',
        iconPath: 'images/tabBar/seedling-before.png',
        selectedIconPath: 'images/tabBar/seedling-after.png',
      },
      {
        text: '我的',
        pagePath: 'pages/user/index',
        iconPath: 'images/tabBar/user-before.png',
        selectedIconPath: 'images/tabBar/user-after.png',
      },
    ],
  },
});
