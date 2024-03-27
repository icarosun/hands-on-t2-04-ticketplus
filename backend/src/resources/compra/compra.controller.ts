import { Request, Response } from "express";
import dotenv from "dotenv";

import { getPedidoById, getPedidosByStatusAndCompradorId } from "../pedido/pedido.service";
import {
  createCompra,
  getCompraByPedidoId
} from "./compra.service";
import { updateQuantidadeTiposTicketsEventos } from "../tiposTicketsEventos/tiposTicketsEventos.service";
import { getEvento, updateVagasEvento } from "../evento/evento.service";
import { CreateCompraDto } from "./compra.types";
import { createTicketService } from "../ticket/ticket.service";
import { updateStatusPedido } from "../pedido/pedido.service";
import { StatusPedido } from "../pedido/pedido.constants";
import { createTotalTicketsComprados, getTotalTicketsComprados, getTotalTicketsCompradosByCpf, updateTotalTicketsComprados } from "../totalTicketsComprados/totalTicketsComprados.service";
import { GetEventosType } from "../evento/evento.types";

dotenv.config();

const PORT = process.env.PORT ?? 3000;


async function index(req: Request, res: Response) {
  /* #swagger.summary = 'Exibe todas as compras.'
    #swagger.description = 'Exibe todos as compras existentes no banco de dados'
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Compras' }
  } */
  const cpfComprador = String(req.session.cpf);
  const eventosIds: number[] = [];
  const eventos: GetEventosType[] = [];
  try {
    const compras = await getTotalTicketsCompradosByCpf(
      cpfComprador
    );
    console.log(cpfComprador);
    if (!compras)
      return res.status(404).json({ msg: "Nenhum pedido encotrado" });
    for (let compra of compras) {
      eventosIds.push(compra.eventoId);
    }
    for (let i = 0; i < eventosIds.length; i++) {
      const evento = await getEvento(eventosIds[i]) as unknown as GetEventosType;
      eventos.push({
        ...evento,
        quantidade: compras[i].totalTicketsComprados,
        imageUrl: `http://localhost:${PORT}/v1/img/events/${eventosIds[i]}`,
      });
    }
    return res.status(200).json(eventos);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function create(req: Request, res: Response) {
  /* 
    #swagger.summary = 'Adiciona uma compra no banco.'
        #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/Compra'}
    }
  /*/
  const pedidoId = req.body.pedidoId;
  const cpfComprador = String(req.session.cpf);
  if (!pedidoId)
    return res.status(404).json({ msg: "A ordem de compra solicitada não existe" });
  try {
    const pedido = await getPedidoById(pedidoId);
    if (!pedido)
      return res.status(404).json({ msg: "A ordem de compra solicitada não existe" });

    const compra = await getCompraByPedidoId(pedidoId);
    if (!!compra)
      return res.status(401).json({ msg: "Compra já realizada anteriormente" });
    
    const tipoTicketId = pedido?.tipoTicketId as number;
    const eventoId = pedido?.eventoId as number;

    const quantidade = pedido?.quantidade as number;

    const novoTicket = await createTicketService(eventoId, tipoTicketId);
    const ticketId = novoTicket.id;
    
    const novaCompraDados = {
      pedidoId,
      ticketId
    } as CreateCompraDto;
    await createCompra(novaCompraDados);

    await updateStatusPedido(
      String(pedidoId),
      StatusPedido.PAGO
    )

    const totalTicketsComprados = await getTotalTicketsComprados(cpfComprador, eventoId);
    if (totalTicketsComprados)
      await updateTotalTicketsComprados(cpfComprador, eventoId, quantidade);
    else
      await createTotalTicketsComprados(cpfComprador, eventoId, quantidade);

    await updateQuantidadeTiposTicketsEventos(eventoId, tipoTicketId, quantidade);
    await updateVagasEvento(eventoId, quantidade);

    return res.status(201).json({ msg: "Compra realizada com sucesso" }); 
    
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default { index, create };
