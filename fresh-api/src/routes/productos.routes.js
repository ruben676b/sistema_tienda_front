import { Router } from "express";

import {
  actualizarProducto,
  borrarProducto,
  buscarProducto,
  filtrarPorCategoria,
  guardarProducto,
  obtenerProducto,
  obtenerProductos,
  obtenerProductosPorProveedor,
} from "../controllers/productos.controller.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
const router = Router();

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtener el directorio del archivo actual
const __dirname = dirname(__filename);

// Construir la ruta absoluta de la carpeta "Productos"
const uploadsDir = `${__dirname}/../uploads/Productos/`;

var nombreImagen;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    nombreImagen = `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`;
    cb(null, nombreImagen);
  },
});

const getExt = (mimetype) => {
  switch (mimetype) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
  }
};

const upload = multer({ storage: storage });

//RUTAS
router.get("/", obtenerProductos);
router.get("/:id", obtenerProducto);
router.post(
  "/",
  upload.single("imagen-producto"),
  (req, res, next) => {
    req.body.nombreImagen = nombreImagen;
    next();
  },
  guardarProducto
);
router.patch(
  "/:id",
  upload.single("imagen-producto"),
  (req, res, next) => {
    req.body.nombreImagen = nombreImagen;
    next();
  },
  actualizarProducto
);
router.delete("/:id", borrarProducto);

router.get("/buscar/:palabraClave", buscarProducto);
router.post("/filtrar", filtrarPorCategoria);
router.get(
  "/obtener-productos-proveedor/:idProveedor",
  obtenerProductosPorProveedor
);
export default router;
