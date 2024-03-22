import { Request, Response } from "express";
import dotenv from "dotenv";
import { CreatePedidoDto, CreatePedidoReqType } from "./pedido.types";
import { getCompradorByEmail } from "../comprador/comprador.service";
import { getEvento } from "../evento/evento.service";
import { getTipoTicketEvento } from "../tiposTicketsEventos/tiposTicketsEventos.service";
import { Decimal } from "@prisma/client/runtime/library";
import { createPedido } from "./pedido.service";
import { createOrder, getPayPalTokenService } from "../pagamento/pagamento.service";
import { Comprador, Pedido } from "@prisma/client";
import { PedidoRes } from "./pedido.types";

dotenv.config();

const PAYPAL_CLIENT_ID =  String(process.env.PAYPAL_CLIENT_ID);
const PAYPAL_CLIENT_SECRET = String(process.env.PAYPAL_CLIENT_SECRET);


async function create(req: Request, res: Response) {
    /* 
      #swagger.summary = 'Adiciona uma compra no banco.'
          #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/Compra'}
      }
    */
    const dadosPedido = req.body as CreatePedidoReqType;

    const eventoId = dadosPedido.eventoId;
    const quantity = dadosPedido.quantity;
    const formaPagamento = dadosPedido.formaPagamento;
    const tipoTicketId = dadosPedido.tipoTicketId;

    const emailComprador = req.session.email;
    const compradorId = req.session.uid;            
    let intent = "CAPTURE";
    
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
      const valorTotalNumber = valorNumber * quantity;
      const valorTotalDecimal = valorTotalNumber as unknown as Decimal;
  
      if (PAYPAL_CLIENT_ID === "undefined" || PAYPAL_CLIENT_SECRET === "undefined")
        return res.status(401).json({ msg: "Informe todas as credenciais" });
      
      let payPalToken = await getPayPalTokenService(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET);
      payPalToken = String(payPalToken);
      await createOrder(payPalToken, intent, valorTotalNumber)
        .then(res => res.json())
        .then(async json => {
            let dadosPedidoPaypal = json as PedidoRes;

            const novoPedidoDados = {
                eventoId: eventoId,
                formaPagamento: formaPagamento,
                compradorId: String(compradorId),
                valor: valorTotalDecimal,
                quantidade: quantity,
                tipoTicketId: tipoTicketId,
                status: "Aguardando pagamento",
            } as CreatePedidoDto;
            const novoPedido = await createPedido(novoPedidoDados);

            req.session.pedidoId = novoPedido.id;

            return res.status(201).send({
              "id": dadosPedidoPaypal.id,
              "status": dadosPedidoPaypal.status
            });
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  
  export default { create };