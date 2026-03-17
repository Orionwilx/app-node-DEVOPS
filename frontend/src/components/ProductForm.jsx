import { useState, useEffect } from 'react';
import { productApi } from '../services/api';

/**
 * Componente formulario para crear/editar productos
 */
function ProductForm({ product, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Si estamos editando, cargar los datos del producto
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones básicas
    if (!formData.name.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('El precio debe ser mayor a 0');
      return;
    }

    setLoading(true);

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        price: parseFloat(formData.price),
      };

      const response = product
        ? await productApi.update(product.id, productData)
        : await productApi.create(productData);

      if (response.success) {
        alert(response.message || 'Producto guardado exitosamente');
        onSuccess();
      } else {
        setError(response.message || 'Error al guardar el producto');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(`Error al conectar con el servidor: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{product ? 'Editar Producto' : 'Nuevo Producto'}</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            Nombre <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Laptop HP"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción del producto (opcional)"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">
            Precio <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0.01"
            disabled={loading}
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-success"
            disabled={loading}
          >
            {loading ? 'Guardando...' : product ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
