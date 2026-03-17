# 🔧 Guía de Configuración Rápida - Backend

## Pasos para configurar el backend desde cero

### 1️⃣ Instalar dependencias

```bash
npm install
```

### 2️⃣ Configurar variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

Edita `.env` con tu configuración:

#### Para MySQL (desarrollo):

```env
DATABASE_PROVIDER="mysql"
DATABASE_URL="mysql://root:tu_password@localhost:3306/admin_panel_db"
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

#### Para PostgreSQL (producción):

```env
DATABASE_PROVIDER="postgresql"
DATABASE_URL="postgresql://usuario:password@localhost:5432/admin_panel_db"
PORT=3000
NODE_ENV=production
FRONTEND_URL=http://tu-dominio.com
```

### 3️⃣ Crear la base de datos

#### MySQL

```bash
# Conéctate a MySQL
mysql -u root -p

# Crea la base de datos
CREATE DATABASE admin_panel_db;
exit;
```

#### PostgreSQL

```bash
# Conéctate a PostgreSQL
psql -U postgres

# Crea la base de datos
CREATE DATABASE admin_panel_db;
\q
```

### 4️⃣ Ejecutar migraciones de Prisma

#### Para desarrollo (MySQL):

```bash
npx prisma migrate dev --name init
```

Esto:
- Crea las tablas en la base de datos
- Genera el cliente de Prisma
- Sincroniza el esquema

#### Para producción (PostgreSQL):

```bash
npx prisma migrate deploy
```

### 5️⃣ Generar el cliente de Prisma

```bash
npx prisma generate
```

### 6️⃣ (Opcional) Ver la base de datos con Prisma Studio

```bash
npx prisma studio
```

Esto abre una interfaz web en `http://localhost:5555` donde puedes ver y editar tus datos.

### 7️⃣ Iniciar el servidor

#### Modo desarrollo (con auto-reload):

```bash
npm run dev
```

#### Modo producción:

```bash
npm start
```

---

## 📊 Comandos útiles de Prisma

```bash
# Ver el estado de las migraciones
npx prisma migrate status

# Resetear la base de datos (CUIDADO: Borra todos los datos)
npx prisma migrate reset

# Crear una nueva migración
npx prisma migrate dev --name nombre_migracion

# Sincronizar el esquema sin crear migración (solo desarrollo)
npx prisma db push

# Formatear el archivo schema.prisma
npx prisma format
```

---

## 🧪 Probar la API

Una vez el servidor esté corriendo, prueba:

### Verificar que está funcionando:

```bash
curl http://localhost:3000
```

Deberías ver:

```json
{
  "message": "🚀 API del Panel Administrativo",
  "version": "1.0.0",
  "endpoints": {
    "products": "/api/products"
  }
}
```

### Crear un producto de prueba:

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Producto de Prueba",
    "description": "Este es un producto de prueba",
    "price": 99.99
  }'
```

### Listar productos:

```bash
curl http://localhost:3000/api/products
```

---

## ❌ Solución de Problemas

### Error: "Environment variable not found: DATABASE_URL"

- Verifica que el archivo `.env` existe en la carpeta `backend/`
- Verifica que tiene la variable `DATABASE_URL` definida

### Error: "Can't reach database server"

- Verifica que MySQL/PostgreSQL está corriendo:
  - MySQL: `mysql -u root -p`
  - PostgreSQL: `psql -U postgres`
- Verifica la URL de conexión en `.env`
- Verifica el puerto (MySQL: 3306, PostgreSQL: 5432)

### Error: "P2002: Unique constraint failed"

- Ya existe un registro con esos datos
- Cambia los valores o elimina el registro existente

### Error: "Prisma Client is not generated"

```bash
npx prisma generate
```

### El servidor no inicia

- Verifica que no haya otro proceso en el puerto 3000:
  - Windows: `netstat -ano | findstr :3000`
  - Cambia el puerto en `.env` si es necesario

---

## 🔄 Cambiar de MySQL a PostgreSQL

1. Instala PostgreSQL
2. Crea la base de datos en PostgreSQL
3. Modifica `.env`:
   ```env
   DATABASE_PROVIDER="postgresql"
   DATABASE_URL="postgresql://usuario:password@localhost:5432/admin_panel_db"
   ```
4. Ejecuta:
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```
5. Reinicia el servidor: `npm run dev`

---

¡Listo! 🎉
