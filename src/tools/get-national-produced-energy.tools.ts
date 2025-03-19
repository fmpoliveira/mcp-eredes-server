import { request } from "../helpers/request.js";
import { getNationalProducedEnergyUrl } from "../helpers/url.js";
import { NationalProducedEnergyResponse } from "../interfaces/get-national-produced-energy.interface.js";
import { GetNationalProducedEnergy } from "../schema/get-national-produced-energy.schema.js";

export async function getNationalProducedEnergy(
  params?: GetNationalProducedEnergy
) {
  const { day, month, year, time, sortTotal, limit } = params || {};
  const searchUrl = new URL(getNationalProducedEnergyUrl);

  if (day) searchUrl.searchParams.append("refine", `dia:${day}`);
  if (month) searchUrl.searchParams.append("refine", `mes:${month}`);
  if (year) searchUrl.searchParams.append("refine", `datahora:${year}`);
  if (time) searchUrl.searchParams.append("refine", `time:${time}`);
  if (sortTotal)
    searchUrl.searchParams.append("order_by", `total ${sortTotal}`);
  if (limit) searchUrl.searchParams.append("limit", `${limit}`);

  const data = await request<NationalProducedEnergyResponse>(
    searchUrl.toString()
  );

  return data;
}
