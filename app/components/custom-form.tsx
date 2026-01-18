import { Formik, Form, ErrorMessage } from "formik";
import type { FormikProps, FormikValues } from "formik";
import type { ZodObject } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import type { ErrorResponse, SuccessResponse } from "@/type/type";
import { type RefObject } from "react";

export interface IInput<T> {
  id: string;
  name: Extract<keyof T, string>;
  label: string;
  type?: "text" | "number" | "password" | "email";
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface ICustomForm<T, J> {
  initialValues: T;
  validationSchema: ZodObject<any>;
  inputs: IInput<T>[];
  formRef?: RefObject<HTMLFormElement | null>;
  isSubmitting?: boolean;
  setIsSubmitting?: (isSubmitting: boolean) => void;
  submit: (data: T) => Promise<SuccessResponse<J>>;
  successFn?: (data: J) => any;
}

export const FormikCustom = <T extends FormikValues, J>({
  initialValues,
  submit,
  validationSchema,
  inputs,
  successFn,
  formRef,
  isSubmitting,
  setIsSubmitting,
}: ICustomForm<T, J>) => {
  const { t } = useTranslation();

  return (
    <Formik<T>
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={toFormikValidationSchema(validationSchema)}
      onSubmit={async (data) => {
        try {
          setIsSubmitting && setIsSubmitting(true);
          const res = await submit(data);
          const dataRes = res.data.data;
          toast.success(res.data.message);
          successFn?.(dataRes);
        } catch (error) {
          const err = error as ErrorResponse;
          toast.error(err.message);
        } finally {
          setIsSubmitting && setIsSubmitting(false);
        }
      }}
    >
      {(props: FormikProps<T>) => (
        <Form ref={formRef} className="flex flex-col gap-6">
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
                disabled={input.disabled || isSubmitting}
                {...props.getFieldProps(input.name)}
              />

              <ErrorMessage name={input.name as string}>
                {(errorMessage) => (
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                      textAlign: "start",
                    }}
                  >
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
