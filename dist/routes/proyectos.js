"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proyectos_1 = require("../controller/proyectos");
const verify_token_1 = require("../middleware/verify_token");
const router = (0, express_1.Router)();
router.post("/", verify_token_1.autorizar, proyectos_1.crearProyecto);
router.delete("/:id", verify_token_1.autorizar, proyectos_1.eliminarProyecto);
router.get("/", proyectos_1.listarProyectos);
router.get("/:id", proyectos_1.BuscarProyectoId);
router.get("/Nombre/:nombre", proyectos_1.BuscarProyectoNombre);
router.get("/Usuario/:codigo", proyectos_1.BuscarProyectoUsuario);
router.get("/Carrera/:carrera_clave", proyectos_1.BuscarProyectosCarrera);
router.put("/:id", verify_token_1.autorizar, proyectos_1.actualizarProyecto);
exports.default = router;
