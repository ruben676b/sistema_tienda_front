import Categoria from "../Models/categoria.model.js";
const categoria = new Categoria();
export const crearCategoria = async (req, res) => {
  try {
    const { Nombre } = req.body;

    const rows = await categoria.crearCategoria(Nombre);

    return res.status(200).send({
      success: true,
      message: "categoria Creada!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error al crear categoria",
    });
  }
};
export const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await categoria.obtenerCategorias();
    return res.status(200).send({
      success: true,
      categorias: categorias,
      message: "categorias obtenidas!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error al obtener categorias",
    });
  }
};
export const borrarCategoria = async (req, res) => {
  try {
    await categoria.borrarCategoria(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Categoria borrada",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "error al borrar categoria",
    });
  }
};
