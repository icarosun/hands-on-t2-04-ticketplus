import Joi, { Schema } from "joi";
import { FormasPagamento } from "./compra.constants";

export const compraSchema: Schema = Joi.object({
  eventoId: Joi.number(),
  formaPagamento: Joi.string()
    .valid(
      FormasPagamento.BOLETO,
      FormasPagamento.CARTAO_CREDITO,
      FormasPagamento.PIX
    )
    .required(),
  tipoTicketId: Joi.string()
    .required()
});
