/**
 * Componente para listar productos
 */
function ProductList({ products, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="loading">
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty">
        <p>No hay productos registrados.</p>
        <p>Haz clic en "Nuevo Producto" para agregar uno.</p>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-CR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Creado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <strong>{product.name}</strong>
              </td>
              <td>
                {product.description || (
                  <em style={{ color: '#a0aec0' }}>Sin descripción</em>
                )}
              </td>
              <td className="price">{formatPrice(product.price)}</td>
              <td>{formatDate(product.createdAt)}</td>
              <td>
                <div className="actions">
                  <button
                    onClick={() => onEdit(product)}
                    className="btn btn-edit"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
