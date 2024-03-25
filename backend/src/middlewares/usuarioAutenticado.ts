import { Request, Response, NextFunction } from "express";


export function usuarioAutenticado (req: Request, res: Response, next: NextFunction) {
    if (req.session.uid) next();
    else return res.status(401).json({ msg: "O usuario nao esta logado" });
}