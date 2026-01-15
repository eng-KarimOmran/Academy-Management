import z from "zod";
import type { loginSchema } from "@/validation/auth.validation";

export interface LoginDTO extends z.infer<typeof loginSchema> {}