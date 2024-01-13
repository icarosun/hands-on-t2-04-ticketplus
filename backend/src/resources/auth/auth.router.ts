import { Request, Response } from "express";
import { Router } from "express";

import schemasUsuario from "../usuario/usuario.schemas";
import { validarSchema } from "../../middlewares/validarSchema";
import { isAuth } from "../../middlewares/isAuth";
import authController from "../auth/auth.controller";

const router = Router();


router.get("/", (req: Request, res: Response) => {
    res.send("Rotas de autenticação")
});

router.post("/",
validarSchema(schemasUsuario.schemaCadastroUsuario),
    authController.cadastrar
);

router.put("/",
    validarSchema(schemasUsuario.schemaLoginUsuario),
    authController.login
);

router.delete("/",
    isAuth,
    authController.logout
);

export default router;