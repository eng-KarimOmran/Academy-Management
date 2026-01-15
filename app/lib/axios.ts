import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import type { Response } from "@/type/type";

let academyId: string = "";

if (typeof window !== undefined) {
  academyId = Cookies.get("academyId") || "";
}

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    academyId,
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
      }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

axiosApi.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError<Response<any>>) => {
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
    const errorResponse: Response<any> = {
      message: "خطأ غير متوقع",
      statusCode: 500,
      success: false,
      data: null,
    };
    return Promise.reject(errorResponse);
  }
);

export default axiosApi;
