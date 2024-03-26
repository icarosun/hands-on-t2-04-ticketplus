export function setDataGrafico(
  intVend: number[],
  intDisp: number[],
  meiaVend: number[],
  meiaDisp: number[],
  vipVend: number[],
  vipDisp: number[]
) {
  const graficoGeralSeries = [
    {
      name: "Inteira",
      group: "Inteira",
      data: intVend,
    },
    {
      name: "Inteira - Disponível",
      group: "Inteira",
      data: intDisp,
    },
    {
      name: "Meia-Entrada",
      group: "meia_entrada",
      data: meiaVend,
    },
    {
      name: "Meia-Entrada - Disponível",
      group: "meia_entrada",
      data: meiaDisp,
    },
    {
      name: "VIP",
      group: "vip",
      data: vipVend,
    },
    {
      name: "VIP - Disponível",
      group: "vip",
      data: vipDisp,
    },
  ];

  return graficoGeralSeries;
}

export const categoriasGeraisEventos = [
  "Chiado da Chinela",
  "Amazon Games",
  "Xuxa só para grandinhos",
  "Patati Patata",
  "Javascript Mental",
];
