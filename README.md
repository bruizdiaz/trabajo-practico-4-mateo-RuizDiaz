# Trabajo Práctico N° 4 - API de Personajes

Este es el repositorio del Trabajo Práctico N° 4, que consiste en una API RESTful desarrollada con Node.js y Express para gestionar una base de datos de personajes.

## 📜 Descripción

El proyecto implementa un servidor backend que expone una serie de endpoints para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una entidad "Personaje". La API está diseñada para ser robusta, incluyendo validación de datos de entrada, formateo y normalización de datos antes de su almacenamiento, y un manejo de errores estructurado.

## ✨ Características Principales

- **API RESTful:** Endpoints claros y bien definidos para la gestión de recursos.
- **CRUD Completo:** Funcionalidad completa para crear, leer, actualizar y eliminar personajes.
- **Validación de Datos:** Comprobación del tipo de dato, formato y existencia de los campos obligatorios en las peticiones.
- **Formateo de Datos:** Normalización automática de datos antes de guardarlos en la base de datos (ej. capitalización de nombres, truncado de números).
- **Manejo de Errores:** Respuestas de error claras y con códigos de estado HTTP apropiados.
- **Logging:** Uso de `morgan` para registrar todas las peticiones HTTP entrantes en la consola durante el desarrollo.

## 🛠️ Tecnologías Utilizadas

- **Node.js:** Entorno de ejecución para JavaScript del lado del servidor.
- **Express.js:** Framework para la construcción de la API y el manejo de rutas.
- **Sequelize:** ORM (Object-Relational Mapper) para interactuar con la base de datos SQL.
- **Morgan:** Middleware para el logging de peticiones HTTP.
- **Dotenv:** Para la gestión de variables de entorno.

## 🚀 Instalación y Configuración

Sigue estos pasos para levantar el proyecto en un entorno local.

### 1. Clonar el Repositorio

```bash
git clone [https://github.com/bruizdiaz/trabajo-practico-4-mateo-RuizDiaz.git](https://github.com/bruizdiaz/trabajo-practico-4-mateo-RuizDiaz.git)
cd trabajo-practico-4-mateo-RuizDiaz
```

### 2. Instalar Dependencias

Ejecuta el siguiente comando para instalar todos los paquetes necesarios.

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto. Puedes copiar el archivo de ejemplo `.env.example` (si existe) o crearlo desde cero con la siguiente estructura.

```env
# Puerto en el que correrá la aplicación
PORT=3000

# Configuración de la Base de Datos (Ejemplo para PostgreSQL)
DB_USER=tu_usuario_de_db
DB_PASSWORD=tu_contraseña_de_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nombre_de_tu_db
```

### 4. Iniciar el Servidor

Una vez configurado, puedes iniciar el servidor con el siguiente comando:

```bash
npm start
# O si no tienes un script 'start' definido:
node index.js
```

El servidor se iniciará y se conectará a la base de datos. Verás un mensaje en la consola indicando que está corriendo en `http://localhost:3000`.

## 📖 API Endpoints

La API base se encuentra en `/api`.

| Método HTTP | Ruta                  | Descripción                                                     | Ejemplo de Body (Payload)                                                                               |
| :---------- | :-------------------- | :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| `GET`       | `/api/characters`     | Obtiene una lista de todos los personajes.                      | N/A                                                                                                     |
| `GET`       | `/api/characters/:id` | Obtiene un personaje específico por su ID.                      | N/A                                                                                                     |
| `POST`      | `/api/characters`     | Crea un nuevo personaje. Los datos son validados y formateados. | `{ "name": "Son Goku", "ki": 9001, "race": "Saiyan", "gender": "Male", "description": "Protagonista" }` |
| `PUT`       | `/api/characters/:id` | Actualiza un personaje existente por su ID.                     | `{ "ki": 20000, "description": "Super Saiyan" }`                                                        |
| `DELETE`    | `/api/characters/:id` | Elimina un personaje por su ID.                                 | N/A                                                                                                     |

## 👤 Autor

- **Mateo Ruiz Diaz** - [bruizdiaz](https://github.com/bruizdiaz)
