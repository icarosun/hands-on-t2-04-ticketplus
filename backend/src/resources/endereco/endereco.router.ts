import { Router } from "express";
import enderecoController from "./endereco.controller";

const router = Router();

router.get("/:CEP",
    enderecoController.read
);

export default router;