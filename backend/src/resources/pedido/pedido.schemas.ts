import Joi from "joi";

import { FormasPagamento } from "../compra/compra.constants";


const pedidoSchema = Joi.object({
    eventoId: Joi.number()
        .integer()
        .required(),
    quantity: Joi.number()
        .integer()
        .required(),
    formaPagamento: Joi.string().
        valid(
            FormasPagamento.BOLETO,
            FormasPagamento.CARTAO_CREDITO,
            FormasPagamento.PIX
        ),
    tipoTicketId: Joi.number()
        .integer()
        .required()
});

export default pedidoSchema;