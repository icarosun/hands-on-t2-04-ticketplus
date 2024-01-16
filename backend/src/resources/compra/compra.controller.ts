import { Request, Response } from "express";

import { getAllCompras } from "./compra.service";
import { createCompra } from "./compra.service";
import { CreateCompraDto } from "./compra.types";
import { getTicketByEvento } from "../ticket/ticket.service";
import { TicketDto } from "../ticket/tickets.types";
import { Decimal } from "@prisma/client/runtime/library";


const index = async (req: Request, res: Response) => {
  /* #swagger.summary = 'Exibe todas as compras.'
    #swagger.description = 'Exibe todos as compras existentes no banco de dados'
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Compras' }
  } */
  try {
    const compras = await getAllCompras();
    return res.status(200).json({compras});
  } catch (error) {
    return res.status(500).json({error});
  }
}

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
      return res.status(404).json({ msg: "O evento informado nao possui tickets" })
    const valorTicket: number = ticketEvento.valor as unknown as number;
    const valor_total: number = valorTicket * qtde_ingressos;
    compra = {
      ...compra,
      usuarioId: String(req.session.uid),
      valor_total: valor_total as unknown as Decimal,
      status: "Pago"
    };
    await createCompra(compra);
    return res.status(201).json({ msg: "Compra realizada com sucesso" });
  } catch (e) {
    return res.status(500).json({e});
  }
};

export default { index, create };
