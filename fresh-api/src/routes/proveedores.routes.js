import { Router } from "express";
import {
  actualizarProveedor,
  borrarProveedor,
  buscarProveedor,
  guardarProveedor,
  obtenerProveedor,
  obtenerProveedores,
} from "../controllers/proveedores.controller.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
const router = Router();

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtener el directorio del archivo actual
const __dirname = dirname(__filename);

// Construir la ruta absoluta de la carpeta "Productos"
const uploadsDir = `${__dirname}/../uploads/Proveedores/`;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/", obtenerProveedores);
router.get("/:id", obtenerProveedor);
router.post(
  "/",
  upload.single("proveedor-imagen"),
  (req, res, next) => {
    req.body.proveedor_imagen = req.file.originalname;
    next();
  },
  guardarProveedor
);

router.patch(
  "/:id",
  upload.single("proveedor-imagen"),
  (req, res, next) => {
    req.body.proveedor_imagen = req.file.originalname;
    next();
  },
  actualizarProveedor
);
router.delete("/:id", borrarProveedor);
router.get("/buscar/:palabraClave", buscarProveedor);
export default router;
