import { Formik, Form, ErrorMessage } from "formik";
import type { FormikProps, FormikValues } from "formik";
import type { ZodObject } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
import type { Response } from "@/type/type";
import { useTranslation } from "react-i18next";
import type { AxiosPromise } from "axios";

export interface IInput<T> {
  id: string;
  name: Extract<keyof T, string>;
  label: string;
  type?: "text" | "number" | "password" | "email";
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface ICustomForm<T> {
  initialValues: T;
  validationSchema: ZodObject;
  inputs: IInput<T>[];
  formId: string;
  loading: boolean;
  submit: (data: T) => any;
  setLoading: (loading: boolean) => void;
  successFn?: (data: Response<any>) => any;
}

export const CustomForm = <T extends FormikValues>({
  initialValues,
  submit,
  validationSchema,
  inputs,
  formId,
  loading,
  setLoading,
  successFn,
}: ICustomForm<T>) => {
  const { t } = useTranslation();
  return (
    <Formik<T>
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validationSchema)}
      onSubmit={async (data) => {
        setLoading(true);
        try {
          const res = await submit(data);
          const dataRes = res.data as Response<any>;
          successFn?.(dataRes);
        } catch (error) {
          const err = error as Response<any>;
          toast.error(err.message);
        } finally {
          setLoading(false);
        }
      }}
      enableReinitialize={true}
    >
      {(props: FormikProps<any>) => (
        <Form id={formId} className="flex flex-col gap-6">
          {inputs.map((input) => (
            <div key={input.id} className="grid gap-2">
              <Label htmlFor={input.id} className="capitalize">
                {input.label}
              </Label>
              <Input
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                required={input.required}
                disabled={input.disabled || loading}
                {...props.getFieldProps(input.name)}
              />
              <ErrorMessage name={input.name}>
                {(errorMessage) => (
                  <div className="text-red-500 text-xs">
                    {t(`validation.${errorMessage}`)}
                  </div>
                )}
              </ErrorMessage>
            </div>
          ))}
        </Form>
      )}
    </Formik>
  );
};
