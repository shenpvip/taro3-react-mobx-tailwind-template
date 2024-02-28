import React from "react";
import { observer } from "mobx-react";
import { storesContext } from "./index";

const useStore = () => React.useContext(storesContext);
export { observer, useStore };
