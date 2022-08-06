import { View, Image, Text } from '@tarojs/components';
import './UserInfo.scss';

interface UserProps {
  avatarUrl: string;
  nickName: string;
  welcomeInfo: string;
}

/**
 * 用户信息
 * 包含(用户头像、昵称、欢迎词)
 */
export default function UserInfo(props: UserProps) {
  const { avatarUrl, nickName, welcomeInfo } = props;

  return (
    <View className='flex flex-row items-start w-full' style='padding-left: 25px;'>
      <Image className='rounded-full border-2 border-white' style='width: 56px;height: 56px;' src={avatarUrl} />
      <View className='flex flex-col justify-center' style='height: 56px; margin-left: 5px'>
        <Text className='nick-name'> {nickName} </Text>
        <Text className='welcome-info'> {welcomeInfo} </Text>
      </View>
    </View>
  );
}
