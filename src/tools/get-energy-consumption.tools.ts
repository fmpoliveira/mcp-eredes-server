import { request } from "../helpers/request.js";
import { getEnergyConsumptionUrl } from "../helpers/url.js";
import { EnergyConsumptionResponse } from "../interfaces/get-energy-consumption.interface.js";
import { GetEnergyConsumptionParams } from "../schema/get-energy-consumption.schema.js";

export async function getEnergyConsumption(
  params?: GetEnergyConsumptionParams
) {
  const { day, month, year, time, sortTotal } = params || {};
  const searchUrl = new URL(getEnergyConsumptionUrl);
  if (day) searchUrl.searchParams.append("refine", `dia:${day}`);
  if (month) searchUrl.searchParams.append("refine", `mes:${month}`);
  if (year) searchUrl.searchParams.append("refine", `datahora:${year}`);
  if (time) searchUrl.searchParams.append("refine", `time:${time}`);
  if (sortTotal)
    searchUrl.searchParams.append("order_by", `total ${sortTotal}`);

  const data = await request<EnergyConsumptionResponse>(searchUrl.toString());

  return data;
}
