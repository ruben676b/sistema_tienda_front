import { Router } from "express";
import {
  crearCategoria,
  obtenerCategorias,
  borrarCategoria,
} from "../controllers/categoria.controller.js";

const router = Router();
import multer from "multer";
const upload = multer();
router.get("/", obtenerCategorias);
router.post("/", upload.none(), crearCategoria);
router.delete("/:id", upload.none(), borrarCategoria);
export default router;
