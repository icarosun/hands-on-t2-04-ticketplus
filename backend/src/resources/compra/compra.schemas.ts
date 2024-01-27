import Joi, { Schema } from "joi";

export const compraSchema: Schema = Joi.object({
  eventoId: Joi.string()
    .length(36)
    .required(),
  formaPagamento: Joi.string()
    .valid(
      "PIX",
      "Cartão de Crédito",
      "Boleto"
    )
    .required(),
});
