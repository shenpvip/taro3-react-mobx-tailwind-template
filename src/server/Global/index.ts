import httpService, { IApiData } from "@utils/httpService";

export interface IMODApiData extends IApiData {}
const apiUrl = {
  getList: "/xxx"
};

const getList = () => httpService.get(apiUrl.getList);

export default {
  getList
};
