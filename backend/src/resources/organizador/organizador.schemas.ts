import Joi from "joi";

const regexNomeSobrenome = "^[a-zA-Z\s]*$";
const regexConta = "^\d{4}\|\d{20}-\d{1}$";
const regexCPNJ = "^\d{2}.\d{3}.\d{3}\/000[1-2]\-\d{2}$";
// const regexSenha = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]).*$";

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
        .pattern(new RegExp(regexConta))
        .required(),
    cnpj: Joi.string()
        .pattern(new RegExp(regexCPNJ))
        .required()
});


export default { schemaCadastroOrganizador };