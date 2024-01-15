import { Evento } from "@prisma/client";

export type EventoDto = Pick<Evento,
    | "titulo"
    | "localizacao"
    | "faixaEtaria"
    | "categoria"
>;