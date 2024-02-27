import { Router } from "express";

import authRouter from "../resources/auth/auth.router";
import compradorRouter from "../resources/comprador/comprador.router";
import organizadorRouter from "../resources/organizador/organizador.router";
import eventoRouter from "../resources/evento/evento.router";
import compraRouter from "../resources/compra/compra.router";
import sessaoRouter from "../resources/sessao/sessao.router";
import imagemRouter from '../resources/imagem/imagem.router';
import tipoTicketRouter from "../resources/tipoTicket/tipoTicket.router";

const router = Router();


router.use(
	"/auth",
  // #swagger.tags = ['Auth']
	authRouter
);

router.use(
  "/comprador",
  // #swagger.tags = ['comprador']
  compradorRouter
);

router.use(
  "/organizador",
  // #swagger.tags = ['organizador']
  organizadorRouter
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

router.use(
  "/img",
  // #swagger.tags = ['img']
  imagemRouter
)

router.use(
  "/sessao",
  // #swagger.tags = ['Sessao']
  sessaoRouter
)

router.use(
  "/tipoTicket",
  tipoTicketRouter
);

export default router;