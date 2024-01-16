import { Request, Response } from "express";
import { getAllEventos } from "./evento.service";

const index = async (req: Request, res: Response) => {
  /* #swagger.summary = 'Exibe todos os eventos.'
    #swagger.description = 'Exibe todos os eventos existentes no banco de dados'
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/ReturnReadAllEventos' }
  } */
  try {
    const eventos = await getAllEventos();
    return res.status(200).json(eventos);
  } catch (e) {
    return res.status(500).json(e);
  }
};

export default { index };
