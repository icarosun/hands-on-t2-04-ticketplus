import { Usuario, PrismaClient } from "@prisma/client";
import { genSalt, hash, compare } from "bcryptjs";

import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants"; //
import { CadastroUsuarioDto, LoginDto } from "./auth.types";
import { buscaUsuarioPorEmail } from "../usuario/usuario.service";

const prisma = new PrismaClient();


export async function cadastrarUsuario (usuario: CadastroUsuarioDto): Promise<Usuario> {
	/*
	 * Campos do argumento usuario:
	 *	- nome
	 *	- sobrenome
	 *	- email
	 *	- senha
	 *	- tipoUsuario
	 *		-- comprador
	 *		-- organizador
	* */
	const rounds = parseInt(process.env.SALT_ROUNDS!);
	const salt = await genSalt(rounds);
	const senha = await hash(usuario.senha, salt);
	let tipoUsuarioId: string = '';
	if (usuario.tipoUsuario === TiposUsuarios.COMPRADOR) tipoUsuarioId = TiposUsuarios.COMPRADOR_ID;
	else tipoUsuarioId = TiposUsuarios.ORGANIZADOR_ID; // A validação do corpo da requisição garante que, neste ponto, o valor no campo "tipoUsuario" é apenas "comprador" ou "organizador"
	return await prisma.usuario.create({
		data: {
			...usuario,
			senha: senha,
			tipoUsuarioId: tipoUsuarioId
		}
	});
}