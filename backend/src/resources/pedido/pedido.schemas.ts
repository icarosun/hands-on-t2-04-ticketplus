import Joi from "joi";

import { FormasPagamento } from "../compra/compra.constants";


const pedidoSchema = Joi.object({
    eventoID: Joi.string()
        .required(),
    quantity: Joi.number()
        .integer()
        .required(),
    formaPagamento: Joi.string().
        valid(
            FormasPagamento.BOLETO,
            FormasPagamento.CARTAO_CREDITO,
            FormasPagamento.PIX
        ).
        required(),
    tipoTicketId: Joi.number()
        .integer()
        .required()
});

export default pedidoSchema;