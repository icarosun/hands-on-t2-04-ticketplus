import { Router } from "express";
import imagemController from "./imagem.controller";

const router = Router();

router.get("/:pastaImagem/:id",
    imagemController.index
);

export default router;
