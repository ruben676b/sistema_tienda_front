import bcrypt from "bcrypt";
import { pool } from "../db.js";

import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { query } from "express";
dotenv.config();
class Usuario {
  registrarUsuario = async (datos) => {
    const { Nombre, Contrasenia, TipoUsuario, IdEmpleado } = datos;
    const contraseniaHash = await this.encriptarContrasenia(Contrasenia);
    let query;
    let values;
    if (IdEmpleado) {
      query =
        "INSERT INTO Usuarios (Nombre, Contraseña, TipoUsuario, IdEmpleado) VALUES (?, ?, ?, ?)";
      values = [Nombre, contraseniaHash, TipoUsuario, IdEmpleado];
    } else {
      query =
        "INSERT INTO Usuarios (Nombre, Contraseña, TipoUsuario, IdEmpleado) VALUES (?, ?, ?, NULL)";
      values = [Nombre, contraseniaHash, TipoUsuario];
    }

    await this.hacerUsuario(IdEmpleado);

    const rows = await this.hacerConsultaSQL(query, values);

    return rows;
  };
  eliminarUsuario = async (datos) => {
    const { IdEmpleado } = datos;
    await this.quitarUsuario(IdEmpleado);
    const query = "DELETE  FROM USUARIOS WHERE IDEMPLEADO = ?";
    const values = [IdEmpleado];
    const rows = await this.hacerConsultaSQL(query, values);

    return rows;
  };
  hacerUsuario = async (id) => {
    let query = "UPDATE EMPLEADOS SET ESUSUARIO  = 'Si' where IdEmpleado= ?";
    let values = [id];
    await this.hacerConsultaSQL(query, values);
  };
  quitarUsuario = async (id) => {
    let query = "UPDATE EMPLEADOS SET ESUSUARIO  = 'No' where IdEmpleado= ?";
    let values = [id];
    await this.hacerConsultaSQL(query, values);
  };
  encriptarContrasenia = async (contrasenia) => {
    try {
      const rondaSaltos = 10;
      const contraseniaHash = await bcrypt.hash(contrasenia, rondaSaltos);
      return contraseniaHash;
    } catch (error) {
      console.error(error);
    }
  };

  encontrarUsuario = async (usuario) => {
    const query = "SELECT * FROM Usuarios where Nombre = ?";
    const values = [usuario];
    const rows = await this.hacerConsultaSQL(query, values);
    return rows;
  };
  encontrarUsuarioPorId = async (usuario) => {
    const query = "SELECT * FROM Usuarios where IdUsuario = ?";
    const values = [usuario];
    const rows = await this.hacerConsultaSQL(query, values);
    return rows;
  };

  compararContrasenia = async (contraseñaUsuario, contraseniaHash) => {
    return bcrypt.compare(contraseñaUsuario, contraseniaHash);
  };

  hacerConsultaSQL = async (query, values) => {
    const [rows] = await pool.query(query, values);
    return rows;
  };
  crearToken = async (idUsuario) => {
    return JWT.sign({ id: idUsuario }, process.env.JWT_KEY, {
      expiresIn: 60 * 60 * 24,
    });
  };
}

export default Usuario;
