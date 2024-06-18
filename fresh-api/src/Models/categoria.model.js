import { pool } from "../db.js";

class Categoria {
  obtenerCategorias = async () => {
    const query = "SELECT * FROM CATEGORIAS";
    const rows = await this.hacerConsultaSQL(query);
    return rows;
  };
  crearCategoria = async (data) => {
    const query = "INSERT INTO CATEGORIAS(NOMBRE) VALUES (?)";
    const values = [data];
    const rows = await this.hacerConsultaSQL(query, values);
    return rows;
  };
  borrarCategoria = async (id) => {
    const query = "DELETE  FROM CATEGORIAS WHERE ID = ?";
    const values = [id];
    const rows = await this.hacerConsultaSQL(query, values);
    return rows;
  };
  hacerConsultaSQL = async (query, values) => {
    const [rows] = await pool.query(query, values);
    return rows;
  };
}
export default Categoria;
