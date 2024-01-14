import { Compra } from "@prisma/client";

export type CreateCompraDto = Pick<
  Compra,
  | "eventoId"
  | "usuarioId"
  | "qtde_ingressos"
  | "valor_total"
  | "status"
  | "forma_pagamento"
>;

export type UpdateCompraDto = Pick<
  Compra,
  | "eventoId"
  | "usuarioId"
  | "qtde_ingressos"
  | "valor_total"
  | "status"
  | "forma_pagamento"
>;