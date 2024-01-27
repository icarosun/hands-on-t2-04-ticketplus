import Joi from "joi";


const schemaGetEvento = Joi.object({
	idEvento: Joi.number()
		.required()
});

export default { schemaGetEvento };