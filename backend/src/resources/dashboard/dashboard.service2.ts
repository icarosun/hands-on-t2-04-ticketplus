import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_ROOT_PASSWORD;
const database = process.env.MYSQL_DATABASE;
const port = process.env.MYSQL_PORT;

async function conectDatabase() {
  return await mysql2.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
    port: parseInt(`${port}`),
  });
}

export async function getDadosYGrafico(
  organizadorId: string | undefined,
  tipoTicket: string | undefined
): Promise<object | null> {
  if (organizadorId === undefined) return null;
  const connection = await conectDatabase();
  const resultado = await connection.execute(
    "SELECT vendidos, restante FROM `resumoGraficoGeral` where tipo_ticket = ? and organizador = ?;",
    [tipoTicket, organizadorId]
  );

  connection.end();
  return resultado[0];
}

export async function getDadosYGraficoFinanceiro(
  organizadorId: string | undefined,
  tipoTicket: string | undefined
): Promise<object | null> {
  if (organizadorId === undefined || tipoTicket === undefined) return null;
  const connection = await conectDatabase();
  const resultado = await connection.execute(
    "SELECT total FROM `resumoGraficoFinanceiroGeral` where tipo_ticket = ? and organizador = ?;",
    [tipoTicket, organizadorId]
  );
  connection.end();
  return resultado[0];
}

export async function getDadosGraficoGeralPeriodo(
  organizadorId: string | undefined,
  eventoId: number | undefined,
  periodo: number | undefined
): Promise<object | null> {
  if (organizadorId === undefined || eventoId === undefined) return null;
  const connection = await conectDatabase();
  const resultado = await connection.execute(
    "SELECT tipo_ticket, data as date, SUM(vendidos) as vendidos FROM `resumoGraficoGeralPorPeriodo` where id = ? and organizador = ? and data >= DATE_SUB(CURDATE(), INTERVAL ? DAY) GROUP BY data, tipo_ticket ORDER BY data;",
    [eventoId, organizadorId, periodo]
  );
  connection.end();
  return resultado[0];
}

export async function getDadosGraficoFinanceiroPeriodo(
  organizadorId: string | undefined,
  eventoId: number | undefined,
  periodo: number | undefined
): Promise<object | null> {
  if (organizadorId === undefined || eventoId === undefined) return null;
  const connection = await conectDatabase();
  const resultado = await connection.execute(
    "SELECT tipo_ticket, data as date, SUM(valor) as valor FROM `resumoGraficoFinanceiroPorPeriodo` where id = ? and organizador = ? and data >= DATE_SUB(CURDATE(), INTERVAL ? DAY) GROUP BY data, tipo_ticket ORDER BY data;",
    [eventoId, organizadorId, periodo]
  );
  connection.end();
  return resultado[0];
}
