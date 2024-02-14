import { Request, Response } from "express";
import dotenv from "dotenv";
import { createEvento, getAllEventos } from "./evento.service";
import { CreateEventoDto, EventoDto } from "./evento.types";
import { getEventoService } from "./evento.service";
import { Decimal } from "@prisma/client/runtime/library";
import { salvaImagem } from "../../utils/salvaImagem";

dotenv.config();

const PORT = process.env.PORT ?? 3000;

async function index(req: Request, res: Response) {
  /* #swagger.summary = 'Exibe todos os eventos.'
    #swagger.description = 'Exibe todos os eventos existentes no banco de dados'
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/ReturnReadAllEventos' }
  } */
  try {
    const eventos = await getAllEventos();
    const eventosData: object[] = []
    for (let i = 0; i < eventos.length; i++) {
      eventosData.push({
        ...eventos[i],
        imageUrl: `http://localhost:${PORT}/v1/img/events/${eventos[i].id}`
      })
    }
    return res.status(200).json(eventosData);
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
    const imageUrl = `http://localhost:${PORT}/v1/img/events/${idEvento}`;
    const dadosEvento = {
      titulo: evento.titulo,
      descricao: evento.descricao,
      localizacao: evento.localizacao,
      preco: evento.preco,
      imageUrl: imageUrl
    }
    return res.status(200).json(dadosEvento);
  } catch (error) {
    return res.status(500).json(error);
  }
}

interface EventoType {
  id: number;
  titulo: string;
  descricao: string;
  localizacao: string;
  preco: number;
  imageBase64: string;
  organizadorId: string;
  categoriaEventoId: number;
}

async function create (req: Request, res: Response) {
  /*
    #swagger.summary = 'Criar um evento.'
    #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/dfinitions/Evento'}
    }
  */
  const dadosEvento = req.body as EventoType;
  const organizadorId = req.session.uid;
  const evento = {
    titulo: dadosEvento.titulo,
    descricao: dadosEvento.descricao,
    localizacao: dadosEvento.localizacao,
    faixaEtaria: 10,
    preco: dadosEvento.preco as unknown as Decimal,
    organizadorId: organizadorId,
    categoriaEventoId: dadosEvento.categoriaEventoId
  } as CreateEventoDto;
  try {
    const novoEvento = await createEvento(evento);
    const imageBase64 = dadosEvento.imageBase64;
    const idEvento = novoEvento.id;
    const pastaEvents = `${__dirname.split('/resources/')[0]}/assets/img/events`;
    salvaImagem(`${pastaEvents}/${idEvento}`, imageBase64);
    return res.status(201).json({ msg: "Evento criado com sucesso" });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default { index, getEvento, create };
