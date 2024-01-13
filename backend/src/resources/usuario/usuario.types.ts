import { Usuario } from "@prisma/client";


export type UsuarioDto = Pick<Usuario, "nome" | "sobrenome" | "email" | "senha" | "tipoUsuario">;
export type AtualizaUsuarioDto = UsuarioDto;