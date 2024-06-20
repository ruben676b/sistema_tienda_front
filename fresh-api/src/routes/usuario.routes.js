import { Router } from "express";
import {
  deleteUsuario,
  loginUsuario,
  registrarUsuario,
} from "../controllers/usuario.controller.js";
import {
  testController,
  requerirSignin,
  esAdmin,
} from "../middleware/auth.middleware.js";
import multer from "multer";
const router = Router();
const upload = multer();

router.post("/signup", upload.none(), registrarUsuario);
router.delete("/deleteUsuario", upload.none(), deleteUsuario);
router.post("/signin", upload.none(), loginUsuario);
router.get("/test", requerirSignin, esAdmin, testController);
export default router;
