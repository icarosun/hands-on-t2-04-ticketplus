import { PrismaClient, Evento, Compra, TipoTicket, Pedido } from "@prisma/client";
import { CreateEventoDto, UpdateEventoDto } from "./evento.types";
import { getDadosEnderecoByCEP } from "../endereco/endereco.service";
import { DadosEnderecoType } from "../endereco/endereco.types";

const prisma = new PrismaClient();

export async function getAllEventos(): Promise<Evento[]> {
  return await prisma.evento.findMany();
}

export async function getEvento(idEvento: number): Promise<Evento | null> {
  return await prisma.evento.findUnique({
    where: {
      id: idEvento,
    },
  });
}

export async function getEventosByOrganizador (
  organizadorId: string | undefined
): Promise<Evento[] | null> {
  if (organizadorId === undefined) return null;
  return await prisma.evento.findMany({
    where: { organizadorId },
  });
};

export async function searchEventosOrganizadorByTitulo (
  organizadorId: string | undefined,
  titulo: string
): Promise<Evento[]> {
  return await prisma.evento.findMany({
    where: {
      organizadorId,
      titulo: {
        search: titulo,
      },
    },
  })
}

export async function getEventoByCategoriaId (
  categoriaEventoId: number
): Promise<Evento[] | null> {
  return await prisma.evento.findMany({
    where: { categoriaEventoId }
  });
}

export const getPedidoByEventoId = async (
  eventoId: number
): Promise<Pedido | null> => {
  return await prisma.pedido.findFirst({
    where: { eventoId },
  });
};

export const createEvento = async (
  evento: CreateEventoDto
): Promise<Evento> => {
  return await prisma.evento.create({ data: evento });
};

export const updateEvento = async (
  idEvento: number,
  evento: UpdateEventoDto
): Promise<Evento> => {
  return await prisma.evento.update({
    where: { id: idEvento },
    data: evento,
  });
};

export const updateVagasEvento = async (
  idEvento: number,
  ocupacao: number
): Promise<Evento> => {
  return await prisma.evento.update({
    where: { id: idEvento },
    data: { vagas: { decrement: ocupacao } },
  });
};
