import { ApexOptions } from "apexcharts";

export const GraficoGeralOptions: ApexOptions = {
  chart: {
    stacked: true,
    toolbar: {
      show: true,
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
      columnWidth: "40%",
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter(val: number) {
        return `${val} tickets`;
      },
    },
  },
  legend: {
    show: true,
    fontFamily: `'Public Sans', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false,
      colors: "grey.500",
    },
    markers: {
      width: 16,
      height: 16,
      radius: 50,
      //offsexX: 2,
      //offsexY: 2,
    },
    itemMargin: {
      horizontal: 15,
      vertical: 50,
    },
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false,
        },
      },
    },
  ],
};