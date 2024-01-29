import { Request, Response } from "express";
import { buscaUsuarioPorEmail } from "../usuario/usuario.service";


export async function index (req: Request, res: Response) {
    try {
        const nomeUsuario = req.session.nomeUsuario;
        const sobrenomeUsuario = req.session.sobrenomeUsuario;
        const email = req.session.email;
        const usuario = await buscaUsuarioPorEmail(email);
        if (usuario === null) return res.status(308).json({});
        const saldo = usuario?.saldo;
        const dadosSessaoUsuario = {
            nome: nomeUsuario,
            sobrenome: sobrenomeUsuario,
            email: email,
            saldo: saldo
        }
        return res.status(200).json(dadosSessaoUsuario);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export default { index };