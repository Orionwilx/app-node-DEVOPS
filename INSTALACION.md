# 📦 GUÍA DE INSTALACIÓN PASO A PASO

Instrucciones detalladas para instalar y ejecutar el proyecto desde cero.

---

## ✅ PASO 1: Verificar Requisitos

Abre una terminal y ejecuta:

```bash
node --version
```

Deberías ver algo como `v18.x.x` o superior.

Si no tienes Node.js, descárgalo desde: https://nodejs.org/

---

## ✅ PASO 2: Instalar MySQL

### Windows

1. Descarga MySQL desde: https://dev.mysql.com/downloads/installer/
2. Ejecuta el instalador
3. Selecciona "Custom" o "Developer Default"
4. Instala **MySQL Server** y **MySQL Workbench**
5. Durante la configuración:
   - Usuario: `root`
   - Contraseña: Elige una (recuérdala, la necesitarás)
   - Puerto: `3306`
6. Finaliza la instalación

### Verificar instalación

```bash
mysql --version
```

Deberías ver: `mysql  Ver 8.x.x`

---

## ✅ PASO 3: Configurar el Backend

### 3.1 Navegar al directorio backend

```bash
cd admin-panel-crud/backend
```

### 3.2 Instalar dependencias

```bash
npm install
```

Esto instalará:
- Express
- Prisma
- CORS
- dotenv
- Nodemon

**Espera a que termine (puede tardar 1-2 minutos)**

### 3.3 Crear archivo de configuración

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Windows (CMD)
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

### 3.4 Editar configuración

Abre el archivo `backend/.env` con tu editor favorito y modifica:

```env
DATABASE_PROVIDER="mysql"
DATABASE_URL="mysql://root:TU_PASSWORD_AQUI@localhost:3306/admin_panel_db"
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**IMPORTANTE:** Reemplaza `TU_PASSWORD_AQUI` con la contraseña que configuraste en MySQL.

Ejemplo:
```env
DATABASE_URL="mysql://root:mipassword123@localhost:3306/admin_panel_db"
```

---

## ✅ PASO 4: Crear la Base de Datos

### 4.1 Abrir MySQL

**Opción A: MySQL Workbench (interfaz gráfica)**
1. Abre MySQL Workbench
2. Conéctate a tu servidor local
3. Abre una nueva query
4. Ejecuta:

```sql
CREATE DATABASE admin_panel_db;
```

**Opción B: Terminal**

```bash
mysql -u root -p
```

Ingresa tu contraseña cuando te la pida.

Luego ejecuta:

```sql
CREATE DATABASE admin_panel_db;
```

```sql
SHOW DATABASES;
```

Deberías ver `admin_panel_db` en la lista.

```sql
exit;
```

---

## ✅ PASO 5: Ejecutar Migraciones de Prisma

Esto creará las tablas en la base de datos.

```bash
# Asegúrate de estar en backend/
npx prisma migrate dev --name init
```

Deberías ver:

```
✔ Generated Prisma Client
✔ Applied migration 0001_init
```

Luego ejecuta:

```bash
npx prisma generate
```

### (Opcional) Ver la base de datos

```bash
npx prisma studio
```

Esto abre una interfaz web en `http://localhost:5555` donde puedes ver tus tablas.

---

## ✅ PASO 6: Iniciar el Backend

```bash
npm run dev
```

Deberías ver:

```
✅ Conexión a la base de datos establecida
📊 Proveedor: mysql
🚀 Servidor corriendo en http://localhost:3000
```

**¡Perfecto! El backend está funcionando.**

**NO CIERRES ESTA TERMINAL.** Déjala corriendo.

### Verificar que funciona

Abre otra terminal y ejecuta:

```bash
curl http://localhost:3000
```

O abre en el navegador: http://localhost:3000

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

---

## ✅ PASO 7: Configurar el Frontend

Abre **OTRA TERMINAL** (deja el backend corriendo).

### 7.1 Navegar al frontend

```bash
cd admin-panel-crud/frontend
```

### 7.2 Instalar dependencias

```bash
npm install
```

Esto instalará:
- React
- Vite
- Plugin de React para Vite

**Espera a que termine (1-2 minutos)**

### 7.3 Crear archivo de configuración

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Windows (CMD)
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

El archivo `.env` ya tiene la configuración correcta por defecto:

```env
VITE_API_URL=http://localhost:3000/api
```

No necesitas modificarlo.

---

## ✅ PASO 8: Iniciar el Frontend

```bash
npm run dev
```

Deberías ver:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

El navegador debería abrirse automáticamente en:

**http://localhost:5173**

Si no se abre, cópialo manualmente en tu navegador.

---

## ✅ PASO 9: Probar la Aplicación

Deberías ver el panel administrativo con:

- Título: "Gestión de Productos"
- Botón: "+ Nuevo Producto"
- Mensaje: "No hay productos registrados"

### Crear tu primer producto

1. Haz clic en **"+ Nuevo Producto"**
2. Llena el formulario:
   - **Nombre:** Laptop HP
   - **Descripción:** Laptop para desarrollo
   - **Precio:** 850000
3. Haz clic en **"Crear"**

Verás un mensaje: "Producto creado exitosamente"

El producto aparecerá en la tabla.

### Probar las demás funciones

- **Editar:** Haz clic en "Editar", modifica los datos, guarda
- **Eliminar:** Haz clic en "Eliminar", confirma

---

## ✅ PASO 10: (Opcional) Agregar Datos de Prueba

Si quieres poblar la base de datos con 10 productos de ejemplo:

### En MySQL Workbench:

1. Abre MySQL Workbench
2. Conéctate a tu servidor
3. Abre el archivo `backend/seed.sql`
4. Ejecuta el script

### En Terminal:

```bash
mysql -u root -p admin_panel_db < backend/seed.sql
```

Recarga el frontend y verás 10 productos.

---

## 📊 RESUMEN DE LO QUE ESTÁ CORRIENDO

Deberías tener **2 terminales abiertas**:

### Terminal 1: Backend
```
📁 Directorio: backend/
🚀 Comando: npm run dev
🌐 URL: http://localhost:3000
```

### Terminal 2: Frontend
```
📁 Directorio: frontend/
🚀 Comando: npm run dev
🌐 URL: http://localhost:5173
```

---

## 🎯 PRÓXIMOS PASOS

✅ **Explorar el código:**
- Backend: `backend/src/`
- Frontend: `frontend/src/`

✅ **Leer la documentación:**
- `README.md` - Documentación completa
- `ARCHITECTURE.md` - Detalles técnicos
- `QUICKSTART.md` - Referencia rápida

✅ **Personalizar:**
- Cambiar estilos en `frontend/src/App.css`
- Agregar nuevas entidades (categorías, usuarios, etc.)
- Implementar autenticación

---

## 🔧 SOLUCIÓN DE PROBLEMAS COMUNES

### Error: "Cannot connect to database"

**Causa:** MySQL no está corriendo o la URL es incorrecta.

**Solución:**
1. Verifica que MySQL esté corriendo:
   ```bash
   mysql -u root -p
   ```
2. Verifica la `DATABASE_URL` en `backend/.env`
3. Asegúrate de que la contraseña sea correcta

---

### Error: "P1001: Can't reach database server"

**Causa:** MySQL no está escuchando en el puerto 3306.

**Solución:**
1. Verifica el puerto de MySQL:
   ```sql
   SHOW VARIABLES LIKE 'port';
   ```
2. Si es diferente a 3306, actualiza `DATABASE_URL` en `.env`

---

### Error: "Port 3000 already in use"

**Causa:** Otro proceso está usando el puerto 3000.

**Solución:**
1. Cambia el puerto en `backend/.env`:
   ```env
   PORT=3001
   ```
2. Actualiza `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

---

### Error: "Failed to fetch" en el frontend

**Causa:** El backend no está corriendo o la URL es incorrecta.

**Solución:**
1. Verifica que el backend esté corriendo en http://localhost:3000
2. Abre el navegador en http://localhost:3000 para verificar
3. Revisa la consola del navegador (F12) para más detalles

---

### Error: "Prisma Client not generated"

**Solución:**
```bash
cd backend
npx prisma generate
```

---

### El frontend no se actualiza al guardar cambios

**Solución:**
1. Detén el servidor (Ctrl+C)
2. Reinicia:
   ```bash
   npm run dev
   ```

---

## 🎓 COMANDOS ÚTILES DE REFERENCIA

### Backend

```bash
# Instalar dependencias
npm install

# Iniciar en desarrollo (con auto-reload)
npm run dev

# Iniciar en producción
npm start

# Ver base de datos en navegador
npx prisma studio

# Crear una nueva migración
npx prisma migrate dev --name nombre_migracion

# Ver estado de migraciones
npx prisma migrate status

# Resetear base de datos (⚠️ Borra todos los datos)
npx prisma migrate reset
```

### Frontend

```bash
# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

---

## 🔄 CAMBIAR A POSTGRESQL (OPCIONAL)

Si prefieres usar PostgreSQL en lugar de MySQL:

### 1. Instalar PostgreSQL

Descarga desde: https://www.postgresql.org/download/

### 2. Crear base de datos

```bash
psql -U postgres
```

```sql
CREATE DATABASE admin_panel_db;
\q
```

### 3. Modificar `backend/.env`

```env
DATABASE_PROVIDER="postgresql"
DATABASE_URL="postgresql://postgres:tu_password@localhost:5432/admin_panel_db"
```

### 4. Re-migrar

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

¡Listo! Ahora usas PostgreSQL.

---

## ✅ CHECKLIST DE INSTALACIÓN

- [ ] Node.js instalado y funcionando
- [ ] MySQL instalado y corriendo
- [ ] Base de datos `admin_panel_db` creada
- [ ] Backend: dependencias instaladas (`npm install`)
- [ ] Backend: archivo `.env` configurado
- [ ] Backend: migraciones ejecutadas (`npx prisma migrate dev`)
- [ ] Backend: servidor corriendo (`npm run dev`)
- [ ] Frontend: dependencias instaladas (`npm install`)
- [ ] Frontend: archivo `.env` creado
- [ ] Frontend: aplicación corriendo (`npm run dev`)
- [ ] Navegador abierto en http://localhost:5173
- [ ] Primer producto creado exitosamente

---

## 🎉 ¡FELICIDADES!

Si llegaste hasta aquí y todo funciona, ¡ya tienes un panel administrativo completo funcionando!

### ¿Qué aprendiste?

- ✅ Configurar un proyecto Node.js con Express
- ✅ Usar Prisma ORM
- ✅ Crear una API REST
- ✅ Conectar React con un backend
- ✅ Implementar CRUD completo
- ✅ Arquitectura MVC

---

**¿Necesitas ayuda?** Revisa los otros archivos de documentación:

- `README.md` - Documentación completa
- `QUICKSTART.md` - Referencia rápida
- `ARCHITECTURE.md` - Detalles técnicos
- `backend/SETUP.md` - Guía backend
- `frontend/SETUP.md` - Guía frontend

¡Feliz desarrollo! 🚀
