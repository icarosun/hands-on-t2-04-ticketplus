import { Evento } from "@prisma/client";

export type EventoDto = Pick<Evento,
  | "titulo"
  | "descricao"
  | "localizacao"
  | "faixaEtaria"
  | "preco"
  | "imageUrl"
>;

export type CreateEventoDto = Pick<Evento, 
  "titulo" 
  | "descricao"
  | "localizacao"
  | "faixaEtaria"
  | "preco"
  | "imageUrl"
  | "organizadorId"
  | "categoriaEventoId"
 >; 

export type UpdateEventoDto = Pick<Evento, 
  "titulo" 
  | "descricao"
  | "localizacao"
  | "faixaEtaria"
  | "preco"
  | "imageUrl"
  | "categoriaEventoId"
 >; 

