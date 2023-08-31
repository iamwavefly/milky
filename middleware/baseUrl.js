import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "https://subsidiary-api.arca-payments.network/subsidiary";

const token = Cookies.get("token");

axios.interceptors.request.use((request) => {
  request.headers["type"] = "web";
  return request;
});

if (token) {
  console.log({ token });
  axios.interceptors.request.use((request) => {
    request.headers["Authorization"] = `Bearer ${token}`;
    return request;
  });
}

export default baseUrl;
