import Joi, { Schema } from "joi";

export const compraSchema: Schema = Joi.object({
  eventoId: Joi.string()
    .length(36)
    .required(),
  qtde_ingressos: Joi.number()
    .min(1)
    .required(),
  forma_pagamento: Joi.string()
    .valid(
      "PIX",
      "Cartão de Crédito",
      "Boleto"
    )
    .required(),
});
