import { Request, Response, NextFunction } from "express";
import { validate } from "gerador-validador-cpf";

export function isCPFValid (
    req: Request,
    res: Response,
    next: NextFunction
) {
    const cpf = req.body.cpf;
    const cpfValido = validate(cpf);
    if (cpfValido) next();
    else return res.status(401).json({ msg: "CPF invalido" });
}