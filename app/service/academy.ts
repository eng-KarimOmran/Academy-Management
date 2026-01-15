import axiosApi from "~/lib/axios";

export const getAllAcademy = () => axiosApi.get("/academy")