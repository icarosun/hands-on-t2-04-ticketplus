import { Request, Response } from "express";

import { getSessaoUsuario } from "./sessao.service";

export async function index (req: Request, res: Response) {
    const idUsuario = req.session.uid as string;
    const sessaoUsuario = await getSessaoUsuario(idUsuario);
    const dadosSessaoUsuario = {
        nome: sessaoUsuario?.nome as string,
        sobrenome: sessaoUsuario?.sobrenome as string,
        email: sessaoUsuario?.email as string
    }
    res.status(200).json(dadosSessaoUsuario);
}

export default { index };