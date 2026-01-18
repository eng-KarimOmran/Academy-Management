import * as z from "zod";
import { TransmissionType, UserRole } from "@/type/enum";
export const name = z
  .string("Name is required")
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must not exceed 50 characters")
  .regex(
    /^[\u0621-\u064Aa-zA-Z\s]+$/,
    "Name must contain only Arabic or English letters",
  );

export const username = z
  .string("Username is required")
  .min(3, "Username must be at least 3 characters")
  .max(30, "Username is too long")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can contain only English letters, numbers, and (_) character",
  );

export const password = z
  .string("Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(32, "Password is too long");

export const egyptianPhone = z
  .string("Phone number is required")
  .regex(
    /^01[0125][0-9]{8}$/,
    "Invalid phone number (must be an Egyptian mobile number)",
  );

export const amount = z.number().positive("Amount must be a positive number");

export const id = z.string("ID is required");

export const role = z.enum(
  UserRole,
  `Value must be one of (${Object.values(UserRole).join(" | ")})`,
);

export const trainingType = z.enum(
  TransmissionType,
  `Value must be one of (${Object.values(TransmissionType).join(" | ")})`,
);

export const description = z
  .string()
  .max(200, "Description must not exceed 200 characters");

export const sessionsCount = z.coerce
  .number("Sessions count is required")
  .int("Sessions count must be an integer")
  .positive("Sessions count must be greater than zero");

export const price = z.coerce
  .number("Price is required")
  .positive("Price must be a positive number");

export const salePrice = z.coerce
  .number()
  .positive("Sale price must be a positive number")
  .nullable()
  .optional();

export const sessionDuration = z.coerce
  .number()
  .int()
  .default(50)
  .refine((val) => val >= 10, "Session duration must be at least 50 minutes");

export const email = z.email("Invalid email");

export const address = z
  .string("Address is required")
  .max(200, "Address must not exceed 200 characters");
