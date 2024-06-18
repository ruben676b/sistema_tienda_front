import { pool } from "../db.js";
class Proveedor {
  obtenerProveedores = async () => {
    const query = "SELECT * FROM PROVEEDORES";
    const rows = await this.hacerConsultaSQL(query);
    return rows;
  };
  obtenerProveedor = async (id) => {
    const query = `SELECT * FROM PROVEEDORES WHERE IDPROVEEDOR = ?`;
    const values = [id];
    const row = await this.hacerConsultaSQL(query, values);
    return row;
  };

  guardarProveedor = async (datos) => {
    const {
      NombreEmpresa,
      Telefono,
      Email,
      Direccion,
      CuentaPago,
      proveedor_imagen,
    } = datos;

    const query = `INSERT INTO Proveedores (NombreEmpresa, Telefono, Email, Direccion, CuentaPago,RutaFoto)
         VALUES (?, ?, ?, ?, ?,?)`;

    const values = [
      NombreEmpresa,
      Telefono,
      Email,
      Direccion,
      CuentaPago,
      proveedor_imagen,
    ];

    const rows = await this.hacerConsultaSQL(query, values);
    return rows;
  };
  actualizarProveedor = async (datos, id) => {
    const {
      NombreEmpresa,
      Telefono,
      Email,
      Direccion,
      CuentaPago,
      proveedor_imagen,
    } = datos;

    const query = `
        UPDATE Proveedores 
        SET 
            NombreEmpresa = IFNULL(?, NombreEmpresa),
            Telefono = IFNULL(?, Telefono), 
            Email = IFNULL(?, Email), 
            Direccion = IFNULL(?, Direccion), 
            CuentaPago = IFNULL(?, CuentaPago),
            RutaFoto = IFNULL(?, RutaFoto)
        WHERE 
            IdProveedor = ?;
    `;

    const values = [
      NombreEmpresa,
      Telefono,
      Email,
      Direccion,
      CuentaPago,
      proveedor_imagen,
      id,
    ];

    const rows = await this.hacerConsultaSQL(query, values);
    return rows;
  };

  borrarProveedor = async (id) => {
    const query = "DELETE FROM PROVEEDORES WHERE IDPROVEEDOR = ?";
    const values = [id];
    const rows = await this.hacerConsultaSQL(query, values);
    return rows;
  };
  buscarProveedor = async (busqueda) => {
    const query = ` SELECT * FROM Proveedores
    WHERE nombreEmpresa LIKE '%${busqueda}%'
  `;
    const rows = await this.hacerConsultaSQL(query);
    return rows;
  };
  hacerConsultaSQL = async (query, values) => {
    const [rows] = await pool.query(query, values);
    return rows;
  };
}
export default Proveedor;
