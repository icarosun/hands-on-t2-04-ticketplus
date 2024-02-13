import { Comprador, Organizador, PrismaClient } from "@prisma/client";
import { genSalt, hash, compare } from "bcryptjs";

import { LoginDto } from "./auth.types";
import { CreateCompradorDto } from "../comprador/comprador.types";
import { CreateOrganizadorDto } from "../organizador/organizador.types";
import { getCompradorByEmail } from "../comprador/comprador.service";
import { getOrganizadorByEmail } from "../organizador/organizador.service";

const prisma = new PrismaClient();


export async function cadastrarCompradorService (comprador: CreateCompradorDto): Promise<Comprador> {
	const nome = comprador.nome;
	const email = comprador.email;
	const rounds = parseInt(process.env.SALT_ROUNDS!);
	const salt = await genSalt(rounds);
	const senha = await hash(comprador.senha, salt);
	return await prisma.comprador.create({
		data: {
			nome: nome,
			email: email,
			senha: senha,
			saldo: 0
		}
	});
}

export async function cadastrarOrganizadorService (organizador: CreateOrganizadorDto): Promise<Organizador> {
	const nome = organizador.nome;
	const email = organizador.email;
	const rounds = parseInt(process.env.SALT_ROUNDS!);
	const salt = await genSalt(rounds);
	const senha = await hash(organizador.senha, salt);
	const conta = organizador.conta;
	const cnpj = organizador.cnpj;
	return await prisma.organizador.create({
		data: {
			nome: nome,
			email: email,
			senha: senha,
			conta: conta,
			cnpj: cnpj
		}
	});
}

export async function autenticar (credenciais: LoginDto): Promise<Comprador | Organizador | null> {
	let usuarioEncontrado: Comprador | Organizador | null = null;
	const compradorEncontrado = await getCompradorByEmail(credenciais.email);
	if (compradorEncontrado) {
		usuarioEncontrado = compradorEncontrado;
	} else {
		const organizadorEncontrado = await getOrganizadorByEmail(credenciais.email);
		usuarioEncontrado = organizadorEncontrado;
	}
	if (!usuarioEncontrado) return null;
	const ok = await compare(credenciais.senha, usuarioEncontrado.senha);
	if (!ok) return null;
	return usuarioEncontrado;
}