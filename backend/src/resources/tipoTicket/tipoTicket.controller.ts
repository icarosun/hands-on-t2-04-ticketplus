import { Request, Response } from "express";
import { getTiposTickets } from "./tipoTicket.service";

async function index (req: Request, res: Response) {
    try {
        const tiposTickets = await getTiposTickets();
        if (!tiposTickets)
            return res.status(404).json({ msg: "Nenhum tipo de ticket cadastrado" });
        return res.status(200).json(tiposTickets);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export default { index };