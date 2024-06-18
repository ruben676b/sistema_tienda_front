import { Router } from "express";
import { guardarVenta } from "../controllers/ventas.controller.js";
const router = Router();

router.post("/", guardarVenta);

export default router;
