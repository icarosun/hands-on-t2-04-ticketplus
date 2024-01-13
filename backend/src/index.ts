import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import router from "./router";
import swaggerFile from "./swagger-doc.json";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";

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

app.use(morgan("combined"));
app.use(express.json());
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor rodando SUAVEMENTE na porta ${PORT}`);
});
