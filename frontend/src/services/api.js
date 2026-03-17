/**
 * Servicio de API
 * Centraliza todas las llamadas al backend
 */

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Log para depuración
console.log('API_URL configurada:', API_URL);
console.log('Variables de entorno:', import.meta.env);

/**
 * Función auxiliar para manejar respuestas
 */
const handleResponse = async (response) => {
  // Intentar parsear la respuesta como JSON
  let data;
  try {
    data = await response.json();
  } catch (error) {
    console.error('Error al parsear JSON:', error);
    throw new Error('La respuesta del servidor no es JSON válido');
  }

  if (!response.ok) {
    throw new Error(data.message || 'Error en la petición');
  }

  return data;
};

/**
 * API de productos
 */
export const productApi = {
  // Obtener todos los productos
  getAll: async () => {
    try {
      console.log('Fetching products from:', `${API_URL}/products`);
      const response = await fetch(`${API_URL}/products`);
      console.log('Response status:', response.status);
      return handleResponse(response);
    } catch (error) {
      console.error('Error en getAll:', error);
      throw new Error(`No se pudo conectar con el servidor: ${error.message}`);
    }
  },

  // Obtener un producto por ID
  getById: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    return handleResponse(response);
  },

  // Crear un producto
  create: async (productData) => {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    return handleResponse(response);
  },

  // Actualizar un producto
  update: async (id, productData) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    return handleResponse(response);
  },

  // Eliminar un producto
  delete: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};
