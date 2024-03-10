import { Request, Response } from "express";
import dotenv from "dotenv";
import { Comprador } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

import { CreateCompraDto, CreateCompraReqType } from "./compra.types";
import { getComprasByCompradorId } from "./compra.service";
import { createCompra } from "./compra.service";
import { getEvento, updateVagasEvento } from "../evento/evento.service";
import { getTipoTicketEvento } from "../tiposTicketsEventos/tiposTicketsEventos.service";
import { createTicketService } from "../ticket/ticket.service";
import { getCompradorByEmail } from "../comprador/comprador.service";
import { updateSaldoComprador } from "../comprador/comprador.service";
import { updateQuantidadeTiposTicketsEventos } from "../tiposTicketsEventos/tiposTicketsEventos.service";
import { getPayPalTokenService } from "../pagamento/pagamento.service";
import { createOrder } from "../pagamento/pagamento.service";
import { CreateCompraType } from "./compra.types";
import { createPedido } from "../pedido/pedido.service";
import { CreatePedidoDto } from "../pedido/pedido.types";

dotenv.config();

const PORT = process.env.PORT ?? 3000;
const PAYPAL_CLIENT_ID =  String(process.env.PAYPAL_CLIENT_ID);
const PAYPAL_CLIENT_SECRET = String(process.env.PAYPAL_CLIENT_SECRET);

async function index(req: Request, res: Response) {
  /* #swagger.summary = 'Exibe todas as compras.'
    #swagger.description = 'Exibe todos as compras existentes no banco de dados'
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Compras' }
  } */
  const compradorId = String(req.session.uid);
  const eventosIds: number[] = [];
  try {
    const compras = (await getComprasByCompradorId(
      compradorId
    )) as unknown as CreateCompraDto[];
    const comprasData: object[] = [];
    for (let compra of compras) {
      eventosIds.push(compra.eventoId);
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
  }
}

async function create(req: Request, res: Response) {
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
  let intent = dadosCompra.intent;
  intent = intent.toUpperCase();
  
  try {
    const comprador = (await getCompradorByEmail(emailComprador)) as Comprador;
    const evento = await getEvento(eventoId);
    if (!evento) return res.status(404).json({ msg: "Evento nao encontrado" });
    if (evento.vagas === 0)
      return res.status(401).json({ msg: "Evento sem vagas disponiveis" });

    const tipoTicketEvento = await getTipoTicketEvento(eventoId, tipoTicketId);
    if (!tipoTicketEvento)
      return res
        .status(404)
        .json({ msg: "O tipo de ticket solicitado nao existe" });
    if (tipoTicketEvento.quantidade === 0)
      return res
        .status(401)
        .json({
          msg: "O tipo de ticket requisitado nao possui vagas disponiveis",
        });
    const valor: Decimal = tipoTicketEvento?.preco as unknown as Decimal;
    const valorNumber = valor as unknown as number;

    const novoPedido = {
      eventoId: eventoId,
      formaPagamento: formaPagamento,
      compradorId: String(compradorId),
      valor: valor,
      status: "Aguardando pagamento",
    } as CreatePedidoDto;
    await createPedido(novoPedido);

    if (PAYPAL_CLIENT_ID === "undefined" || PAYPAL_CLIENT_SECRET === "undefined")
        return res.status(401).json({ msg: "Informe todas as credenciais" });
    let payPalToken = await getPayPalTokenService(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET);
    payPalToken = String(payPalToken);
    console.log(`token: ${payPalToken}`);
    await createOrder(payPalToken, intent, valorNumber)
      .then(res => res.json())
      .then(json => {
        return res.status(201).send(json);
      });

    // const novoSaldoUsuario = saldoCompradorNumber - valorNumber;
    // const novoSaldoCompradorDecimal = novoSaldoUsuario as unknown as Decimal;
    // await updateSaldoComprador(compradorId, novoSaldoCompradorDecimal);
    /* Depois do pagamento
    await updateQuantidadeTiposTicketsEventos(eventoId, tipoTicketId, 1); // 1 ticket por vez
    await updateVagasEvento(eventoId, 1); // 1 ticket por vez
    return res.status(201).json({ msg: "Compra realizada com sucesso" }); */
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default { index, create };
