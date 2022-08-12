/**
 * 规定返回值类型
 * 重新封装云函数返回参
 * @param status 0 表示失败 1 表示成功
 */
interface CloudFunctionsResult {
  status: 0 | 1;
  result: TaroGeneral.IAnyObject;
  errMsg: string;
}
export { CloudFunctionsResult };
