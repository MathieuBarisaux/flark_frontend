// ** State **
const initialState = {
  userToken: null,
  userTokenChange: false,
};

const userManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setToken": {
      return {
        ...state,
        userToken: action.payload,
      };
    }

    case "changeToken": {
      return {
        ...state,
        userTokenChange: !state.userTokenChange,
      };
    }

    default: {
      return state;
    }
  }
};

export default userManagementReducer;
