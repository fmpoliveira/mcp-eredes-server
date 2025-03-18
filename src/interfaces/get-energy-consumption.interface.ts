export interface EnergyConsumptionResponse {
  totalCount: number;
  results: EnergyConsumption[];
}

export interface EnergyConsumption {
  datahora: string;
  dia: string;
  mes: string;
  ano: string;
  date: string;
  time: string;
  bt: number;
  mt: number;
  at: number;
  mat: number;
  total: number;
}
