import Axios from "axios";

const axiosInstance = Axios.create({
  baseURL: "https://localhost:44313/",
});

axiosInstance.interceptors.request.use((request) => {
  const token = sessionStorage.getItem("token");
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

export default axiosInstance;
