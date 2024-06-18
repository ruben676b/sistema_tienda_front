import { Router } from "express";
import {
  obtenerEmpleado,
  obtenerEmpleados,
  actualizarEmpleado,
  borrarEmpleado,
  guardarEmpleado,
} from "../controllers/empleados.controller.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
const router = Router();

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtener el directorio del archivo actual
const __dirname = dirname(__filename);

// Construir la ruta absoluta de la carpeta "Productos"
const uploadsDir = `${__dirname}/../uploads/Empleados/`;

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
router.get("/", obtenerEmpleados);
router.get("/:id", obtenerEmpleado);
router.delete("/:id", borrarEmpleado);
router.post(
  "/",
  upload.single("empleado-imagen"),
  (req, res, next) => {
    req.body.nombreImagen = nombreImagen;
    next();
  },
  guardarEmpleado
);
router.patch(
  "/:id",
  upload.single("empleado-imagen"),
  (req, res, next) => {
    req.body.nombreImagen = nombreImagen;
    next();
  },
  actualizarEmpleado
);
export default router;
