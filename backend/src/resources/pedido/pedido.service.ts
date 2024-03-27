import { Pedido, PrismaClient } from "@prisma/client";
import { CreatePedidoDto, PedidoRes } from "./pedido.types";

import { StatusPedido } from "./pedido.constants";

const prisma = new PrismaClient();

export async function createPedido (pedido: CreatePedidoDto): Promise<PedidoRes> {
    return await prisma.pedido.create({
        data: pedido
    });
}

export async function getPedidoById (id: string | undefined): Promise<Pedido | null> {
    if (!id) return null;
    return await prisma.pedido.findFirst({
        where: {
            id
        }
    });
}

export async function getPedidosByStatusAndCompradorId (
    compradorId: string,
    status: string
): Promise<Pedido[] | null> {
    return await prisma.pedido.findMany({
        where: {
            compradorId,
            status 
        }
    });
}

export async function updateStatusPedido (
    id: string,
    status: 
        | StatusPedido.PAGO
        | StatusPedido.AGUARDANDO_PAGAMENTO
        | StatusPedido.CANCELADO
): Promise<Pedido> {
    return await prisma.pedido.update({
        where: {
            id
        },
        data: {
            status
        }
    });
}