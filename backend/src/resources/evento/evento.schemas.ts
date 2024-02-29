import Joi from "joi";

const tiposTicketsEventosObj = Joi.object({
  tipoTicketId: Joi.number().required(),
  quantidade: Joi.number().required(),
  preco: Joi.number().required(),
});

const eventoCamposSchema = {
  titulo: Joi.string().min(3).max(100).required(),
  descricao: Joi.string().required(),
  localizacao: Joi.string().required(),
  faixaEtaria: Joi.number(),
  imageBase64: Joi.string()
    .regex(/;base64,/)
    .required(),
  categoriaEventoId: Joi.number()
    .integer(),
  tiposTicketsEventos: Joi.array()
    .items(tiposTicketsEventosObj)
    .min(1)
    .max(3)
}


const schemaCreateEvento = Joi.object(eventoCamposSchema);

const schemaUpdateEvento = Joi.object({
  ...eventoCamposSchema,
  id: Joi.number().required(),
});

export default { schemaCreateEvento, schemaUpdateEvento };
