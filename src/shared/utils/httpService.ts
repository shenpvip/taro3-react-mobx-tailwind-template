import {
  request as _request,
  addInterceptor,
  showToast,
  uploadFile,
} from "@tarojs/taro";
import GlobalStore from "@shared/store/GlobalStore";
import { getAuthorized } from "@shared/utils/tools";
import ApiConfig from "@shared/utils/api";
export const imgUrl = ApiConfig.img_url;
export const apiUrl = ApiConfig.api_url;
export const fileUrl = ApiConfig.file_url;

enum ECode {
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
type TOptions = Omit<Taro.request.Option<any>, "url">;
const interceptor = function (chain) {
  const requestParams = chain.requestParams;
  const { url } = requestParams;
  const isNeedSetToken = !(url && url.includes("login"));
  if (isNeedSetToken && GlobalStore) {
    requestParams.header = {
      ...requestParams.header,
      Authorization: GlobalStore.token || "",
    };
  }

  return chain.proceed(requestParams).then((res) => {
    return res;
  });
};
addInterceptor(interceptor);
function checkResponse(response: IApiData) {
  const { code, msg } = response;
  if (code === ECode.UN_AUTHORIZED) {
    getAuthorized();
    return Promise.reject();
  }
  if (
    code !== ECode.OPERATION_SUCCESS &&
    code !== ECode.GAIN_SUCCESS &&
    code !== ECode.GAIN_SUCCESS_EMPTY
  ) {
    showToast({
      title: msg || "网络异常",
      icon: "none",
    });
    Promise.reject({ code, msg });
  }
  return Promise.resolve(response);
}
function request(
  url: string,
  options: Taro.uploadFile.Option | TOptions,
  isFile?: boolean
) {
  const newOptions = { ...options };
  if (isFile) {
    newOptions.header = {
      "Content-Type": "multipart/form-data",
      Authorization: GlobalStore.token || "",
      ...newOptions.header,
    };
    return uploadFile({
      ...(newOptions as Taro.uploadFile.Option),
      url: ApiConfig.file_url + url,
    })
      .then(async (res: any) => {
        return await checkResponse(JSON.parse(res.data) as unknown as IApiData);
      })
      .catch((error) => {
        const errMsg = error.msg || error.errMsg || "异常";
        showToast({
          title: errMsg.includes("request:fail") ? "网络异常" : errMsg,
          icon: "none",
        });
        return Promise.reject(error);
      });
  }
  return _request({
    url: ApiConfig.api_url + url,
    ...options,
  })
    .then(async (res) => {
      return await checkResponse(res.data);
    })
    .catch((error) => {
      const errMsg = error.msg || error.errMsg || "异常";
      showToast({
        title: errMsg.includes("request:fail") ? "网络异常" : errMsg,
        icon: "none",
      });
      return Promise.reject(error);
    });
}

const httpService = {
  get(url: string, data?: any) {
    return request(url, { method: "GET", data });
  },
  post(url: string, data: any, isFile?: boolean) {
    if (isFile) {
      return request(url, { method: "POST", ...data }, isFile);
    }
    return request(url, { method: "POST", data }, isFile);
  },
  put(url: string, data: any) {
    return request(url, { method: "PUT", data });
  },
  delete(url: string, data: any) {
    return request(url, { method: "DELETE", data });
  },
};

export default httpService;
