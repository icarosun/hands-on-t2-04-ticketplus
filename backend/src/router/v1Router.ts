import { Router } from "express";

import authRouter from "../resources/auth/auth.router";
import usuarioRouter from "../resources/usuario/usuario.router";
import eventoRouter from "../resources/evento/evento.router";
import compraRouter from "../resources/compra/compra.router";

const router = Router();


router.use(
	"/auth",
  // #swagger.tags = ['Auth']
	authRouter
);

router.use(
  "/usuario",
  // #swagger.tags = ['Usuario']
  usuarioRouter
)

router.use(
  "/evento",
  // #swagger.tags = ['Evento']
  eventoRouter
);

router.use(
  "/compra",
  // #swagger.tags = ['Compra']
  compraRouter
);

export default router;