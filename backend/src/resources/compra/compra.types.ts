import { Compra } from "@prisma/client";
import { FormasPagamento } from "./compra.constants";
import { Decimal } from "@prisma/client/runtime/library"; 

export type CreateCompraDto = Pick<
  Compra,
  | "pedidoId"
  | "ticketId"
>;

export interface CreateCompraType {
  eventoId: number,
  formaPagamento: string,
  compradorId: string,
  ticketId?: string,
  valor: number,
  status: "Pago" | "Aguardando pagamento" | "Cancelada",
}

export interface CreateCompraReqType {
  eventoId: number;
  ticketId: string;
  formaPagamento: 
    FormasPagamento.BOLETO
    | FormasPagamento.CARTAO_CREDITO
    | FormasPagamento.PIX;
  tipoTicketId: number;

  intent: string;
}
