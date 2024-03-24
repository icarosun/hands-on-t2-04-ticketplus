import { Request, Response } from "express";

import {
  countAllTicketsByType,
  getValorTotaldeVendas,
  getTotalTicketsCompradosEvento,
  getDashboardEventoData,
  getTicketTypeOfEvento,
  getTotalPorTipoTicketsEvento,
  getTotalTicketsEvento,
  getMelhorEvento,
  getTotalReceitaEventos,
  getTotalVagasEventos,
  getTotalTicketsVendidos,
  getTabelaGeralEventos,
  getTabelaGeralIndividual,
  getEventosXGrafico,
} from "./dashboard.service";

interface CardBestSeller {
  titulo: string;
  totalTickets: number;
  totalValor: number;
}

interface xDesc {
  descricao: string;
}

interface ReceitaTotal {
  valor: number;
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

interface SumAux {
  quantidade: number;
  vagas: number;
  pedidos: number;
}

interface PrismaSum {
  _sum: SumAux;
}

interface PrismaCount {
  _count: SumAux;
}

interface cardCompradosQuant {
  eventoId: number;
}

interface cardComprados {
  _count: cardCompradosQuant;
  eventoId: number;
}

interface MelhorEvento {
  titulo: string;
  _count: SumAux;
  tickets: number;
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
    const total = (await getTotalTicketsEvento(idEvento)) as PrismaSum;
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

// Total de Receita de um Organizador
async function cardReceitaTotal(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  try {
    const receita = (await getTotalReceitaEventos(
      organizadorId
    )) as ReceitaTotal[];
    if (!receita) return res.status(404).json({ msg: "Não há receita!" });
    const receitaData: number = receita[0].valor;

    return res.status(200).json(receitaData);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function cardVagasTotal(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  try {
    const total = (await getTotalVagasEventos(organizadorId)) as PrismaSum[];
    if (!total)
      return res.status(404).json({ msg: "Evento sem tickets cadastrados!" });
    const cardData: number = total[0]._sum.vagas;

    if (cardData === null) {
      return res.status(200).json(0);
    }

    return res.status(200).json(cardData);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function cardTicketsVendidosTotal(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  try {
    const totalTicketsVendidos = (await getTotalTicketsVendidos(
      organizadorId
    )) as PrismaCount[];
    if (!totalTicketsVendidos)
      return res
        .status(404)
        .json({ msg: "Organizador possui eventos sem tickets cadastrados!" });
    const cardData: PrismaCount[] = totalTicketsVendidos;

    if (cardData === null) {
      return res.status(200).json(0);
    }

    // soma dos resultados
    const total: number = cardData.reduce((card, arr) => {
      return card + arr._count.pedidos;
    }, 0);

    return res.status(200).json(total);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function cardPorcentagemTotal(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  try {
    const totalTicketsVendidos = (await getTotalTicketsVendidos(
      organizadorId
    )) as PrismaCount[];
    const totalDisponivel = (await getTotalVagasEventos(
      organizadorId
    )) as PrismaSum[];
    if (!totalTicketsVendidos || !totalDisponivel)
      return res
        .status(404)
        .json({ msg: "Organizador possui eventos sem tickets cadastrados!" });
    const cardData: PrismaCount[] = totalTicketsVendidos;
    const cardData2: number = totalDisponivel[0]._sum.vagas;

    if (cardData === null || cardData2 === null) {
      return res.status(200).json(0);
    }

    // soma dos resultados
    const totalVendido: number = cardData.reduce((card, arr) => {
      return card + arr._count.pedidos;
    }, 0);

    // Porcentagem
    const total: number = (totalVendido * 100) / cardData2;

    return res.status(200).json(total);
  } catch (error) {
    return res.status(500).json(error);
  }
}

// Evento com mais tickets vendidos (desempata por receita)
async function cardMelhorEvento(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  try {
    const evento = (await getMelhorEvento(organizadorId)) as MelhorEvento[];
    if (!evento)
      return res.status(404).json({ msg: "Nenhum evento encontrado." });
    const eventoData: MelhorEvento[] = evento;

    if (eventoData.length === 0) {
      return res.status(404).json({ msg: "Nenhum evento encontrado." });
    }

    let value: number = 0;
    let indexAux: number = 0;

    eventoData.map((e, index) => {
      if (e._count.pedidos >= value) {
        value = e._count.pedidos;
        indexAux = index;
      }
    });

    const best = { titulo: evento[indexAux].titulo, tickets: value };

    return res.status(200).json(best);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function tabelaGeral(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  try {
    const evento = await getTabelaGeralEventos(organizadorId);
    if (!evento)
      return res.status(404).json({ msg: "Nenhum dado encontrado." });
    const eventoData: object = evento;
    return res.status(200).json(eventoData);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function tabelaIndividual(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  const idEvento = parseInt(req.params.idEvento);
  try {
    const evento = await getTabelaGeralIndividual(organizadorId, idEvento);
    if (!evento)
      return res.status(404).json({ msg: "Nenhum dado encontrado." });
    const eventoData: object = evento;
    return res.status(200).json(eventoData);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function graficoXGeral(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  try {
    const evento = await getEventosXGrafico(organizadorId);
    if (!evento)
      return res.status(404).json({ msg: "Nenhum dado encontrado." });
    const eventoData: object = evento;
    return res.status(200).json(eventoData);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default {
  graficoXGeral,
  tabelaIndividual,
  tabelaGeral,
  cardPorcentagemTotal,
  cardTicketsVendidosTotal,
  cardVagasTotal,
  cardReceitaTotal,
  cardDataTotal,
  cardDataComprados,
  cardDataReceita,
  modalTitle,
  graficoX,
  graficoYDisp,
  graficoYVend,
  cardMelhorEvento,
};
