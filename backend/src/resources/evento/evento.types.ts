import { Evento } from "@prisma/client";

export type EventoDto = Pick<Evento,
  | "titulo"
  | "descricao"
  | "localizacao"
  | "faixaEtaria"
  | "preco"
>;

export type CreateEventoDto = Pick<Evento, 
  | "titulo" 
  | "descricao"
  | "localizacao"
  | "faixaEtaria"
  | "preco"
  | "organizadorId"
  | "categoriaEventoId"
 >;
