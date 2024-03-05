import httpRequest, { IApiData } from "@shared/utils/request";

interface IApiRes extends IApiData {}
class _GlobalService {
  getList() {
    return httpRequest.get("/v1/scrmMenuConfig/allEnableKey");
  }

  upload(data: any) {
    return httpRequest.post("/v1/file_upload/picture", { ...data }, true);
  }
}
const GlobalService = new _GlobalService();
export { IApiRes, GlobalService };
