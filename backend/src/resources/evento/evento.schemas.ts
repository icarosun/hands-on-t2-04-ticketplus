import Joi from "joi";

const eventoCamposSchema = {
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
    .regex(/;base64,/)
    .required()
}

const schemaCreateEvento = Joi.object(
  eventoCamposSchema
);

const schemaUpdateEvento = Joi.object(
  {
    ...eventoCamposSchema,
    id: Joi.number()
      .required()
  }
);

export default { schemaCreateEvento, schemaUpdateEvento};
