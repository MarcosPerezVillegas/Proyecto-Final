import {Sequelize} from "sequelize-typescript";
import { Carrera } from "../models/carrera";
import { Proyecto } from "../models/proyectos";
import { Status } from "../models/status";
import { Tarea } from "../models/tareas";
import { statusProyecto } from "../models/statusProyecto";
import { Maestros } from "../models/maestros";
import { Alumnos } from "../models/alumnos";


export const connection = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "wasd",
    database: "BancoDeProyectos",
    logging: false,
    models:[Carrera,Proyecto,Status,Tarea,statusProyecto,Maestros,Alumnos],


    port: 33061
});

export default connection;