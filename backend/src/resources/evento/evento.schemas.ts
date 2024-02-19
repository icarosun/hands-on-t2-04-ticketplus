import Joi from "joi";

const eventoCamposSchema = {
  titulo: Joi.string().min(3).max(100).required(),
  descricao: Joi.string().required(),
  localizacao: Joi.string().required(),
  vagas: Joi.number().required(),
  faixaEtaria: Joi.number(),
  preco: Joi.number().required(),
  imageBase64: Joi.string().required(),
  categoriaEventoId: Joi.number().integer().required(),
};

const schemaCreateEvento = Joi.object(eventoCamposSchema);

const schemaUpdateEvento = Joi.object(eventoCamposSchema);

export default { schemaCreateEvento, schemaUpdateEvento };
