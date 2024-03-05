import Taro, { addInterceptor } from "@tarojs/taro";
import ApiConfig from "@shared/utils/request/api";
import interceptors, { checkResponse, errResponse } from "./interceptors";
import { GlobalStore } from "@shared/store";
export const imgUrl = ApiConfig.img_url;
export const apiUrl =
  process.env.NODE_ENV === "development"
    ? ApiConfig.test_api
    : ApiConfig.prod_api;

addInterceptor(interceptors);
class httpRequest {
  request(
    params: Taro.request.Option | Taro.uploadFile.Option,
    isFile?: boolean
  ): Promise<any> {
    const options = {
      ...params,
      url: apiUrl + params.url,
    };
    if (isFile) {
      const uploadOptions = {
        ...options,
        header: {
          Authorization: GlobalStore.token || "",
          "Content-Type": "multipart/form-data",
        },
      };
      return Taro.uploadFile(uploadOptions as Taro.uploadFile.Option)
        .then(async (res) => {
          return await checkResponse(JSON.parse(res.data));
        })
        .catch((err) => {
          return errResponse(err);
        });
    }
    return Taro.request(options);
  }
  get(url: string, data?: any) {
    return this.request({
      url,
      data,
      method: "GET",
    });
  }

  post(url: string, data: any, isFile?: boolean) {
    if (isFile) {
      return this.request({ url, ...data, method: "POST" }, isFile);
    }
    return this.request({ url, data, method: "POST" }, isFile);
  }
  put(url: string, data: any) {
    return this.request({ url, data, method: "PUT" });
  }
  delete(url: string, data: any) {
    return this.request({ url, data, method: "DELETE" });
  }
}
export default new httpRequest();
export * from "./interface";
