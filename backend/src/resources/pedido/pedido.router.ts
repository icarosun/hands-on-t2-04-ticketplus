import { Router } from "express";

import pedidoController from "./pedido.controller";
import { usuarioAutenticado } from "../../middlewares/usuarioAutenticado";
import { isComprador } from "../../middlewares/isComprador";
import pedidoSchema from "./pedido.schemas";
import { validarSchema } from "../../middlewares/validarSchema";

const router = Router();

router.post("/",
    usuarioAutenticado,
    isComprador,
    validarSchema(pedidoSchema),
    pedidoController.create
);

export default router;