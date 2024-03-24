import { Request, Response } from "express";

import { getCompradorByEmail } from "../comprador/comprador.service";
import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants";


export async function index (req: Request, res: Response) {
    try {
        const nomeUsuario = req.session.nomeUsuario;
        const email = req.session.email;
        const tipoUsuarioId = req.session.tipoUsuarioId;
        if (!nomeUsuario && !email)
            return res.status(308).json({});
        const isComprador = tipoUsuarioId === TiposUsuarios.COMPRADOR_ID;
        if (isComprador) {
            const comprador = await getCompradorByEmail(email);
            const dadosSessaoUsuario = {
                nome: nomeUsuario,
                email: email,
                tipoUsuario: TiposUsuarios.COMPRADOR
            }
            return res.status(200).json(dadosSessaoUsuario);
        } else {
            const dadosSessaoUsuario = {
                nome: nomeUsuario,
                email: email,
                tipoUsuario: TiposUsuarios.ORGANIZADOR
            }
            return res.status(200).json(dadosSessaoUsuario);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export default { index };