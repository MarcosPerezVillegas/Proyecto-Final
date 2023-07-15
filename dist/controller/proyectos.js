"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarProyecto = exports.actualizarProyecto = exports.BuscarProyectosCarrera = exports.BuscarProyectoUsuario = exports.BuscarProyectoNombre = exports.BuscarProyectoId = exports.listarProyectos = exports.crearProyecto = void 0;
const proyectos_1 = require("../models/proyectos");
//import { Usuario } from "../models/maestros";
const carrera_1 = require("../models/carrera");
const status_1 = require("../models/status");
const alumnos_1 = require("../models/alumnos");
const maestros_1 = require("../models/maestros");
const crearProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proyecto = yield proyectos_1.Proyecto.create(Object.assign({}, req.body));
        // Buscar el estado con ID 1 en la tabla Status
        const estado = yield status_1.Status.findByPk(1);
        if (!estado) {
            return res.status(404).json({ message: "No se encontró el estado inicial" });
        }
        // Asociar el estado al proyecto creado
        yield proyecto.$add('statuses', estado);
        return res.status(200).json({ message: "Proyecto creado!", data: proyecto });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.crearProyecto = crearProyecto;
const listarProyectos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var proyectos = yield proyectos_1.Proyecto.findAll({
            include: [
                { model: alumnos_1.Alumnos,
                    attributes: { exclude: ["password", "telefono"] }
                },
                { model: maestros_1.Maestros,
                    attributes: { exclude: ["password", "telefono"] }
                },
                carrera_1.Carrera,
                status_1.Status,
            ],
            attributes: { exclude: ["carrera_clave", "codigo"] },
        });
        if (!proyectos) {
            return res.status(401).json({ message: "No se pudo encontrar los proyectos" });
        }
        return res.status(200).json({ message: "Proyectos encontrados: " + proyectos.length, data: proyectos });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.listarProyectos = listarProyectos;
const BuscarProyectoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const proyecto = yield proyectos_1.Proyecto.findByPk(id, {
            include: [maestros_1.Maestros,
                carrera_1.Carrera,
                { model: status_1.Status },],
            attributes: { exclude: ["carrera_clave"] },
        });
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo encontrar el proyecto" });
        }
        return res.status(200).json({ message: "Proyecto encontrado", data: proyecto });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.BuscarProyectoId = BuscarProyectoId;
const BuscarProyectoNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    try {
        const proyecto = yield proyectos_1.Proyecto.findOne({
            where: { nombre: nombre },
            include: [],
            attributes: { exclude: ["codigo", "carrera_clave"] },
        });
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo encontrar el proyecto" });
        }
        return res.status(200).json({ message: "Proyecto encontrado", data: proyecto });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.BuscarProyectoNombre = BuscarProyectoNombre;
const BuscarProyectoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    try {
        const proyecto = yield proyectos_1.Proyecto.findAll({
            where: { codigo },
            include: [
                carrera_1.Carrera,
            ],
            attributes: { exclude: ["carrera_clave"] },
        });
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo encontrar el proyecto" });
        }
        return res.status(200).json({ message: "Proyecto encontrado", data: proyecto });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.BuscarProyectoUsuario = BuscarProyectoUsuario;
const BuscarProyectosCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carrera_clave } = req.params;
    try {
        const proyecto = yield proyectos_1.Proyecto.findAll({
            where: { carrera_clave },
            include: [
                {
                    //model: Usuario,
                    attributes: { exclude: ["password"] },
                },
                carrera_1.Carrera,
            ],
            attributes: { exclude: ["usuario_codigo", "carrera_clave"] },
        });
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo encontrar el proyecto" });
        }
        return res.status(200).json({ message: "Proyectos encontrados", data: proyecto });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.BuscarProyectosCarrera = BuscarProyectosCarrera;
const actualizarProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const proyectoActualizado = yield proyectos_1.Proyecto.findByPk(id);
        var proyecto = yield proyectos_1.Proyecto.update(Object.assign({}, req.body), { where: { id } });
        if (!proyecto) {
            return res.status(401).json({ message: "No se pudo actualizar el proyecto" });
        }
        return res.status(200).json({ message: "Proyecto actualizado", data: proyectoActualizado });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.actualizarProyecto = actualizarProyecto;
const eliminarProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //const proyecto_id=id;
    try {
        /* console.log(proyecto_id)
         const statusEliminado: Status | null = await Status.findOne({
             where: {proyecto_id},
         });
         if (!statusEliminado) {
             return res.status(401).json({ message: "No se pudo eliminar el status ligado al proyecto" });
         }
         await Status.destroy({ where: { proyecto_id } });*/
        const proyectoEliminado = yield proyectos_1.Proyecto.findByPk(id);
        if (!proyectoEliminado) {
            return res.status(401).json({ message: "No se pudo eliminar el proyecto" });
        }
        yield proyectos_1.Proyecto.destroy({ where: { id } });
        return res.status(200).json({ message: "Proyecto eliminado", data: proyectoEliminado });
    }
    catch (error) {
        return res.status(404).json({ message: "", error });
    }
});
exports.eliminarProyecto = eliminarProyecto;
