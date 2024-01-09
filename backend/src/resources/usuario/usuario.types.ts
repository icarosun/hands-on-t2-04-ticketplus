import { Usuario } from "@prisma/client";


export type UsuarioDto = Pick<Usuario, "nome" | "sobrenome" | "email" | "senha" | "tipoUsuarioId">;
export type AtualizaUsuarioDto = UsuarioDto;