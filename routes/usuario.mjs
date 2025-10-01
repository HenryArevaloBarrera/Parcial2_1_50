import express from "express";
import { findAll, findById, save, update, deleteById } from "../controllers/controlles-usuario.mjs";
import { authMiddleware } from "../middlewares/auth.mjs"; // protege rutas con JWT

const router = express.Router();

router.get("/",  findAll);

router.get("/:id",  findById);

router.post("/", save);

router.put("/:id",  update);

router.delete("/:id",  deleteById);

export default router;
