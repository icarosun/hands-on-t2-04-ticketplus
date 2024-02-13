import { Request, Response } from "express";
import { createEvento, getAllEventos, removeEvento, updateEvento } from "./evento.service";
import { CreateEventoDto, EventoDto, UpdateEventoDto } from "./evento.types";
import { getEvento } from "./evento.service";

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
      schema: { $ref: '#/definitions/CreateEventoDto'}
    }
    #swagger.responses[201] = {
      schema: { $ref: '#/definitions/Evento'}
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

async function update (req: Request, res: Response) {
  /* #swagger.summary = 'Edita dados de um evento específico.'
   #swagger.parameters['idEvento'] = { description: 'Id do evento'}
   #swagger.parameters['body'] =  {
      in: 'body',
      schema: { $ref: '#/definitions/UpdateEventoDto'}
    }
    
        #swagger.responses[200] 
          
  } */

  const id = parseInt(req.params.idEvento); 
  const newEvento = req.body as UpdateEventoDto; 
  
  try {
    const evento = await getEvento(id);
    
    if (!evento) return res.status(404).json({ msg: "Evento não encontrado" })

    if (evento.organizadorId === req.session.uid) {
      await updateEvento(id, newEvento);
      return res.status(200).json({ msg: "Evento atualizado"})
    }

    return res.status(401).json({ msg: "Usuário não autorizado"});
  } catch (error) {
    return res.status(500).json(error); 
  }
}

async function remove (req: Request, res: Response) {
  /* #swagger.summary = 'Remove um envento específico.'
   #swagger.parameters['idEvento'] = { description: 'Id do evento'}
    
        #swagger.responses[200] 
   */

  const id = parseInt(req.params.idEvento); 
  
  try {
    const evento = await getEvento(id);
    
    if (!evento) return res.status(404).json({ msg: "Evento não encontrado" })

    if (evento.organizadorId === req.session.uid) {
      await removeEvento(id);     
      return res.status(200).json({ msg: "Evento removido"})
    }

    return res.status(401).json({ msg: "Usuário não autorizado"});
  } catch (error) {
    return res.status(500).json(error); 
  }
}

export default { index, read, create, update, remove };
