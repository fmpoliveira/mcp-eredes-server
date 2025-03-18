import { z } from "zod";
import { emptyStringToUndefined } from "../helpers/empty-string-to-undefined.js";

export const getEnergyConsumptionSchema = z
  .object({
    day: emptyStringToUndefined(
      z.string().length(2).optional().describe("Specify the day (optional)")
    ),
    month: emptyStringToUndefined(
      z.string().length(2).optional().describe("Specify the month (optional)")
    ),
    year: emptyStringToUndefined(
      z.string().length(4).optional().describe("Specify the year (optional)")
    ),
    time: emptyStringToUndefined(
      z.string().length(5).optional().describe("Specify the time (optional)")
    ),
    sortTotal: emptyStringToUndefined(
      z
        .string()
        .refine((val) => val === "DESC" || val === "ASC", {
          message: "Sort direction must be either 'DESC' or 'ASC'",
        })
        .optional()
        .describe("Specify the sort direction (DESC or ASC) (optional)")
    ),
  })
  .optional();

export type GetEnergyConsumptionParams = z.infer<
  typeof getEnergyConsumptionSchema
>;
