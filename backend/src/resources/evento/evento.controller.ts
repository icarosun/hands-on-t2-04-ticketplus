import { Request, Response } from "express";
import { createEvento, getAllEventos } from "./evento.service";
import { CreateEventoDto, EventoDto } from "./evento.types";
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
  const idEvento = parseInt(req.params.idEvento);
  try {
    const evento = await getEventoService(idEvento) as EventoDto;
    if (!evento)
      return res.status(404).json({ msg: "Evento nao encontrado" });
    const dadosEvento = {
      titulo: evento.titulo,
      descricao: evento.descricao,
      localizacao: evento.localizacao,
      preco: evento.preco,
      imageUrl: evento.imageUrl
    }
    return res.status(200).json(dadosEvento);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function create (req: Request, res: Response) {
  /*
    #swagger.summary = 'Criar um evento.'
    #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/dfinitions/Evento'}
    }
  */

  const dadosEvento = req.body;
  const organizadorId = req.session.uid;

  const evento = {
    ...dadosEvento,
    organizadorId,
  } as CreateEventoDto;

  try {
    const novoEvento = await createEvento(evento);   

    return res.status(201).json({
      "id": novoEvento.id,
      "titulo": novoEvento.titulo,
      "descricao": novoEvento.descricao,
      "localizacao": novoEvento.localizacao,
      "faixaEtaria": novoEvento.faixaEtaria,
      "preco": novoEvento.preco,
      "imageUrl": novoEvento.imageUrl,
      "categoriaEventoId": novoEvento.categoriaEventoId,
      "createdAt": novoEvento.createdAt,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default { index, getEvento, create };
