export interface NationalProducedEnergyResponse {
  total_count: number;
  results: NationalProducedEnergy[];
}

export interface NationalProducedEnergy {
  datahora: string;
  dia: string;
  mes: string;
  ano: string;
  date: string;
  time: string;
  dgm: number;
  pre: number;
  total: number;
}
