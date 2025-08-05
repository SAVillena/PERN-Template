# Configuración Local (Sin Docker)

Esta guía te ayudará a ejecutar el proyecto PERN Template directamente en tu PC sin usar Docker.

## Prerrequisitos

1. **Node.js** (versión 16 o superior)
2. **PostgreSQL** (versión 12 o superior)
3. **npm** o **yarn**

## Configuración de la Base de Datos

### 1. Instalar PostgreSQL
- Descarga e instala PostgreSQL desde: https://www.postgresql.org/download/
- Durante la instalación, anota la contraseña del usuario `postgres`

### 2. Crear la Base de Datos
Abre PostgreSQL (pgAdmin o línea de comandos) y ejecuta:

```sql
-- Crear la base de datos
CREATE DATABASE pern_template;

-- Crear un usuario (opcional, si no quieres usar postgres)
CREATE USER pern_user WITH PASSWORD 'admin123';

-- Dar permisos al usuario
GRANT ALL PRIVILEGES ON DATABASE pern_template TO pern_user;
```

## Configuración del Backend

### 1. Instalar Dependencias
```powershell
cd backend
npm install
```

### 2. Configurar Variables de Entorno
El archivo `backend/.env` ya está creado con la siguiente configuración:

```env
PORT=5000
DB_HOST=localhost
DB_NAME=pern_template
DB_USER=postgres
DB_PASSWORD=admin123
JWT_SECRET=tu_jwt_secret_super_seguro_123
JWT_REFRESH_SECRET=tu_jwt_refresh_secret_super_seguro_456
```

**¡IMPORTANTE!** Modifica `DB_PASSWORD` con la contraseña que configuraste para PostgreSQL.

### 3. Iniciar el Backend
```powershell
cd backend
npm start
```

El backend estará disponible en: http://localhost:5000

## Configuración del Frontend

### 1. Instalar Dependencias
```powershell
cd frontend
npm install
```

### 2. Configurar Variables de Entorno
El archivo `frontend/.env` ya está creado con:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Iniciar el Frontend
```powershell
cd frontend
npm run dev
```

El frontend estará disponible en: http://localhost:5173

## Verificar la Instalación

1. **Backend**: Ve a http://localhost:5000/api - deberías ver un mensaje de "API is running"
2. **Frontend**: Ve a http://localhost:5173 - deberías ver la página de login
3. **Base de Datos**: El backend creará automáticamente las tablas necesarias al iniciar

## Comandos Útiles

### Backend
```powershell
cd backend
npm start          # Iniciar con nodemon (desarrollo)
npm run dev        # Iniciar con nodemon (desarrollo)
```

### Frontend
```powershell
cd frontend
npm run dev        # Servidor de desarrollo
npm run build      # Construir para producción
npm run preview    # Vista previa de la build de producción
```

## Usuario Inicial

El sistema creará automáticamente un usuario administrador:
- **Email**: admin@admin.com
- **Contraseña**: admin123

## Solución de Problemas

### Error de Conexión a la Base de Datos
- Verifica que PostgreSQL esté ejecutándose
- Confirma que la contraseña en `backend/.env` sea correcta
- Asegúrate que la base de datos `pern_template` exista

### Error de CORS
- Verifica que `VITE_API_URL` en `frontend/.env` apunte a http://localhost:5000/api

### Puertos Ocupados
- Backend (5000): Cambiar `PORT` en `backend/.env`
- Frontend (5173): Cambiar en `vite.config.js` o usar `--port` flag

## Estructura de Ejecución

1. **Primero**: Iniciar PostgreSQL
2. **Segundo**: Iniciar el backend (`cd backend && npm start`)
3. **Tercero**: Iniciar el frontend (`cd frontend && npm run dev`)

¡Listo! Tu aplicación PERN Template estará ejecutándose localmente.
