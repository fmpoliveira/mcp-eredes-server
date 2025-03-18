import { EnergyConsumption } from "../interfaces/get-energy-consumption.interface.js";

export function formatEnergyConsumption(data: EnergyConsumption): string {
  return [
    `Data: ${data.datahora}`,
    `Dia: ${data.dia}`,
    `Mês: ${data.mes}`,
    `Ano: ${data.ano}`,
    `Data: ${data.date}`,
    `Hora: ${data.time}`,
    `Baixa Tensão: ${data.bt.toFixed(2)}`,
    `Média Tensão: ${data.mt.toFixed(2)}`,
    `Alta Tensão: ${data.at.toFixed(2)}`,
    `Muito Alta Tensão: ${data.mat.toFixed(2)}`,
    `Total: ${data.total.toFixed(2)}`,
    "\n",
  ].join("\n");
}
