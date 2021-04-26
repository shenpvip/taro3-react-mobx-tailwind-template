import { observable, action } from "mobx";
class GlobalStore {
  @observable customerId = "";
  @observable customerName = "Roc";
  @observable token = "";

  @action.bound
  setCustomerId(val: string) {
    this.customerId = val;
  }
}
export default new GlobalStore();
export interface IGlobalStore extends GlobalStore {}
