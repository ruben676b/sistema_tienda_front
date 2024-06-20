import { pool } from "../db.js";

class Empleado {
  obtenerEmpleados = async () => {
    const query = "SELECT * FROM EMPLEADOS";
    const rows = await this.hacerConsultaSQL(query);
    return rows;
  };
  obtenerEmpleado = async (id) => {
    const query = "SELECT * FROM EMPLEADOS WHERE IDEMPLEADO = ?";
    const values = [id];
    const rows = await this.hacerConsultaSQL(query, values);

    return rows;
  };
  actualizarEmpleado = async (datos, id, path) => {
    const {
      nombre,
      apellido,
      direccion,
      nacimiento,
      email,
      telefono,
      cargo,
      sueldo,
      contratacion,
    } = datos;
    const query = `
      UPDATE EMPLEADOS 
      SET 
          Nombre = IFNULL(?, Nombre), 
          apellido = IFNULL(?, APELLIDO), 
           DIRECCION = IFNULL(?, DIRECCION), 
          FECHANACIMIENTO = IFNULL(?, FECHANACIMIENTO), 
           EMAIL = IFNULL(?, EMAIL), 
          TELEFONO = IFNULL(?, TELEFONO), 
        CARGO = IFNULL(?, CARGO),
         SUELDO = IFNULL(?, SUELDO),
          FECHACONTRATACION = IFNULL(?, FECHACONTRATACION), 
          
          RUTAFOTO = IFNULL(?, RUTAFOTO)
       
      WHERE 
          IdEMPLEADO = ?
  `;
    const values = [
      nombre,
      apellido,
      direccion,
      nacimiento,
      email,
      telefono,
      cargo,
      sueldo,
      contratacion,
      path,
      id,
    ];
    const rows = await this.hacerConsultaSQL(query, values);
    return rows;
  };
  borrarEmpleado = async (id) => {
    const query = "DELETE FROM EMPLEADOS WHERE IDEMPLEADO = ?";
    const values = [id];
    const rows = await this.hacerConsultaSQL(query, values);
    return rows;
  };
  guardarEmpleado = async (datos, path) => {
    const {
      nombre,
      apellido,
      direccion,
      nacimiento,
      email,
      telefono,
      cargo,
      sueldo,
      contratacion,
    } = datos;
    const query =
      "INSERT INTO EMPLEADOS(NOMBRE,APELLIDO,FECHANACIMIENTO,DIRECCION,TELEFONO,EMAIL,FECHACONTRATACION,CARGO,SUELDO,RUTAFOTO) VALUES(?,?,?,?,?,?,?,?,?,?)";
    const values = [
      nombre,
      apellido,
      nacimiento,
      direccion,
      telefono,
      email,
      contratacion,
      cargo,
      sueldo,
      path,
    ];
    const rows = await this.hacerConsultaSQL(query, values);
    return rows;
  };
  hacerConsultaSQL = async (query, values) => {
    const [rows] = await pool.query(query, values);
    return rows;
  };
}
export default Empleado;
