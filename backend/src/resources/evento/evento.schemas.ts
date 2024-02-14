import Joi from "joi";

const schemaCreateEvento = Joi.object({
  titulo: Joi.string()
    .min(3)
    .max(100)
    .required(),
  descricao: Joi.string()
    .required(),
  localizacao: Joi.string()
    .required(),
  faixaEtaria: Joi.number(),
  preco: Joi.number()
    .required(),
  imageBase64: Joi.string()
    .required(),
  categoriaEventoId: Joi.number()
    .integer()
    .required()
});

const schemaGetEvento = Joi.object({
	idEvento: Joi.number()
		.required()
});

export default { schemaCreateEvento, schemaGetEvento};
