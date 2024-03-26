import {
  getGraficoGeralDadosPorPeriodo,
  GraficoXY,
} from "../../../services/dashboard.service";
import { DadosGrafico } from "../../Graficos/GraficoTicketsPorPeriodo";

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

export async function processData(periodo: number, id: number) {
  // pega os dados do serviço (view)
  const dados = (await getGraficoGeralDadosPorPeriodo(
    periodo,
    id
  )) as GraficoXY;
  // pega as datas onde cada tipo de ticket aparece

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
    .map((e) => e.vendidos);

  const meiaValues = dados.data
    .filter((ticket) => ticket.tipo_ticket === "meia-entrada")
    .map((e) => e.vendidos);

  const vipValues = dados.data
    .filter((ticket) => ticket.tipo_ticket === "VIP")
    .map((e) => e.vendidos);

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

  const dadosGrafico: DadosGrafico[] = [
    {
      name: "Inteira",
      data: dadoInteira,
    },
    {
      name: "Meia-Entrada",
      data: dadoMeia,
    },
    {
      name: "VIP",
      data: dadoVip,
    },
  ];

  return dadosGrafico;
}

export const ultSemana = [
  {
    name: "Inteira",
    data: [0, 30, 30, 10, 0, 15, 15], // Lembre-se: cada posição dessa é de um dia diferente, não de um evento!
  },
  {
    name: "Meia-Entrada",
    data: [30, 10, 1, 50, 10, 20, 30],
  },
  {
    name: "VIP",
    data: [50, 20, 20, 0, 10, 50, 20],
  },
];

export const UltMes = [
  {
    name: "Inteira",
    data: [
      50, 40, 80, 50, 10, 50, 40, 50, 40, 80, 50, 10, 50, 40, 50, 40, 80, 50,
      10, 50, 40, 50, 40, 80, 50, 10, 50, 40, 10, 30,
    ], // Lembre-se: cada posição dessa é de um dia diferente, não de um evento!
  },
  {
    name: "Inteira - Disponível",
    data: [
      50, 20, 5, 10, 20, 50, 20, 50, 20, 5, 10, 20, 50, 20, 50, 20, 5, 10, 20,
      50, 20, 50, 20, 5, 10, 20, 50, 20, 30, 15,
    ],
  },
  {
    name: "Meia-Entrada",
    data: [
      30, 10, 1, 50, 10, 20, 30, 30, 10, 1, 50, 10, 20, 30, 30, 10, 1, 50, 10,
      20, 30, 30, 10, 1, 50, 10, 20, 30, 3, 22,
    ],
  },
  {
    name: "Meia-Entrada - Disponível",
    data: [
      70, 90, 99, 20, 5, 70, 90, 70, 90, 99, 20, 5, 70, 90, 70, 90, 99, 20, 5,
      70, 90, 70, 90, 99, 20, 5, 70, 90, 10, 30,
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
    name: "VIP - Disponível",
    data: [
      50, 100, 80, 10, 10, 100, 50, 70, 90, 99, 20, 5, 70, 90, 70, 90, 99, 20,
      5, 70, 90, 70, 90, 99, 0, 0, 0, 0, 0, 0,
    ],
  },
];

export const categoriasSemana = [
  "08/03/2024",
  "09/03/2024",
  "10/03/2024",
  "11/03/2024",
  "12/03/2024",
  "13/03/2024",
  "14/03/2024",
];

export const categoriasMes = [
  "14/02/2024",
  "15/02/2024",
  "16/02/2024",
  "17/02/2024",
  "18/02/2024",
  "19/02/2024",
  "20/02/2024",
  "21/02/2024",
  "22/02/2024",
  "23/02/2024",
  "24/02/2024",
  "25/02/2024",
  "26/02/2024",
  "27/02/2024",
  "28/02/2024",
  "29/02/2024",
  "01/03/2024",
  "02/03/2024",
  "03/03/2024",
  "04/03/2024",
  "05/03/2024",
  "06/03/2024",
  "07/03/2024",
  "08/03/2024",
  "09/03/2024",
  "10/03/2024",
  "11/03/2024",
  "12/03/2024",
  "13/03/2024",
  "14/03/2024",
];
