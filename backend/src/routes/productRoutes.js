import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

/**
 * Rutas para el CRUD de productos
 * Base: /api/products
 */

// GET /api/products - Listar todos los productos
router.get('/', productController.getAll);

// GET /api/products/:id - Obtener un producto específico
router.get('/:id', productController.getById);

// POST /api/products - Crear un nuevo producto
router.post('/', productController.create);

// PUT /api/products/:id - Actualizar un producto
router.put('/:id', productController.update);

// DELETE /api/products/:id - Eliminar un producto
router.delete('/:id', productController.delete);

export default router;
