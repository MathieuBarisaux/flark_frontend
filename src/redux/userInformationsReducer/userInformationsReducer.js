const inititalState = {
  userInformations: null,
  userInformationsChange: false,
};

const userInformationsReducer = (state = inititalState, action) => {
  switch (action.type) {
    case "setUserInformations": {
      return {
        ...state,
        userInformations: action.payload,
      };
    }

    case "userInformationsChange": {
      return {
        ...state,
        userInformationsChange: !state.userInformationsChange,
      };
    }

    default: {
      return state;
    }
  }
};

export default userInformationsReducer;
