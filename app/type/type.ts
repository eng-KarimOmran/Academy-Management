import type { AxiosResponse } from "axios";

interface Response {
  message: string;
  statusCode: number;
  success: boolean;
}

export interface ErrorResponse extends Response {}

// اجعله يمثل البيانات فقط
export type SuccessResponse<T> = AxiosResponse<Response & { data: T }>;

export type ResponseGetAll<T> = Promise<AxiosResponse<Response & { data: { count: number; items: T[] } }>>;

export interface PropGetAll {
  page: number;
  limit: number;
  search: string;
}
