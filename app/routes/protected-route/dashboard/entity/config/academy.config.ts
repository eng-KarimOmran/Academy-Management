import type { ICustomTable } from "~/components/custom-table";
import type { CreateDTO, UpdateDTO } from "@/DTO/academy.DTO";
import type { Academy } from "@/type/academy";
import type { ICustomForm } from "~/components/custom-form";
import { createSchema, updateSchema } from "@/validation/academy.validation";
import type { ThisConfig } from "@/service/academy";
import api from "@/service/academy";

const academyConfig = {
  title: "academy",
  api,
  table: {
    rows: [],
    columns: [
      {
        key: "name",
        label: "الاسم",
        display: (data) => {
          return data;
        },
      },
      {
        key: "owner",
        label: "المالك",
        display: (data) => {
          return data;
        },
      },
      {
        key: "address",
        label: "العنوان",
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
        id: "name",
        name: "name",
        label: "الاسم",
        placeholder: "اكتب الاسم",
        required: true,
        type: "text",
      },
      {
        id: "address",
        name: "address",
        label: "العنوان",
        placeholder: "اكتب العنوان",
        required: true,
        type: "text",
      },
      {
        id: "owner",
        name: "owner",
        label: "المالك",
        placeholder: "اكتب اسم المالك",
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
        id: "name",
        name: "name",
        label: "الاسم",
        placeholder: "اكتب الاسم",
        required: true,
        type: "text",
      },
      {
        id: "address",
        name: "address",
        label: "العنوان",
        placeholder: "اكتب العنوان",
        required: true,
        type: "text",
      },
      {
        id: "owner",
        name: "owner",
        label: "المالك",
        placeholder: "اكتب اسم المالك",
        required: true,
        type: "text",
      },
    ],
    validationSchema: updateSchema,
    submit: api.update,
  } as ICustomForm<UpdateDTO, Academy>,
};

export default academyConfig;
