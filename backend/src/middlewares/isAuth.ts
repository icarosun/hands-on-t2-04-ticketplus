import { Request, Response, NextFunction } from "express";


export function isAuth (req: Request, res: Response, next: NextFunction) {
    if (req.session.uid) next();
    else res.status(401).json({ msg: "O usuario nao esta logado" });
}