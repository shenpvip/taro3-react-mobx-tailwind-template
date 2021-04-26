import httpService, { IApiData } from "@utils/httpService";

export interface IMODApiData extends IApiData {}
const apiUrl = {
  mallCartSum: "/v1/mall/cart/mallCartSum"
};

const mallCartSum = () => httpService.get(apiUrl.mallCartSum);

export default {
  mallCartSum
};
