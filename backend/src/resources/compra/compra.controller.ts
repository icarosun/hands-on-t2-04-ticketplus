import { Request, Response } from "express";
import { Comprador } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

import { CreateCompraReqType } from "./compra.types";
import { getAllCompras } from "./compra.service";
import { createCompra } from "./compra.service";
import { getEvento, updateVagasEvento } from "../evento/evento.service";
import { getTipoTicketEvento } from "./compra.service";
import { createTicketService } from "../ticket/ticket.service";
import { getCompradorByEmail } from "../comprador/comprador.service";
import { updateSaldoComprador } from "../comprador/comprador.service";


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
  const dadosCompra = req.body as CreateCompraReqType;
  const eventoId = dadosCompra.eventoId;
  const formaPagamento = dadosCompra.formaPagamento;
  const tipoTicketId = dadosCompra.tipoTicketId;
  const emailComprador = req.session.email;
  const compradorId = req.session.uid;
  try {
    const comprador = await getCompradorByEmail(emailComprador) as Comprador;
    const saldoComprador = comprador.saldo;
    const evento = await getEvento(eventoId);
    if (!evento)
      return res.status(404).json({ msg: "Evento nao encontrado" })
    if (evento.vagas === 0)
      return res.status(401).json({ msg: "Evento sem vagas disponiveis" });

    const tipoTicketEvento = await getTipoTicketEvento(
      eventoId,
      tipoTicketId
    );
    if (!tipoTicketEvento)
      return res.status(404).json({ msg: "O tipo de ticket solicitado nao existe" });
    const valor: Decimal = tipoTicketEvento?.preco as unknown as Decimal;

    const saldoCompradorNumber = saldoComprador as unknown as number;
    const valorNumber = valor as unknown as number;
    if (parseFloat(String(saldoCompradorNumber)) < parseFloat(String(valorNumber))) {
      return res.status(401).json({ msg: "Saldo insuficiente" })
    }
    
    const novoTicket = await createTicketService(eventoId, tipoTicketId);
    const ticketId = novoTicket.id;
    const compra = {
      eventoId: eventoId,
      formaPagamento: formaPagamento,
      compradorId: String(req.session.uid),
      ticketId: ticketId,
      valor: valor,
      status: "Pago",
    };
    await createCompra(compra);
    const novoSaldoUsuario = saldoCompradorNumber - valorNumber;
    const novoSaldoCompradorDecimal = novoSaldoUsuario as unknown as Decimal;
    await updateSaldoComprador(compradorId, novoSaldoCompradorDecimal);
    await updateVagasEvento(eventoId, 1); // 1 ticket por vez
    return res.status(201).json({ msg: "Compra realizada com sucesso" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default { index, create };
