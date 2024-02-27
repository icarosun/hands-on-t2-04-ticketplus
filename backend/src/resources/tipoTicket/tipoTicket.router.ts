import { Router } from "express";
import tipoTicketController from "./tipoTicket.controller";

const router = Router();

router.get("/",
    tipoTicketController.index
);

export default router;