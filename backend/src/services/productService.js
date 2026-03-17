import prisma from '../config/database.js';

/**
 * Capa de servicio - Lógica de negocio
 * Aquí se centraliza toda la lógica relacionada con productos
 */

class ProductService {
  /**
   * Obtener todos los productos
   */
  async getAllProducts() {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Convertir Decimal a número
    return products.map((product) => ({
      ...product,
      price: parseFloat(product.price),
    }));
  }

  /**
   * Obtener un producto por ID
   */
  async getProductById(id) {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    // Convertir Decimal a número
    return {
      ...product,
      price: parseFloat(product.price),
    };
  }

  /**
   * Crear un nuevo producto
   */
  async createProduct(data) {
    const { name, description, price } = data;

    // Validaciones básicas
    if (!name || !price) {
      throw new Error('Nombre y precio son obligatorios');
    }

    if (price <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        price: parseFloat(price),
      },
    });

    // Convertir Decimal a número
    return {
      ...product,
      price: parseFloat(product.price),
    };
  }

  /**
   * Actualizar un producto existente
   */
  async updateProduct(id, data) {
    // Verificar que el producto existe
    await this.getProductById(id);

    const { name, description, price } = data;

    // Preparar datos para actualizar
    const updateData = {};

    if (name !== undefined) {
      updateData.name = name.trim();
    }

    if (description !== undefined) {
      updateData.description = description?.trim() || null;
    }

    if (price !== undefined) {
      if (price <= 0) {
        throw new Error('El precio debe ser mayor a 0');
      }
      updateData.price = parseFloat(price);
    }

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    // Convertir Decimal a número
    return {
      ...product,
      price: parseFloat(product.price),
    };
  }

  /**
   * Eliminar un producto
   */
  async deleteProduct(id) {
    // Verificar que el producto existe
    await this.getProductById(id);

    return await prisma.product.delete({
      where: { id: parseInt(id) },
    });
  }
}

export default new ProductService();
