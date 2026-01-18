import academies from "./academy.config";
import courses from "./course.config";
export const config = {
  academies,
  courses,
} as const;

export type EntityKey = keyof typeof config;

export function isEntityKey(key: string): key is EntityKey {
  return key in config;
}