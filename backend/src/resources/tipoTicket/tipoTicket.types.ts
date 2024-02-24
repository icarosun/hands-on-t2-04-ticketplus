import { TipoTicket } from "@prisma/client";

export type CreateTipoTicketDto = Pick<TipoTicket,
    | "descricao"
>;