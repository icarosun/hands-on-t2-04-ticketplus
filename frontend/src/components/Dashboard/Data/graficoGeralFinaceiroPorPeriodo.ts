import {
  getGraficoFinanceiroDadosPorPeriodo,
  GraficoXYFin,
} from "../../../services/dashboard.service";
import { DadosGrafico } from "../../Graficos/GraficoFinanceiroPorPeriodo";

function extractIndexes(
  mainArray: string[],
  referenceArray: string[]
): number[] {
  return referenceArray.reduce((indexes: number[], value) => {
    const index = mainArray.indexOf(value);
    if (index !== -1) {
      indexes.push(index);
    }
    return indexes;
  }, []);
}

function generateEmptyArray(periodo: number) {
  const array: number[] = [];
  for (let i = 0; i < periodo; i++) {
    array[i] = 0;
  }
  return array;
}

export function generateDateArray(periodo: number): string[] {
  const dates: Date[] = [];
  const today: Date = new Date();

  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < periodo; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date);
  }

  dates.sort((a, b) => a.getTime() - b.getTime());

  const altDates = dates.map((date) => date.toLocaleDateString().toString());

  return altDates;
}

export async function processDataFin(periodo: number, id: number) {
  // pega os dados do serviço (view)
  const dados = (await getGraficoFinanceiroDadosPorPeriodo(
    periodo,
    id
  )) as GraficoXYFin;
  // pega as datas onde cada tipo de ticket aparece
  console.log("alo");
  console.log(dados);
  const inteiraDates = dados.data
    .filter((ticket) => ticket.tipo_ticket === "inteira")
    .map((e) => {
      const date = new Date(e.date);
      return date.toLocaleDateString().toString();
    });

  const meiaDates = dados.data
    .filter((ticket) => ticket.tipo_ticket === "meia-entrada")
    .map((e) => {
      const date = new Date(e.date);
      return date.toLocaleDateString().toString();
    });

  const vipDates = dados.data
    .filter((ticket) => ticket.tipo_ticket === "VIP")
    .map((e) => {
      const date = new Date(e.date);
      return date.toLocaleDateString().toString();
    });

  // pega os valores da cada tipo de ticket
  const inteiraValues = dados.data
    .filter((ticket) => ticket.tipo_ticket === "inteira")
    .map((e) => e.valor);

  const meiaValues = dados.data
    .filter((ticket) => ticket.tipo_ticket === "meia-entrada")
    .map((e) => e.valor);

  const vipValues = dados.data
    .filter((ticket) => ticket.tipo_ticket === "VIP")
    .map((e) => e.valor);

  // gera arrays vazios com as posições dependente do período escolhido
  const dadoA: string[] = generateDateArray(periodo);
  const dadoInteira: number[] = generateEmptyArray(periodo);
  const dadoMeia: number[] = generateEmptyArray(periodo);
  const dadoVip: number[] = generateEmptyArray(periodo);

  // extrai as posições em que os dados de cada ticket fazem parte (ordenados pelas datas)
  const inteiraIndex = extractIndexes(dadoA, inteiraDates);
  const meiaIndex = extractIndexes(dadoA, meiaDates);
  const vipIndex = extractIndexes(dadoA, vipDates);

  // ordena os dados para o grafico por tipo de ticket
  inteiraIndex.forEach((index, i) => {
    dadoInteira[index] = inteiraValues[i];
  });

  meiaIndex.forEach((index, i) => {
    dadoMeia[index] = meiaValues[i];
  });

  vipIndex.forEach((index, i) => {
    dadoVip[index] = vipValues[i];
  });

  const dadoReceitaTotal: number[] = [];

  for (let i = 0; i < periodo; i++) {
    dadoReceitaTotal.push(+dadoInteira[i] + +dadoMeia[i] + +dadoVip[i]);
  }

  const dadosGrafico: DadosGrafico[] = [
    {
      name: "Inteira",
      type: "line",
      data: dadoInteira,
    },
    {
      name: "Meia-Entrada",
      type: "line",
      data: dadoMeia,
    },
    {
      name: "VIP",
      type: "line",
      data: dadoVip,
    },
    {
      name: "Receita Total",
      type: "area",
      data: dadoReceitaTotal,
    },
  ];

  return dadosGrafico;
}

export const ultSemanaFinanceiro = [
  {
    name: "Inteira",
    type: "line",
    data: [0, 30, 30, 10, 0, 15, 15], // Lembre-se: cada posição dessa é de um dia diferente, não de um evento!
  },
  {
    name: "Meia-Entrada",
    type: "line",
    data: [30, 10, 1, 50, 10, 20, 30],
  },
  {
    name: "VIP",
    type: "line",
    data: [50, 20, 20, 0, 10, 50, 20],
  },
  {
    name: "Receita Total",
    type: "area",
    data: [80, 60, 51, 60, 20, 85, 65],
  },
];

export const UltMesFinanceiro = [
  {
    name: "Inteira",
    data: [
      50, 40, 80, 50, 10, 50, 40, 50, 40, 80, 50, 10, 50, 40, 50, 40, 80, 50,
      10, 50, 40, 50, 40, 80, 50, 10, 50, 40, 10, 30,
    ], // Lembre-se: cada posição dessa é de um dia diferente, não de um evento!
  },
  {
    name: "Meia-Entrada",
    data: [
      30, 10, 1, 50, 10, 20, 30, 30, 10, 1, 50, 10, 20, 30, 30, 10, 1, 50, 10,
      20, 30, 30, 10, 1, 50, 10, 20, 30, 3, 22,
    ],
  },
  {
    name: "VIP",
    data: [
      50, 20, 20, 0, 10, 50, 20, 70, 90, 99, 20, 5, 70, 90, 70, 90, 99, 20, 5,
      70, 90, 70, 90, 99, 0, 0, 0, 0, 0, 0,
    ],
  },
  {
    name: "Receita Total",
    type: "area",
    data: [
      30, 10, 1, 50, 10, 20, 30, 30, 10, 1, 50, 10, 20, 30, 30, 10, 1, 50, 10,
      20, 30, 30, 10, 1, 50, 10, 20, 30, 3, 22,
    ],
  },
];
