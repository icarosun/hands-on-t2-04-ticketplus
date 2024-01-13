import { Router } from "express";
import eventoController from "./evento.controller"

const router = Router();

router.get("/", eventoController.index)

export default router;