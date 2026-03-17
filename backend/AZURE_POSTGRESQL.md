# Conectar a Azure Database for PostgreSQL

## 🔍 Paso 1: Encontrar el Nombre del Servidor en Azure

### Opción A: Desde el Portal de Azure

1. Ve a [portal.azure.com](https://portal.azure.com)
2. En el buscador superior, escribe el nombre de tu base de datos o "PostgreSQL"
3. Haz clic en tu servidor PostgreSQL
4. En la página de "Información general" (Overview), busca:
   - **Nombre del servidor** o **Server name**
   - Ejemplo: `miservidor.postgres.database.azure.com`

5. El **NOMBRESERVIDOR** es la primera parte antes de `.postgres.database.azure.com`
   - Si ves: `miservidor.postgres.database.azure.com`
   - Entonces NOMBRESERVIDOR = `miservidor`

### Opción B: Desde "Cadenas de conexión" (Connection strings)

1. En tu servidor PostgreSQL, ve al menú izquierdo
2. Busca **"Cadenas de conexión"** o **"Connection strings"**
3. Verás algo como:
   ```
   Host=miservidor.postgres.database.azure.com
   Port=5432
   Database=postgres
   Username=root1@miservidor
   ```
4. El NOMBRESERVIDOR está en el Host y en el Username

## 🔧 Paso 2: Construir la DATABASE_URL

### Tus Credenciales:
- **Usuario:** root1
- **Contraseña:** Contraseña2
- **Puerto:** 5432
- **Base de datos:** postgres (o la que uses)

### Formato de la URL:

```env
DATABASE_URL="postgresql://root1%40NOMBRESERVIDOR:Contrase%C3%B1a2@NOMBRESERVIDOR.postgres.database.azure.com:5432/postgres?sslmode=require"
```

### Ejemplo Real:

Si tu servidor se llama `dbwilman`, la URL sería:

```env
DATABASE_URL="postgresql://root1%40dbwilman:Contrase%C3%B1a2@dbwilman.postgres.database.azure.com:5432/postgres?sslmode=require"
```

## 📝 Paso 3: Actualizar el archivo .env

1. Abre `backend/.env`
2. Reemplaza la línea de DATABASE_URL con tu URL completa
3. Guarda el archivo

```env
# PostgreSQL Remoto - Azure
DATABASE_PROVIDER="postgresql"
DATABASE_URL="postgresql://root1%40TUNOMBRESERVIDOR:Contrase%C3%B1a2@TUNOMBRESERVIDOR.postgres.database.azure.com:5432/postgres?sslmode=require"
```

## 🚀 Paso 4: Conectar y Migrar

```bash
cd backend

# 1. Generar cliente de Prisma
npx prisma generate

# 2. Aplicar migraciones
npx prisma migrate deploy

# 3. (Opcional) Poblar con datos de prueba
npm run seed

# 4. Verificar conexión
npx prisma studio
```

## ⚠️ Solución de Problemas

### Error: "password authentication failed"

Verifica que:
- El usuario sea `root1` (sin el @SERVIDOR en la URL)
- La contraseña esté correctamente codificada: `Contrase%C3%B1a2`
- El símbolo @ en el usuario esté codificado: `%40`

### Error: "no pg_hba.conf entry for host"

En Azure Portal:
1. Ve a tu servidor PostgreSQL
2. Menú izquierdo → **"Seguridad de la conexión"** o **"Connection security"**
3. Agrega tu IP en **"Reglas de firewall"** o activa **"Permitir el acceso a servicios de Azure"**

### Error: "SSL connection required"

Asegúrate de que tu URL incluya `?sslmode=require` al final

### Error: "timeout" o "connection refused"

Verifica:
- Que el nombre del servidor sea correcto
- Que el puerto 5432 esté accesible desde tu red
- Que el firewall de Azure permita tu IP

## 🔒 Notas de Seguridad

### Caracteres Especiales URL-Encoded:

| Carácter | Codificado |
|----------|------------|
| @        | %40        |
| ñ        | %C3%B1     |
| #        | %23        |
| $        | %24        |
| %        | %25        |
| &        | %26        |
| :        | %3A        |

### Tu Contraseña:
- Original: `Contraseña2`
- Codificada: `Contrase%C3%B1a2` (la ñ → %C3%B1)

## 📞 ¿Aún no Funciona?

Ejecuta este comando para verificar la conexión:

```bash
cd backend
node build-azure-url.js
```

Esto te mostrará la plantilla correcta de la URL.

## 🔄 Volver a MySQL Local

Si necesitas volver a MySQL:

1. Edita `backend/.env`:
   ```env
   DATABASE_URL="mysql://root:root@localhost:3306/node"
   ```

2. Edita `backend/prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
   }
   ```

3. Ejecuta:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
