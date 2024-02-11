import { Request, Response, NextFunction } from "express";
import { TiposUsuarios } from "../resources/tipoUsuario/tipoUsuario.constants";

export function isOrganizador (req: Request, res: Response, next: NextFunction) {
    if (req.session.tipoUsuarioId === TiposUsuarios.ORGANIZADOR_ID) next();
    else res.status(401).json({ msg: "O usuario nao e um organizador" });
}