import { Comprador } from "@prisma/client";


export type CompradoroDto = Pick<Comprador,
    | "nome"
    | "email"
    | "senha"
    | "saldo"
>;

export type UpdateCompradoroDto = CompradoroDto;