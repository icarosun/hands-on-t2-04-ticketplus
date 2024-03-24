import { Request, Response, NextFunction } from "express";
import { TiposUsuarios } from "../resources/tipoUsuario/tipoUsuario.constants";

export function isComprador (req: Request, res: Response, next: NextFunction) {
    if (req.session.tipoUsuarioId === TiposUsuarios.COMPRADOR_ID) next();
    else return res.status(401).json({ msg: "O usuario nao e um comprador" });
}