import { login, initUser } from './cloudFunctions/users';
import { getNews } from './cloudFunctions/news';
import {
  getCollections,
  getSingleCollection,
  addSingleCollection,
  removeSingleCollection,
} from './cloudFunctions/collections';

/**
 * 输出封装接口
 */
export { login, getNews, initUser, getCollections, getSingleCollection, addSingleCollection, removeSingleCollection };
