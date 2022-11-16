import { useLoad, usePageScroll, useRouter, useShareAppMessage } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Article as ArticleType } from 'types/functions';
import { observer } from 'mobx-react-lite';
import { View, Text, Image, RichText } from '@tarojs/components';
import { Layout } from '../../components/Layout';
import { getNews } from '../../utils/index';
import { BackNavigate } from '../../components/BackNavigate';

const Article = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [opacity, setBarOpacity] = useState(0);
  const [article, setArticle] = useState<ArticleType>({
    _id: '',
    category: '',
    content: '',
    description: '',
    imgUrl: '',
    index: 0,
    _createTime: new Date(),
    title: '',
    background_image: '',
  });
  usePageScroll((res) => {
    const _opacity = res.scrollTop / 600;
    setBarOpacity(_opacity);
  });
  useShareAppMessage((_) => {
    return {
      title: title,
      path: '/pages/article/index?_id=' + id,
    };
  });
  const updateNews = async (_id: string) => {
    const news = await getNews();
    setId(_id);
    news.result.map((v, idx) => {
      if (v._id === _id) {
        v.index = idx;
        v.content = v.content.replace(/<img/g, `<img style="max-width:100%;"`);
        v.publishTime = dayjs(v._createTime).format('YYYY-MM-DD HH:mm');
        setTitle(v.title);
        setArticle(v);
      }
      return v._id === _id;
    });
  };
  const colorSet = ['#0091FF', '#6D609C', '#C53E3E', '#6D7278', '#44D7B6', '#B620E0'];
  const router = useRouter();
  useEffect(() => {
    setId(router.params._id ?? '');
    updateNews(router.params._id ?? '');
  }, [router.params._id]);

  return (
    <Layout menuBarElement={<BackNavigate darkMode />} showFooter enableScroll>
      <View>
        <View className='h-150 w-full fixed top-0 -z-98 bg-black' style={'opacity:' + opacity}></View>
        <Image className='h-150 w-full fixed top-0 -z-99' mode='aspectFill' src={article.background_image}></Image>
        <View className='flex flex-col ml-8 mt-50'>
          <View className='text-white my-2 text-bold'>{article.description}</View>
          <View className='w-18 flex justify-center items-center my-2' style={'background: ' + colorSet[article.index]}>
            <Text className='text-white text-2xl'>{article.category}</Text>
          </View>
          <Text className='text-white text-3xl my-2'>{article.publishTime}</Text>
        </View>
        <View className='bg-white rounded-t-4xl pl-8 pr-6 mt-10'>
          <View className='font-4xl font-bold pt-10'>{article.title}</View>

          <RichText className='mt-4' nodes={article.content}></RichText>
        </View>
      </View>
    </Layout>
  );
};

export default observer(Article);
