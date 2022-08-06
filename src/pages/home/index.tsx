import { Component } from 'react';
import { View, Text } from '@tarojs/components';
import './index.scss';
import { Layout } from '../../components/Layout';
import { HomeBackGround } from '../../components/Background';

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <Layout
        itemsCenter
        menuBarElement={<View className='flex justify-center items-center h-full'>发现</View>}
        background={<HomeBackGround />}
        showFooter
      >
        <Text>Hello world!</Text>
      </Layout>
    );
  }
}
