import { Request, Response } from "express";
import { getTiposTicketsEventosByEventoIdService } from "./tiposTicketsEventos.service";

async function read (req: Request, res: Response) {
    const eventoId = parseInt(req.params.eventoId);
    try {
        const tiposTicketsEvento = await getTiposTicketsEventosByEventoIdService(eventoId);
        if (!tiposTicketsEvento)
            return res.status(404).json({ msg: "Evento sem tipos de tickets cadastrados" });
        return res.status(200).json(tiposTicketsEvento);
    } catch (error) {
        return res.status(200).json(error);
    }
}

export default { read }
