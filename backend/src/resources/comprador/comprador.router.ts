import { Router } from "express";
import compradorController from "./comprador.controller";

const router = Router();

router.get("/", compradorController.index);

export default router;