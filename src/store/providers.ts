import { createContext } from 'react';
import { CropsStore } from './crops';
import { CropsCollectionStore } from './crops-collection';
import { UserStore } from './user';

export const userStore = new UserStore();

export const UserStoreContext = createContext<UserStore>(userStore);

export const cropsCollectionStore = new CropsCollectionStore();

export const CropsCollectionStoreContext = createContext<CropsCollectionStore>(cropsCollectionStore);

export const cropsStore = new CropsStore();

export const CropsStoreContext = createContext<CropsStore>(cropsStore);
