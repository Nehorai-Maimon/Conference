import axios from "axios";
import ClientConfig from "../Common/Config.ts";


const api = axios.create({
    // withCredentials: true,
    baseURL: ClientConfig.apiBaseHost,
    withCredentials: true,
    headers: { "Content-Type": "application/json", }
});
if (localStorage.getItem("auth_token")) {
    api.defaults.headers.common["Authorization"] = `bearer ${localStorage.auth_token}`;

}


// TODO:
// export const loginApi = axios.create({
//   baseURL: ClientConfig.apiBaseHost,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("auth_token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export { api };
