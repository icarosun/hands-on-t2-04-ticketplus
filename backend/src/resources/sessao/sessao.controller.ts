import { Request, Response } from "express";

import { getCompradorByEmail } from "../comprador/comprador.service";


export async function index (req: Request, res: Response) {
    try {
        const nomeUsuario = req.session.nomeUsuario;
        const email = req.session.email;
        if (!nomeUsuario && !email)
            return res.status(308).json({});
        const compradorEncontrado = await getCompradorByEmail(email);
        if (compradorEncontrado) {
            const saldo = compradorEncontrado.saldo;
            const dadosSessaoUsuario = {
                nome: nomeUsuario,
                email: email,
                saldo: saldo
            }
            return res.status(200).json(dadosSessaoUsuario);
        } else {
            const dadosSessaoUsuario = {
                nome: nomeUsuario,
                email: email,
            }
            return res.status(200).json(dadosSessaoUsuario);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export default { index };