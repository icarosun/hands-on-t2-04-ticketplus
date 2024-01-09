import express from "express";
import dotenv from "dotenv";
import session from "express-session";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;


declare module "express-session" {
  interface SessionData {
    uid: string;
    nomeUsuario: string;
    sobrenomeUsuario: string;
    tipoUsuarioId: string;
  }
}

app.listen(PORT, () => {
  console.log(`Servidor rodando SUAVEMENTE na porta ${PORT}`);
});