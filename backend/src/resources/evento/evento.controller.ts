import { Request, Response } from "express";
import dotenv from "dotenv";
import {
  createEvento,
  getAllEventos,
  getEvento,
  updateEvento,
  removeEvento
} from "./evento.service";
import {
    EventoDto,
    CreateEventoDto,
    UpdateEventoDto
} from "./evento.types";
import { Decimal } from "@prisma/client/runtime/library";
import { ReqEventoType } from "./evento.types";
import {
  salvaImagemEvento,
  excluiImagemEvento
} from "./eventos.utils";

dotenv.config();

const PORT = process.env.PORT ?? 3000;

async function index (req: Request, res: Response) {
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

async function read (req: Request, res: Response) {
  /* #swagger.summary = 'Recupera dados de um evento específico.'
   #swagger.parameters['idEvento'] = { description: 'Id do evento'}
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Evento' }
  } */

  const idEvento = parseInt(req.params.idEvento);
  try {
    const evento = await getEvento(idEvento) as EventoDto;
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

async function create (req: Request, res: Response) {
  /*
    #swagger.summary = 'Criar um evento.'
    #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/CreateEventoDto'}
    }
    #swagger.responses[201] = {
      schema: { $ref: '#/definitions/Evento'}
    }
  */
  const dadosEvento = req.body as ReqEventoType;
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
    const idEvento = novoEvento.id;
    const imageBase64 = dadosEvento.imageBase64;
    salvaImagemEvento(idEvento, imageBase64);
    return res.status(201).json({ msg: "Evento criado com sucesso" });
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function update (req: Request, res: Response) {
  /* #swagger.summary = 'Edita dados de um evento específico.'
   #swagger.parameters['idEvento'] = { description: 'Id do evento'}
   #swagger.parameters['body'] =  {
      in: 'body',
      schema: { $ref: '#/definitions/UpdateEventoDto'}
    }
    
        #swagger.responses[200] 
          
  } */
  const dadosEvento = req.body as ReqEventoType;
  const idEvento = parseInt(req.body.idEvento);
  const imageBase64 = dadosEvento.imageBase64;
  try {
    const evento = await getEvento(idEvento);
    if (!evento) return res.status(404).json({ msg: "Evento nao encontrado" });
    if (evento.organizadorId === req.session.uid) {
      salvaImagemEvento(idEvento, imageBase64);
      const eventoAtualzado = {
        titulo: dadosEvento.titulo,
        descricao: dadosEvento.descricao,
        localizacao: dadosEvento.localizacao,
        faixaEtaria: 10,
        preco: dadosEvento.preco as unknown as Decimal,
        organizadorId: dadosEvento.organizadorId,
        categoriaEventoId: dadosEvento.categoriaEventoId
      } as UpdateEventoDto;
      await updateEvento(idEvento, eventoAtualzado);
      return res.status(200).json({ msg: "Evento atualizado"})
    }
    return res.status(401).json({ msg: "Usuario nao autorizado"});
  } catch (error) {
    return res.status(500).json(error); 
  }
}

async function remove (req: Request, res: Response) {
  /* #swagger.summary = 'Remove um envento específico.'
   #swagger.parameters['idEvento'] = { description: 'Id do evento'}
    
        #swagger.responses[200]
   */
  const idEvento = parseInt(req.params.idEvento); 
  try {
    const evento = await getEvento(idEvento);
    if (!evento) return res.status(404).json({ msg: "Evento nao encontrado" })
    if (evento.organizadorId === req.session.uid) {      
      await removeEvento(idEvento);
      excluiImagemEvento(idEvento);
      return res.status(200).json({ msg: "Evento removido com sucesso"})
    }
    return res.status(401).json({ msg: "Usuario nao autorizado"});
  } catch (error) {
    return res.status(500).json(error); 
  }
}

export default { index, read, create, update, remove };
