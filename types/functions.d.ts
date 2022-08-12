///规定云函数返回类型

/**
 * 统一返回类型
 * 重新封装云函数返回参数
 * @param status 0 表示失败 1 表示成功
 */
interface CloudFunctionsResult<T> {
  status: 0 | 1;
  result?: T;
  errMsg: string;
}

/**
 * 状态类参数
 */
interface Status{
  result: string;
}

/**
 * 用户类型
 */
interface Users {
  nickName: string,
  avatarUrl: string,
  userID: string,
}

/**
 * 谷物类型
 */
interface Crops{
  name: string,
  category: string,
  startTime: Date,
  endTime: Date,
  ownerId: string,
  location: {
    geo: {
        coordinates:[number,number]
    },
    detail: string,
  },
  status: '种植中',
  display: false,
  logs: Array<{
      detail: string,
      imgUrl: string,
      time: Date,
  }>
}

/**
 * 新闻返回参数
 */
interface Articles {
  news?: Array<{
    category: string,
    content: string,
    description: string,
    imgUrl: string,
    index: number,
    publishTime: Date,
    title: string
  }>
}

/**
 * 初始化作物返回类型
 */
interface InitUsers {
    nickName: string,
    avatarUrl: string,
    userID: string,
    crops?: Array<{
        index: number,
        imgUrl: string,
    }>
}

/**
 * 查询收藏全量数据返回类型
 */
interface Collections {
    crops?: Array<Crops>
}



/**
 * 函数返回结果
 */
type LoginResultPromise = Promise<CloudFunctionsResult<Users>>
type InitUserPromise = Promise<CloudFunctionsResult<InitUsers>>
type ArticlePromise = Promise<CloudFunctionsResult<Articles>>
type CollectionPromise = Promise<CloudFunctionsResult<Collections>>

export { LoginResultPromise, InitUserPromise, ArticlePromise, CollectionPromise };
