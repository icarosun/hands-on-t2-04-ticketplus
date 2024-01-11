import { Request, Response } from "express"
import { getAllEventos } from "./evento.service"

const index = async (req: Request, res: Response) => {
    /* #swagger.summary = 'Exibe todos os eventos.' */
    try {
        const eventos = await getAllEventos();
        res.status(200).json(eventos);
    } catch (e) {
        res.status(500).json(e);
    }
}

export default { index };