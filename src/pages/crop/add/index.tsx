import { View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { Layout } from '../../../components/Layout';
import { HomeBackGround } from '../../../components/Background';

const PageAddCrop = () => {
  return (
    <Layout background={<HomeBackGround />} showFooter>
      <View>This page can help you add crops</View>
    </Layout>
  );
};

export default observer(PageAddCrop);
