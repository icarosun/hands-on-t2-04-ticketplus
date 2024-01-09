import { Usuario, PrismaClient } from "@prisma/client";
import { genSalt, hash, compare } from "bcryptjs";

import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants"; //
import { CadastroUsuarioDto, LoginDto } from "./auth.types";
import { buscaUsuarioPorEmail } from "../usuario/usuario.service";

const prisma = new PrismaClient();


/*
	 * Campos do argumento usuario:
	 *	- nome
	 *	- sobrenome
	 *	- email
	 *	- senha
	 *	- tipo
	 *		-- comprador
	 *		-- organizador
	* */
export async function cadastrarUsuario (usuario: CadastroUsuarioDto): Promise<Usuario> {
	const rounds = parseInt(process.env.SALT_ROUNDS!);
	const salt = await genSalt(rounds);
	const senha = await hash(usuario.senha, salt);
	let tipoId: string = '';
	if (usuario.tipoId === TiposUsuarios.COMPRADOR) tipoId = TiposUsuarios.COMPRADOR_ID;
	else tipoId = TiposUsuarios.ORGANIZADOR_ID; // A validação do corpo da requisição garante que, neste ponto, o valor no campo "tipoUsuario" é apenas "comprador" ou "organizador"
	return await prisma.usuario.create({
		data: {
			...usuario,
			senha: senha,
			tipoId: tipoId
		}
	});
}

export async function autenticar (usuario: LoginDto): Promise<Usuario | null> {
	const usuarioEncontrado = await buscaUsuarioPorEmail(usuario.email);
	if (!usuarioEncontrado) return null;
	const ok = await compare(usuario.senha, usuarioEncontrado.senha);
	if (!ok) return null;
	return usuarioEncontrado;
}