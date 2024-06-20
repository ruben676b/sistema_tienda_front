import express from "express";
import productosRouter from "./routes/productos.routes.js";
import proveedoresRouter from "./routes/proveedores.routes.js";
import ventasRouter from "./routes/ventas.routes.js";
import usuarioRouter from "./routes/usuario.routes.js";
import empleadosRouter from "./routes/empleados.router.js";
import marcaRouter from "./routes/marca.router.js";
import categoriaRouter from "./routes/categoria.router.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import cors from "cors";
const app = express();
const upload = multer();
//PERMITIR ACCSSS-CONTROL-ALLOW-ORIGIN
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(cors());

//PERMITIR LEER REQ JSON
app.use(express.json());

//CONSTRUCCION DE LA RUTA ABSOLUTA DE CADA CARPETA IMAGEN
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDirProvedores = `${__dirname}/uploads/Proveedores/`;
const publicDirProductos = `${__dirname}/uploads/Productos/`;
const publicDirEmpleados = `${__dirname}/uploads/Empleados/`;

//CONFIGURACION DE RUTAS DEL SERVIDOR
app.post("/form", upload.none(), (req, res) => {
  console.log(req.body);
  res.send({
    succes: true,
    message: "ok",
  });
});
app.use("/api/v1/auth", usuarioRouter);
app.use("/api/v1/productos", productosRouter);
app.use("/api/v1/proveedores", proveedoresRouter);
app.use("/api/v1/ventas", ventasRouter);
app.use("/api/v1/empleados", empleadosRouter);
app.use("/api/v1/categorias", categoriaRouter);
app.use("/api/v1/marcas", marcaRouter);
// app.use("/api/v1/marca", marcaRouter);
//CONFIGURACION DEL SERVIDO DE ARCHIVOS STATICOS
app.use("/api/v1/uploads/provedores", express.static(publicDirProvedores));
app.use("/api/v1/uploads/productos", express.static(publicDirProductos));
app.use("/api/v1/uploads/empleados", express.static(publicDirEmpleados));

export default app;
