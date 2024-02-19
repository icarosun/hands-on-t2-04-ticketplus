import { Evento } from "@prisma/client";

export type EventoDto = Pick<
  Evento,
  "titulo" | "descricao" | "localizacao" | "vagas" | "faixaEtaria" | "preco"
>;

export type CreateEventoDto = Pick<
  Evento,
  | "titulo"
  | "descricao"
  | "localizacao"
  | "vagas"
  | "faixaEtaria"
  | "preco"
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
  | "preco"
  | "categoriaEventoId"
>;

export type UpdateVagasEventoDto = Pick<Evento, "vagas">;

export interface ReqEventoType {
  id: number;
  titulo: string;
  descricao: string;
  localizacao: string;
  vagas: number;
  preco: number;
  imageBase64: string;
  organizadorId: string;
  categoriaEventoId: number;
}
