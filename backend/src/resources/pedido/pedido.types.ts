import { Pedido } from "@prisma/client";

export type CreatePedidoDto = Pick<
  Pedido,
  | "compradorId"
  | "eventoId"
  | "formaPagamento"
  | "valor"
  | "status"
>;