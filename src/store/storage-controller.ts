import Taro from '@tarojs/taro';
import { StorageController } from 'mobx-persist-store';

class TaroStorageController implements StorageController {
  getItem<T>(key: string): string | T | Promise<string | T | null> | null {
    return new Promise((resolve, _reject) => {
      Taro.getStorage({
        key,
        success: (result) => resolve(result.data),
        fail: () => resolve(null), // if data is not found
      }).catch(() => {});
    });
  }

  removeItem(key: string): void | Promise<void> {
    return new Promise((resolve, reject) => {
      Taro.removeStorage({ key, success: () => resolve(), fail: (reason) => reject(reason) });
    });
  }

  setItem(key: string, value: any): void | Promise<void> {
    return new Promise((resolve, reject) => {
      Taro.setStorage({
        key,
        data: value,
        success: () => resolve(),
        fail: (reason) => reject(reason),
      }).catch(() => {});
    });
  }
}

export const storageController = new TaroStorageController();
