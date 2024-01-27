import { Usuario } from "@prisma/client";


export type UsuarioDto = Pick<Usuario,
    | "nome"
    | "email"
    | "senha"
    | "tipoUsuario"
    | "saldo"
>;

export type UpdateUsuarioDto = UsuarioDto;