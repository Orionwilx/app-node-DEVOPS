import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { productApi } from './services/api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await productApi.getAll();
      if (response.success && response.data) {
        setProducts(response.data);
      } else {
        console.error('Respuesta inesperada:', response);
        alert('Error: la respuesta del servidor no es válida');
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
      alert(`Error al cargar los productos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) {
      return;
    }

    try {
      const response = await productApi.delete(id);
      if (response.success) {
        alert(response.message || 'Producto eliminado exitosamente');
        loadProducts();
      } else {
        alert(response.message || 'Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert(`Error al eliminar el producto: ${error.message}`);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    loadProducts();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <Layout>
      <div className="container">
        <header className="header">
          <h1>Gestión de Productos</h1>
          {!showForm && (
            <button onClick={handleCreate} className="btn btn-primary">
              + Nuevo Producto
            </button>
          )}
        </header>

        {showForm ? (
          <ProductForm
            product={editingProduct}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <ProductList
            products={products}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </Layout>
  );
}

export default App;
