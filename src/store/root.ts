import { CropsStore } from './crops';
import { CropsCollectionStore } from './crops-collection';
import { UserStore } from './user';

export class RootStore {
  userStore: UserStore;

  cropsStore: CropsStore;

  cropsCollectionStore: CropsCollectionStore;

  constructor() {
    this.userStore = new UserStore();
    this.cropsStore = new CropsStore();
    this.cropsCollectionStore = new CropsCollectionStore();
  }
}

export const rootStore = new RootStore();
