import Joi, { Schema } from "joi";

export const compraSchema: Schema = Joi.object().keys({
  eventoId: Joi.string().length(36).required(),
  qtde_ingressos: Joi.number().min(1).required(),
  valor_total: Joi.number().precision(2).required(),
  status: Joi.string().max(50).required(),
  forma_pagamento: Joi.string().max(50).required(),
});