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
  quantidade: number;
}

interface Tabela {
  data: TabelaGeral[];
}

export interface XGraficoGeral {
  id: number;
  titulo: string;
}

export interface YGraficoGeral {
  evento: string;
  vendidos: number;
  restante: number;
  tipo_ticket: string;
}

interface GraficoX {
  data?: XGraficoGeral[];
}

interface GraficoAux2 {
  restante: number;
  vendidos: number;
}

interface GraficoAux3 {
  total: number;
}

interface GraficoYFinancas {
  data?: GraficoYAux;
}

interface GraficoYAux {
  inteiras: GraficoAux3[];
  meia: GraficoAux3[];
  vip: GraficoAux3[];
}

interface GraficoAux {
  inteiras: GraficoAux2[];
  meia: GraficoAux2[];
  vip: GraficoAux2[];
}

interface GraficoY {
  data?: GraficoAux;
}

export interface GraficoXYPeriodo {
  tipo_ticket: string;
  date: string;
  vendidos: number;
}

export interface GraficoXYPeriodoFin {
  tipo_ticket: string;
  date: string;
  valor: number;
}

export interface GraficoXY {
  data: GraficoXYPeriodo[];
}

export interface GraficoXYFin {
  data: GraficoXYPeriodoFin[];
}

// ========================= Dashboard Geral - Sem período ====================== //

// ================== Cards ================== //

// Evento com maior venda
// Geral
export async function getMelhorEvento(): Promise<BestSeller | null> {
  return await HttpInstance.http.get(`/dashboard/cardMelhorEvento`);
}

// Por Periodo
export async function getMelhorEventoPeriodo(
  periodo: number
): Promise<BestSeller | null> {
  return await HttpInstance.http.get(`/dashboard/cardMelhorEvento/${periodo}`);
}

// Todos os tickets disponibilizados
// Geral
export async function getVagas(): Promise<Resumo | null> {
  return await HttpInstance.http.get(`/dashboard/cardVagasEventos`);
}

// Por período
export async function getVagasPeriodo(periodo: number): Promise<Resumo | null> {
  return await HttpInstance.http.get(`/dashboard/cardVagasEventos/${periodo}`);
}

// Todos os tickets vendidos
// Geral
export async function getTicketsVendidos(): Promise<Resumo | null> {
  return await HttpInstance.http.get(`/dashboard/cardTicketsVendidosTotal`);
}

// Por período
export async function getTicketsVendidosPeriodo(
  periodo: number
): Promise<Resumo | null> {
  return await HttpInstance.http.get(
    `/dashboard/cardTicketsVendidosTotal/${periodo}`
  );
}

// Porcentagem total entre venda e disponibilidade
// Geral
export async function getPorcentagemTotal(): Promise<Resumo | null> {
  return await HttpInstance.http.get(`/dashboard/cardPorcentagemTotal`);
}

// Por período
export async function getPorcentagemTotalPeriodo(
  periodo: number
): Promise<Resumo | null> {
  return await HttpInstance.http.get(
    `/dashboard/cardPorcentagemTotal/${periodo}`
  );
}

// Receita Total
// Geral
export async function getCardReceitaTotal(): Promise<Resumo | null> {
  return await HttpInstance.http.get(`/dashboard/cardReceitaTotal`);
}

// Por período
export async function getCardReceitaTotalPeriodo(
  periodo: number
): Promise<Resumo | null> {
  return await HttpInstance.http.get(
    `/dashboard/cardReceitaTotalPeriodo/${periodo}`
  );
}

// ================== Gráficos ================== //

// X (Categorias) de Tickets e Finanças
// Geral
export async function getXGraficoGeral(): Promise<GraficoX | null> {
  return await HttpInstance.http.get(`/dashboard/graficoGeralX`);
}

// Recuperar eventos
export async function getGraficoGeralPorPeriodo(
  periodo: number
): Promise<GraficoX | null> {
  return await HttpInstance.http.get(
    `/dashboard/graficoGeralPeriodo/${periodo}`
  );
}

// Y (series) de Tickets
export async function getYGraficoGeral(): Promise<GraficoY> {
  return await HttpInstance.http.get(`/dashboard/graficoGeralY/`);
}

// X e Y de Tickets por Periodo e por Evento
export async function getGraficoGeralDadosPorPeriodo(
  periodo: number,
  eventoId: number
): Promise<GraficoXY | null> {
  return await HttpInstance.http.get(
    `/dashboard/graficoGeralPeriodoDados/${eventoId}/${periodo}`
  );
}

// Y (Series) de Finanças
export async function getYGraficoGeralFinanceiro(): Promise<GraficoYFinancas> {
  return await HttpInstance.http.get(`/dashboard/graficoGeralYFinanceiro/`);
}

// X e Y de Tickets por Periodo e por Evento
export async function getGraficoFinanceiroDadosPorPeriodo(
  periodo: number,
  eventoId: number
): Promise<GraficoXYFin | null> {
  return await HttpInstance.http.get(
    `/dashboard/graficoFinanceiroPeriodoDados/${eventoId}/${periodo}`
  );
}

// ================== Tabela de Compras ================== //
// Geral
export async function getTabelaGeral(): Promise<Tabela | null> {
  return await HttpInstance.http.get(`/dashboard/tabela`);
}

// Por período
export async function getTabelaPeriodo(
  periodo: number
): Promise<Tabela | null> {
  return await HttpInstance.http.get(`/dashboard/tabela/${periodo}`);
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
