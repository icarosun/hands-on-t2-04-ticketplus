import Joi, { Schema } from "joi";

export const compraSchema: Schema = Joi.object({
  eventoId: Joi.number(),
  formaPagamento: Joi.string()
    .valid(
      "PIX",
      "Cartão de Crédito",
      "Boleto"
    )
    .required(),
});
