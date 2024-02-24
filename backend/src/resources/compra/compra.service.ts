import {
  PrismaClient,
  Compra,
  TiposTicketsEventos
} from "@prisma/client";
import { CreateCompraDto } from "./compra.types";

const prisma = new PrismaClient();


export const getComprasByCompradorId = async (compradorId: string): Promise<Compra[] | null> => {
  return await prisma.compra.findMany({
    include: {
      evento: true,
      comprador: true
    },
    where: {
      compradorId
    }
  });
}

export async function createCompra (
  compra: CreateCompraDto
): Promise<Compra> {
  return await prisma.compra.create({ data: compra });
};

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
