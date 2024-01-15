import { Ticket, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTicketByEvento = async (eventoId: string): Promise<Ticket | null> => {
    return await prisma.ticket.findFirst({
        where: { 
            eventoId: eventoId
        },
    })
}