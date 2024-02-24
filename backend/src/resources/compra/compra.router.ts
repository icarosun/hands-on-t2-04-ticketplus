import { Router } from "express";
import compraController from "./compra.controller";
import { compraSchema } from "./compra.schemas";
import { validarSchema } from "../../middlewares/validarSchema";
import { usuarioAutenticado } from "../../middlewares/usuarioAutenticado";
import { isComprador } from "../../middlewares/isComprador";

const router = Router();

router.post("/",
    isComprador,
    usuarioAutenticado,
    validarSchema(compraSchema),
    compraController.create
);

// Rota adicionada apenas para fins de verificação das compras na API, não deve permanecer na versão final
router.get("/",
    compraController.index
);

export default router;
