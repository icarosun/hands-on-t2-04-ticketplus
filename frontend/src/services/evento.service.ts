import { HttpInstance } from "../utils/http";

export interface DetalhesEventoType {
  id: number;
  titulo: string;
  descricao: string;
  faixaEtaria:number;
  localizacao: string;
  categoriaEventoId: number;
  cep: string;
  numero: number;
  preco: number;
  data?: object;
  imageUrl: string;
}

export async function getDetalhesEvento(
  idEvento: number
): Promise<DetalhesEventoType | null> {
  return await HttpInstance.http.get(`/evento/${idEvento}`);
}

export async function getEventosByOrganizador() {
  return await HttpInstance.http.get("/evento/eventosOrganizador");
}

export async function getDashboardTitle(
  idEvento: number
): Promise<object | null> {
  return await HttpInstance.http.get(`/evento/dashboard/${idEvento}`);
}

export async function getDashboardGrafico(
  idEvento: number
): Promise<object | null> {
  return await HttpInstance.http.get(`/evento/grafico/${idEvento}`);
}

export async function updateEvento(
  idEvento: number,
  imageBase64: string,
  titulo: string,
  descricao: string,
  faixaEtaria:number,
  categoriaEventoId: number,
  localizacao:string,
  cep: string,
  numero: number,
  preco: number
) {
  console.log({
    id: idEvento,
    imageBase64,
    titulo,
    categoriaEventoId,
    faixaEtaria,
    descricao,
    localizacao,
    cep,
    numero,
    preco,
  });
  return await HttpInstance.http.put(`/evento/${idEvento}`, {
    id: idEvento,
    imageBase64,
    titulo,
    categoriaEventoId,
    faixaEtaria,
    descricao,
    localizacao,
    cep,
    numero,
    preco,
  });
}
