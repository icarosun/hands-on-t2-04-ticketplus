import { Router } from "express";

import Schemascomprador from "../comprador/comprador.schemas";
import schemasOrganizador from "../organizador/organizador.schemas";
import schemasUsuario from "../usuario/usuario.schemas";
import { validarSchema } from "../../middlewares/validarSchema";
import { usuarioAutenticado } from "../../middlewares/usuarioAutenticado";
import { usuarioNaoAutenticado } from "../../middlewares/usuarioNaoAutenticado";
import { isCPFValid } from "../../middlewares/isCPFValid";
import authController from "../auth/auth.controller";

const router = Router();


router.post("/comprador",
    validarSchema(Schemascomprador.schemaCadastroComprador),
    isCPFValid,
    authController.cadastrarComprador
);

router.post("/organizador",
    validarSchema(schemasOrganizador.schemaCadastroOrganizador),
    authController.cadastrarOrganizador
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