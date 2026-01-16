import type { LoginDTO } from "~/DTO/auth.DTO";
import axiosApi from "~/lib/axios";

export const login = (data: LoginDTO) => axiosApi.post("/auth/login", data);

export const logout = (data: "all-device" | "device") =>axiosApi.post(`/auth/logout-${data}`);
