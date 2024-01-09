import { Usuario } from "@prisma/client";

export type CadastroUsuarioDto = Pick<Usuario, "nome" | "sobrenome" | "email" | "senha" | "tipoId">;
export type LoginDto = Pick<Usuario, "email" | "senha">;