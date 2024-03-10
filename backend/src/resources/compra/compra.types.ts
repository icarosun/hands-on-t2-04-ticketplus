import { Compra } from "@prisma/client";
import { FormasPagamento } from "./compra.constants";
import { Decimal } from "@prisma/client/runtime/library"; 

export type CreateCompraDto = Pick<
  Compra,
  | "compradorId"
  | "eventoId"
  | "ticketId"
  | "formaPagamento"
  | "valor"
  | "status"
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

export type UpdateCompraDto = Pick<
  Compra,
  | "status"
>;
