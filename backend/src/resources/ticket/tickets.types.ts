import { Ticket } from "@prisma/client";

export type TicketDto = Pick<Ticket,
    | "eventoId"
>;