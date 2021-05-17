import { observable, action, makeObservable } from "mobx";
class GlobalStore {
  @observable customerId = "";
  @observable customerName = "Roc";
  @observable token = "";

  constructor(){
    makeObservable(this)
  }

  @action.bound
  setCustomerName(val: string) {
    this.customerName = val;
  }
}
export default new GlobalStore();
export interface IGlobalStore extends GlobalStore {}
