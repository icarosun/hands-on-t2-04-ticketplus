import { Router } from "express";

import authRouter from "../resources/auth/auth.router";

const router = Router();


router.use(
	"/auth",
	authRouter
);

export default router;