import * as z from "zod";
import {
  description,
  id,
  name,
  price,
  salePrice,
  sessionDuration,
  sessionsCount,
} from "./common.validation";

export const createSchema = z.object({
  name,
  basePrice: price,
  sessionsCount,
  discount: salePrice,
  sessionDuration,
  description,
});

export const updateSchema = z.object({
  id,
  name,
  basePrice: price,
  sessionsCount,
  discount: salePrice,
  sessionDuration,
  description,
});

export const getSchema = z.object({ id });

export const removeSchema = z.object({ id });
