import { EnergyConsumption } from "../../interfaces/get-energy-consumption.interface.js";

export function formatEnergyConsumption(data: EnergyConsumption): string {
  return [
    `Date: ${data.datahora}`,
    `Day: ${data.dia}`,
    `Month: ${data.mes}`,
    `Year: ${data.ano}`,
    `Date: ${data.date}`,
    `Hour: ${data.time}`,
    `Low Tension: ${data.bt.toFixed(2)}`,
    `Medium Tension: ${data.mt.toFixed(2)}`,
    `High Tension: ${data.at.toFixed(2)}`,
    `Very High Tension: ${data.mat.toFixed(2)}`,
    `Total: ${data.total.toFixed(2)}`,
    "\n",
  ].join("\n");
}
