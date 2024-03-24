import Joi from "joi";

export const schemaEnderecosEventos = Joi.object({
    cep: Joi.string()
        .regex(/^(\d{8})*$/)
});