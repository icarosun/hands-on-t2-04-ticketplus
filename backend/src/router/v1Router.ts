import { Router } from "express";

import eventoRouter from "../resources/evento/evento.router";
import compraRouter from "../resources/compra/compra.router";

const router = Router();

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
