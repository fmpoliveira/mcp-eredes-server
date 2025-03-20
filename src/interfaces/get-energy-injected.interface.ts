export interface EnergyInjectedResponse {
  totalCount: number;
  results: EnergyInjected[];
}

export interface EnergyInjected {
  datahora: string;
  dia: string;
  mes: string;
  ano: string;
  date: string;
  time: string;
  cogeracao: number;
  eolica: number;
  fotovoltaica: number;
  hidrica: number;
  outras_tecnologias: number;
  rede_dist: number;
}
