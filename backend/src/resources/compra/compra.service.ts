import { PrismaClient, Compra } from "@prisma/client";
import { CreateCompraDto } from "./compra.types";

const prisma = new PrismaClient();


export const createCompra = async (
  compra: CreateCompraDto
): Promise<Compra> => {
  return await prisma.compra.create({ data: compra });
};
