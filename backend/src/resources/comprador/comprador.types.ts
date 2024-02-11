import { Comprador } from "@prisma/client";


export type CompradorDto = Pick<Comprador,
    | "nome"
    | "email"
    | "senha"
    | "saldo"
>;

export type CreateCompradorDto = Pick<Comprador,
    | "nome"
    | "email"
    | "senha"
>;

export type UpdateCompradorDto = CompradorDto;