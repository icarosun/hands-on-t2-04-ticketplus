import { Request, Response } from "express";

import {
  countAllTicketsByType,
  getValorTotaldeVendas,
  getTotalTicketsCompradosEvento,
  getDashboardEventoData,
  getTicketTypeOfEvento,
  getTotalPorTipoTicketsEvento,
  getTotalTicketsEvento,
  getTotalReceitaEventos,
  getTotalVagasEventos,
  getTotalTicketsVendidos,
  getTabelaGeralEventos,
  getTabelaGeralIndividual,
  getEventosXGrafico,
  getMelhorEvento,
  getTotalVagasEventosPeriodo,
  getEventosGraficoPeriodo,
} from "./dashboard.service";

import {
  getDadosYGrafico,
  getDadosYGraficoFinanceiro,
  getDadosGraficoGeralPeriodo,
  getDadosGraficoFinanceiroPeriodo,
} from "./dashboard.service2";

interface CardTotalVendidos {
  vendidos: number;
}

interface CardTotalVagasPeriodo {
  vagas: number;
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

interface cardCompradosQuant {
  eventoId: number;
}

interface cardComprados {
  _count: cardCompradosQuant;
  eventoId: number;
}

interface MelhorEvento {
  titulo: string;
  vendidos: string;
}

interface cardValor {
  valor: number;
}

interface GraficoPeriodo {
  tipo_ticket: string;
  data: string;
  disponivel: number;
  vendidos: number;
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
  const periodo = parseInt(req.params.periodo);
  try {
    const receita = (await getTotalReceitaEventos(
      organizadorId,
      periodo
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

async function cardVagasTotalPorPeriodo(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  const periodo = parseInt(req.params.periodo);
  try {
    const total = (await getTotalVagasEventosPeriodo(
      organizadorId,
      periodo
    )) as CardTotalVagasPeriodo[];
    if (!total)
      return res.status(404).json({ msg: "Evento sem tickets cadastrados!" });
    const cardData: number = total[0].vagas;

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
  const periodo: number = parseInt(req.params.periodo);
  try {
    const totalTicketsVendidos = (await getTotalTicketsVendidos(
      organizadorId,
      periodo
    )) as CardTotalVendidos[];
    if (!totalTicketsVendidos)
      return res
        .status(404)
        .json({ msg: "Organizador possui eventos sem tickets cadastrados!" });
    const cardData: CardTotalVendidos[] = totalTicketsVendidos;

    if (cardData === null) {
      return res.status(200).json(0);
    }

    const vendidos = cardData[0].vendidos;

    return res.status(200).json(vendidos);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function cardPorcentagemTotal(req: Request, res: Response) {
  const organizadorId = req.session.uid;

  try {
    const totalTicketsVendidos = (await getTotalTicketsVendidos(
      organizadorId
    )) as CardTotalVendidos[];
    const totalDisponivel = (await getTotalVagasEventos(
      organizadorId
    )) as PrismaSum[];
    if (!totalTicketsVendidos || !totalDisponivel)
      return res
        .status(404)
        .json({ msg: "Organizador possui eventos sem tickets cadastrados!" });
    const cardData: CardTotalVendidos[] = totalTicketsVendidos;
    const cardData2: number = totalDisponivel[0]._sum.vagas;

    if (cardData === null || cardData2 === null) {
      return res.status(200).json(0);
    }

    // Porcentagem
    const total: number = (cardData[0].vendidos * 100) / cardData2;

    return res.status(200).json(total);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function cardPorcentagemTotalPeriodo(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  const periodo = parseInt(req.params.periodo);

  try {
    const totalTicketsVendidos = (await getTotalTicketsVendidos(
      organizadorId,
      periodo
    )) as CardTotalVendidos[];
    const totalDisponivel = (await getTotalVagasEventosPeriodo(
      organizadorId,
      periodo
    )) as CardTotalVagasPeriodo[];
    if (!totalTicketsVendidos || !totalDisponivel)
      return res
        .status(404)
        .json({ msg: "Organizador possui eventos sem tickets cadastrados!" });
    const cardData: CardTotalVendidos[] = totalTicketsVendidos;
    const cardData2: number = totalDisponivel[0].vagas;

    if (cardData === null || cardData2 === null) {
      return res.status(200).json(0);
    }

    // Porcentagem
    const total: number = (cardData[0].vendidos * 100) / cardData2;

    return res.status(200).json(total);
  } catch (error) {
    return res.status(500).json(error);
  }
}

// Evento com mais tickets vendidos (desempata por receita)
async function cardMelhorEvento(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  const periodo = parseInt(req.params.periodo);
  try {
    const evento = (await getMelhorEvento(
      organizadorId,
      periodo
    )) as MelhorEvento[];
    if (!evento || evento === undefined)
      return res.status(404).json({ msg: "Nenhum evento encontrado." });
    const melhorEventoData: MelhorEvento[] = evento;

    const best = {
      titulo: melhorEventoData[0].titulo,
      tickets: melhorEventoData[0].vendidos,
    };

    return res.status(200).json(best);
  } catch (error) {
    // Este aqui retorna erro 500 se não tiver nada pra retonar. Necessita de mais investigação.
    return res.status(500).json(error);
  }
}

async function tabelaGeral(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  const periodo = parseInt(req.params.periodo);
  try {
    const evento = await getTabelaGeralEventos(organizadorId, periodo);

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

async function graficoGeralPeriodo(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  const periodo = parseInt(req.params.periodo);
  try {
    const evento = await getEventosGraficoPeriodo(organizadorId, periodo);
    if (!evento)
      return res.status(404).json({ msg: "Nenhum dado encontrado." });
    const eventoData: object = evento;
    return res.status(200).json(eventoData);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function graficoGeralPeriodoDados(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  const idEvento = parseInt(req.params.idEvento);
  const periodo = parseInt(req.params.periodo);

  try {
    const evento = (await getDadosGraficoGeralPeriodo(
      organizadorId,
      idEvento,
      periodo
    )) as GraficoPeriodo;
    if (!evento)
      return res.status(404).json({ msg: "Nenhum dado encontrado." });
    const eventoData: GraficoPeriodo = evento;

    return res.status(200).json(eventoData);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function graficoFinanceiroPeriodoDados(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  const idEvento = parseInt(req.params.idEvento);
  const periodo = parseInt(req.params.periodo);

  try {
    const evento = (await getDadosGraficoFinanceiroPeriodo(
      organizadorId,
      idEvento,
      periodo
    )) as GraficoPeriodo;
    if (!evento)
      return res.status(404).json({ msg: "Nenhum dado encontrado." });
    const eventoData: GraficoPeriodo = evento;

    return res.status(200).json(eventoData);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function graficoYGeral(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  try {
    const inteiras = await getDadosYGrafico(organizadorId, "inteira");
    const meia = await getDadosYGrafico(organizadorId, "meia-entrada");
    const vip = await getDadosYGrafico(organizadorId, "VIP");
    if (!inteiras || !meia || !vip)
      return res.status(404).json({ msg: "Nenhum dado encontrado." });
    const data = { inteiras, meia, vip };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function graficoYGeralFinanceiro(req: Request, res: Response) {
  const organizadorId = req.session.uid;
  try {
    const inteiras = await getDadosYGraficoFinanceiro(organizadorId, "inteira");
    const meia = await getDadosYGraficoFinanceiro(
      organizadorId,
      "meia-entrada"
    );
    const vip = await getDadosYGraficoFinanceiro(organizadorId, "VIP");
    if (!inteiras || !meia || !vip)
      return res.status(404).json({ msg: "Nenhum dado encontrado." });
    const data = { inteiras, meia, vip };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default {
  graficoFinanceiroPeriodoDados,
  graficoGeralPeriodoDados,
  graficoGeralPeriodo,
  cardPorcentagemTotalPeriodo,
  cardVagasTotalPorPeriodo,
  graficoYGeralFinanceiro,
  graficoYGeral,
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
