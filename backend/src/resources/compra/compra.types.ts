import { Compra } from "@prisma/client";

export type CreateCompraDto = Pick<
  Compra,
  | "eventoId"
  | "usuarioId"
  | "qtdeIngressos"
  | "valorTotal"
  | "status"
  | "formaPagamento"
>;

export type UpdateCompraDto = Pick<
  Compra,
  | "eventoId"
  | "usuarioId"
  | "qtdeIngressos"
  | "valorTotal"
  | "status"
  | "formaPagamento"
>;
