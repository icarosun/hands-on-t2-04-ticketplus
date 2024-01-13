import express from "express";
import dotenv from "dotenv";
import session from "express-session";

import router from "./router";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;


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

app.use(express.json());
app.use(
  session({
    secret: 'secret secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);
app.use(router);


app.listen(PORT, () => {
  console.log(`Servidor rodando SUAVEMENTE na porta ${PORT}`);
});