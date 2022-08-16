import { makeAutoObservable } from 'mobx';
import { makePersistable, startPersisting } from 'mobx-persist-store';
import { initUser, login } from '../utils';
import { storageController } from './storage-controller';

export class UserStore {
  nickName: string;

  avatarUrl: string;

  userID: string;

  constructor() {
    makeAutoObservable(this);
    makePersistable(
      this,
      {
        name: 'userStore',
        properties: ['nickName', 'avatarUrl', 'userID'],
        storage: storageController,
        stringify: true,
        expireIn: 86400000, // expired after one day
        removeOnExpiration: true,
      },
      {
        delay: 200,
        fireImmediately: false,
      },
    );
    startPersisting(this);
  }

  get isLogin() {
    return this.nickName !== undefined && this.avatarUrl !== undefined && this.userID !== undefined;
  }

  async login() {
    const { result } = await login();
    if (result !== undefined) {
      const { userID, avatarUrl, nickName } = result;
      this.avatarUrl = avatarUrl;
      this.userID = userID;
      this.nickName = nickName;
    }
  }

  async initWithCrops() {
    const { result } = await initUser();
    if (result !== undefined) {
      const { userID, avatarUrl, nickName } = result;
      this.avatarUrl = avatarUrl;
      this.userID = userID;
      this.nickName = nickName;
    }
  }
}
