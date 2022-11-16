import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { getFuzzyLocation } from '../../../../utils/getFuzzyLocation';

const Weather = () => {
  const [locationText, setLocationText] = useState('定位中');

  const [tips, setTips] = useState('努力获取天气中');

  useEffect(() => {
    const task = async () => {
      // update location
      const { longitude, latitude } = await getFuzzyLocation({
        type: 'wgs84',
      });
      console.log(longitude, latitude);

      const getLocation = async () => {
        const cityResult = await Taro.request({
          url: 'https://geoapi.qweather.com/v2/city/lookup',
          method: 'GET',
          data: {
            key: 'edf0a68b6d554229a9ae6814d488a3c9',
            location: `${longitude},${latitude}`,
          },
        });
        setLocationText(cityResult.data.location[0].name);
      };

      const getWeather = async () => {
        // get weather
        const weatherResult = await Taro.request({
          url: 'https://devapi.qweather.com/v7/weather/now',
          method: 'GET',
          data: {
            key: 'edf0a68b6d554229a9ae6814d488a3c9',
            location: `${longitude},${latitude}`,
          },
        });
        console.log('weather', weatherResult);
        // update tips
        if (weatherResult.data.now.text === '晴') {
          setTips(`${weatherResult.data.now.temp}°C，今天天气晴朗，适合播种`);
        } else {
          setTips(`${weatherResult.data.now.temp}°C，${weatherResult.data.now.text}，请留意天气状况`);
        }
      };

      await Promise.all([getWeather(), getLocation()]);
    };

    try {
      task();
    } catch (e) {
      setLocationText('未知');
      setTips('获取天气失败');
      console.error(e);
    }
  }, []);

  return (
    <View className='text-white' style={{ fontWeight: '600' }}>
      <View>
        <Image
          src={require('../../../../images/res/crop/location-2-light.svg')}
          className='mr-2'
          style={{ height: '1em', width: '1em' }} // TODO make height as the same as text
        />
        <Text>{locationText}</Text>
      </View>
      <View style={{ fontSize: '14pt' }}>
        <Text>{tips}</Text>
      </View>
    </View>
  );
};

export default Weather;
