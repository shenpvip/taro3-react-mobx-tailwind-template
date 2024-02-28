import httpService, { IApiData } from "@shared/utils/httpService";

interface IApiRes extends IApiData {}
class _GlobalService {
  getList() {
    return httpService.get("/v1/getList");
  }
}
const GlobalService = new _GlobalService();
export { IApiRes, GlobalService };
