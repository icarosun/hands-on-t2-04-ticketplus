import { Evento } from "@prisma/client";

export type EventoDto = Pick<
  Evento,
  "titulo" | "descricao" | "localizacao" | "vagas" | "faixaEtaria"
>;

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
  faixaEtaria: number;
  imageBase64: string;
  categoriaEventoId: number;
  tiposTicketsEventos: TipoTicketEventoType[];
}

export interface UpdateEventoReqType {
  id: number;
  titulo: string;
  descricao: string;
  localizacao: string;
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
  | "vagas"
  | "preco"
  | "faixaEtaria"
  | "organizadorId"
  | "categoriaEventoId"
>;

export type UpdateEventoDto = Pick<
  Evento,
  | "titulo"
  | "descricao"
  | "localizacao"
  | "vagas"
  | "faixaEtaria"
  | "categoriaEventoId"
>;
