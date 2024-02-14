import { Request, Response } from "express";
import { getAllOrganizadores } from "./organizador.service";
import { getEventosByOrganizador } from "../evento/evento.service";

export async function index(req: Request, res: Response) {
  /*
        #swagger.summary = "Exibe todos os organizadores."
        #swagger.responses[200] = {
   	        schema: { $ref: '#/definitions/Organizadores' }
        }
    */
  try {
    const organizadores = await getAllOrganizadores();
    return res.status(200).json(organizadores);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function readEventosByOrganizador (req: Request, res: Response) {
  /* #swagger.summary = 'Exibe todos os eventos criados pelo organizador.'
        #swagger.responses[200] = {
          schema: { $ref: '#/definitions/ReturnReadAllEventos' }
  } */

  const organizadorId = req.session.uid;

  if(!organizadorId) return res.status(401).json({ msg: "O usuario nao esta logado" });

  try {
    const eventos = await getEventosByOrganizador(organizadorId);
    return res.status(200).json(eventos);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default { index, readEventosByOrganizador };
