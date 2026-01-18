import type {
  CreateDTO,
  DeleteDTO,
  GetDTO,
  UpdateDTO,
} from "@/DTO/academy.DTO";
import axiosApi from "@/lib/axios";
import type { Academy } from "@/type/entity";
import type { PropGetAll, ResponseGetAll, SuccessResponse } from "@/type/type";

export type ThisConfig = Academy;

const bassUrl = "/academy";

const getAll = (): ResponseGetAll<ThisConfig> => axiosApi.get(bassUrl);

const search = (prop: PropGetAll): ResponseGetAll<ThisConfig> =>
  axiosApi.get(
    `${bassUrl}?page=${prop.page}&limit=${prop.limit}&search=${prop.search}`,
  );

const getById = (data: GetDTO): Promise<SuccessResponse<ThisConfig>> =>
  axiosApi.get(`${bassUrl}/${data.id}`);

const add = (data: CreateDTO): Promise<SuccessResponse<ThisConfig>> =>
  axiosApi.post(bassUrl, data);

const update = (data: UpdateDTO): Promise<SuccessResponse<ThisConfig>> =>
  axiosApi.patch(bassUrl, data);

const remove = (data: DeleteDTO): Promise<SuccessResponse<ThisConfig>> =>
  axiosApi.delete(`${bassUrl}/${data.id}`);

const api = {
  getAll,
  search,
  getById,
  add,
  update,
  remove,
} as const;

export default api;
