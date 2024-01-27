import { Compra } from "@prisma/client";

export type CreateCompraDto = Pick<
  Compra,
  | "usuarioId"
  | "ticketId"
  | "formaPagamento"
  | "valor"
  | "status"
>;

export type UpdateCompraDto = Pick<
  Compra,
  | "usuarioId"
  | "ticketId"
  | "formaPagamento"
  | "valor"
  | "status"
>;
