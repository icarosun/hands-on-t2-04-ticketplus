function somaArrays(arrays: number[][]): number[] {
  if (!arrays || arrays.length === 0) {
    return [];
  }

  const result: number[] = [];
  const maxLength = Math.max(...arrays.map((arr) => arr.length));

  for (let i = 0; i < maxLength; i++) {
    let total: number = 0;
    for (const array of arrays) {
      total += +array[i] || 0;
    }
    result.push(total);
  }

  return result;
}

export function setDataGraficoFinanceiro(
  intValor: number[],
  meiaValor: number[],
  vipValor: number[]
) {
  const arrays: number[][] = [intValor, meiaValor, vipValor];
  const arraysReceitaTotal: number[] = somaArrays(arrays);
  console.log("1 " + intValor);
  console.log("2 " + meiaValor);
  console.log("3" + vipValor);
  console.log("4" + arraysReceitaTotal);
  const graficoFinanceiroSeries = [
    {
      name: "Inteira",
      data: intValor,
    },
    {
      name: "Meia-Entrada",
      data: meiaValor,
    },
    {
      name: "VIP",
      data: vipValor,
    },
    {
      name: "Receita Total",
      data: arraysReceitaTotal,
    },
  ];

  return graficoFinanceiroSeries;
}

export const graficoFinanceiroSeries = [
  {
    name: "Inteira",
    type: "column",
    data: [50, 40, 80, 10, 20],
  },
  {
    name: "Meia-Entrada",
    type: "column",
    data: [30, 10, 1, 4, 18],
  },
  {
    name: "VIP",
    type: "column",
    data: [50, 20, 20, 3, 5],
  },
  {
    name: "Receita Total",
    type: "line",
    data: [130, 70, 101, 17, 43],
  },
];
