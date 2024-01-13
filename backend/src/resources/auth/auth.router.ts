import { Request, Response } from "express";
import { Router } from "express";

import schemasUsuario from "../usuario/usuario.schemas";
import { validarSchema } from "../../middlewares/validarSchema";
import { usuarioAutenticado } from "../../middlewares/usuarioAutenticado";
import { usuarioNaoAutenticado } from "../../middlewares/usuarioNaoAutenticado";
import authController from "../auth/auth.controller";

const router = Router();


router.post("/",
    validarSchema(schemasUsuario.schemaCadastroUsuario),
    authController.cadastrar
);

router.put("/",
    validarSchema(schemasUsuario.schemaLoginUsuario),
    usuarioNaoAutenticado,
    authController.login
);

router.delete("/",
    usuarioAutenticado,
    authController.logout
);

export default router;