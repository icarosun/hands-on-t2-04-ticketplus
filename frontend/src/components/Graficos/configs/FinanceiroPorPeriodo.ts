import { ApexOptions } from "apexcharts";

export const GraficoFinanceiroPeriodoOptions: ApexOptions = {
  chart: {
    height: 350,
    stacked: false,
    redrawOnParentResize: true,
    zoom: {
      enabled: true,
    },
  },
  markers: {
    size: 0,
  },
  fill: {
    type: "solid",
    opacity: [0.35, 1],
  },
  grid: {
    padding: {
      left: 30,
      right: 30,
    },
  },
  noData: {
    align: "center",
    text: "Sem dados disponível no momento",
    verticalAlign: "middle",
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "30%",
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    show: true,
    width: [1, 1, 1, 3],
    curve: "smooth",
  },
  yaxis: [
    {
      title: {
        text: "Valores em R$",
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter(val: number) {
        return `R$ ${val}`;
      },
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    labels: {
      colors: "grey.500",
    },
  },
};
