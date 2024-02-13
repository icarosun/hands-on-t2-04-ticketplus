import Joi from "joi";


const schemaLoginUsuario = Joi.object({
    email: Joi.string()
		.email()
		.required(),
    senha: Joi.string()
		.required(),
});

export default { schemaLoginUsuario };