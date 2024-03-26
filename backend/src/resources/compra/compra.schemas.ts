import Joi from "joi";

const compraSchema = Joi.object({
    pedidoId: Joi.string()
        .required()
});

export default { compraSchema };