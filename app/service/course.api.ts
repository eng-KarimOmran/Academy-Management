import type {
  CreateDTO,
  DeleteDTO,
  GetDTO,
  UpdateDTO,
} from "@/DTO/course.DTO";

import axiosApi from "@/lib/axios";
import type { Course } from "@/type/entity";
import type { PropGetAll, ResponseGetAll, SuccessResponse } from "@/type/type";

export type ThisConfig = Course;

const baseUrl = "/course";

const getAll = (): ResponseGetAll<ThisConfig> => axiosApi.get(baseUrl);

const search = (prop: PropGetAll): ResponseGetAll<ThisConfig> =>
  axiosApi.get(
    `${baseUrl}?page=${prop.page}&limit=${prop.limit}&search=${prop.search}`,
  );

const getById = (data: GetDTO): Promise<SuccessResponse<ThisConfig>> =>
  axiosApi.get(`${baseUrl}/${data.id}`);

const add = (data: CreateDTO): Promise<SuccessResponse<ThisConfig>> =>
  axiosApi.post(baseUrl, data);

const update = (data: UpdateDTO): Promise<SuccessResponse<ThisConfig>> =>
  axiosApi.patch(baseUrl, data);

const remove = (data: DeleteDTO): Promise<SuccessResponse<ThisConfig>> =>
  axiosApi.delete(`${baseUrl}/${data.id}`);

const api = {
  getAll,
  search,
  getById,
  add,
  update,
  remove,
} as const;

export default api;