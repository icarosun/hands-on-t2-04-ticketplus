import {
  PrismaClient,
  Prisma,
  Evento,
  Compra,
  TipoTicket,
} from "@prisma/client";

const prisma = new PrismaClient({
  log: ["error"],
});

// SELECT b.titulo, COUNT(a.id) quant, SUM(a.valor) valor_total FROM pedidos a join eventos b on b.id = a.eventoId WHERE status = ${status} and b.organizadorId = ${organizadorId} GROUP BY a.eventoId ORDER BY quant DESC LIMIT 1;

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

// Receita Total
export async function getTotalReceitaEventos(
  organizadorId: string | undefined
): Promise<object | null> {
  return await prisma.$queryRaw`SELECT SUM(a.valor) valor FROM pedidos a join eventos b on b.id = a.eventoId and b.organizadorId = ${organizadorId} WHERE a.status = "Pago"`;
}

// Quantidade de Tickets Disponibilizados
export async function getTotalVagasEventos(
  organizadorId: string | undefined
): Promise<object | null> {
  return await prisma.evento.groupBy({
    by: ["organizadorId"],
    where: {
      organizadorId,
    },
    _sum: {
      vagas: true,
    },
  });
}

// Quantidade de Tickets Vendidos
export async function getTotalTicketsVendidos(
  organizadorId: string | undefined
): Promise<object | null> {
  return await prisma.evento.findMany({
    select: {
      _count: {
        select: {
          pedidos: {
            where: {
              status: "Pago",
            },
          },
        },
      },
    },
    where: {
      organizadorId,
    },
  });
}

export async function getMelhorEvento(
  organizadorId: string | undefined
): Promise<object | null> {
  if (organizadorId === undefined) return null;
  return await prisma.evento.findMany({
    select: {
      titulo: true,
      _count: {
        select: {
          pedidos: {
            where: {
              status: "Pago",
            },
          },
        },
      },
    },
    where: {
      organizadorId,
    },
  });
}

export async function getTabelaGeralEventos(
  organizadorId: string | undefined
): Promise<object | null> {
  if (organizadorId === undefined) return null;
  return await prisma.$queryRaw`select a.titulo, b.created_at, b.formaPagamento, c.descricao, b.status, b.valor from eventos a join pedidos b on a.id = b.eventoId join tipoTickets c on b.tipoTicketId = c.id where organizadorId = ${organizadorId}`;
}

// Individual
export async function getTabelaGeralIndividual(
  organizadorId: string | undefined,
  eventoId: number
): Promise<object | null> {
  if (organizadorId === undefined) return null;
  return await prisma.evento.findMany({
    select: {
      pedidos: {
        select: {
          createdAt: true,
          formaPagamento: true,
          status: true,
          valor: true,
        },
      },
    },
    where: {
      organizadorId,
      id: eventoId,
    },
  });
}

export async function getEventosXGrafico(
  organizadorId: string | undefined
): Promise<object | null> {
  return await prisma.evento.findMany({
    select: {
      titulo: true,
    },
    where: {
      organizadorId,
    },
  });
}
