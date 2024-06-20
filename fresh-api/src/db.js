import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  database: "freshbd",
  user: "root",
  password: "Rubendla123@",
  port: 2626,
});
