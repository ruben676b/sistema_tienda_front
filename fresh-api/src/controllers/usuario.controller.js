import Usuario from "../Models/usuario.model.js";

const usuario = new Usuario();

export const registrarUsuario = async (req, res) => {
  const { Nombre, Contrasenia, TipoUsuario, IdEmpleado } = req.body;
  console.log(req.body);

  if (!Nombre) {
    return res.status(400).send({ message: "El Nombre es requerido" });
  }
  if (!Contrasenia) {
    return res.status(400).send({ message: "La Contraseña es requerida" });
  }
  if (!TipoUsuario) {
    return res.status(400).send({ message: "El tipo de usuario es requerido" });
  }

  const [usuarioExistente] = await usuario.encontrarUsuario(req.body.Nombre);

  if (usuarioExistente) {
    return res.status(200).json({
      success: false,
      message: "Usuario ya registrado",
    });
  }

  const resultado = await usuario.registrarUsuario(req.body);

  if (resultado.affectedRows) {
    const idUsuario = resultado.insertId;
    const token = await usuario.crearToken(idUsuario);
    res.status(200).json({
      success: true,
      message: "Usuario registrado exitosamente",
      token: token,
    });
  } else {
    res.json({
      success: false,
      message: "Algo salio mal",
    });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { Nombre, Contrasenia } = req.body;

    if (!Nombre || !Contrasenia) {
      return res.status(400).send({
        success: false,
        message: "Nombre o Contraseña invalidos",
      });
    }

    const [usuarioExistente] = await usuario.encontrarUsuario(req.body.Nombre);

    if (!usuarioExistente) {
      return res.status(200).json({
        success: false,
        message: "Usuario no registrado",
      });
    }

    const match = await usuario.compararContrasenia(
      req.body.Contrasenia,
      usuarioExistente.Contraseña
    );

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Contraseña invalida",
      });
    }
    const token = await usuario.crearToken(usuarioExistente.IdUsuario);

    let userData = {
      Nombre: usuarioExistente["Nombre"],
      TipoUsuario: usuarioExistente["TipoUsuario"],
    };

    return res.status(200).json({
      success: true,
      message: "Login exitoso",
      usuario: userData,
      token: token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error en el Login",
    });
  }
};

export const deleteUsuario = async (req, res) => {
  const resultado = await usuario.eliminarUsuario(req.body);

  if (resultado.affectedRows) {
    res.status(200).json({
      success: true,
      message: "Usuario Eliminado exitosamente",
    });
  } else {
    res.json({
      success: false,
      message: "Algo salio mal",
    });
  }
};
