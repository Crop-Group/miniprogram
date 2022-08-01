import { Component } from 'react';
import { View, Text } from '@tarojs/components';
import './index.scss';

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <>
        <View className='background-img' />
        <View className='h-screen flex items-center justify-center'>
          <Text>Hello world!</Text>
        </View>
      </>
    );
  }
}
