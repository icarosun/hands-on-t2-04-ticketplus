import { PrismaClient, Evento } from "@prisma/client";
import { CreateEventoDto } from "./evento.types";

const prisma = new PrismaClient();

export async function getAllEventos(): Promise<Evento[]> {
    return await prisma.evento.findMany();
}

export async function getEventoService (idEvento: number): Promise<Evento | null> {
    return await prisma.evento.findUnique({
        where: {
            id: idEvento
        }
    });
}

export const createEvento = async(
  evento: CreateEventoDto
) : Promise<Evento> => {
  return await prisma.evento.create({ data: evento });
}
