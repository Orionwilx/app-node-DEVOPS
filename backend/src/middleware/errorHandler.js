/**
 * Middleware para manejo centralizado de errores
 */

export const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err);

  // Error de validación de Prisma
  if (err.code === 'P2002') {
    return res.status(400).json({
      success: false,
      message: 'Ya existe un registro con esos datos',
      error: err.message,
    });
  }

  // Error de registro no encontrado en Prisma
  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Registro no encontrado',
      error: err.message,
    });
  }

  // Errores personalizados del servicio
  if (err.message.includes('no encontrado')) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }

  if (err.message.includes('obligatorio') || err.message.includes('debe ser')) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Error genérico
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

/**
 * Middleware para rutas no encontradas
 */
export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
  });
};
