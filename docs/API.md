# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Todas las rutas protegidas requieren un token JWT en el header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication
| Method | Endpoint | Description | Body | Response |
|--------|----------|-------------|------|----------|
| POST | `/auth/signin` | Iniciar sesión | `{email, password}` | `{token, user}` |
| POST | `/auth/signup` | Registrar usuario | `{username, email, password, roles?}` | `{message}` |
| POST | `/auth/logout` | Cerrar sesión | - | `{message}` |

### Users (Admin only)
| Method | Endpoint | Description | Body | Response |
|--------|----------|-------------|------|----------|
| GET | `/users` | Listar usuarios | - | `{users[]}` |
| POST | `/users` | Crear usuario | `{username, email, password, roles?}` | `{user}` |
| PUT | `/users/:id` | Actualizar usuario | `{username?, email?, roles?}` | `{user}` |
| DELETE | `/users/:id` | Eliminar usuario | - | `{message}` |
