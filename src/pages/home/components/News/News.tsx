import dayjs from 'dayjs';
import { View, Text } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import './index.scss';
import { PartHeader } from '../PartHeader/index';

const Item = (props) => {
  const { title, category, _createTime, _id, index, len } = props;
  const publishTime = dayjs(_createTime).format('YYYY-MM-DD');
  const colorSet = ['#0091FF', '#6D609C', '#C53E3E', '#6D7278', '#44D7B6', '#B620E0'];
  return (
    <View
      style='width: 92%'
      onClick={() => {
        console.log(_id);
      }}
    >
      <Text className='font-bold text-3xl mt-4'>{title}</Text>
      <View className='flex flex-row mt-2'>
        <View className='w-18 flex justify-center items-center' style={'background: ' + colorSet[index]}>
          <Text className='text-white text-2xl'>{category}</Text>
        </View>
        <Text className='px-3 text-2xl opacity-60'>{publishTime}</Text>
      </View>
      {index !== len - 1 && <View className='hr mt-4 mb-4'></View>}
    </View>
  );
};
const News = (props) => {
  const { newsList } = props;
  return (
    <View>
      <PartHeader title='封面故事' tabColor='#f38a11'></PartHeader>
      <View className='ml-14'>
        {newsList.map(({ title, category, _createTime, _id }, index) => {
          console.log(newsList);
          return (
            <Item
              title={title}
              category={category}
              _createTime={_createTime}
              index={index}
              len={newsList.length}
              _id={_id}
            ></Item>
          );
        })}
      </View>
    </View>
  );
};

export default observer(News);
