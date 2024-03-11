import { Request, Response } from "express";
import dotenv from "dotenv";

import { getPedidoById } from "../pedido/pedido.service";
import { createCompra } from "./compra.service";
import { updateQuantidadeTiposTicketsEventos } from "../tiposTicketsEventos/tiposTicketsEventos.service";
import { updateVagasEvento } from "../evento/evento.service";
import { CreateCompraDto } from "./compra.types";
import { createTicketService } from "../ticket/ticket.service";

dotenv.config();

const PORT = process.env.PORT ?? 3000;


async function index(req: Request, res: Response) {
  /* #swagger.summary = 'Exibe todas as compras.'
    #swagger.description = 'Exibe todos as compras existentes no banco de dados'
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Compras' }
  } */
  /*const compradorId = String(req.session.uid);
  const eventosIds: number[] = [];
  try {
    const compras = (await getComprasByCompradorId(
      compradorId
    )) as unknown as CreateCompraDto[];
    const comprasData: object[] = [];
    for (let compra of compras) {
      eventosIds.push(compra.eventoId as number); // here
    }
    for (let i = 0; i < compras.length; i++) {
      comprasData.push({
        ...compras[i],
        imageUrl: `http://localhost:${PORT}/v1/img/events/${eventosIds[i]}`,
      });
    }
    return res.status(200).json({ comprasData });
  } catch (error) {
    return res.status(500).json({ error });
  }*/
}

async function create(req: Request, res: Response) {
  /* 
    #swagger.summary = 'Adiciona uma compra no banco.'
        #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/Compra'}
    }
  */
  const pedidoId = req.session.pedidoId;
  if (!pedidoId)
    res.status(404).json({ msg: "A ordem de compra solicitada não existe" });
  try {
    const pedido = await getPedidoById(pedidoId);
    if (!pedido)
      res.status(404).json({ msg: "A ordem de compra solicitada não existe" });
    
    const tipoTicketId = pedido?.tipoTicketId as number;
    const eventoId = pedido?.eventoId as number;

    const novoTicket = await createTicketService(eventoId, tipoTicketId);
    const ticketId = novoTicket.id;
    
    const novaCompraDados = {
      pedidoId,
      ticketId
    } as CreateCompraDto;
    await createCompra(novaCompraDados);
    
    req.session.pedidoId = undefined;
    
    await updateQuantidadeTiposTicketsEventos(eventoId, tipoTicketId, 1); // 1 ticket por vez
    await updateVagasEvento(eventoId, 1); // 1 ticket por vez
    return res.status(201).json({ msg: "Compra realizada com sucesso" }); 
    
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default { index, create };
