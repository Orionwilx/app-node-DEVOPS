# Configuración de PostgreSQL Remoto

## 1. Actualizar la DATABASE_URL

Edita el archivo `backend/.env` y reemplaza la variable `DATABASE_URL` con tus credenciales de PostgreSQL:

```env
DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@HOST:PUERTO/NOMBRE_BD?schema=public"
```

### Ejemplos según el proveedor:

#### Render
```env
DATABASE_URL="postgresql://user:pass@dpg-xxxxx-a.oregon-postgres.render.com/dbname"
```

#### Railway
```env
DATABASE_URL="postgresql://postgres:pass@containers-us-west-xxx.railway.app:5432/railway"
```

#### Supabase
```env
DATABASE_URL="postgresql://postgres:pass@db.xxxxx.supabase.co:5432/postgres"
```

#### Heroku
```env
DATABASE_URL="postgresql://user:pass@ec2-xxx.compute-1.amazonaws.com:5432/dbname"
```

#### Neon
```env
DATABASE_URL="postgresql://user:pass@ep-xxxxx.us-east-2.aws.neon.tech/neondb"
```

## 2. Generar el Cliente de Prisma

Después de actualizar la DATABASE_URL, genera el cliente:

```bash
cd backend
npx prisma generate
```

## 3. Ejecutar las Migraciones

### Opción A: Aplicar migraciones existentes

```bash
npx prisma migrate deploy
```

### Opción B: Crear nuevas migraciones (si es una base de datos nueva)

```bash
npx prisma migrate dev --name init
```

## 4. Poblar la Base de Datos (Opcional)

```bash
npm run seed
```

## 5. Verificar la Conexión

```bash
npx prisma studio
```

Esto abrirá una interfaz web donde puedes ver y editar los datos.

## Notas Importantes

### SSL/TLS
Muchos proveedores de PostgreSQL remoto requieren SSL. Si ves errores de conexión, agrega el parámetro SSL:

```env
DATABASE_URL="postgresql://user:pass@host:5432/dbname?schema=public&sslmode=require"
```

### Connection Pooling
Para producción, considera usar connection pooling. Por ejemplo, con Supabase:

```env
# Connection pooler (para producción)
DATABASE_URL="postgresql://postgres:pass@db.xxxxx.supabase.co:6543/postgres?pgbouncer=true"

# Direct connection (para migraciones)
DIRECT_URL="postgresql://postgres:pass@db.xxxxx.supabase.co:5432/postgres"
```

En ese caso, actualiza el schema.prisma:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### Problemas Comunes

#### Error: "password authentication failed"
- Verifica que el usuario y contraseña sean correctos
- Asegúrate de URL-encode caracteres especiales en la contraseña

#### Error: "no pg_hba.conf entry"
- El servidor PostgreSQL no acepta conexiones desde tu IP
- Verifica que las reglas de firewall permitan tu IP

#### Error: "connection timeout"
- Verifica que el host y puerto sean correctos
- Asegúrate de tener acceso a internet
- Verifica las reglas de firewall

## Diferencias entre MySQL y PostgreSQL

### Tipos de Datos
El schema actual ya es compatible con PostgreSQL. Los tipos se mapean así:

- MySQL `VARCHAR(255)` → PostgreSQL `VARCHAR(255)`
- MySQL `TEXT` → PostgreSQL `TEXT`
- MySQL `DECIMAL(10, 2)` → PostgreSQL `DECIMAL(10, 2)`
- MySQL `DATETIME(3)` → PostgreSQL `TIMESTAMP(3)`

### Sintaxis
Prisma maneja automáticamente las diferencias de sintaxis SQL.

## Volver a MySQL

Si necesitas volver a MySQL local:

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

3. Regenera el cliente y ejecuta migraciones:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
