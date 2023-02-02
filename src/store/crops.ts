import { makeAutoObservable, runInAction } from 'mobx';
import { Crops as CropsType } from 'types/functions';
import { addSingleCrop, addSingleCropLog, deleteSingleCrop, finishSingleCrop, getCrops, getSingleCrop } from '../utils';

// TODO 优雅地处理string result...
export class Crop {
  details: CropsType;

  constructor(crops: CropsType) {
    this.details = crops;
    makeAutoObservable(this);
  }

  private async fetch() {
    const { result } = await getSingleCrop(this.details._id);
    if (result) {
      runInAction(() => {
        this.details = result;
      });
    }
  }

  async addLog(imgUrl: string, detail: string, userID: string) {
    const { result } = await addSingleCropLog(this.details._id, imgUrl, detail, userID);
    if (result) {
      this.fetch();
    }
  }

  async markAsFinish(id: string) {
    const { result } = await finishSingleCrop(id);
    if (result) {
      // simply change status
      runInAction(() => {
        this.details.status = '已完成';
      });
      await this.fetch();
    }
  }
}

export class CropsStore {
  crops: Crop[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetch() {
    const { result } = await getCrops();
    if (result !== undefined) {
      runInAction(() => {
        this.crops = [];
        result.forEach((res) => this.crops.push(new Crop(res)));
      });
    }
  }

  async get(id: string) {
    const { result } = await getSingleCrop(id);
    return result;
  }

  async add(
    name: string,
    userID: string,
    imgUrl: string,
    endTime: string,
    latitude: number,
    longitude: number,
    location: string,
    category: string,
  ) {
    const { result } = await addSingleCrop(name, userID, imgUrl, endTime, latitude, longitude, location, category);
    if (result) {
      await this.fetch();
    }
  }

  async delete(id: string) {
    const { result } = await deleteSingleCrop(id);
    if (result) {
      await this.fetch();
    }
  }

  get length() {
    return this.crops.length;
  }
}
