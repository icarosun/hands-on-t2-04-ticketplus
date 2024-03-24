import { Request, Response } from "express";
import { getEnderecosEventosByCEP } from "./enderecosEventos.service";
import { Evento } from "@prisma/client";
import { EnderecosEventosType } from "./enderecosEventos.types";

async function readEventoByCidade (req: Request, res: Response) {
    const cep = req.body.cep;
    try {
        let enderecosEventos = await getEnderecosEventosByCEP(cep);
        if (enderecosEventos === undefined)
            return res.status(400).json({ msg: "CEP invalido" });
        else if (enderecosEventos === null || enderecosEventos.length === 0)
            return res.status(404).json({ msg: "Nenhum evento encontrado para o CEP informado" });
        const eventosRes: any[] = [];
        for (const enderecoEvento of enderecosEventos) {
            const eventos = (enderecoEvento as unknown as EnderecosEventosType).eventos;
            eventosRes.push(eventos);
        }
        return res.status(200).json(eventosRes);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export default { readEventoByCidade }