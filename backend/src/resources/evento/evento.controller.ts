import { Request, Response } from "express";
import { getAllEventos } from "./evento.service";
import { EventoDto } from "./evento.types";
import { getEventoService } from "./evento.service";

async function index(req: Request, res: Response) {
  /* #swagger.summary = 'Exibe todos os eventos.'
    #swagger.description = 'Exibe todos os eventos existentes no banco de dados'
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/ReturnReadAllEventos' }
  } */
  try {
    const eventos = await getAllEventos();
    return res.status(200).json(eventos);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function getEvento (req: Request, res: Response) {
  const idEvento = req.params.idEvento;
  try {
    const evento = await getEventoService(idEvento) as EventoDto;
    if (!evento)
      return res.status(404).json({ msg: "Evento nao encontrado" });
    const dadosEvento = {
      titulo: evento.titulo,
      descricao: evento.descricao,
      localizacao: evento.localizacao,
      preco: 10.0
    }
    return res.status(200).json(dadosEvento);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default { index, getEvento };
