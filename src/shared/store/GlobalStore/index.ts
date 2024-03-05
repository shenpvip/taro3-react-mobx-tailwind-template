import { makeAutoObservable } from "mobx";
import { GlobalService } from "@shared/server/Global";

class _GlobalStore {
  customerId = "";
  customerName = "Roc";
  token = "";
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setCustomerName(val: string) {
    this.customerName = val;
  }

  async getData() {
    await GlobalService.getList();
  }
}
export const GlobalStore = new _GlobalStore();
