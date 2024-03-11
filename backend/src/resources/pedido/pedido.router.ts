import { Router } from "express";
import pedidoController from "./pedido.controller";

const router = Router();

router.post("/",
    pedidoController.create
);

export default router;