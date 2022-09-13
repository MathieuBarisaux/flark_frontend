// ** Function **
import { checkEnv } from "../../Functions/checkEnv";

const localServer = "http://localhost:3001";
const herokuServer = "https://flark.herokuapp.com";

export const serverUrl = checkEnv() ? localServer : herokuServer;
