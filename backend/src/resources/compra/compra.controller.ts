import { Request, Response } from "express";
import { createCompra } from "./compra.service";
import { CreateCompraDto } from "./compra.types";
import { getTicketByEvento } from "../ticket/ticket.service";
import { TicketDto } from "../ticket/tickets.types";
import { Decimal } from "@prisma/client/runtime/library";


const create = async (req: Request, res: Response) => {
  /* 
    #swagger.summary = 'Adiciona uma compra no banco.'
        #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/Compra'}
    }
  */
  let compra = req.body as CreateCompraDto;
  const qtde_ingressos: number = compra.qtde_ingressos;
  try {
    const ticketEvento = await getTicketByEvento(compra.eventoId) as TicketDto;
    if (!ticketEvento)
      res.status(404).json({ msg: "O evento informado nao possui tickets" })
    const valorTicket: number = ticketEvento.valor as unknown as number;
    const valor_total: number = valorTicket * qtde_ingressos;
    compra = {
      ...compra,
      usuarioId: String(req.session.uid),
      valor_total: valor_total as unknown as Decimal,
      status: "Pago"
    };
    await createCompra(compra);
    res.status(201).json({ msg: "Compra realizada com sucesso" });
  } catch (e) {
    res.status(500).json(e);
  }
};

export default { create };
