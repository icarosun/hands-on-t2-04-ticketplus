import { TotalTicketsComprados, PrismaClient } from "@prisma/client";  

const prisma = new PrismaClient();

export async function getTotalTicketsComprados (
    cpfComprador: string | undefined,
    eventoId: number
): Promise<TotalTicketsComprados | null> {
    return await prisma.totalTicketsComprados.findFirst({
        where: {
            cpfComprador,
            eventoId
        }
    });
}

export async function createTotalTicketsComprados (
    cpfComprador: string,
    eventoId: number,
    quantidade: number
): Promise<TotalTicketsComprados> {
    return prisma.totalTicketsComprados.create({
        data: {
            cpfComprador,
            eventoId,
            totalTicketsComprados: quantidade
        }
    });
}

export async function updateTotalTicketsComprados (
    cpfComprador: string,
    eventoId: number,
    quantidade: number
): Promise<TotalTicketsComprados> {
    return await prisma.totalTicketsComprados.update({
        where: {
            cpfComprador_eventoId: {
                cpfComprador,
                eventoId
            }
        },
        data: {
            totalTicketsComprados: {
                increment: quantidade
            }
        }
    });
}