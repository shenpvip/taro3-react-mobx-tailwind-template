export enum ECode {
  UN_AUTHORIZED = 401, // 无权访问
  OPERATION_SUCCESS = 10000, // "操作成功"
  GAIN_SUCCESS = 10001, // "成功获取数据，数据非空"
  GAIN_SUCCESS_EMPTY = 10002, // "操作成功,数据为空"
}
export interface IApiData {
  data: any;
  code: ECode;
  msg: string;
}
