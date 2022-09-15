// ** Redux **
import { createStore, combineReducers } from "redux";

// ** Reducer **
import tokenManagementReducer from "./tokenManagementReducer/tokenManagementReducer";

const rootReducer = combineReducers({ tokenManagementReducer });

export const Store = createStore(rootReducer);
