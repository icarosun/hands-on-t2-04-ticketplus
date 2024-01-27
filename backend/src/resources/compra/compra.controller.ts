import { Request, Response } from "express";

import { getAllCompras } from "./compra.service";
import { createCompra } from "./compra.service";
import { CreateCompraDto } from "./compra.types";
import { getEventoService } from "../evento/evento.service";
import { createTicketService } from "../ticket/ticket.service";
import { EventoDto } from "../evento/evento.types";
import { Decimal } from "@prisma/client/runtime/library";

async function index  (req: Request, res: Response) {
  /* #swagger.summary = 'Exibe todas as compras.'
    #swagger.description = 'Exibe todos as compras existentes no banco de dados'
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Compras' }
  } */
  try {
    const compras = await getAllCompras();
    return res.status(200).json({ compras });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

async function create (req: Request, res: Response) {
  /* 
    #swagger.summary = 'Adiciona uma compra no banco.'
        #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/Compra'}
    }
  */
  const dadosCompra = req.body as CreateCompraDto;
  const eventoId = dadosCompra.eventoId;
  // const qtdeIngressos: number = dadosCompra.qtdeIngressos;
  try {
    const evento = await getEventoService(eventoId) as unknown as EventoDto;
    const valor: Decimal = evento.preco as unknown as Decimal;
    const novoTicket = await createTicketService(eventoId);
    const ticketId = novoTicket.id;
    const compra = {
      ...dadosCompra, // eventoId, formaPagamento
      usuarioId: String(req.session.uid),
      ticketId: ticketId,
      valor: valor,
      status: "Pago",
    };
    await createCompra(compra);
    return res.status(201).json({ msg: "Compra realizada com sucesso" });
  } catch (e) {
    return res.status(500).json({ e });
  }
};

export default { index, create };
