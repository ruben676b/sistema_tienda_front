import { pool } from "../db.js";

class Marcas {
  obtenerMarcas = async () => {
    const query = "SELECT * FROM marcas";
    const rows = await this.hacerConsultaSQL(query);
    return rows;
  };
  crearMarca = async (data) => {
    const query = "INSERT INTO marcas(NOMBRE) VALUES (?)";
    const values = [data];
    const rows = await this.hacerConsultaSQL(query, values);
    return rows;
  };
  borrarMarca = async (id) => {
    const query = "DELETE  FROM marcas WHERE ID = ?";
    const values = [id];
    const rows = await this.hacerConsultaSQL(query, values);
    return rows;
  };
  hacerConsultaSQL = async (query, values) => {
    const [rows] = await pool.query(query, values);
    return rows;
  };
}
export default Marcas;
