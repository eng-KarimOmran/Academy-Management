import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import type { ErrorResponse } from "@/type/type";
import Cookies from "js-cookie";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    const res = await axios.get(
      import.meta.env.VITE_API_URL + "/auth/refresh-token",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      },
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

axiosApi.interceptors.request.use((config) => {
  const academyId = Cookies.get("academyId");

  if (academyId) {
    config.headers["academy-id"] = academyId;
  } else {
    delete config.headers["academy-id"];
  }

  return config;
});

axiosApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponse>) => {
    if (error.response) {
      const originalRequest = error.config as AxiosRequestConfig;
      const status = error.response.status;

      if (status === 401) {
        try {
          await refreshAccessToken();
          return axiosApi(originalRequest);
        } catch (error) {
          window.location.href = "/";
        }
      }

      return Promise.reject(error.response.data);
    }
    const errorResponse: ErrorResponse = {
      message: "خطأ غير متوقع",
      statusCode: 500,
      success: false,
    };
    return Promise.reject(errorResponse);
  },
);

export default axiosApi;
