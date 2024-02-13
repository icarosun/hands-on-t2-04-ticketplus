import { PrismaClient, Evento } from "@prisma/client";
import { CreateEventoDto, UpdateEventoDto } from "./evento.types";

const prisma = new PrismaClient();

export async function getAllEventos(): Promise<Evento[]> {
    return await prisma.evento.findMany();
}

export async function getEvento (idEvento: number): Promise<Evento | null> {
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

export const updateEvento = async(
  idEvento: number, evento: UpdateEventoDto 
) : Promise<Evento> => {
  return await prisma.evento.update({
    where: { id: idEvento },
    data: evento
  })
} 
