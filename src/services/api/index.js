import axios from "axios";
import { config } from "../../config";

axios.interceptors.request.use(
   config => {
      const token = localStorage.getItem("token");
      if (token) {
         config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
   },
   error => {
      Promise.reject(error);
   }
);

// axios.interceptors;

export default axios.create({
   baseURL: config.BASE_URL
});
