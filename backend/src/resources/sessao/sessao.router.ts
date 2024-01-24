import { Router } from "express";

import { usuarioAutenticado } from "../../middlewares/usuarioAutenticado";
import sessaoController from "./sessao.controller";

const router = Router();


router.get("/",
    sessaoController.index
);

export default router;