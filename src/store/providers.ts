import { createContext } from 'react';
import { CropsStore } from './crops';
import { CropsCollectionStore } from './crops-collection';
import { UserStore } from './user';

import { rootStore } from './root';

export const userStore = rootStore.userStore;

export const UserStoreContext = createContext<UserStore>(userStore);

export const cropsCollectionStore = rootStore.cropsCollectionStore;

export const CropsCollectionStoreContext = createContext<CropsCollectionStore>(cropsCollectionStore);

export const cropsStore = rootStore.cropsStore;

export const CropsStoreContext = createContext<CropsStore>(cropsStore);
