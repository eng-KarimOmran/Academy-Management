import axios from "axios";
import type { LoginDTO } from "@/DTO/auth.DTO";
import axiosApi from "@/lib/axios";
import type { User } from "@/type/entity";
import type { SuccessResponse } from "@/type/type";

const login = (data: LoginDTO): Promise<SuccessResponse<User>> =>
  axiosApi.post("/auth/login", data);

const logout = (
  data: "all-device" | "device",
): Promise<SuccessResponse<null>> => axiosApi.post(`/auth/logout-${data}`);

const isLogin = (): Promise<SuccessResponse<User>> =>
  axios.get(import.meta.env.VITE_API_URL + "/auth/is-login", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  });

const api = {
  login,
  logout,
  isLogin
} as const;

export default api;
