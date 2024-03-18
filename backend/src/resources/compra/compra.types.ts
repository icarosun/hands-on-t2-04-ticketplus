import { Compra } from "@prisma/client";

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
