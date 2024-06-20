import Marca from "../Models/marca.model.js";
const marca = new Marca();
export const crearMarca = async (req, res) => {
  try {
    const { Nombre } = req.body;

    const rows = await marca.crearMarca(Nombre);

    return res.status(200).send({
      success: true,
      message: "Marca Creada!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error al crear Marca",
    });
  }
};
export const obtenerMarcas = async (req, res) => {
  try {
    const Marcas = await marca.obtenerMarcas();
    return res.status(200).send({
      success: true,
      Marcas: Marcas,
      message: "Marcas obtenidas!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error al obtener Marcas",
    });
  }
};
export const borrarMarca = async (req, res) => {
  try {
    await marca.borrarMarca(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Marca borrada",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "error al borrar Marca",
    });
  }
};
