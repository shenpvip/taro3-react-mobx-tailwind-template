import React from "react";
import GlobalStore, { IGlobalStore } from "./GlobalStore";

export const storesContext = React.createContext({
  GlobalStore
});
export interface IStore {
  GlobalStore: IGlobalStore;
}
