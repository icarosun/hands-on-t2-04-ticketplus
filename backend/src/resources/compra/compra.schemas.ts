import Joi, { Schema } from "joi";

export const compraSchema: Schema = Joi.object({
  usuarioId: Joi.string()
    .length(36)
    .required(),
  ticketId: Joi.string()
    .length(36)
    .required(),
  forma_pagamento: Joi.string()
    .valid(
      "PIX",
      "Cartão de Crédito",
      "Boleto"
    )
    .required(),
});
