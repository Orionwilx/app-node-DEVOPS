# 🚀 INICIO RÁPIDO - 5 MINUTOS

Guía express para poner en marcha la aplicación en menos de 5 minutos.

---

## ✅ Pre-requisitos

Antes de empezar, asegúrate de tener:

- ✅ **Node.js** instalado (v18+)
- ✅ **MySQL** o **PostgreSQL** instalado y corriendo
- ✅ Una terminal abierta

---

## 📋 Pasos (5 minutos)

### 1. Configurar Backend (2 minutos)

```bash
# Navegar al backend
cd backend

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
```

**Editar `backend/.env`:**

```env
DATABASE_PROVIDER="mysql"
DATABASE_URL="mysql://root:TU_PASSWORD@localhost:3306/admin_panel_db"
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Reemplaza `TU_PASSWORD` con tu contraseña de MySQL.**

---

### 2. Crear Base de Datos (30 segundos)

```bash
# MySQL
mysql -u root -p
```

```sql
CREATE DATABASE admin_panel_db;
exit;
```

---

### 3. Migrar Base de Datos (30 segundos)

```bash
# Aún en backend/
npx prisma migrate dev --name init
npx prisma generate
```

---

### 4. Iniciar Backend (10 segundos)

```bash
npm run dev
```

✅ Deberías ver: `🚀 Servidor corriendo en http://localhost:3000`

**Deja esta terminal abierta.**

---

### 5. Configurar Frontend (1 minuto)

Abre **otra terminal**:

```bash
# Desde la raíz del proyecto
cd frontend

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
```

El archivo `.env` ya tiene la configuración correcta por defecto.

---

### 6. Iniciar Frontend (10 segundos)

```bash
npm run dev
```

✅ El navegador debería abrirse automáticamente en `http://localhost:5173`

---

## 🎉 ¡Listo!

Ahora deberías ver el panel administrativo funcionando.

### Prueba las funcionalidades:

1. ✅ Haz clic en **"+ Nuevo Producto"**
2. ✅ Llena el formulario
3. ✅ Guarda el producto
4. ✅ Edita y elimina productos

---

## 🗂 (Opcional) Agregar Datos de Prueba

Si quieres poblar la base de datos con datos de ejemplo:

```bash
# En MySQL
mysql -u root -p admin_panel_db < backend/seed.sql
```

Recarga el frontend y verás 10 productos de ejemplo.

---

## 🔧 Comandos Útiles

### Backend

```bash
# Ver la base de datos en navegador
npx prisma studio

# Ver estado de migraciones
npx prisma migrate status

# Reiniciar base de datos (⚠️ Borra todos los datos)
npx prisma migrate reset
```

### Frontend

```bash
# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

---

## ❌ Problemas Comunes

### "Cannot connect to database"

- ✅ Verifica que MySQL esté corriendo
- ✅ Verifica la contraseña en `backend/.env`
- ✅ Verifica que la base de datos existe

### "Port 3000 already in use"

```bash
# Cambiar puerto en backend/.env
PORT=3001
```

### "Failed to fetch" en el frontend

- ✅ Verifica que el backend esté corriendo
- ✅ Revisa la URL en `frontend/.env`

### "Prisma Client not generated"

```bash
cd backend
npx prisma generate
```

---

## 🔄 Cambiar a PostgreSQL

Si prefieres usar PostgreSQL en lugar de MySQL:

### 1. Crear base de datos en PostgreSQL

```bash
psql -U postgres
```

```sql
CREATE DATABASE admin_panel_db;
\q
```

### 2. Cambiar `backend/.env`

```env
DATABASE_PROVIDER="postgresql"
DATABASE_URL="postgresql://postgres:tu_password@localhost:5432/admin_panel_db"
```

### 3. Re-migrar

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

¡Y listo! Ahora usa PostgreSQL.

---

## 📚 Siguiente Paso

Lee el **README.md** completo para entender:

- 📐 Arquitectura del proyecto
- 🔌 API Endpoints
- 📈 Cómo escalar la aplicación
- 🏗 Buenas prácticas implementadas

---

## 🆘 ¿Necesitas Ayuda?

1. Revisa `backend/SETUP.md` para detalles del backend
2. Revisa `frontend/SETUP.md` para detalles del frontend
3. Revisa el `README.md` principal para documentación completa

---

¡Feliz desarrollo! 🚀
