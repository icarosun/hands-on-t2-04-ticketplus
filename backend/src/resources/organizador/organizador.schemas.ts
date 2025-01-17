import Joi from "joi";

const regexNomeSobrenome = "^[a-zA-Z\\s]*$";

const schemaCadastroOrganizador = Joi.object({
	nome: Joi.string()
		.min(3)
		.max(100)
		.pattern(new RegExp(regexNomeSobrenome))
		.required(),
	email: Joi.string()
		.email()
		.required(),
	senha: Joi.string()
		.min(8)
		//.pattern(new RegExp(regexSenha))
		.required(),
	repeteSenha: Joi.ref('senha'),
    conta: Joi.string()
        .regex(/^\d{4}|\d{20}-\d{1}$/)
        .required(),
    cnpj: Joi.string()
        .regex(/^\d{2}.\d{3}.\d{3}\/000[1-2]\-\d{2}$/)
        .required()
});


export default { schemaCadastroOrganizador };