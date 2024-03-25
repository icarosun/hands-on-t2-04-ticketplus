
export interface GetEventoReqType {
  id: number;
  titulo: string;
  descricao: string;
  localizacao: string;
  faixaEtaria: number;
  vagas: number;
  dataInicio: Date;
  dataFim: Date;
  categoria: string;
  imageUrl: string;
}