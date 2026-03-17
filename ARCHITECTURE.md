# 🏗 ARQUITECTURA DEL PROYECTO

Documentación técnica de la arquitectura, patrones de diseño y decisiones técnicas.

---

## 📐 Visión General

Este proyecto implementa una arquitectura **MVC (Model-View-Controller)** moderna con:

- **Backend**: API REST con Node.js + Express
- **Frontend**: SPA con React
- **Base de Datos**: MySQL o PostgreSQL (intercambiables)
- **ORM**: Prisma (abstracción de base de datos)

---

## 🎯 Principios de Diseño

### 1. Separación de Responsabilidades (SoC)

Cada capa tiene una única responsabilidad:

```
┌─────────────────────────────────────────┐
│          CAPA DE PRESENTACIÓN           │
│              (Frontend)                 │
│    - Renderiza UI                       │
│    - Maneja interacción del usuario     │
│    - Consume API REST                   │
└──────────────┬──────────────────────────┘
               │ HTTP/JSON
┌──────────────▼──────────────────────────┐
│        CAPA DE APLICACIÓN               │
│           (Controladores)               │
│    - Maneja HTTP requests/responses     │
│    - Valida entrada                     │
│    - Delega lógica a servicios          │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│        CAPA DE NEGOCIO                  │
│            (Servicios)                  │
│    - Lógica de negocio                  │
│    - Validaciones complejas             │
│    - Orquesta operaciones               │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│        CAPA DE ACCESO A DATOS           │
│           (Prisma ORM)                  │
│    - Abstrae queries SQL                │
│    - Maneja conexión a DB               │
│    - Migraciones                        │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│          BASE DE DATOS                  │
│       (MySQL / PostgreSQL)              │
│    - Persistencia                       │
│    - Integridad referencial             │
└─────────────────────────────────────────┘
```

---

## 🗂 Estructura de Carpetas

### Backend

```
backend/
├── src/
│   ├── config/           # Configuración (DB, env)
│   │   └── database.js   # Cliente Prisma
│   │
│   ├── controllers/      # Capa de controladores
│   │   └── productController.js
│   │       - Recibe HTTP requests
│   │       - Valida entrada básica
│   │       - Llama a servicios
│   │       - Retorna HTTP responses
│   │
│   ├── services/         # Capa de lógica de negocio
│   │   └── productService.js
│   │       - Validaciones complejas
│   │       - Reglas de negocio
│   │       - Operaciones con Prisma
│   │
│   ├── routes/           # Definición de rutas
│   │   └── productRoutes.js
│   │       - Mapea endpoints a controladores
│   │       - Middleware de rutas
│   │
│   ├── middleware/       # Middleware global
│   │   └── errorHandler.js
│   │       - Manejo centralizado de errores
│   │       - Logging
│   │
│   └── server.js         # Punto de entrada
│       - Configura Express
│       - Aplica middleware
│       - Inicia servidor
│
├── prisma/
│   └── schema.prisma     # Modelo de datos
│       - Define tablas
│       - Relaciones
│       - Índices
│
└── package.json
```

### Frontend

```
frontend/
├── src/
│   ├── components/       # Componentes React
│   │   ├── Layout.jsx    # Estructura general
│   │   ├── ProductList.jsx    # Lista (Read)
│   │   └── ProductForm.jsx    # Formulario (Create/Update)
│   │
│   ├── services/         # Comunicación con API
│   │   └── api.js
│   │       - Funciones fetch
│   │       - Manejo de errores HTTP
│   │
│   ├── App.jsx           # Componente raíz
│   │   - Estado global
│   │   - Orquestación de componentes
│   │
│   ├── App.css           # Estilos globales
│   └── main.jsx          # Punto de entrada
│
└── package.json
```

---

## 🔄 Flujo de Datos

### Crear un Producto (Ejemplo completo)

```
┌─────────────────────────────────────────────────────┐
│  1. Usuario llena formulario en ProductForm.jsx     │
│     - Nombre: "Laptop"                              │
│     - Precio: 850000                                │
│     - Descripción: "..."                            │
└────────────────────┬────────────────────────────────┘
                     │ onSubmit()
                     ▼
┌─────────────────────────────────────────────────────┐
│  2. ProductForm envía POST request                  │
│     fetch('/api/products', {                        │
│       method: 'POST',                               │
│       body: JSON.stringify(formData)                │
│     })                                              │
└────────────────────┬────────────────────────────────┘
                     │ HTTP POST
                     ▼
┌─────────────────────────────────────────────────────┐
│  3. Express Router recibe request                   │
│     POST /api/products                              │
│     → productRoutes.js                              │
│     → router.post('/', productController.create)    │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│  4. productController.create()                      │
│     - Extrae req.body                               │
│     - Llama al servicio                             │
│     const product = await productService            │
│       .createProduct(req.body)                      │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│  5. productService.createProduct()                  │
│     - Valida datos                                  │
│       * Nombre no vacío                             │
│       * Precio > 0                                  │
│     - Limpia datos (trim)                           │
│     - Llama a Prisma                                │
│     return await prisma.product.create({...})       │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│  6. Prisma ejecuta query SQL                        │
│     INSERT INTO products (name, price, ...)         │
│     VALUES ('Laptop', 850000, ...)                  │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│  7. Base de datos guarda el registro                │
│     MySQL/PostgreSQL                                │
│     Retorna: { id: 1, name: 'Laptop', ... }         │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│  8. Respuesta viaja de vuelta                       │
│     Prisma → Service → Controller → Express         │
│     res.status(201).json({                          │
│       success: true,                                │
│       data: product                                 │
│     })                                              │
└────────────────────┬────────────────────────────────┘
                     │ HTTP 201 + JSON
                     ▼
┌─────────────────────────────────────────────────────┐
│  9. Frontend recibe respuesta                       │
│     ProductForm.jsx:                                │
│     - Muestra mensaje de éxito                      │
│     - Llama onSuccess()                             │
│     - App.jsx recarga lista de productos            │
└─────────────────────────────────────────────────────┘
```

---

## 🔌 API REST - Diseño

### Convenciones

- **Endpoints**: `/api/recursos`
- **Métodos HTTP**: Semánticos (GET, POST, PUT, DELETE)
- **Respuestas**: JSON con estructura consistente
- **Códigos de estado**: Apropiados (200, 201, 400, 404, 500)

### Formato de Respuesta Estándar

#### Éxito

```json
{
  "success": true,
  "message": "Producto creado exitosamente",
  "data": {
    "id": 1,
    "name": "Laptop",
    "price": 850000
  }
}
```

#### Error

```json
{
  "success": false,
  "message": "El precio debe ser mayor a 0",
  "error": "Validation error" // Solo en desarrollo
}
```

### Endpoints

| Método | Endpoint | Controlador | Servicio | Descripción |
|--------|----------|-------------|----------|-------------|
| GET | `/api/products` | `getAll()` | `getAllProducts()` | Listar todos |
| GET | `/api/products/:id` | `getById()` | `getProductById(id)` | Obtener uno |
| POST | `/api/products` | `create()` | `createProduct(data)` | Crear |
| PUT | `/api/products/:id` | `update()` | `updateProduct(id, data)` | Actualizar |
| DELETE | `/api/products/:id` | `delete()` | `deleteProduct(id)` | Eliminar |

---

## 🗃 Modelo de Datos (Prisma)

### Schema Definition

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String   @db.VarChar(255)
  description String?  @db.Text
  price       Decimal  @db.Decimal(10, 2)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("products")
}
```

### Ventajas de Prisma

1. **Type-safe**: Genera tipos TypeScript automáticamente
2. **Multi-database**: MySQL, PostgreSQL, SQLite, SQL Server, MongoDB
3. **Migraciones**: Control de versiones del esquema
4. **Introspection**: Genera schema desde DB existente
5. **Studio**: GUI para ver/editar datos

### Cambio de Base de Datos

Prisma traduce el schema a SQL específico:

**MySQL:**
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  ...
)
```

**PostgreSQL:**
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  ...
)
```

Solo cambiando el `provider` en `.env`:

```env
# MySQL
DATABASE_PROVIDER="mysql"
DATABASE_URL="mysql://..."

# PostgreSQL
DATABASE_PROVIDER="postgresql"
DATABASE_URL="postgresql://..."
```

---

## 🛡 Manejo de Errores

### Estrategia de 3 capas

#### 1. Validación en Servicios

```javascript
// productService.js
if (!name || !price) {
  throw new Error('Nombre y precio son obligatorios');
}
```

#### 2. Try/Catch en Controladores

```javascript
// productController.js
try {
  const product = await productService.createProduct(req.body);
  res.json({ success: true, data: product });
} catch (error) {
  next(error); // Pasar al middleware de errores
}
```

#### 3. Middleware Centralizado

```javascript
// errorHandler.js
export const errorHandler = (err, req, res, next) => {
  // Prisma errors
  if (err.code === 'P2002') {
    return res.status(400).json({ message: 'Registro duplicado' });
  }

  // Custom errors
  if (err.message.includes('obligatorio')) {
    return res.status(400).json({ message: err.message });
  }

  // Generic
  res.status(500).json({ message: 'Error interno del servidor' });
};
```

---

## 🔐 Seguridad

### Implementado

✅ **CORS**: Restringe orígenes permitidos
✅ **Validación de entrada**: En servicios
✅ **Manejo de errores**: No expone detalles internos en producción
✅ **Variables de entorno**: Credenciales no en código

### Recomendaciones para Producción

⚠️ **Autenticación**: JWT, sesiones
⚠️ **Rate limiting**: Prevenir abuse
⚠️ **Helmet**: Headers de seguridad
⚠️ **Input sanitization**: Prevenir SQL injection (Prisma ya lo hace)
⚠️ **HTTPS**: Cifrado en tránsito

---

## 📈 Escalabilidad

### Agregar Nueva Entidad

Para agregar, por ejemplo, `categories`:

#### 1. Schema (`prisma/schema.prisma`)

```prisma
model Category {
  id   Int    @id @default(autoincrement())
  name String @db.VarChar(255)

  @@map("categories")
}
```

#### 2. Migrar

```bash
npx prisma migrate dev --name add_categories
```

#### 3. Service (`services/categoryService.js`)

```javascript
class CategoryService {
  async getAllCategories() { ... }
  async createCategory(data) { ... }
  // ...
}
```

#### 4. Controller (`controllers/categoryController.js`)

```javascript
class CategoryController {
  async getAll(req, res, next) { ... }
  async create(req, res, next) { ... }
  // ...
}
```

#### 5. Routes (`routes/categoryRoutes.js`)

```javascript
router.get('/', categoryController.getAll);
router.post('/', categoryController.create);
```

#### 6. Registrar (`server.js`)

```javascript
import categoryRoutes from './routes/categoryRoutes.js';
app.use('/api/categories', categoryRoutes);
```

### Relaciones entre Modelos

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  categoryId  Int
  category    Category @relation(fields: [categoryId], references: [id])
}

model Category {
  id       Int       @id @default(autoincrement())
  name     String
  products Product[]
}
```

---

## 🧪 Testing (Recomendaciones)

### Backend

```bash
npm install --save-dev jest supertest
```

```javascript
// tests/productService.test.js
describe('ProductService', () => {
  it('should create a product', async () => {
    const product = await productService.createProduct({
      name: 'Test',
      price: 100
    });
    expect(product.name).toBe('Test');
  });
});
```

### Frontend

```bash
npm install --save-dev @testing-library/react vitest
```

```javascript
// tests/ProductForm.test.jsx
describe('ProductForm', () => {
  it('should render form fields', () => {
    render(<ProductForm />);
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
  });
});
```

---

## 🚀 Performance

### Backend

- ✅ **Conexión pooling**: Prisma lo maneja automáticamente
- ✅ **Índices**: Definir en `schema.prisma`
- ⚠️ **Caché**: Redis para datos frecuentes
- ⚠️ **Paginación**: Implementar para listas grandes

### Frontend

- ✅ **Code splitting**: Vite lo hace automáticamente
- ⚠️ **Lazy loading**: React.lazy() para rutas
- ⚠️ **Memoización**: useMemo, useCallback
- ⚠️ **Virtual scrolling**: Para listas muy largas

---

## 📊 Monitoreo (Producción)

### Logging

```javascript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### APM (Application Performance Monitoring)

- **New Relic**
- **DataDog**
- **Sentry** (errores)

---

## 🎓 Patrones de Diseño Utilizados

1. **MVC**: Separación de responsabilidades
2. **Repository Pattern**: Prisma actúa como repositorio
3. **Dependency Injection**: Servicios importados en controladores
4. **Middleware Pattern**: Express middleware
5. **Factory Pattern**: Prisma Client
6. **Singleton**: Instancia única de Prisma Client

---

## 📚 Referencias

- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Documentation](https://react.dev)
- [REST API Design](https://restfulapi.net/)

---

Hecho con ❤️ como proyecto educativo
