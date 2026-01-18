import type { ICustomTable } from "@/components/custom-table";
import type { CreateDTO, UpdateDTO } from "@/DTO/course.DTO";
import type { ICustomForm } from "@/components/custom-form";
import { createSchema, updateSchema } from "@/validation/course.validation";
import type { ThisConfig } from "@/service/course.api";
import api from "@/service/course.api";
import type { Course } from "@/type/entity";

const inputs = [
  { name: "name", required: true, type: "text" },
  { name: "description", required: true, type: "text" },
  { name: "basePrice", required: true, type: "number" },
  { name: "discount", required: false, type: "number" },
  { name: "sessionsCount", required: true, type: "number" },
  { name: "sessionDuration", required: true, type: "number" },
];

const initialValues = {
  name: "",
  description: "",
  sessionsCount: 0,
  basePrice: 0,
  sessionDuration: 50,
  discount: null,
};

const columns = [
  {
    key: "name",
    display: (data: any) => data,
  },
  {
    key: "basePrice",
    display: (data: any) => data,
  },
  {
    key: "discount",
    display: (data: any) =>
      data ? <span className="text-green-500">{data}</span> : "لا يوجد خصم",
  },
  {
    key: "sessionDuration",
    display: (data: any) => `${data} دقيقة`,
  },
  {
    key: "sessionsCount",
    display: (data: any) => data,
  },
];

const courseConfig = {
  api,
  table: {
    entity: "course",
    rows: [],
    columns,
    actions: ["delete", "update", "watch"],
  } as ICustomTable<ThisConfig>,
  formAdd: {
    initialValues,
    inputs,
    validationSchema: createSchema,
    submit: api.add,
  } as ICustomForm<CreateDTO, Course>,
  formUpdate: {
    initialValues: {
      id: "",
      ...initialValues,
    },
    inputs,
    validationSchema: updateSchema,
    submit: api.update,
  } as ICustomForm<UpdateDTO, Course>,
};

export default courseConfig;
