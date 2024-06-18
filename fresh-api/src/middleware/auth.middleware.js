import JWT from "jsonwebtoken";
import Usuario from "./../Models/usuario.model.js";

export const testController = async (req, res) => {
  return res.status(200).send("OK");
};

export const requerirSignin = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(200).send({
        succes: false,
        message: "Token no encontrado",
      });
    }
    const verificado = JWT.verify(
      req.headers.authorization,
      process.env.JWT_KEY
    );
    req.usuario = verificado;
    next();
  } catch (error) {
    return res.send({
      succes: false,
      message: "Error en el middleware",
    });
  }
};

export const esAdmin = async (req, res, next) => {
  try {
    const usuario = new Usuario();
    const { id } = req.usuario;
    const [admin] = await usuario.encontrarUsuarioPorId(id);
    if (admin.TipoUsuario != "admin") {
      return res.status(401).send({
        succes: false,
        message: "Acceso no autorizado",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send({
      succes: false,
      message: "Error en el middleware",
    });
  }
};
