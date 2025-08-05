# Comandos Útiles - PERN Template

## Instalación y Configuración

```powershell
# Instalar todas las dependencias
npm run install:all

# O instalar individualmente
cd backend && npm install
cd ../frontend && npm install
```

## Desarrollo Local

```powershell
# Ejecutar ambos (frontend + backend) simultáneamente
npm run dev

# Ejecutar solo backend
npm run dev:backend

# Ejecutar solo frontend
npm run dev:frontend
```

## Docker

```powershell
# Levantar toda la aplicación
npm run docker:up

# Solo la base de datos
docker-compose up db -d

# Ver logs
npm run docker:logs

# Parar servicios
npm run docker:down

# Reconstruir
npm run docker:build
```

## Base de Datos

```sql
-- Crear base de datos
CREATE DATABASE pern_template;

-- Crear usuario
CREATE USER pern_user WITH PASSWORD 'admin123';
GRANT ALL PRIVILEGES ON DATABASE pern_template TO pern_user;
```

## Testing

```powershell
# Ejecutar tests
npm run test

# Tests en modo watch
cd backend && npm run test:watch
cd frontend && npm run test
```

## Linting y Formateo

```powershell
# Revisar código
npm run lint

# Corregir automáticamente
cd backend && npm run lint:fix
cd frontend && npm run lint:fix
```

## Producción

```powershell
# Construir frontend
npm run build

# Iniciar servidor de producción
npm start
```

## Solución de Problemas

### Error de conexión a BD
```powershell
# Verificar que PostgreSQL esté corriendo
Get-Service postgresql*

# Verificar conexión
psql -h localhost -U postgres -d pern_template
```

### Puertos ocupados
```powershell
# Ver qué usa el puerto 5000
netstat -ano | findstr :5000

# Ver qué usa el puerto 5173
netstat -ano | findstr :5173
```

### Limpiar caché
```powershell
# Backend
cd backend && npm install --legacy-peer-deps

# Frontend
cd frontend && rm -rf node_modules && npm install
```
