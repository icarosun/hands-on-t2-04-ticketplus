import { Router } from "express";
import compraController from "./compra.controller";
import { compraSchema } from "./compra.schemas";
import { validarSchema } from "../../middlewares/validarSchema";
import { usuarioAutenticado } from "../../middlewares/usuarioAutenticado";
import { isComprador } from "../../middlewares/isComprador";

const router = Router();

// Rota adicionada apenas para fins de verificação das compras na API, não deve permanecer na versão final
router.get("/",
    compraController.index
);

router.post("/",
    isComprador,
    usuarioAutenticado,
    validarSchema(compraSchema),
    compraController.create
);

export default router;
