import { Request, Response, NextFunction } from "express";


export function usuarioNaoAutenticado (req: Request, res: Response, next: NextFunction) {
    if (!req.session.uid) next();
    else res.status(401).json({ msg: "O usuario ja esta logado" });
}