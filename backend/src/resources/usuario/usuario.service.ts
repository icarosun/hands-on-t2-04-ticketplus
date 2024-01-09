import { PrismaClient, Usuario } from "@prisma/client"; //
import { genSalt, hash } from "bcryptjs"; //

import { CadastroUsuarioDto, AtualizaUsuarioDto, UsuarioDto } from "./usuario/types";
import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants"; //

const prisma = new PrismaClient();


export async function findUsuarioByEmail (email: string): Promise<Usuario | null> {
	return await prisma.usuario.findUnique({
		where: { email }
	});
} 
