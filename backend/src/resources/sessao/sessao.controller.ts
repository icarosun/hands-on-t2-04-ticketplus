import { Request, Response } from "express";


export async function index (req: Request, res: Response) {
    const nomeUsuario = req.session.nomeUsuario;
    const sobrenomeUsuario = req.session.sobrenomeUsuario;
    const email = req.session.email;
    const saldo = req.session.saldo;
    const dadosSessaoUsuario = {
        nome: nomeUsuario,
        sobrenome: sobrenomeUsuario,
        email: email,
        saldo: saldo
    }
    res.status(200).json(dadosSessaoUsuario);
}

export default { index };