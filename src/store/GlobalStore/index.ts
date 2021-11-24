import { observable, makeObservable } from "mobx";
import Api from "@server/Global";

class GlobalStore {
  @observable customerId = "";
  @observable customerName = "Roc";
  @observable token = "";

  constructor() {
    makeObservable(this);
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
