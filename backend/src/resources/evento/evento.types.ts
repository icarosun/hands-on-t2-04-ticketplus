import { Evento } from "@prisma/client";

export type EventoDto = Pick<Evento,
  | "titulo"
  | "descricao"
  | "localizacao"
  | "faixaEtaria"
  | "preco"
>;

export type CreateEventoDto = Pick<Evento, 
  "titulo" 
  | "descricao"
  | "localizacao"
  | "faixaEtaria"
  | "preco"
  | "organizadorId"
  | "categoriaEventoId"
 >; 

export type UpdateEventoDto = Pick<Evento, 
  "titulo" 
  | "descricao"
  | "localizacao"
  | "faixaEtaria"
  | "preco"
  | "categoriaEventoId"
 >;

export interface ReqEventoType {
  id: number;
  titulo: string;
  descricao: string;
  localizacao: string;
  preco: number;
  imageBase64: string;
  organizadorId: string;
  categoriaEventoId: number;
}