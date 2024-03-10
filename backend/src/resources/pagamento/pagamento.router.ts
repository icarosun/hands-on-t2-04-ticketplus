import { Router } from "express";

import pagamentoController from "./pagamento.controller";
import { usuarioAutenticado } from "../../middlewares/usuarioAutenticado";
import { isComprador } from "../../middlewares/isComprador";

const router = Router();

router.post("/createOrder",
    usuarioAutenticado,
    isComprador,
    pagamentoController.getPayPalToken
);

export default router;