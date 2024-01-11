import { Router } from "express";

import eventoRouter from "../resources/evento/evento.router";
 
const router = Router();

router.use("/evento",
// #swagger.tags = ['Evento']
eventoRouter);

export default router;
