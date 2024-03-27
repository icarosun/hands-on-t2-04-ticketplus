import { HttpInstance } from "../utils/http";

export interface EventoType {
  id: string;
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

export async function searchEventosByTitulo(titulo: string): Promise<EventoType[]> {
    const res = await HttpInstance.http.get(`/evento/search/many?titulo=${titulo}`);
    return res.data;
}
