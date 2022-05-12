import { makeAutoObservable } from "mobx";
import Api from "@server/Global";

class GlobalStore {
  customerId: string = "";
  customerName: string = "Roc";
  token: string = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setCustomerName(val: string) {
    this.customerName = val;
  }

  async getData() {
    const res = await Api.getList();
    console.log(res);
  }
}
export default new GlobalStore();
export interface IGlobalStore extends GlobalStore {}
