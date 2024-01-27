import { Request, Response } from "express";
import { buscaUsuarioPorEmail } from "../usuario/usuario.service";


export async function index (req: Request, res: Response) {
    const nomeUsuario = req.session.nomeUsuario;
    const sobrenomeUsuario = req.session.sobrenomeUsuario;
    const email = req.session.email;
    const usuario = await buscaUsuarioPorEmail(email);
    const saldo = usuario?.saldo;
    const dadosSessaoUsuario = {
        nome: nomeUsuario,
        sobrenome: sobrenomeUsuario,
        email: email,
        saldo: saldo
    }
    res.status(200).json(dadosSessaoUsuario);
}

export default { index };