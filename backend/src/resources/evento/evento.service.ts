import { PrismaClient, Evento, Compra, TipoTicket } from "@prisma/client";
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

export const getEventosByOrganizador = async (
  organizadorId: string | undefined
): Promise<Evento[] | null> => {
  if (organizadorId === undefined) return null;
  return await prisma.evento.findMany({
    where: { organizadorId }
  });
}

export const getCompraByEventoId = async (eventoId: number): Promise<Compra | null> => {
  return await prisma.compra.findFirst({
    where: { eventoId }
  })
}

export const createEvento = async (
  evento: CreateEventoDto
): Promise<Evento> => {
  return await prisma.evento.create({ data: evento });
}

export const updateEvento = async (
  idEvento: number,
  evento: UpdateEventoDto 
): Promise<Evento> => {
  return await prisma.evento.update({
    where: { id: idEvento },
    data: evento
  })
}

export const updateVagasEvento = async (
  idEvento: number,
  ocupacao: number
): Promise<Evento> => {
  return await prisma.evento.update({
    where: { id: idEvento },
    data: { vagas: { decrement: ocupacao } },
  });
};