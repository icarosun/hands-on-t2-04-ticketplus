import { Evento } from "@prisma/client";
import { CategoriaEvento } from "@prisma/client";

export type EventoDto = Pick<
  Evento,
  "titulo" | "descricao" | "vagas" | "faixaEtaria"
>;

export interface GetEventosType {
  id: number;
  titulo: string;
  descricao: string;
  localizacao: string;
  faixaEtaria: number;
  vagas: number;
  dataInicio: Date;
  dataFim: Date;
  CategoriaEvento: CategoriaEvento;
  quantidade?: number;
  imageUrl?: string;
}

export interface TipoTicketEventoType {
  tipoTicketId: number;
  quantidade: number;
  preco: number;
}

export interface CreateEventoReqType {
  titulo: string;
  descricao: string;
  localizacao: string;
  vagas: number;
  dataInicio: Date;
  dataFim: Date;
  faixaEtaria: number;
  imageBase64: string;
  categoriaEventoId: number;
  tiposTicketsEventos: TipoTicketEventoType[];
  cep: string;
  numero: number;
}

export interface UpdateEventoReqType {
  id: number;
  titulo: string;
  descricao: string;
  vagas: number;
  faixaEtaria: number;
  imageBase64: string;
  categoriaEventoId: number;
  tiposTicketsEventos: TipoTicketEventoType[];
}

export type CreateEventoDto = Pick<
  Evento,
  | "titulo"
  | "descricao"
  | "localizacao"
  | "faixaEtaria"
  | "vagas"
  | "dataInicio"
  | "dataFim"
  | "organizadorId"
  | "categoriaEventoId"
  | "enderecoEventoId"
>;

export type UpdateEventoDto = Pick<
  Evento,
  | "titulo"
  | "descricao"
  | "localizacao"
  | "faixaEtaria"
  | "vagas"
  | "dataInicio"
  | "dataFim"
  | "categoriaEventoId"
>;