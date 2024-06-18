import Producto from "../Models/producto.model.js";

const producto = new Producto();

export const obtenerProductos = async (req, res) => {
  try {
    const productos = await producto.obtenerProductos();

    res.status(200).send({
      success: true,
      totalProductos: productos.length,
      message: "Todos los productos",
      productos: productos,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener todos los productos",
    });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const [productoUnico] = await producto.obtenerProducto(req.params.id);

    if (!productoUnico) {
      return res.status(200).send({
        success: true,
        message: "Producto unico no encontrado",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Producto unico obtenido",
        producto: productoUnico,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al obtener un producto unico",
    });
  }
};

export const guardarProducto = async (req, res) => {
  try {
    const resultado = await producto.guardarProducto(
      req.body,
      req.body.nombreImagen
    );
    if (resultado.affectedRows == 0) {
      return res.status(200).send({
        success: false,
        message: "Producto no guardado",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Producto guardado",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error al guardar producto",
    });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const resultado = await producto.actualizarProducto(
      req.body,
      req.params.id,
      req.body.nombreImagen
    );
    if (resultado.affectedRows == 0) {
      return res.status(200).send({
        success: false,
        message: "Producto no actualizado",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Producto actualizado",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error al actualizar producto",
    });
  }
};

export const borrarProducto = async (req, res) => {
  try {
    const borrado = await producto.borrarProducto(req.params.id);
    if (borrado.affectedRows == 0) {
      res.status(401).send({
        success: false,
        message: "No se encontro Producto",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Producto Borrado",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error al borrar producto",
    });
  }
};

export const buscarProducto = async (req, res) => {
  try {
    const resultado = await producto.buscarProducto(req.params.palabraClave);
    if (resultado.length == 0) {
      res.status(200).send({
        success: true,
        message: "No se encontro el producto",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Resultado de busqueda",
        resultado: resultado,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error al buscar producto",
    });
  }
};

export const filtrarPorCategoria = async (req, res) => {
  try {
    const productosFiltrados = await producto.filtrarPorCategoria(
      req.body.categoria
    );
    if (productosFiltrados.length == 0) {
      return res.status(200).send({
        success: true,
        message: "No hay productos de esta categoria",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Productos filtrados por categoria",
        productos: productosFiltrados,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error al filtrar por categoria",
    });
  }
};

export const obtenerProductosPorProveedor = async (req, res) => {
  try {
    const productos = await producto.obtenerProductosPorProveedor(
      req.params.idProveedor
    );
    if (productos.length == 0) {
      res.status(200).send({
        success: true,
        totalProductos: productos.length,
        message: "No se encontro Productos de este proveedor",
      });
    } else {
      res.status(200).send({
        success: true,
        totalProductos: productos.length,
        message: "Todos los productos del proveedor",
        productos: productos,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error al obtener todos los productos",
    });
  }
};
