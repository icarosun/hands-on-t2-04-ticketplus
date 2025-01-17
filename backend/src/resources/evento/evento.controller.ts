import { Request, Response } from "express";
import dotenv from "dotenv";

import {
  createEvento,
  getAllEventos,
  getEvento,
  getEventoByCategoriaId,
  // updateEvento,
  // removeEvento,
  // getPedidoByEventoId,
  getEventosByOrganizador,
  searchEventosOrganizadorByTitulo,
  findEventoByTitle
} from "./evento.service";
import { EnderecosEventos } from "@prisma/client";
import { getTiposTickets } from "../tipoTicket/tipoTicket.service";
import { createTiposTicketsEventos } from "../tiposTicketsEventos/tiposTicketsEventos.service";
import { EventoDto, CreateEventoDto, UpdateEventoDto, GetEventosType } from "./evento.types";
import { CreateEnderecoEventoDto } from "../endereco/endereco.types";
import { DadosEnderecoType } from "../endereco/endereco.types";
import { TiposTicketsEventosDto } from "../tiposTicketsEventos/tiposTicketsEventos.types";
import { Decimal } from "@prisma/client/runtime/library";
import {
  CreateEventoReqType,
  // UpdateEventoReqType,
  TipoTicketEventoType,
} from "./evento.types";
import { getCategoriaEventoById } from "../categoriaEvento/categoriaEvento.service";
import { salvaImagemEvento, excluiImagemEvento } from "./eventos.utils";
import { verificaTiposTickets } from "./eventos.utils";
import { createEnderecoEvento, getEnderecoEvento } from "../endereco/endereco.service";
import { getDadosEnderecoByCEP } from "../endereco/endereco.service";

dotenv.config();

const PORT = process.env.PORT ?? 3000;

async function index (req: Request, res: Response) {
  
  /* #swagger.summary = 'Exibe todos os eventos.'
    #swagger.description = 'Exibe todos os eventos existentes no banco de dados'
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/ReturnReadAllEventos' }
  } */
  try {
    const eventos = await getAllEventos() as unknown as GetEventosType[];
    const eventosData: object[] = [];
    for (let i = 0; i < eventos.length; i++) {
      const evento = eventos[i];
      eventosData.push({
        id: evento.id,
        titulo: evento.titulo,
        localizacao: evento.localizacao,
        faixaEtaria: evento.faixaEtaria,
        vagas: evento.vagas,
        dataInicio: evento.dataInicio,
        dataFim: evento.dataFim,
        categoria: evento.CategoriaEvento.descricao,
        imageUrl: `http://localhost:${PORT}/v1/img/events/${eventos[i].id}`,
      });
    }
    return res.status(200).json(eventosData);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function read(req: Request, res: Response) {
  /* #swagger.summary = 'Recupera dados de um evento específico.'
   #swagger.parameters['idEvento'] = { description: 'Id do evento'}
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Evento' }
  } */
  const idEvento = parseInt(req.params.idEvento);
  try {
    const evento = (await getEvento(idEvento)) as EventoDto;
    if (!evento) return res.status(404).json({ msg: "Evento nao encontrado" });
    const imageUrl = `http://localhost:${PORT}/v1/img/events/${idEvento}`;
    const dadosEvento = {
      titulo: evento.titulo,
      descricao: evento.descricao,
      vagas: evento.vagas,
      imageUrl: imageUrl,
    };
    return res.status(200).json(dadosEvento);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function getEventosByOrganziador(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  try {
    const eventosOrganizador = await getEventosByOrganizador(organizadorId);
    if (!eventosOrganizador)
      return res
        .status(404)
        .json({ msg: "Nenhum evento cadastrado pelo organizador" });
    const eventosData: object[] = [];
    for (let i = 0; i < eventosOrganizador.length; i++) {
      eventosData.push({
        ...eventosOrganizador[i],
        imageUrl: `http://localhost:${PORT}/v1/img/events/${eventosOrganizador[i].id}`,
      });
    }
    return res.status(200).json(eventosData);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function readCategoria (req: Request, res: Response) {
  const categoriaEventoId = parseInt(req.params.categoriaEventoId);
  try {
    const eventos = await getEventoByCategoriaId(categoriaEventoId);
    return res.status(200).json({ eventos });
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function searchEventosOrganizador (req: Request, res: Response) {
  const organizadorId = req.session.uid;
  const titulo = req.body.titulo;
  try {
    const eventos = await searchEventosOrganizadorByTitulo(
      organizadorId,
      titulo
    );
    return res.status(200).json(eventos);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function create(req: Request, res: Response) {
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

  try {
    const dadosEvento = req.body as CreateEventoReqType;
    
    const categoriaEventoId = dadosEvento.categoriaEventoId;
    const titulo = dadosEvento.titulo;
    const descricao = dadosEvento.descricao;
    const localizacao = dadosEvento.localizacao;
    const faixaEtaria = dadosEvento.faixaEtaria;
    const cep = dadosEvento.cep;
    const numero = dadosEvento.numero;
    const dataInicio = dadosEvento.dataInicio;
    const dataFim = dadosEvento.dataFim;
    
    const dataInicioDate = new Date(dataInicio);
    const dataFimDate = new Date(dataFim);
    if (dataInicioDate >= dataFimDate)
      return res.status(401).json({ msg: "O fim do evento deve acontecer a após seu início" });

    const organizadorId = req.session.uid;
    const tiposTicketsEventosReq: TipoTicketEventoType[] =
      dadosEvento.tiposTicketsEventos;
    const tiposTickets = await getTiposTickets();
    const tiposTicketsValidos = verificaTiposTickets(
      tiposTickets,
      tiposTicketsEventosReq
    );

    const categoriaEvento = await getCategoriaEventoById(categoriaEventoId);
    if (!categoriaEvento)
      return res.status(404).json({ msg: "Categoria de eventos não cadastrada" });
    if (!tiposTicketsValidos)
      return res.status(401).json({ msg: "Tipos de tickets inválidos" });
    let vagas = 0;
    for (let tipoTicketEventoReq of tiposTicketsEventosReq) {
      vagas = vagas + tipoTicketEventoReq.quantidade;
    }

    const enderecoCadastrado = await getEnderecoEvento(cep, numero) as EnderecosEventos;
    let enderecoEventoId: number | null = null;
    let cidade: string | null = null;
    if (!!enderecoCadastrado) {
      enderecoEventoId = enderecoCadastrado.id;
      cidade = enderecoCadastrado.cidade;
    } else {
      const cidade = (await getDadosEnderecoByCEP(dadosEvento.cep) as DadosEnderecoType).localidade;
      const dadosNovoEndereco = {
        cep: dadosEvento.cep,
        numero: dadosEvento.numero,
        cidade: cidade
      } as CreateEnderecoEventoDto;
      const novoEndereco = await createEnderecoEvento(dadosNovoEndereco);
      enderecoEventoId = novoEndereco.id;
    }
    
    const evento = {
      titulo: titulo,
      descricao: descricao,
      localizacao: localizacao,
      faixaEtaria: faixaEtaria,
      vagas: vagas,
      dataInicio: dataInicio,
      dataFim: dataFim,
      organizadorId: organizadorId,
      categoriaEventoId: categoriaEventoId,
      enderecoEventoId: enderecoEventoId,
    } as CreateEventoDto;
    const novoEvento = await createEvento(evento);
    const idEvento = novoEvento.id;


    for (let tipoTicketEventoReq of tiposTicketsEventosReq) {
      const novoTipoTicketEvento = {
        ...tipoTicketEventoReq,
        eventoId: idEvento,
        preco: tipoTicketEventoReq.preco as unknown as Decimal,
      } as TiposTicketsEventosDto;
      await createTiposTicketsEventos(novoTipoTicketEvento);
    }

    let imageBase64 = dadosEvento.imageBase64;
    imageBase64 = imageBase64.split(";base64,")[1];
    salvaImagemEvento(idEvento, imageBase64);
    return res.status(201).json({ msg: "Evento criado com sucesso" });
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function update(req: Request, res: Response) {
  /* #swagger.summary = 'Edita dados de um evento específico.'
   #swagger.parameters['idEvento'] = { description: 'Id do evento'}
   #swagger.parameters['body'] =  {
      in: 'body',
      schema: { $ref: '#/definitions/UpdateEventoDto'}
    }
    
        #swagger.responses[200] 
          
  } */
  return res.status(200).json({ msg: "OK" });
  /*const dadosEvento = req.body as UpdateEventoReqType;
  const idEvento = dadosEvento.id;
  const dataInicio = dadosEvento.dataInicio;
    const dataFim = dadosEvento.dataFim;
  const tiposTicketsEventosReq: TipoTicketEventoType[] = dadosEvento.tiposTicketsEventos;
  const organizadorId = req.session.uid;
  const tiposTickets = await getTiposTickets();
  const tiposTicketsValidos = verificaTiposTickets(tiposTickets, tiposTicketsEventosReq);
  if (!tiposTicketsValidos) return res.status(401).json({ msg: "Tipos de tickets inválidos" });
  const imageBase64 = dadosEvento.imageBase64;*/
  /*try {
    const evento = await getEvento(idEvento);
    if (!evento) return res.status(404).json({ msg: "Evento nao encontrado" });
    if (evento.organizadorId !== organizadorId)
      return res.status(401).json({ msg: "Usuario nao autorizado" });
    
    salvaImagemEvento(idEvento, imageBase64);
    const eventoAtualzado = {
      titulo: dadosEvento.titulo,
      descricao: dadosEvento.descricao,
      localizacao: dadosEvento.localizacao,
      faixaEtaria: 10,
      vagas: dadosEvento.vagas,
      dataInicio: dataInicio,
      dataFim: dataFim,
      organizadorId: organizadorId,
      categoriaEventoId: 1
    } as UpdateEventoDto;
    await updateEvento(idEvento, eventoAtualzado);
    return res.status(200).json({ msg: "Evento atualizado" });
  } catch (error) {
    return res.status(500).json(error); 
  }*/
}

/*async function remove (req: Request, res: Response) {
  /* #swagger.summary = 'Remove um envento específico.'
   #swagger.parameters['idEvento'] = { description: 'Id do evento'}
    
        #swagger.responses[200]
   //
  const idEvento = parseInt(req.params.idEvento);
  excluiImagemEvento(idEvento);
  try {
    const evento = await getEvento(idEvento);
    if (!evento) return res.status(404).json({ msg: "Evento nao encontrado" });
    const eventoCompra = await getCompraByEventoId(idEvento);
    if (eventoCompra)
      return res.status(401).json({
        msg: "Impossivel deletar: existem ingressos comprados para o evento",
      });
    if (evento.organizadorId === req.session.uid) {
      await removeEvento(idEvento);
      return res.status(200).json({ msg: "Evento removido com sucesso" });
    }
    return res.status(401).json({ msg: "Usuario nao autorizado" });
  } catch (error) {
    return res.status(500).json(error);
  }
}*/

async function searchByTitulo (req: Request, res: Response) {
  /* #swagger.summary = 'Pesquisar evento por nome'.
     #swagger.query['titulo'] = {
        in: 'query',
        type: 'string',
     }
     #swagger.response[200]
  */

  try {
    const titulo = req.query.titulo as string;

    if (!titulo) return res.status(400).json({ msg: "Error parâmetro inválido ou vazio"})

    const eventos = await findEventoByTitle(titulo);

    if (eventos.length > 0) {
      const eventosData: object[] = [];
      for (let i = 0; i < eventos.length; i++) {
        eventosData.push({
          ...eventos[i],
          imageUrl: `http://localhost:${PORT}/v1/img/events/${eventos[i].id}`,
        });
      }
      return res.status(200).json(eventosData);
    }

    return res.status(200).json(eventos);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default {
  index,
  read,
  readCategoria,
  getEventosByOrganziador,
  searchEventosOrganizador,
  create,
  update /*, remove*/,
  searchByTitulo
};
