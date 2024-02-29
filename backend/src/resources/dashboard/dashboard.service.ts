import { PrismaClient, Evento, Compra, TipoTicket } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardEventoData = async (
  organizadorId: string | undefined,
  eventoId: number | undefined
): Promise<object | null> => {
  if (organizadorId === undefined) return null;
  return await prisma.evento.findUnique({
    where: { organizadorId, id: eventoId },
    select: {
      id: true,
      titulo: true,
    },
  });
};

export async function countAllTicketsByType(
  eventoId: number
): Promise<object | null> {
  return await prisma.ticket.groupBy({
    orderBy: { tipoTicketId: "asc" },
    by: ["tipoTicketId"],
    where: { eventoId },
    _count: { tipoTicketId: true },
  });
}

export async function getTotalTicketsCompradosEvento(
  eventoId: number
): Promise<object | null> {
  return await prisma.ticket.groupBy({
    by: ["eventoId"],
    _count: {
      eventoId: true,
    },
    where: {
      eventoId,
    },
  });
}

export async function getValorTotaldeVendas(
  eventoId: number
): Promise<object | null> {
  return await prisma.$queryRaw`SELECT SUM(a.preco) as valor FROM tipoTicketsEventos a JOIN tickets b on a.tipoTicketId = b.tipoTicketId and a.eventoId = b.eventoId
  where a.eventoId = ${eventoId};`;
}

export async function getVendidosPorTipoTicketsEvento(
  eventoId: number
): Promise<object | null> {
  return await prisma.ticket.groupBy({
    by: ["tipoTicketId"],
    _count: {
      tipoTicketId: true,
    },
    where: {
      eventoId,
    },
  });
}

export async function getTotalTicketsEvento(
  eventoId: number
): Promise<object | null> {
  return await prisma.tiposTicketsEventos.aggregate({
    //by: ["tipoTicketId"],
    where: {
      eventoId,
    },
    _sum: { quantidade: true },
  });
}

export async function getTotalPorTipoTicketsEvento(
  eventoId: number
): Promise<object | null> {
  return await prisma.tiposTicketsEventos.findMany({
    select: { tipoTicketId: true, quantidade: true },
    where: {
      eventoId,
    },
    orderBy: {
      tipoTicketId: "asc",
    },
  });
}

// retorna o preco e o tipo de ticket do evento
export async function getTicketPreco(eventoId: number): Promise<object | null> {
  return await prisma.tiposTicketsEventos.findMany({
    select: { tipoTicketId: true, preco: true },
    where: {
      eventoId,
    },
  });
}

export async function getTicketTypeOfEvento(
  eventoId: number
): Promise<object | null> {
  return await prisma.tiposTicketsEventos.findMany({
    orderBy: {
      tipoTicketId: "asc",
    },
    select: {
      tipoTicketId: true,
      tipoTicket: {
        select: {
          descricao: true,
        },
      },
    },
    where: {
      eventoId,
    },
  });
}
