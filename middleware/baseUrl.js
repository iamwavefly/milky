import axios from "axios";
import Cookies from "js-cookie";

const baseUrl =
  "https://admin-api-service.staging-sayswitchgroup.com/admin/dashboard";

const token = Cookies.get("token");

axios.interceptors.request.use((request) => {
  request.headers["type"] = "web";
  return request;
});

if (token) {
  axios.interceptors.request.use((request) => {
    request.headers["Authorization"] = `bearer ${token}`;
    return request;
  });
}

export default baseUrl;

