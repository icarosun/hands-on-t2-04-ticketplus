import { TiposTicketsEventos } from "@prisma/client";

export type TiposTicketsEventosDto = Pick<TiposTicketsEventos,
    | "eventoId"
    | "tipoTicketId"
    | "quantidade"
    | "preco"
>;