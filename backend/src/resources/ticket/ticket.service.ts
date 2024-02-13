import { Ticket, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTicketByEvento = async (eventoId: number): Promise<Ticket | null> => {
    return await prisma.ticket.findFirst({
        where: { 
            eventoId: eventoId
        },
    })
}

export async function createTicketService (eventoId: number, tipoTicketId: number): Promise<Ticket> {
    return await prisma.ticket.create({
        data: {
            eventoId,
            tipoTicketId
        }
    })
}