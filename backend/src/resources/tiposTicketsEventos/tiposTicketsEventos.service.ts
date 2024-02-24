import {
    PrismaClient,
    TiposTicketsEventos
} from "@prisma/client";

const prisma = new PrismaClient();

export async function getTipoTicketEvento (
    eventoId: number,
    tipoTicketId: number
  ): Promise<TiposTicketsEventos | null> {
    return await prisma.tiposTicketsEventos.findFirst({
      where: {
        eventoId,
        tipoTicketId
      }
    });
  }

export async function createTiposTicketsEventos (tipoTicketEvento: TiposTicketsEventos) {
    return await prisma.tiposTicketsEventos.createMany({
        data: tipoTicketEvento
    })
}

export async function updateQuantidadeTiposTicketsEventos (
    eventoId: number,
    tipoTicketId: number,
    decremento: number
): Promise<TiposTicketsEventos> {
    return await prisma.tiposTicketsEventos.update({
        where: {
            eventoId_tipoTicketId: {
                tipoTicketId,
                eventoId
            }
        },
        data: { quantidade: { decrement: decremento } },
    });
}