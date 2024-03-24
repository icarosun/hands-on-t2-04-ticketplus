import Joi from "joi";

import { FormasPagamento } from "../compra/compra.constants";


const pedidoSchema = Joi.object({
    eventoId: Joi.number()
        .integer()
        .required(),
    quantity: Joi.number()
        .integer()
        .min(1)
        .max(5)
        .required(),
    formaPagamento: Joi.string().
        valid(
            FormasPagamento.BOLETO,
            FormasPagamento.CARTAO_CREDITO,
            FormasPagamento.PIX
        )
        .required(),
    tipoTicketId: Joi.number()
        .integer()
        .required()
});

export default pedidoSchema;