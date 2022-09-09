// ** Dependencies **
import axios from "axios";

// ** Globals variables **
import { serverUrl } from "../assets/constants/globalVariables";

const fetchData = async (route, setValue, bearerToken, setLoading) => {
  setLoading && setLoading(true);

  try {
    const responseServer = await axios.get(`${serverUrl}${route}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    if (responseServer.status === 200) {
      setValue(responseServer.data);
    }
  } catch (error) {
    console.log(error.response);
  }

  setLoading && setLoading(false);
};

export default fetchData;
