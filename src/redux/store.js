// ** Redux **
import { createStore, combineReducers } from "redux";

// ** Reducer **
import tokenManagementReducer from "./tokenManagementReducer/tokenManagementReducer";
import userInformationsReducer from "./userInformationsReducer/userInformationsReducer";

const rootReducer = combineReducers({
  tokenManagementReducer,
  userInformationsReducer,
});

export const Store = createStore(rootReducer);
