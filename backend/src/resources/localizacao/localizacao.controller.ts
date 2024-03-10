import { Request, Response } from "express";
import { getLocalizacaoByCEP } from "./localizacao.service";

async function read (req: Request, res: Response) {
    const CEP = req.params.CEP;
    try {
        const localizacao = await getLocalizacaoByCEP(CEP);
        console.log(localizacao);
        if (!localizacao)
            return res.status(404).json({ msg: "CEP inválido" });
        return res.status(200).json(localizacao);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export default { read }