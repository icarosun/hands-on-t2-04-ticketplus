import { Pedido } from "@prisma/client";
import { FormasPagamento } from "../compra/compra.constants";

export type CreatePedidoDto = Pick<
  Pedido,
  | "compradorId"
  | "eventoId"
  | "formaPagamento"
  | "valor"
  | "status"
  | "tipoTicketId"
>;

export interface CreatePedidoReqType {
  eventoId: number;
  ticketId: string;
  formaPagamento: 
    FormasPagamento.BOLETO
    | FormasPagamento.CARTAO_CREDITO
    | FormasPagamento.PIX;
  tipoTicketId: number;
  intent: string;
}