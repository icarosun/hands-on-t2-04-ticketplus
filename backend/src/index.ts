import express from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

import { setLangCookie } from "./middlewares/setLangCookie";
import swaggerFile from "./swagger-doc.json";
import router from "./router";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;
const frontendUrl = process.env.FRONTEND_URL;

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
    pedidoId: string;
    // carrinho: CompraIngresso[];
  }
}

app.use(morgan("combined"));
app.use(cors({ credentials: true, origin: frontendUrl }));
app.use(bodyParser.json({limit: "5mb"}));
app.use(express.json());
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));
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
