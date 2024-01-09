import { Request, Response } from "express";
import { Schema } from "joi";

function validarSchema (schema: Schema) {
    return (req: Request, res: Response) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false
        });
        if (error) res.status
    }
}