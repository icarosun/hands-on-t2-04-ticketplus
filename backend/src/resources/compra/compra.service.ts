import { PrismaClient, Compra } from "@prisma/client";
import { CreateCompraDto } from "./compra.types";

const prisma = new PrismaClient();


export const getAllCompras = async (): Promise<Compra[] | null> => {
  return await prisma.compra.findMany();
}

export const createCompra = async (
  compra: CreateCompraDto
): Promise<Compra> => {
  return await prisma.compra.create({ data: compra });
};
