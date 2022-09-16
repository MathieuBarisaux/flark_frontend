const inititalState = {
  userInformations: null,
  userInformationsChange: false,
  userAvatarLoad: false,
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

    case "userAvatarLoad": {
      return {
        ...state,
        userAvatarLoad: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default userInformationsReducer;
