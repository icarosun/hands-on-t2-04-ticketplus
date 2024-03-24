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

export interface BestSeller {
  titulo: string;
  tickets: number;
  data?: object;
}

export interface Resumo {
  data: number;
}

export interface TabelaGeral {
  titulo: string;
  created_at: string;
  formaPagamento: string;
  descricao: string;
  status: string;
  valor: string;
}

interface Tabela {
  data: TabelaGeral[];
}

export interface XGraficoGeral {
  titulo: string;
}

interface Grafico {
  data?: XGraficoGeral[];
}

// ========================= Dashboard Geral - Sem período ====================== //

// ================== Cards ================== //

// Evento com maior venda
export async function getMelhorEvento(): Promise<BestSeller | null> {
  return await HttpInstance.http.get(`/dashboard/cardMelhorEvento`);
}

// Todos os tickets disponibilizados
export async function getVagas(): Promise<Resumo | null> {
  return await HttpInstance.http.get(`/dashboard/cardVagasEventos`);
}

// Todos os tickets vendidos
export async function getTicketsVendidos(): Promise<Resumo | null> {
  return await HttpInstance.http.get(`/dashboard/cardTicketsVendidosTotal`);
}

// Porcentagem total entre venda e disponibilidade
export async function getPorcentagemTotal(): Promise<Resumo | null> {
  return await HttpInstance.http.get(`/dashboard/cardPorcentagemTotal`);
}

// Receita Total
export async function getCardReceitaTotal(): Promise<Resumo | null> {
  return await HttpInstance.http.get(`/dashboard/cardReceitaTotal`);
}

// ================== Gráficos ================== //

// De Tickets
// X (Categorias)
export async function getXGraficoGeral(): Promise<Grafico | null> {
  return await HttpInstance.http.get(`/dashboard/graficoGeralX`);
}

// De Finanças

// ================== Tabela de Compras ================== //

export async function getTabelaGeral(): Promise<Tabela | null> {
  return await HttpInstance.http.get(`/dashboard/tabela`);
}

// ========================= Dashboard Específico ====================== //

// Todos os tickets disponibilizados de um evento específico
export async function getDashboardCardTotal(
  idEvento: number
): Promise<DashboardGrafico | null> {
  return await HttpInstance.http.get(`/dashboard/cardTotal/${idEvento}`);
}

// Todos os tickets comprados de um evento específico
export async function getDashboardCardComprados(
  idEvento: number
): Promise<DashboardGrafico | null> {
  return await HttpInstance.http.get(`/dashboard/cardComprados/${idEvento}`);
}

// Receita Total de um evento específico
export async function getDashboardCardReceita(
  idEvento: number
): Promise<DashboardGrafico | null> {
  return await HttpInstance.http.get(`/dashboard/cardReceitaTotal/${idEvento}`);
}

// Titulo de um evento específico
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
