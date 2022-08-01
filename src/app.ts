import 'windi.css';
import Taro from '@tarojs/taro';
import { Component } from 'react';
import './app.scss';

class App extends Component {
  componentDidMount() {
    // if (process.env.TARO_ENV === 'weapp') {
    Taro.cloud.init(); // 暂时考虑只适配微信小程序
    // }
  }

  componentDidShow() {}

  componentDidHide() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
