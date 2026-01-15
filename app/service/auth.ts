import type { LoginDTO } from "~/DTO/auth.DTO";
import axiosApi from "~/lib/axios";

export const login = (data: LoginDTO) => axiosApi.post("/auth/login", data);