import { Comprador } from "@prisma/client";


export type CompradorDto = Pick<Comprador,
    | "nome"
    | "email"
    | "cpf"
    | "senha"
>;

export type CreateCompradorDto = Pick<Comprador,
    | "nome"
    | "email"
    | "cpf"
    | "senha"
>;

export type UpdateCompradorDto = CompradorDto;