import { TipoTicket, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createTipoTicket (eventoId: number, descricao: string): Promise<TipoTicket> {
    return await prisma.tipoTicket.create({
        data: {
            eventoId,
            descricao
        }
    });
}