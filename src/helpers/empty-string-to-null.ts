import { z } from "zod";

export function emptyStringToNull<T extends z.ZodType>(schema: T) {
  return z.preprocess((val) => (val === "" ? undefined : val), schema);
}
