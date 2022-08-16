import 'windi.css';
import Taro from '@tarojs/taro';
import { Component, PropsWithChildren } from 'react';
import './app.scss';
import {
  CropsCollectionStoreContext,
  cropsCollectionStore,
  cropsStore,
  CropsStoreContext,
  userStore,
  UserStoreContext,
} from './store/providers';

class App extends Component<PropsWithChildren> {
  componentDidMount() {
    // if (process.env.TARO_ENV === 'weapp') {
    Taro.cloud.init(); // 暂时考虑只适配微信小程序
    // }
  }

  componentDidShow() {}

  componentDidHide() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return (
      // 注入全局store
      <CropsStoreContext.Provider value={cropsStore}>
        <CropsCollectionStoreContext.Provider value={cropsCollectionStore}>
          <UserStoreContext.Provider value={userStore}>{this.props.children}</UserStoreContext.Provider>
        </CropsCollectionStoreContext.Provider>
      </CropsStoreContext.Provider>
    );
  }
}

export default App;
