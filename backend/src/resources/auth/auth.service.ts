import { Usuario, PrismaClient } from "@prisma/client";
import { genSalt, hash, compare } from "bcryptjs";

import { defineTipoUsuarioId } from "../../utils/defineTipoUsuarioId"; 
import { CadastroUsuarioDto, LoginDto } from "./auth.types";
import { buscaUsuarioPorEmail } from "../usuario/usuario.service";

const prisma = new PrismaClient();


export async function cadastrarUsuario (usuario: CadastroUsuarioDto): Promise<Usuario> {
	const rounds = parseInt(process.env.SALT_ROUNDS!);
	const salt = await genSalt(rounds);
	const senha = await hash(usuario.senha, salt);
	const tipoUsuarioId = defineTipoUsuarioId(usuario.tipoUsuario) // A validação do corpo da requisição garante que, neste ponto, o valor no campo "tipoUsuario" é apenas "comprador" ou "organizador"
	return await prisma.usuario.create({
		data: {
			nome: usuario.nome,
			email: usuario.email,
			senha: senha,
			saldo: usuario.saldo,
			tipoUsuario: tipoUsuarioId
		}
	});
}

export async function autenticar (credenciais: LoginDto): Promise<Usuario | null> {
	/**
	 *  Campos do argumento credenciais:
	 * 		- email
	 * 		- senha
	 */
	const usuarioEncontrado = await buscaUsuarioPorEmail(credenciais.email);
	if (!usuarioEncontrado) return null;
	const ok = await compare(credenciais.senha, usuarioEncontrado.senha);
	if (!ok) return null;
	return usuarioEncontrado;
}