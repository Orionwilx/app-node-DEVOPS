# 🎨 Guía de Configuración Rápida - Frontend

## Pasos para configurar el frontend desde cero

### 1️⃣ Instalar dependencias

```bash
npm install
```

### 2️⃣ Configurar variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

Edita `.env` con la URL de tu backend:

```env
VITE_API_URL=http://localhost:3000/api
```

**Nota:** En producción, cambia esto a la URL de tu API en el servidor.

### 3️⃣ Iniciar el servidor de desarrollo

```bash
npm run dev
```

Esto iniciará el servidor en `http://localhost:5173`

### 4️⃣ Abrir en el navegador

El navegador debería abrirse automáticamente, si no, visita:

```
http://localhost:5173
```

---

## 🏗 Build para Producción

### Compilar la aplicación

```bash
npm run build
```

Esto genera una carpeta `dist/` con los archivos optimizados.

### Preview del build

```bash
npm run preview
```

Esto inicia un servidor local para previsualizar la versión de producción.

---

## 📁 Estructura de Componentes

```
src/
├── components/
│   ├── Layout.jsx          # Layout principal (navbar, footer)
│   ├── ProductList.jsx     # Tabla de productos
│   └── ProductForm.jsx     # Formulario crear/editar
├── services/
│   └── api.js              # Cliente API (fetch)
├── App.jsx                 # Componente raíz
├── App.css                 # Estilos globales
└── main.jsx                # Punto de entrada
```

---

## 🎨 Personalizar Estilos

Los estilos están en `src/App.css`. Puedes modificarlos según tus necesidades.

### Cambiar colores principales

Busca en `App.css`:

```css
/* Botón primario */
.btn-primary {
  background: #3182ce;  /* Cambia este color */
}

/* Botón de éxito */
.btn-success {
  background: #38a169;  /* Cambia este color */
}
```

### Agregar librerías de estilos (opcional)

Si prefieres usar una librería de componentes:

#### Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Material-UI

```bash
npm install @mui/material @emotion/react @emotion/styled
```

---

## 🔌 Conectar con el Backend

### Configuración de la API

La configuración está en `src/services/api.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
```

### Variables de entorno en Vite

Vite expone las variables que empiezan con `VITE_`:

```javascript
// ✅ Funciona
import.meta.env.VITE_API_URL

// ❌ No funciona (no empieza con VITE_)
import.meta.env.API_URL
```

### Cambiar la URL del backend

#### Desarrollo local:
```env
VITE_API_URL=http://localhost:3000/api
```

#### Producción:
```env
VITE_API_URL=https://api.midominio.com/api
```

---

## 🧪 Probar la Aplicación

### Funcionalidades disponibles

1. ✅ **Listar productos** - Ver todos los productos en una tabla
2. ✅ **Crear producto** - Formulario para agregar nuevos productos
3. ✅ **Editar producto** - Modificar productos existentes
4. ✅ **Eliminar producto** - Eliminar productos con confirmación

### Flujo de uso

1. Abre `http://localhost:5173`
2. Haz clic en **"+ Nuevo Producto"**
3. Llena el formulario y haz clic en **"Crear"**
4. El producto aparecerá en la tabla
5. Prueba **editar** y **eliminar** productos

---

## 🚀 Deployment

### Opciones de hosting

#### Netlify (Recomendado)

1. Crea una cuenta en [Netlify](https://netlify.com)
2. Conecta tu repositorio Git
3. Configuración de build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Variables de entorno:
   - `VITE_API_URL`: URL de tu backend en producción

#### Vercel

1. Crea una cuenta en [Vercel](https://vercel.com)
2. Importa tu proyecto
3. Vercel detecta automáticamente Vite
4. Agrega la variable `VITE_API_URL`

#### GitHub Pages

```bash
npm install -D gh-pages
```

En `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

```bash
npm run deploy
```

---

## ❌ Solución de Problemas

### Error: "Failed to fetch"

- Verifica que el backend esté corriendo en `http://localhost:3000`
- Verifica `VITE_API_URL` en `.env`
- Revisa la consola del navegador para más detalles

### CORS Error

- Asegúrate de que el backend tiene configurado CORS:
  ```javascript
  app.use(cors({
    origin: 'http://localhost:5173'
  }));
  ```

### La aplicación no se actualiza

- Detén el servidor (`Ctrl+C`)
- Borra caché: `rm -rf node_modules/.vite`
- Reinicia: `npm run dev`

### Error: "Cannot find module"

```bash
rm -rf node_modules
npm install
```

---

## 📚 Recursos

- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de React](https://react.dev/)
- [Guía de Hooks](https://react.dev/reference/react)

---

¡Listo para desarrollar! 🎉
