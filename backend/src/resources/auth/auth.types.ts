import { Usuario } from "@prisma/client";


export type CadastroUsuarioDto = Pick<Usuario, "nome" | "sobrenome" | "email" | "senha" | "tipoUsuario">;
export type LoginDto = Pick<Usuario, "email" | "senha">;