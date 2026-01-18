import academies from "./academy.config";

export const config = {
  academies,
} as const;

export type EntityKey = keyof typeof config;

export function isEntityKey(key: string): key is EntityKey {
  return key in config;
}
