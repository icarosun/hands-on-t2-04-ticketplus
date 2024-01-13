import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";

import { setLangCookie } from "./middlewares/setLangCookie";
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
app.use(cookieParser());
app.use(
  session({
    genid: () => uuidv4(),
    secret: "sdfgLSgfm#sme@asdl*asd3S",
    resave: true,
    cookie: { maxAge: 10 * 24 * 60 * 60 * 1000 },
    saveUninitialized: true,
  })
);
app.use(setLangCookie);
app.use(router);


app.listen(PORT, () => {
  console.log(`Servidor rodando SUAVEMENTE na porta ${PORT}`);
});