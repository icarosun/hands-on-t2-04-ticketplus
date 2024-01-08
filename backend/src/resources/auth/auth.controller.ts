import { Request, Response } from "express";

import { findUsuarioByEmail } from "../usuario/usuario.services";
import { cadastrarUsuario, autenticar } from "./auth.service";
import { CadastroUsuarioDto } from "./auth.types";


const cadastrar = async (req: Request, res: Response) => {
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
		if (await findUsuarioByEmail(usuario.email))
			return res.status(409).json({ msg: "Ja existe um usuario cadastrado com o email informado" })
		const usuario = await cadastrarUsuario(req.body);
		res.status(201).json(usuario);
	} catch (error) {
		res.status(500).json(error);
	}
}
