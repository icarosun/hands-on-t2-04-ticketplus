import { Router } from "express";
import organizadorController from "./organizador.controller";

const router = Router();

router.get("/", organizadorController.index);

export default router;