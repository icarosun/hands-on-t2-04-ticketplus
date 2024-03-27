import {
  PrismaClient,
  Compra,
} from "@prisma/client";
import { CreateCompraDto } from "./compra.types";

const prisma = new PrismaClient();

export async function getCompraByPedidoId (
  pedidoId: string
): Promise<Compra| null> {
  return await prisma.compra.findFirst({
    where: {
      pedidoId
    }
  });
}

export async function createCompra (
  compra: CreateCompraDto
): Promise<Compra> {
  return await prisma.compra.create({
    data: {
      ...compra,
      ticketId: String(compra.ticketId)
    }
  });
};
