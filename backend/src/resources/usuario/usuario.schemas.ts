import Joi from "joi";

import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants";


const regexNomeSobrenome = "^[a-zA-Z\s]*$";
// const regexSenha = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]).*$";

const schemaCadastroUsuario = Joi.object({
	nome: Joi.string()
		.min(3)
		.max(100)
		.pattern(new RegExp(regexNomeSobrenome))
		.required(),
	/*sobrenome: Joi.string()
		.min(3)
		.max(300)
		.pattern(new RegExp(regexNomeSobrenome))
		.required(),*/
	email: Joi.string()
		.email()
		.required(),
	senha: Joi.string()
		.min(8)
		//.pattern(new RegExp(regexSenha))
		.required(),
	repeteSenha: Joi.ref('senha'),
	tipoUsuario: Joi.string()
		.valid(TiposUsuarios.ORGANIZADOR, TiposUsuarios.COMPRADOR)
		.required()
});

const schemaLoginUsuario = Joi.object({
    email: Joi.string()
		.email()
		.required(),
    senha: Joi.string()
		.required(),
});

export default { schemaCadastroUsuario, schemaLoginUsuario };