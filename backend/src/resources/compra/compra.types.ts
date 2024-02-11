import { Compra } from "@prisma/client";

export type CreateCompraDto = Pick<
  Compra,
  | "compradorId"
  | "eventoId"
  | "ticketId"
  | "formaPagamento"
  | "valor"
  | "status"
>;

export type UpdateCompraDto = Pick<
  Compra,
  | "status"
>;
