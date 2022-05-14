import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (_error) => {
    Promise.reject("Something went wrong with the request");
  }
);

export default axiosInstance;
