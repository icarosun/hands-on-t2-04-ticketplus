import { Comprador, Organizador } from "@prisma/client";

export type LoginDto = Pick<Comprador | Organizador, "email" | "senha">;