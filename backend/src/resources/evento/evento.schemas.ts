import Joi from "joi";


const schemaGetEvento = Joi.object({
	idEvento: Joi.string()
		.required()
});

export default { schemaGetEvento };