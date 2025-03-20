import { EnergyInjected } from "../../interfaces/get-energy-injected.interface.js";

export function formatEnergyInjected(data: EnergyInjected): string {
  return [
    `Date/Time: ${data.datahora}`,
    `Day: ${data.dia}`,
    `Month: ${data.mes}`,
    `Year: ${data.ano}`,
    `Date: ${data.date}`,
    `Hour: ${data.time}`,
    `Cogeneration (kWh): ${data.cogeracao.toFixed(2)}`,
    `Wind (kWh): ${data.eolica.toFixed(2)}`,
    `Photovoltaics (kWh): ${data.fotovoltaica.toFixed(2)}`,
    `Hydro (kWh): ${data.hidrica.toFixed(2)}`,
    `Other technologies (kWh): ${data.outras_tecnologias.toFixed(2)}`,
    `Total (kWh): ${data.rede_dist.toFixed(2)}`,
    "\n",
  ].join("\n");
}
