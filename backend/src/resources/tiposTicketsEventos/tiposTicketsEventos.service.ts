import {
    PrismaClient,
    TiposTicketsEventos
} from "@prisma/client";

const prisma = new PrismaClient();

export async function createTiposTicketsEventos (tipoTicketEvento: TiposTicketsEventos) {
    return await prisma.tiposTicketsEventos.createMany({
        data: tipoTicketEvento
    })
}