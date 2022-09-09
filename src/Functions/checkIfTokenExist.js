// ** Dependancies **
import Cookie from "js-cookie";

const checkIfTokenExist = () => {
  const checkTokenInCookie = Cookie.get("token");

  if (checkTokenInCookie) {
    return checkTokenInCookie;
  }

  return null;
};

export default checkIfTokenExist;
