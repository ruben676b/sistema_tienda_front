import { pool } from "../db.js";
import { query } from "express";

class Venta {
  guardarVenta = async (venta) => {
    const { IdUsuario, FormaPago } = venta;

    const fechaVenta = new Date();

    const query =
      "INSERT INTO Ventas (IdUsuario, FechaVenta, Total, FormaPago) VALUES (?, ?, 0, ?)";
    const values = [IdUsuario, fechaVenta, FormaPago];
    const rows = await this.hacerConsultaSQL(query, values);
    const idVenta = rows.insertId;
    const detallesVenta = venta.detalles;
    console.log(detallesVenta);
    const rows2 = await this.guardarDetalleVenta(idVenta, detallesVenta);
    return rows2;
  };
  guardarDetalleVenta = async (idVenta, detalles) => {
    const total = await this.calcularTotal(idVenta, detalles);

    const query = "UPDATE Ventas SET Total = ? WHERE IdVenta = ?";
    const values = [total, idVenta];
    const rows = await this.hacerConsultaSQL(query, values);
    return rows;
  };
  calcularTotal = async (idVenta, detallesVenta) => {
    let total = 0;

    for (const detalle of detallesVenta) {
      const { IdProducto, Cantidad, PrecioUnitario } = detalle;

      await this.actualizarStock(detalle);

      const query =
        "INSERT INTO DetalleVenta (IdVenta, IdProducto, Cantidad, PrecioUnitario) VALUES (?, ?, ?, ?)";
      const values = [idVenta, IdProducto, Cantidad, PrecioUnitario];
      const rows = await this.hacerConsultaSQL(query, values);
      total += Cantidad * PrecioUnitario;
    }
    return total;
  };
  actualizarStock = async (producto) => {
    const queryProducto = "SELECT Stock FROM PRODUCTOS WHERE IdProducto = ?";

    const valuesProducto = [producto.IdProducto];

    const rows = await this.hacerConsultaSQL(queryProducto, valuesProducto);

    const stock = rows[0].Stock;

    const query = "UPDATE Productos SET Stock = ? WHERE IdProducto = ?";

    const stockActualizado = stock - producto.Cantidad;
    const values = [stockActualizado, producto.IdProducto];

    await this.hacerConsultaSQL(query, values);
  };
  hacerConsultaSQL = async (query, values) => {
    const [rows] = await pool.query(query, values);
    return rows;
  };
}

export default Venta;
