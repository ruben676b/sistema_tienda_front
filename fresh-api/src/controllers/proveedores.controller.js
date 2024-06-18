import Proveedor from "../Models/proveedor.model.js";

const proveedor = new Proveedor();

export const obtenerProveedores = async (req, res) => {
  try {
    const proveedores = await proveedor.obtenerProveedores();
    res.status(200).send({
      success: true,
      totalProveedores: proveedores.length,
      message: "Todos los proveedores",
      proveedores: proveedores,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error al obtener todos los proveedores",
    });
  }
};

export const obtenerProveedor = async (req, res) => {
  try {
    const [proveedorUnico] = await proveedor.obtenerProveedor(req.params.id);

    if (!proveedorUnico) {
      res.status(200).send({
        success: true,
        message: "Proveedor unico no encontrado",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Proveedor unico obtenido",
        Proveedor: proveedorUnico,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error al obtener un Proveedor unico",
    });
  }
};

export const guardarProveedor = async (req, res) => {
  try {
    await proveedor.guardarProveedor(req.body);
    return res.status(200).send({
      success: true,
      message: "proveedor guardado",
    });
  } catch (error) {
    console.error("error", error);

    return res.status(500).send({
      success: false,
      message: "Error al guardar proveedor",
    });
  }
};

export const actualizarProveedor = async (req, res) => {
  try {
    const resultado = await proveedor.actualizarProveedor(
      req.body,
      req.params.id
    );
    if (resultado.affectedRows == 0) {
      return res.status(200).send({
        success: true,
        message: "Proveedor no actualizado",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Proveedor actualizado",
      });
    }
  } catch (error) {
    console.error("error", error);
    return res.status(500).send({
      success: false,
      message: "Error al actualizar Proveedor",
    });
  }
};

export const borrarProveedor = async (req, res) => {
  try {
    const resultado = await proveedor.borrarProveedor(req.params.id);
    if (resultado.affectedRows == 0) {
      res.status(401).send({
        success: false,
        message: "No se encontro Proveedor",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Proveedor Borrado",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error al borrar Proveedor",
    });
  }
};
export const buscarProveedor = async (req, res) => {
  try {
    const resultado = await proveedor.buscarProveedor(req.params.palabraClave);
    if (resultado.length == 0) {
      res.status(200).send({
        success: false,
        message: "No se encontro el Proveedor",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Resultado de busqueda",
        resultado: resultado,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error al buscar Proveedor",
    });
  }
};
