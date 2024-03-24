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
  faixaEtaria: Joi.number()
    .integer()
    .required(),
  imageBase64: Joi.string()
    .regex(/;base64,/)
    .required(),
  categoriaEventoId: Joi.number()
    .integer()
    .required(),
  tiposTicketsEventos: Joi.array()
    .items(tiposTicketsEventosObj)
    .min(1)
    .max(3),
  cep: Joi.string()
    .length(8)
    .required(),
  numero: Joi.number()
    .required(),
  dataInicio: Joi.string()
    .regex(/^([12]\d{3}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]Z)*$/)
    .required(),
  dataFim: Joi.string()
    .regex(/^([12]\d{3}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]Z)*$/)
    .required()
}


const schemaCreateEvento = Joi.object(eventoCamposSchema);

const schemaUpdateEvento = Joi.object({
  ...eventoCamposSchema,
  id: Joi.number().required(),
});

const schemaSearchEventosOrganizador = Joi.object({
  titulo: Joi.string()
});

export default { schemaCreateEvento, schemaUpdateEvento, schemaSearchEventosOrganizador };
