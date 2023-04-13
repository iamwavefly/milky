// import axios from "axios";
// import Cookies from "js-cookie";

// const token = Cookies.get("token");

// axios.interceptors.request.use((request) => {
//   request.headers["type"] = "web";
//   request.headers["Authorization"] = `Bearer ${token}`;
//   return request;
// });

// if (token) {
//   axios.interceptors.request.use((request) => {
//     request.headers["Authorization"] = `Bearer ${token}`;
//     return request;
//   });
// }

// const mainApi = axios.create({
//   baseURL: "https://api-prod.genfinancial.co",
// });

// const devApi = axios.create({
//   baseURL:
//     "http://genbank-api-gateway-develop.eba-bzpck5tm.us-west-2.elasticbeanstalk.com",
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

// const corporateApi = axios.create({
//   baseURL: "http://genbankefilingdev.us-west-2.elasticbeanstalk.com/api/v1",
// });

// export { mainApi, corporateApi, devApi };
