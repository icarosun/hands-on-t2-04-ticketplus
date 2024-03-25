import Joi from "joi";

const regexNomeSobrenome = "^[a-zA-Z\s]*$";
const regexCpf = "^[0-9]*$";
// const regexSenha = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]).*$";

const schemaCadastroComprador = Joi.object({
	nome: Joi.string()
		.min(3)
		.max(100)
		.pattern(new RegExp(regexNomeSobrenome))
		.required()
    .messages({
      'string.base': 'O nome de usuário deve ser uma string',
      'string.empty': 'O nome de usuário não pode estar vazio',
      'string.min': 'O nome de usuário deve ter no mínimo {#limit} caracteres',
      'string.max': 'O nome de usuário deve ter no máximo {#limit} caracteres',
      'string.pattern.base': 'O nome de usuário deve ser uma string',
      'any.required': 'O nome de usuário é obrigatório'
    }),
	/*sobrenome: Joi.string()
		.min(3)
		.max(300)
		.pattern(new RegExp(regexNomeSobrenome))
		.required(),*/
	email: Joi.string()
		.email()
		.required()
		.messages({
      'string.email': 'O email fornecido não é válido',
      'any.required': 'O email é obrigatório'
    }),
	cpf: Joi.string()
		.length(11)
		.pattern(new RegExp(regexCpf))
		.required(),
	senha: Joi.string()
		.min(8)
		//.pattern(new RegExp(regexSenha))
		.required()
    .messages({
      'string.pattern.base': 'A senha deve ter no mínimo 8 caracteres',
      'any.required': 'A senha é obrigatória'
    }),
	repeteSenha: Joi.ref('senha')
});


export default { schemaCadastroComprador };
