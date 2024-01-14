import { Request, Response } from "express";

import { buscaUsuarioPorEmail } from "../usuario/usuario.service";
import { cadastrarUsuario, autenticar } from "./auth.service";
import { CadastroUsuarioDto, LoginDto } from "./auth.types";
import { defineTipoUsuarioId } from "../../utils/defineTipoUsuarioId";

async function cadastrar (req: Request, res: Response) {
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

async function login (req: Request, res: Response) {
	/**
	 *  Campos na requisição:
	 * 		- email
	 * 		- senha
	 */
	const credenciais = req.body as LoginDto;
	try {
		const usuario = await autenticar(credenciais);
		if (!usuario)
			return res.status(401).json({ msg: "Email e/ou senha invalidos" });
		const tipoUsuarioId = defineTipoUsuarioId(usuario.tipoUsuario);
		req.session.uid = usuario.id;
		req.session.nomeUsuario = usuario.nome;
		req.session.sobrenomeUsuario = usuario.sobrenome;
		req.session.email = usuario.email;
		req.session.tipoUsuarioId = tipoUsuarioId;
		res.status(200).json({ msg: "Login realizado com sucesso" });
	} catch (error) {
		res.status(500).json(error);
	}
}

async function logout (req: Request, res: Response) {
	req.session.destroy((error) => {
		if (error) res.status(500).json({ msg: "Erro ao tentar efetuar o logout" });
		return res.status(200).json({ msg: "Usuario deslogado com sucesso" });
	})
}

export default { cadastrar, login, logout };