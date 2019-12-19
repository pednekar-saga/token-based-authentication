import axios from "axios";
import { config } from "../../config";

// axios.interceptors.response.use(
//    config => {
//       console.log(config);
//    },
//    error => console.log(error)
// );

export default axios.create({
   baseURL: config.BASE_URL
});
