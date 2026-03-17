# 🚀 Panel Administrativo - CRUD Full Stack

Aplicación web completa con panel administrativo y CRUD básico, desarrollada con **Node.js**, **Express**, **React** y **Prisma ORM**. Diseñada con arquitectura MVC y preparada para cambiar fácilmente entre MySQL (desarrollo) y PostgreSQL (producción).

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración de Base de Datos](#-configuración-de-base-de-datos)
- [Ejecución](#-ejecución)
- [Arquitectura](#-arquitectura)
- [API Endpoints](#-api-endpoints)
- [Cambiar de MySQL a PostgreSQL](#-cambiar-de-mysql-a-postgresql)
- [Escalabilidad](#-escalabilidad)

---

## ✨ Características

- ✅ CRUD completo de productos (Crear, Leer, Actualizar, Eliminar)
- ✅ Arquitectura MVC clara y mantenible
- ✅ Backend con Node.js + Express
- ✅ Frontend con React + Vite
- ✅ ORM Prisma para abstracción de base de datos
- ✅ Cambio fácil entre MySQL y PostgreSQL
- ✅ Manejo centralizado de errores
- ✅ Código limpio y documentado
- ✅ Separación de responsabilidades
- ✅ Listo para escalar

---

## 🛠 Tecnologías

### Backend
- **Node.js** v18+
- **Express** - Framework web
- **Prisma** - ORM moderno
- **MySQL** / **PostgreSQL** - Bases de datos
- **dotenv** - Variables de entorno
- **cors** - Manejo de CORS

### Frontend
- **React** 18
- **Vite** - Build tool
- **CSS moderno** - Sin librerías adicionales

---

## 📁 Estructura del Proyecto

```
admin-panel-crud/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js         # Configuración de Prisma
│   │   ├── controllers/
│   │   │   └── productController.js # Controladores (maneja HTTP)
│   │   ├── services/
│   │   │   └── productService.js    # Lógica de negocio
│   │   ├── routes/
│   │   │   └── productRoutes.js     # Definición de rutas
│   │   ├── middleware/
│   │   │   └── errorHandler.js      # Manejo de errores
│   │   └── server.js                # Punto de entrada
│   ├── prisma/
│   │   └── schema.prisma            # Modelo de datos
│   ├── .env                         # Variables de entorno (crear desde .env.example)
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx           # Layout principal
│   │   │   ├── ProductList.jsx      # Lista de productos
│   │   │   └── ProductForm.jsx      # Formulario crear/editar
│   │   ├── services/
│   │   │   └── api.js               # Cliente API
│   │   ├── App.jsx                  # Componente principal
│   │   ├── App.css                  # Estilos
│   │   └── main.jsx                 # Punto de entrada
│   ├── .env                         # Variables de entorno (crear desde .env.example)
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## 📦 Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** v18 o superior ([Descargar](https://nodejs.org/))
- **npm** o **yarn**
- **MySQL** (para desarrollo local) **O** **PostgreSQL** (para producción)

### Instalar MySQL (Windows)

1. Descargar MySQL Community Server: https://dev.mysql.com/downloads/mysql/
2. Ejecutar el instalador
3. Durante la instalación, configurar:
   - Usuario: `root`
   - Contraseña: la que prefieras
   - Puerto: `3306` (por defecto)

### Instalar PostgreSQL (opcional)

1. Descargar PostgreSQL: https://www.postgresql.org/download/
2. Ejecutar el instalador
3. Configurar usuario y contraseña
4. Puerto por defecto: `5432`

---

## 🚀 Instalación

### 1. Clonar/Descargar el proyecto

```bash
cd admin-panel-crud
```

### 2. Instalar dependencias del Backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del Frontend

```bash
cd ../frontend
npm install
```

---

## 🗄️ Configuración de Base de Datos

### Opción 1: MySQL (Desarrollo Local)

#### 1. Crear la base de datos

Abre MySQL Workbench o la terminal de MySQL:

```sql
CREATE DATABASE admin_panel_db;
```

#### 2. Configurar variables de entorno

En `backend/`, copia `.env.example` a `.env`:

```bash
# En backend/
cp .env.example .env
```

Edita `backend/.env`:

```env
# Base de datos
DATABASE_PROVIDER="mysql"
DATABASE_URL="mysql://root:tu_password@localhost:3306/admin_panel_db"

# Servidor
PORT=3000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:5173
```

**Importante:** Reemplaza `tu_password` con tu contraseña de MySQL.

#### 3. Ejecutar migraciones

```bash
# En backend/
npx prisma migrate dev --name init
npx prisma generate
```

Esto creará la tabla `products` en tu base de datos.

### Opción 2: PostgreSQL (Producción)

#### 1. Crear la base de datos

```sql
CREATE DATABASE admin_panel_db;
```

#### 2. Configurar variables de entorno

Edita `backend/.env`:

```env
# Base de datos
DATABASE_PROVIDER="postgresql"
DATABASE_URL="postgresql://usuario:password@localhost:5432/admin_panel_db"

# Servidor
PORT=3000
NODE_ENV=production

# CORS
FRONTEND_URL=http://tu-dominio.com
```

#### 3. Ejecutar migraciones

```bash
# En backend/
npx prisma migrate deploy
npx prisma generate
```

---

## ▶️ Ejecución

### 1. Iniciar el Backend

```bash
# En backend/
npm run dev
```

El servidor estará en: **http://localhost:3000**

### 2. Configurar Frontend

En `frontend/`, copia `.env.example` a `.env`:

```bash
# En frontend/
cp .env.example .env
```

Edita `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

### 3. Iniciar el Frontend

```bash
# En frontend/
npm run dev
```

El frontend estará en: **http://localhost:5173**

### 4. Abrir en el navegador

Visita **http://localhost:5173** y verás el panel administrativo funcionando.

---

## 🏗 Arquitectura

### Patrón MVC (Model-View-Controller)

```
┌─────────────┐
│   Frontend  │  (React - View)
│   (React)   │
└──────┬──────┘
       │ HTTP Requests
       │
┌──────▼──────────────────────────────┐
│          Backend (Node.js)          │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   Routes (productRoutes.js)  │  │  ← Define endpoints
│  └──────────┬───────────────────┘  │
│             │                       │
│  ┌──────────▼───────────────────┐  │
│  │ Controllers                   │  │  ← Maneja HTTP requests
│  │ (productController.js)        │  │
│  └──────────┬───────────────────┘  │
│             │                       │
│  ┌──────────▼───────────────────┐  │
│  │ Services                      │  │  ← Lógica de negocio
│  │ (productService.js)           │  │
│  └──────────┬───────────────────┘  │
│             │                       │
│  ┌──────────▼───────────────────┐  │
│  │ Prisma Client (ORM)          │  │  ← Abstrae la DB
│  └──────────┬───────────────────┘  │
└─────────────┼─────────────────────┘
              │
    ┌─────────▼─────────┐
    │   MySQL/PostgreSQL │  ← Base de datos
    └───────────────────┘
```

### Separación de Responsabilidades

| Capa | Responsabilidad | Archivo |
|------|----------------|---------|
| **Routes** | Definir endpoints y vincular a controladores | `productRoutes.js` |
| **Controllers** | Manejar requests HTTP, validar entrada, retornar respuestas | `productController.js` |
| **Services** | Lógica de negocio, validaciones, operaciones complejas | `productService.js` |
| **Config** | Configuración de Prisma y conexión a DB | `database.js` |
| **Middleware** | Manejo de errores, autenticación (futuro) | `errorHandler.js` |

### ¿Por qué esta arquitectura?

✅ **Fácil de entender**: Cada archivo tiene una responsabilidad clara
✅ **Fácil de mantener**: Cambios aislados en capas específicas
✅ **Fácil de escalar**: Agregar nuevas entidades siguiendo el mismo patrón
✅ **Fácil de testear**: Cada capa se puede testear independientemente
✅ **Independiente de la DB**: Prisma abstrae MySQL y PostgreSQL

---

## 📡 API Endpoints

Base URL: `http://localhost:3000/api`

### Productos

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| `GET` | `/products` | Listar todos los productos | - |
| `GET` | `/products/:id` | Obtener un producto | - |
| `POST` | `/products` | Crear producto | `{ name, description, price }` |
| `PUT` | `/products/:id` | Actualizar producto | `{ name, description, price }` |
| `DELETE` | `/products/:id` | Eliminar producto | - |

### Ejemplos de uso

#### Crear producto

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop HP",
    "description": "Laptop para desarrollo",
    "price": 850000
  }'
```

#### Listar productos

```bash
curl http://localhost:3000/api/products
```

---

## 🔄 Cambiar de MySQL a PostgreSQL

El proyecto está diseñado para cambiar de base de datos **sin modificar código**, solo configuración.

### Pasos:

#### 1. Instalar PostgreSQL

Descarga e instala PostgreSQL desde https://www.postgresql.org/download/

#### 2. Crear base de datos en PostgreSQL

```sql
CREATE DATABASE admin_panel_db;
```

#### 3. Modificar `backend/.env`

```env
# Cambiar estas dos líneas:
DATABASE_PROVIDER="postgresql"
DATABASE_URL="postgresql://usuario:password@localhost:5432/admin_panel_db"
```

#### 4. Ejecutar migraciones

```bash
# En backend/
npx prisma migrate deploy
npx prisma generate
```

#### 5. Reiniciar el servidor

```bash
npm run dev
```

¡Listo! Ahora tu aplicación usa PostgreSQL en lugar de MySQL.

### ¿Qué hace Prisma por ti?

Prisma traduce automáticamente las queries a SQL específico de cada base de datos:

- **MySQL**: Usa sintaxis MySQL
- **PostgreSQL**: Usa sintaxis PostgreSQL

Todo sin cambiar una sola línea de código en tus servicios o controladores.

---

## 📈 Escalabilidad

### Agregar nuevas entidades (ej: Categorías)

#### 1. Agregar modelo en `prisma/schema.prisma`

```prisma
model Category {
  id          Int      @id @default(autoincrement())
  name        String   @db.VarChar(255)
  description String?  @db.Text
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("categories")
}
```

#### 2. Migrar

```bash
npx prisma migrate dev --name add_categories
```

#### 3. Crear archivos siguiendo la estructura

```
src/
├── services/categoryService.js
├── controllers/categoryController.js
└── routes/categoryRoutes.js
```

#### 4. Registrar rutas en `server.js`

```javascript
import categoryRoutes from './routes/categoryRoutes.js';
app.use('/api/categories', categoryRoutes);
```

### Agregar autenticación

Puedes agregar un middleware de autenticación:

```javascript
// middleware/auth.js
export const authenticate = (req, res, next) => {
  // Verificar token JWT
  // Si es válido, continuar
  // Si no, retornar 401
};
```

Y aplicarlo a rutas protegidas:

```javascript
// routes/productRoutes.js
import { authenticate } from '../middleware/auth.js';

router.post('/', authenticate, productController.create);
```

### Agregar validaciones avanzadas

Puedes usar bibliotecas como **Joi** o **Zod** para validaciones complejas:

```bash
npm install joi
```

```javascript
// middleware/validate.js
import Joi from 'joi';

const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().positive().required(),
  description: Joi.string().optional()
});

export const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
```

### Deployment

Para producción, considera:

1. **Usar PostgreSQL** (más robusto que MySQL para apps grandes)
2. **Variables de entorno** para configuración sensible
3. **PM2** para mantener el servidor corriendo
4. **Nginx** como reverse proxy
5. **Docker** para contenedorización

---

## 🎯 Buenas Prácticas Implementadas

✅ **Separación de responsabilidades** - MVC claro
✅ **Código modular** - Fácil de mantener
✅ **Nombres descriptivos** - Código auto-documentado
✅ **Manejo de errores centralizado** - No repetir código
✅ **Variables de entorno** - Configuración flexible
✅ **Validaciones** - En la capa de servicio
✅ **ORM** - Abstracción de base de datos
✅ **Sin lógica en controladores** - Delegar a servicios

---

## 🤝 Contribuciones

Este es un proyecto de ejemplo educativo. Siéntete libre de usarlo como base para tus proyectos.

---

## 📝 Licencia

MIT

---

## 🆘 Problemas Comunes

### Error: "Cannot connect to database"

- Verifica que MySQL/PostgreSQL esté corriendo
- Verifica la `DATABASE_URL` en `.env`
- Verifica usuario y contraseña

### Error: "Port 3000 already in use"

- Cambia el puerto en `backend/.env`: `PORT=3001`

### Error: "Prisma Client not generated"

```bash
npx prisma generate
```

### Frontend no se conecta al backend

- Verifica que `VITE_API_URL` en `frontend/.env` apunte a `http://localhost:3000/api`
- Verifica que el backend esté corriendo

---

## 👨‍💻 Autor

Desarrollado como proyecto educativo para demostrar arquitectura MVC con Node.js, React y Prisma.

---

## 🎓 Aprendizajes Clave

1. **Prisma ORM** permite cambiar de DB sin cambiar código
2. **Arquitectura MVC** separa responsabilidades claramente
3. **Servicios** centralizan la lógica de negocio
4. **Controladores** solo manejan HTTP
5. **Variables de entorno** hacen la app configurable
6. **Separación frontend/backend** permite escalar independientemente

---

¡Disfruta desarrollando! 🚀
