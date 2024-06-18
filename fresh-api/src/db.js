import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  database: "f",
  user: "root",
  password: "root",
  port: 3306,
});
