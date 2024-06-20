import { Router } from "express";
import {
  crearMarca,
  obtenerMarcas,
  borrarMarca,
} from "../controllers/marca.controller.js";

const router = Router();
import multer from "multer";
const upload = multer();
router.get("/", obtenerMarcas);
router.post("/", upload.none(), crearMarca);
router.delete("/:id", upload.none(), borrarMarca);
export default router;
