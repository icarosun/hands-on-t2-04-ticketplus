import { Pedido } from "@prisma/client";
import { FormasPagamento } from "../compra/compra.constants";

export type CreatePedidoDto = Pick<
  Pedido,
  | "compradorId"
  | "eventoId"
  | "tipoTicketId"
  | "formaPagamento"
  | "quantidade"
  | "valor"
  | "status"
>;

export interface PedidoRes {
  id: string;
  status: string;
}

export interface CreatePedidoReqType {
  eventoId: number;
  quantity: number;
  formaPagamento:
    FormasPagamento.BOLETO
    | FormasPagamento.CARTAO_CREDITO
    | FormasPagamento.PIX;
  tipoTicketId: number;
}