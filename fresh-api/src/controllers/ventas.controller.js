import Venta from "../Models/venta.model.js";

const venta = new Venta();
export const guardarVenta = async (req, res) => {
  const resultado = await venta.guardarVenta(req.body);

  res.send(resultado);
};
export const obtenerVenta = async (req, res) => {
  res.send("ok");
};
