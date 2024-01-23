import { Router } from "express";

import { usuarioAutenticado } from "../../middlewares/usuarioAutenticado";
import sessaoController from "./sessao.controller";

const router = Router();


router.get("/",
    usuarioAutenticado,
    sessaoController.index
);

export default router;