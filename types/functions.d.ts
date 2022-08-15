///规定云函数返回类型

/**
 * 统一返回类型
 * 重新封装云函数返回参数
 * @param status 0 表示失败 1 表示成功
 */
interface CloudFunctionsResult<T> {
  result: T | string | undefined;
  errMsg: string;
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
  startTime: string,
  endTime: string,
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
      time: string,
  }>,
  ownerNickName?: string /**查询单一作物字段 */
}

/**
 * 新闻返回参数
 */
interface Article
{
    category: string,
    content: string,
    description: string,
    imgUrl: string,
    index: number,
    publishTime: Date,
    title: string
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
 * 查询单个收藏数据返回类型
 */
interface SingleCollection {
    ifCollection: boolean
}

/**
 * 函数返回结果
 */

type LoginResultPromise = Promise<CloudFunctionsResult<Users>> /*** 登录返回类型*/
type InitUserPromise = Promise<CloudFunctionsResult<InitUsers>>/*** 初始化用户*/
type ArticlePromise = Promise<CloudFunctionsResult<Array<Article>>>/*** 获取新闻*/
type CollectionPromise = Promise<CloudFunctionsResult<Collections>>/*** 获取全量收藏*/
type SingleCollectionPromise = Promise<CloudFunctionsResult<SingleCollection>>/*** 获取是否被收藏*/
type DeleteCollectionPromise = Promise<CloudFunctionsResult<string>>/*** 删除收藏*/
type AddCollectionPromise = Promise<CloudFunctionsResult<string>>/*** 增加收藏*/
type GetCropsPromise = Promise<CloudFunctionsResult<Array<Crops>>>/*** 获取作物全量*/
type GetSingleCropsPromise = Promise<CloudFunctionsResult<Crops>>/*** 获取单个作物*/
type AddCropsPromise = Promise<CloudFunctionsResult<string>>/*** 添加作物*/
type DeleteCropsPromise = Promise<CloudFunctionsResult<string>>/*** 删除作物*/
type AddCropsLogPromise = Promise<CloudFunctionsResult<string>>/*** 添加作物记录*/
type FinishCropsPromise = Promise<CloudFunctionsResult<string>>/*** 标记完成作物*/
type FindNearCropsPromise = Promise<CloudFunctionsResult<Array<Crops>>>/*** 查询附近作物*/

export 
{ LoginResultPromise,
    InitUserPromise,
    ArticlePromise,
    CollectionPromise,
    SingleCollectionPromise,
    DeleteCollectionPromise,
    AddCollectionPromise,
    GetCropsPromise,
    GetSingleCropsPromise,
    AddCropsPromise,
    DeleteCropsPromise,
    AddCropsLogPromise,
    FinishCropsPromise,
    FindNearCropsPromise
};
