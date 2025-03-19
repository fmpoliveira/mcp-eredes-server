import { NationalProducedEnergy } from "../../interfaces/get-national-produced-energy.interface.js";

export function formatNationalProducedEnergy(
  data: NationalProducedEnergy
): string {
  return [
    `Date/Time: ${data.datahora}`,
    `Day: ${data.dia}`,
    `Month: ${data.mes}`,
    `Year: ${data.ano}`,
    `Date: ${data.date}`,
    `Hour: ${data.time}`,
    `Market (kWh): ${data.dgm.toFixed(2)}`,
    `Special Regime (kWh): ${data.pre.toFixed(2)}`,
    `Total (kWh): ${data.total.toFixed(2)}`,
    "\n",
  ].join("\n");
}
