import { z } from "zod";
import * as V from "@/validation/course.validation";

export interface CreateDTO extends z.infer<typeof V.createSchema> {}

export interface UpdateDTO extends z.infer<typeof V.updateSchema> {}

export interface GetDTO extends z.infer<typeof V.getSchema> {}

export interface DeleteDTO extends z.infer<typeof V.removeSchema> {}
