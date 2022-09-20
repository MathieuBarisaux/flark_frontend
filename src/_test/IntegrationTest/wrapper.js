import { render as rtlRender } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// ** Redux **
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

// ** Reducer **
import tokenManagementReducer from "../../redux/tokenManagementReducer/tokenManagementReducer";
import userInformationsReducer from "../../redux/userInformationsReducer/userInformationsReducer";

export function render(ui, options) {
  const rootReducer = combineReducers({
    tokenManagementReducer,
    userInformationsReducer,
  });

  const Store = createStore(rootReducer);

  function Wrapper({ children }) {
    return (
      <MemoryRouter {...options}>
        <Provider store={Store}>{children}</Provider>
      </MemoryRouter>
    );
  }

  rtlRender(ui, { wrapper: Wrapper });
}
