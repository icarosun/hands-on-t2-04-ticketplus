import Joi from "joi";

const regexNomeSobrenome = "^[a-zA-Z\s]*$";
// const regexSenha = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]).*$";

const schemaCadastroComprador = Joi.object({
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
	repeteSenha: Joi.ref('senha')
});


export default { schemaCadastroComprador };