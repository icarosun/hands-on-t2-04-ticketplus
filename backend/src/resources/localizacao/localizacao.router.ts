import { Router } from "express";
import localizacaoController from "./localizacao.controller";

const router = Router();

router.get("/:CEP",
    localizacaoController.read
);

export default router;