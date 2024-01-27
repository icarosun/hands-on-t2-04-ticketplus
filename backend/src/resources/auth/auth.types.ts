import { Usuario } from "@prisma/client";


export type CadastroUsuarioDto = Pick<Usuario,
    | "nome"
    | "email"
    | "senha"
    | "tipoUsuario"
    | "saldo"
>;
export type LoginDto = Pick<Usuario, "email" | "senha">;