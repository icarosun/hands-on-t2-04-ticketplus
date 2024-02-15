import Joi from "joi";

const creatEventoCamposSchema = {
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
}

const schemaCreateEvento = Joi.object(
  creatEventoCamposSchema
);

const schemaUpdateEvento = Joi.object({
  ...creatEventoCamposSchema,
  id: Joi.number()
    .required()
});

export default { schemaCreateEvento, schemaUpdateEvento};
