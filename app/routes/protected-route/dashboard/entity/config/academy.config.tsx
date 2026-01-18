import type { ICustomTable } from "@/components/custom-table";
import type { CreateDTO, UpdateDTO } from "@/DTO/academy.DTO";
import type { ICustomForm } from "@/components/custom-form";
import { createSchema, updateSchema } from "@/validation/academy.validation";
import type { ThisConfig } from "@/service/academy.api";
import api from "@/service/academy.api";
import type { Academy } from "@/type/entity";

const academyConfig = {
  api,
  table: {
    entity: "academy",
    rows: [],
    columns: [
      {
        key: "name",
        display: (data) => {
          return data;
        },
      },
      {
        key: "owner",
        display: (data) => {
          return data;
        },
      },
      {
        key: "address",
        display: (data) => {
          return data;
        },
      },
    ],
    actions: ["delete", "update", "watch"],
    isLoading: true,
  } as ICustomTable<ThisConfig>,
  formAdd: {
    initialValues: {
      name: "",
      address: "",
      owner: "",
    },
    inputs: [
      {
        name: "name",
        required: true,
        type: "text",
      },
      {
        name: "address",
        required: true,
        type: "text",
      },
      {
        name: "owner",
        required: true,
        type: "text",
      },
    ],
    validationSchema: createSchema,
    submit: api.add,
  } as ICustomForm<CreateDTO, Academy>,
  formUpdate: {
    initialValues: {
      id: "",
      name: "",
      address: "",
      owner: "",
    },
    inputs: [
      {
        name: "name",
        required: true,
        type: "text",
      },
      {
        name: "address",
        required: true,
        type: "text",
      },
      {
        name: "owner",
        required: true,
        type: "text",
      },
    ],
    validationSchema: updateSchema,
    submit: api.update,
  } as ICustomForm<UpdateDTO, Academy>,
};

export default academyConfig;
