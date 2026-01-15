import * as z from "zod";
import { password, username } from "./common.validation";

export const loginSchema = z.object({
  username,
  password,
});
