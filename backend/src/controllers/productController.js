import productService from '../services/productService.js';

/**
 * Controlador de productos
 * Maneja las peticiones HTTP y delega la lógica al servicio
 */

class ProductController {
  /**
   * GET /api/products
   * Obtener todos los productos
   */
  async getAll(req, res, next) {
    try {
      const products = await productService.getAllProducts();
      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/products/:id
   * Obtener un producto por ID
   */
  async getById(req, res, next) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/products
   * Crear un nuevo producto
   */
  async create(req, res, next) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json({
        success: true,
        message: 'Producto creado exitosamente',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/products/:id
   * Actualizar un producto
   */
  async update(req, res, next) {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body
      );
      res.json({
        success: true,
        message: 'Producto actualizado exitosamente',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/products/:id
   * Eliminar un producto
   */
  async delete(req, res, next) {
    try {
      await productService.deleteProduct(req.params.id);
      res.json({
        success: true,
        message: 'Producto eliminado exitosamente',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
