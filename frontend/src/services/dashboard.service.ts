import { HttpInstance } from "../utils/http";

export interface DashboardTitle {
  id: number;
  titulo: string;
  data?: object;
}

export interface DashboardGrafico {
  yAxisDisponivel: object[];
  yAxisVendido: object[];
  xAxis: xAxis[];
  data?: object;
}

export interface xAxis {
  id: number;
  descricao: string;
}

export interface yAxis {
  id: number;
  quantidade: number;
}

export async function getDashboardTitle(
  idEvento: number
): Promise<DashboardTitle | null> {
  return await HttpInstance.http.get(`/dashboard/${idEvento}`);
}

export async function getDashboardGraficoX(
  idEvento: number
): Promise<DashboardGrafico | null> {
  return await HttpInstance.http.get(`/dashboard/graficoX/${idEvento}`);
}

export async function getDashboardGraficoYDisp(
  idEvento: number
): Promise<DashboardGrafico | null> {
  return await HttpInstance.http.get(`/dashboard/graficoYDisp/${idEvento}`);
}

export async function getDashboardGraficoYVend(
  idEvento: number
): Promise<DashboardGrafico | null> {
  return await HttpInstance.http.get(`/dashboard/graficoYVend/${idEvento}`);
}

export async function getDashboardCardTotal(
  idEvento: number
): Promise<DashboardGrafico | null> {
  return await HttpInstance.http.get(`/dashboard/cardTotal/${idEvento}`);
}

export async function getDashboardCardComprados(
  idEvento: number
): Promise<DashboardGrafico | null> {
  return await HttpInstance.http.get(`/dashboard/cardComprados/${idEvento}`);
}

export async function getDashboardCardReceita(
  idEvento: number
): Promise<DashboardGrafico | null> {
  return await HttpInstance.http.get(`/dashboard/cardReceitaTotal/${idEvento}`);
}
