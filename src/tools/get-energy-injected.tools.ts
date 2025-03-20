import { request } from "../helpers/request.js";
import { getEnergyInjectedUrl } from "../helpers/url.js";
import { EnergyInjectedResponse } from "../interfaces/get-energy-injected.interface.js";
import { GetEnergyInjectedParams } from "../schema/get-energy-injected.schema.js";

export async function getEnergyInjected(params?: GetEnergyInjectedParams) {
  const { day, month, year, time, sortTotal, limit } = params || {};
  const searchUrl = new URL(getEnergyInjectedUrl);

  if (day) searchUrl.searchParams.append("refine", `dia:${day}`);
  if (month) searchUrl.searchParams.append("refine", `mes:${month}`);
  if (year) searchUrl.searchParams.append("refine", `datahora:${year}`);
  if (time) searchUrl.searchParams.append("refine", `time:${time}`);
  if (sortTotal)
    searchUrl.searchParams.append("order_by", `rede_dist ${sortTotal}`);
  if (limit) searchUrl.searchParams.append("limit", `${limit}`);

  const data = await request<EnergyInjectedResponse>(searchUrl.toString());

  return data;
}
