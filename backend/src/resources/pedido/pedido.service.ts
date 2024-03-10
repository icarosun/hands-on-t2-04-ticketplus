import { Pedido, PrismaClient } from "@prisma/client";
import { CreatePedidoDto } from "./pedido.types";

const prisma = new PrismaClient();

export async function createPedido (pedido: CreatePedidoDto): Promise<Pedido> {
    return await prisma.pedido.create({
        data: pedido
    })
}