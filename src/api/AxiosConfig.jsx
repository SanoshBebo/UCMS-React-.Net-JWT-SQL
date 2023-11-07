import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:44314/",
});

// const cookies = document.cookie.split('; ');
// let accessToken = '';
// for (const cookie of cookies) {
//   const parts = cookie.split('=');
//   if (parts[0] === 'X-Access-Token') {
//     accessToken = parts[1];
//     break;
//   }
// }
// console.log(accessToken)

// axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

axiosInstance.interceptors.request.use((request) => {
  const token = sessionStorage.getItem("token");
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

export default axiosInstance;
