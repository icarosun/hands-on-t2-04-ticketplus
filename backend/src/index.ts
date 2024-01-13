import express from "express";
import dotenv from "dotenv";
import session from "express-session";

import router from "./router";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(router);
app.use(
  session({
    secret: 'secret secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);


/* interface CompraIngresso {
  usuarioId: string;
	produtoId: string;
	quantidade: number;
}*/

declare module "express-session" {
  interface SessionData {
    uid: string;
    nomeUsuario: string;
    sobrenomeUsuario: string;
    email: string;
    tipoUsuarioId: string;
    // carrinho: CompraIngresso[];
  }
}


app.listen(PORT, () => {
  console.log(`Servidor rodando SUAVEMENTE na porta ${PORT}`);
});