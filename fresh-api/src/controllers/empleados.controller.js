import Empleado from "../Models/empleado.model.js";

const empleado = new Empleado();

export const obtenerEmpleados = async (req, res) => {
  try {
    const empleados = await empleado.obtenerEmpleados();
    res.status(200).send({
      success: true,
      totalEmpleados: empleados.length,
      message: "Todos los empleados",
      empleados: empleados,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener todos empleados",
    });
  }
};

export const obtenerEmpleado = async (req, res) => {
  try {
    const Id = req.params.id;
    const resultado = await empleado.obtenerEmpleado(Id);
    res.status(200).send({
      success: true,
      empleado: resultado,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error al obtener Empleado",
    });
  }
};
export const actualizarEmpleado = async (req, res) => {
  try {
    const resultado = await empleado.actualizarEmpleado(
      req.body,
      req.params.id,
      req.body.nombreImagen
    );
    if (resultado.affectedRows == 0) {
      return res.status(200).send({
        success: false,
        message: "empleado no actualizado",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "empleado actualizado",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error al actualizar empleado",
    });
  }
};
export const borrarEmpleado = async (req, res) => {
  try {
    const resultado = await empleado.borrarEmpleado(req.params.id);
    if (resultado.affectedRows == 0) {
      return res.status(200).send({
        success: false,
        message: "empleado no borrado",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "empleado borrado!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error al borrar empleado",
    });
  }
};
export const guardarEmpleado = async (req, res) => {
  try {
    const resultado = await empleado.guardarEmpleado(
      req.body,
      req.body.nombreImagen
    );
    if (resultado.affectedRows == 0) {
      return res.status(200).send({
        success: false,
        message: "empleado no guardado",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "empleado guardado",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error al guardar empleado",
    });
  }
};
