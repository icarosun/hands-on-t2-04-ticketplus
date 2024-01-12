import { Compra } from "@prisma/client";

export type CreateCompraDto = Pick<Compra, "eventoId" | "usuarioId">;
export type UpdateCompraDto = Pick<Compra, "eventoId" | "usuarioId">;