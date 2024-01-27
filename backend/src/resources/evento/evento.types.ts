import { Evento } from "@prisma/client";

export type EventoDto = Pick<Evento,
  | "titulo"
  | "descricao"
  | "localizacao"
  | "categoria"
  | "faixaEtaria"
  | "preco"
>;
