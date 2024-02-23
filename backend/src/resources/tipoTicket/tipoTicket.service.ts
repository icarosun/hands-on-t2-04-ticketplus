import {
    TipoTicket,
    PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient();

export async function getTipoTickets (): Promise<TipoTicket[]> {
    return await prisma.tipoTicket.findMany();
}