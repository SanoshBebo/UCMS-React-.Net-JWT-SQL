import Axios from "axios";

const axiosInstance = Axios.create({
  baseURL: "https://localhost:44313/",
});

export default axiosInstance;
