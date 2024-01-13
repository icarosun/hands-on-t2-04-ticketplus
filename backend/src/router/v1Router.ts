import { Router } from "express";

import authRouter from "../resources/auth/auth.router";
import eventoRouter from "../resources/evento/evento.router";
import compraRouter from "../resources/compra/compra.router";

const router = Router();


router.use(
	"/auth",
  // #swagger.tags = ['Auth']
	authRouter
);

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