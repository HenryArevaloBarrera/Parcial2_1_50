import express from "express";
import { findAll, findById, save, update, deleteById, actualizarInventario } from "../controllers/controlles-producto.mjs";
import { authMiddleware } from "../middlewares/auth.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Gestión de productos e inventario
 */

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtener todos los productos (público)
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get("/", findAll);

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID (público)
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: No se encontró el producto
 */
router.get("/:id", findById);

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post("/", authMiddleware, save);

/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: No se encontró el producto
 */
router.put("/:id", authMiddleware, update);

/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: No se encontró el producto
 */
router.delete("/:id", authMiddleware, deleteById);

/**
 * @swagger
 * /api/productos/{id}/inventario:
 *   patch:
 *     summary: Actualizar inventario (entrada o salida)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 enum: [entrada, salida]
 *               cantidad:
 *                 type: number
 *               stockMinimo:
 *                 type: number
 *     responses:
 *       200:
 *         description: Inventario actualizado
 *       400:
 *         description: No hay suficiente stock para la salida
 *       404:
 *         description: Producto no encontrado
 */
router.patch("/:id/inventario", authMiddleware, actualizarInventario);

export default router;
