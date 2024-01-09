import { Request, Response } from "express";

import { buscaUsuarioPorEmail } from "../usuario/usuario.service";
import { cadastrarUsuario, autenticar } from "./auth.service";
import { CadastroUsuarioDto } from "./auth.types";


async function cadastrar (req: Request, res: Response) {
	/*
	 * Campos na requisição:
	 *	- nome
	 *	- sobrenome
	 *	- email
	 *	- senha
	 *	- tipoUsuario
	 *		-- comprador
	 *		-- organizador
	* */
	/* A requisição deve ser dropada caso:
	 *  - Algum campo estiver vazio
	 *  - Os campos primeiroNome/sobrenome apresentem caracteres numéricos ou especiais
	 *  - O campo email não apresente uma sintaxe de email correta
	 *  - A senha não seja forte o suficiente
	 *  - O campo de tipoUsuario seja diferente de "comprador" AND (&&) diferente de "organizador"
	*/ 	
	const usuario = req.body as CadastroUsuarioDto;
	try {
		if (await buscaUsuarioPorEmail(usuario.email))
			return res.status(409).json({ msg: "Ja existe um usuario cadastrado com o email informado" })
		await cadastrarUsuario(req.body);
		res.status(201).json({ msg: "Usuario cadastrado com sucesso" });
	} catch (error) {
		res.status(500).json(error);
	}
}
