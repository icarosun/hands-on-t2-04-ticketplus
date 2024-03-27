import { Router } from "express";
import compraController from "./compra.controller";
import { validarSchema } from "../../middlewares/validarSchema";
import { usuarioAutenticado } from "../../middlewares/usuarioAutenticado";
import { isComprador } from "../../middlewares/isComprador";
import compraSchemas from "./compra.schemas";

const router = Router();

router.get("/",
    usuarioAutenticado,
    isComprador,
    compraController.index
);

router.post("/",
    usuarioAutenticado,
    isComprador,
    validarSchema(compraSchemas.compraSchema),
    compraController.create
);

export default router;
