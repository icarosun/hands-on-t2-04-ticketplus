import { Request, Response } from "express";

import {
  countAllTicketsByType,
  getValorTotaldeVendas,
  getTotalTicketsCompradosEvento,
  getDashboardEventoData,
  getTicketTypeOfEvento,
  getTotalPorTipoTicketsEvento,
  getTotalTicketsEvento,
} from "./dashboard.service";

interface Card {
  totalIngressosDisponiveis: object;
  vendidos: object | null;
  precosTiposTicketsDoEvento: object | null;
  quantidadePorTipo: object | null;
}

interface xDesc {
  descricao: string;
}

interface xAxis {
  tipoTicketId: number;
  tipoTicket: xDesc;
}

interface yAxisDisp {
  tipoTicketId: number;
  quantidade: number;
}

interface yAxisVend {
  _count: yAxisQuant;
  tipoTicketId: number;
}

interface yAxisQuant {
  tipoTicketId: number;
}

interface cardTotalQuant {
  quantidade: number;
}

interface cardTotal {
  _sum: cardTotalQuant;
}

interface cardCompradosQuant {
  eventoId: number;
}

interface cardComprados {
  _count: cardCompradosQuant;
  eventoId: number;
}

interface cardValor {
  valor: number;
}

async function modalTitle(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  const idEvento = parseInt(req.params.idEvento);
  try {
    // id e titulo
    const evento = await getDashboardEventoData(organizadorId, idEvento);
    if (!evento)
      return res.status(404).json({ msg: "Nenhum evento encontrado." });
    const eventoData: object = evento;
    return res.status(200).json(eventoData);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function cardDataTotal(req: Request, res: Response) {
  const idEvento = parseInt(req.params.idEvento);
  try {
    const total = (await getTotalTicketsEvento(idEvento)) as cardTotal;
    if (!total)
      return res.status(404).json({ msg: "Evento sem tickets cadastrados!" });
    const cardData: number = total._sum.quantidade;

    if (cardData === null) {
      return res.status(200).json(0);
    }

    return res.status(200).json(cardData);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function cardDataComprados(req: Request, res: Response) {
  const idEvento = parseInt(req.params.idEvento);
  try {
    const qtTicketsComprados = (await getTotalTicketsCompradosEvento(
      idEvento
    )) as cardComprados[];
    if (!qtTicketsComprados)
      return res.status(404).json({ msg: "Evento sem tickets comprados!" });

    if (qtTicketsComprados.length === 0) {
      return res.status(200).json(0);
    }

    // prisma resulta o group by como um array, mas botei a condicional de eventoId então não preciso tratar
    const cardData: number = qtTicketsComprados[0]._count.eventoId;

    return res.status(200).json(cardData);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function cardDataReceita(req: Request, res: Response) {
  const idEvento = parseInt(req.params.idEvento);
  try {
    const valor = (await getValorTotaldeVendas(idEvento)) as cardValor[];

    const cardData = valor[0].valor;

    if (cardData === null) {
      return res.status(200).json(0);
    }
    return res.status(200).json(cardData);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function graficoX(req: Request, res: Response) {
  const idEvento = parseInt(req.params.idEvento);
  try {
    const x = (await getTicketTypeOfEvento(idEvento)) as xAxis[];
    if (!x)
      return res
        .status(404)
        .json({ msg: "Não há dados suficientes para exibir!" });

    const graficoData: object[] = [];
    for (let i = 0; i < x.length; i++) {
      graficoData.push({
        id: x[i].tipoTicketId,
        descricao: x[i].tipoTicket.descricao,
      });
    }
    return res.status(200).json(graficoData);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function graficoYDisp(req: Request, res: Response) {
  const idEvento = parseInt(req.params.idEvento);
  try {
    const yDisponivel = (await getTotalPorTipoTicketsEvento(
      idEvento
    )) as yAxisDisp[];
    if (!yDisponivel)
      return res
        .status(404)
        .json({ msg: "Não há tickets disponíveis para exibir!" });

    const graficoData: number[] = yDisponivel.map((item) => item.quantidade);

    return res.status(200).json(graficoData);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function graficoYVend(req: Request, res: Response) {
  const idEvento = parseInt(req.params.idEvento);
  try {
    // aqui só conta. Pode ser 0.
    const yVendidos = (await countAllTicketsByType(idEvento)) as yAxisVend[];

    const graficoData: number[] = yVendidos.map(
      (item) => item._count.tipoTicketId
    );

    return res.status(200).json(graficoData);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default {
  cardDataTotal,
  cardDataComprados,
  cardDataReceita,
  modalTitle,
  graficoX,
  graficoYDisp,
  graficoYVend,
};
