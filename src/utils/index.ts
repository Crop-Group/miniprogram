import { login, initUser } from './cloudFunctions/users';
import { getNews } from './cloudFunctions/news';
import {
  getCollections,
  checkIfInCollection,
  addSingleCollection,
  removeSingleCollection,
} from './cloudFunctions/collections';
import {
  getCrops,
  getSingleCrop,
  addSingleCrop,
  addSingleCropLog,
  deleteSingleCrop,
  finishSingleCrop,
  findNearCrops,
} from './cloudFunctions/crops';

/**
 * 输出封装接口
 * 一共14个接口
 */
export {
  login,
  getNews,
  initUser,
  getCollections,
  checkIfInCollection,
  addSingleCollection,
  removeSingleCollection,
  getCrops,
  getSingleCrop,
  addSingleCrop,
  addSingleCropLog,
  deleteSingleCrop,
  finishSingleCrop,
  findNearCrops,
};
