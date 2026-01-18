import * as z from "zod";
import { address, id, name } from "./common.validation";

export const createSchema = z.object({
  name,
  owner: name,
  address,
});

export const updateSchema = z.object({
  id,
  name,
  owner: name,
  address,
});

export const getSchema = z.object({ id });

export const removeSchema = z.object({ id });
