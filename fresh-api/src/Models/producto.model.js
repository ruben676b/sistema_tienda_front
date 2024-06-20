import { query } from "express";
import { pool } from "../db.js";

class Producto {
  obtenerProductos = async () => {
    const query = "SELECT * FROM PRODUCTOS";
    const rows = await this.hacerConsultaSQL(query);
    return rows;
  };
  obtenerProducto = async (id) => {
    const query = `SELECT * FROM PRODUCTOS WHERE IDPRODUCTO = ?`;
    const values = [id];
    const row = await this.hacerConsultaSQL(query, values);
    return row;
  };

  guardarProducto = async (datos, path) => {
    const {
      Nombre,
      Descripcion,
      PrecioUnitario,
      PrecioTotal,
      FechaVencimiento,
      Stock,
      StockMinimo,
      UnidadMedida,
      CodigoBarra,
      CategoriaId,
      MarcaId,
      ProveedorId,
    } = datos;
    const query = `INSERT INTO Productos (Nombre, Descripcion, PrecioUnitario, FechaVencimiento,
       Stock, StockMinimo, UnidadMedida, CodigoBarra,RutaImagen,IdProveedor,PrecioTotal,categoria_id,marca_id)
     VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const values = [
      Nombre,
      Descripcion,
      PrecioUnitario,
      FechaVencimiento,
      Stock,
      StockMinimo,
      UnidadMedida,
      CodigoBarra,
      path,
      ProveedorId,
      PrecioTotal,
      CategoriaId,
      MarcaId,
    ];
    const rows = await this.hacerConsultaSQL(query, values);
    return rows;
  };
  actualizarProducto = async (datos, id, path) => {
    const {
      Nombre,
      Descripcion,
      PrecioUnitario,
      PrecioTotal,
      FechaVencimiento,
      Stock,
      StockMinimo,
      UnidadMedida,
      CodigoBarra,
      CategoriaId,
      MarcaId,
      ProveedorId,
    } = datos;
    const query = `
      UPDATE PRODUCTOS 
      SET 
          Nombre = IFNULL(?, Nombre), 
          Descripcion = IFNULL(?, Descripcion), 
          PrecioUnitario = IFNULL(?, PrecioUnitario), 
          FechaVencimiento = IFNULL(?, FechaVencimiento), 
          Stock = IFNULL(?, Stock), 
          StockMinimo = IFNULL(?, StockMinimo), 
          UnidadMedida = IFNULL(?, UnidadMedida), 
          CodigoBarra = IFNULL(?, CodigoBarra),
          RutaImagen = IFNULL(?, RutaImagen),
          idProveedor = IFNULL(?, idProveedor),
          PrecioTotal = IFNULL(?, PrecioTotal),
          Categoria_Id = IFNULL(?, Categoria_Id),
          Marca_Id = IFNULL(?, Marca_Id)
      WHERE 
          IdProducto = ?
  `;
    const values = [
      Nombre,
      Descripcion,
      PrecioUnitario,
      FechaVencimiento,
      Stock,
      StockMinimo,
      UnidadMedida,
      CodigoBarra,
      path,
      ProveedorId,
      PrecioTotal,
      CategoriaId,
      MarcaId,
      id,
    ];
    const rows = await this.hacerConsultaSQL(query, values);
    console.log(rows);
    return rows;
  };
  borrarProducto = async (id) => {
    const query = "DELETE FROM PRODUCTOS WHERE IDPRODUCTO = ?";
    const values = [id];
    const rows = await this.hacerConsultaSQL(query, values);
    return rows;
  };

  buscarProducto = async (busqueda) => {
    const query = ` SELECT * FROM productos
    WHERE nombre LIKE '%${busqueda}%' OR descripcion LIKE '%${busqueda}%'
  `;
    const rows = await this.hacerConsultaSQL(query);
    return rows;
  };
  filtrarPorCategoria = async (categoria) => {
    const query = "SELECT * FROM PRODUCTOS WHERE Categoria = ?";
    const values = [categoria];
    const rows = await this.hacerConsultaSQL(query, values);
    return rows;
  };
  obtenerProductosPorProveedor = async (IdProveedor) => {
    const query = "SELECT * FROM PRODUCTOS WHERE IdProveedor = ?";
    const values = [IdProveedor];
    const rows = await this.hacerConsultaSQL(query, values);
    return rows;
  };
  hacerConsultaSQL = async (query, values) => {
    const [rows] = await pool.query(query, values);
    return rows;
  };
}

export default Producto;
