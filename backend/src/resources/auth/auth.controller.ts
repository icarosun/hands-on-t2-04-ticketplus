import { Request, Response } from "express";

import { getCompradorByEmail } from "../comprador/comprador.service";
import { getOrganizadorByEmail } from "../organizador/organizador.service";
import { autenticar } from "./auth.service";
import {
	cadastrarCompradorService,
	cadastrarOrganizadorService
} from "./auth.service";
import { LoginDto } from "./auth.types";
import { CreateCompradorDto } from "../comprador/comprador.types";
import { CreateOrganizadorDto } from "../organizador/organizador.types";
import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants";

async function cadastrarComprador (req: Request, res: Response) {
	/*
   		#swagger.summary = 'Cadastra um usuário.'
   		#swagger.parameters['body'] = {
        	in: 'body',
        	schema: { $ref: '#/definitions/CadastraUsuario' }
   		}
  	*/
	const usuario = req.body as CreateCompradorDto;
	try {
		const compradorEncontrado = await getCompradorByEmail(usuario.email);
		const organizadorEncontrado = await getOrganizadorByEmail(usuario.email);
		if (compradorEncontrado || organizadorEncontrado)
			return res.status(409).json({ msg: "Ja existe um usuario cadastrado com o email informado" })
		await cadastrarCompradorService(req.body);
		return res.status(201).json({ msg: "Usuario cadastrado com sucesso" });
	} catch (error) {
		return res.status(500).json(error);
	}
}

async function cadastrarOrganizador (req: Request, res: Response) {
	/*
   		#swagger.summary = 'Cadastra um usuário.'
   		#swagger.parameters['body'] = {
        	in: 'body',
        	schema: { $ref: '#/definitions/CadastraUsuario' }
   		}
  	*/
	const usuario = req.body as CreateOrganizadorDto;
	try {
		const compradorEncontrado = await getCompradorByEmail(usuario.email);
		const organizadorEncontrado = await getOrganizadorByEmail(usuario.email);
		if (compradorEncontrado || organizadorEncontrado)
			return res.status(409).json({ msg: "Ja existe um usuario cadastrado com o email informado" })
		await cadastrarOrganizadorService(req.body);
		return res.status(201).json({ msg: "Usuario cadastrado com sucesso" });
	} catch (error) {
		return res.status(500).json(error);
	}
}

async function login (req: Request, res: Response) {
	/*
   		#swagger.summary = "Faz o login de usuário."
   		#swagger.parameters['body'] = {
			in: 'body',
			schema: { $ref: '#/definitions/Login' }
   		}
   */
	const credenciais = req.body as LoginDto;
	try {
		const usuario = await autenticar(credenciais);
		if (!usuario)
			return res.status(401).json({ msg: "Email e/ou senha invalidos" });
		req.session.uid = usuario.id;
		req.session.nomeUsuario = usuario.nome;
		req.session.email = usuario.email;
		const isComprador = !Object.keys(usuario).includes('cnpj');
		let tipoUsuario = ''
		if (isComprador) {
			req.session.tipoUsuarioId = TiposUsuarios.COMPRADOR_ID
			tipoUsuario = TiposUsuarios.COMPRADOR
		} else {
			req.session.tipoUsuarioId = TiposUsuarios.ORGANIZADOR_ID
			tipoUsuario = TiposUsuarios.ORGANIZADOR
		}
		return res.status(200).json({
			nome: usuario.nome,
			email: usuario.email,
			tipoUsuario: tipoUsuario
		});
	} catch (error) {
		return res.status(500).json(error);
	}
}

async function logout (req: Request, res: Response) {
	/*
		#swagger.summary = "Logout de usuário."
  	*/
	req.session.destroy((error) => {
		if (error) res.status(500).json(error);
		res.status(200).json({ msg: "Usuário deslogado com sucesso." });
	});
}

export default { cadastrarComprador, cadastrarOrganizador, login, logout };