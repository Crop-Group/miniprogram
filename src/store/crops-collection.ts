import { makeAutoObservable, runInAction } from 'mobx';
import { Crops } from 'types/functions';
import { addSingleCollection, checkIfInCollection, getCollections, removeSingleCollection } from '../utils';

// TODO How to gracefully handle the result returned from CloudFunction call?
export class CropsCollectionStore {
  crops: Crops[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // get from remote
  async fetch() {
    const { result } = await getCollections();
    if (result !== undefined) {
      runInAction(() => {
        this.crops = result;
      });
    }
  }

  // add to collection
  async add(id: string) {
    await addSingleCollection(id);
    await this.fetch(); // very naive...
  }

  // remove to collection
  async remove(id: string) {
    await removeSingleCollection(id);
    await this.fetch(); // really naive...
  }

  async include(id: string) {
    const { result } = await checkIfInCollection(id); // should call cloud function, because the crops may be not collected by you
    return result.ifCollection;
  }

  // show number of crops
  get length() {
    return this.crops.length;
  }
}
