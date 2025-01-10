# Sistema de Votaciones API  

Este proyecto es una API RESTful diseñada para gestionar un sistema de votaciones. Permite registrar votantes y candidatos, emitir votos asegurando que cada votante pueda emitir un único voto, y consultar estadísticas sobre los resultados de la votación.  

---

## **Características principales**  

- Gestión de votantes: registro, consulta y eliminación de votantes.  
- Gestión de candidatos: registro, consulta y eliminación de candidatos.  
- Emisión de votos: validación de que cada votante solo pueda emitir un voto.  
- Estadísticas: obtención del total y porcentaje de votos por candidato, y del total de votantes que han votado.  

---

## **Tecnologías utilizadas**  

- **Node.js**: Entorno de ejecución para JavaScript.  
- **Express**: Framework para construir aplicaciones web y APIs.  
- **MySQL**: Base de datos relacional para almacenar información de votantes, candidatos y votos.  
- **Sequelize**: ORM para interactuar con la base de datos MySQL.  
- **dotenv**: Gestión de variables de entorno.  
- **Nodemon**: Herramienta para reiniciar automáticamente el servidor durante el desarrollo.
- **Swagger**: Herramienta para generar documentación y probar la API directamente desde el editor.

---
## Endpoints de la API

### Votantes
| Método | Endpoint       | Descripción                           |
|--------|----------------|---------------------------------------|
| POST   | `/voters`      | Registrar un nuevo votante.           |
| GET    | `/voters`      | Obtener la lista de votantes. Soporta filtrado por `has_voted` y paginación. |
| GET    | `/voters/:id`  | Obtener detalles de un votante por ID.|
| DELETE | `/voters/:id`  | Eliminar un votante por ID.           |

#### Parámetros de consulta para `/voters`:
- `page`: Número de página (por defecto: 1).
- `limit`: Número de resultados por página (por defecto: 10).
- `has_voted`: Filtrar por si el votante ha votado (`true` o `false`).

#### Ejemplos:
- Obtener votantes que han votado: `GET /voters?has_voted=true&page=1&limit=10`
- Obtener votantes que no han votado: `GET /voters?has_voted=false&page=1&limit=10`

### Candidatos
| Método | Endpoint         | Descripción                             |
|--------|------------------|-----------------------------------------|
| POST   | `/candidates`    | Registrar un nuevo candidato.           |
| GET    | `/candidates`    | Obtener la lista de candidatos. Soporta filtrado por `party` y paginación. |
| GET    | `/candidates/:id`| Obtener detalles de un candidato por ID.|
| DELETE | `/candidates/:id`| Eliminar un candidato por ID.           |

#### Parámetros de consulta para `/candidates`:
- `party`: Filtrar por el partido del candidato.

#### Ejemplos:
- Obtener candidatos de un partido específico: `GET /candidates?party=Independientes`

### Votos
| Método | Endpoint          | Descripción                                   |
|--------|-------------------|-----------------------------------------------|
| POST   | `/votes`          | Emitir un voto (requiere `voter_id` y `candidate_id`). |
| GET    | `/votes`          | Obtener todos los votos emitidos.            |
| GET    | `/votes/statistics`| Obtener estadísticas de la votación.         |

---

## Instalación y Configuración

### Requisitos previos
- Node.js (v16 o superior)
- MySQL (v8 o superior)
- Postman (opcional, para pruebas)

### Pasos de instalación

1. **Clona el repositorio:**

```bash
git clone https://github.com/AriasJJ09/sistema-votaciones.git
cd sistema-votaciones
```

2. **Instala las dependencias:**

```bash
npm install express sequelize mysql2 dotenv nodemon swagger-ui-express
```

3. **Configura la base de datos:**
   
   Crea la base de datos utilizando el siguiente script SQL:

```sql
CREATE DATABASE sistema_votaciones;
USE sistema_votaciones;

CREATE TABLE voters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    has_voted BOOLEAN DEFAULT FALSE
)auto_increment=1500;

CREATE TABLE candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    party VARCHAR(255),
    votes INT DEFAULT 0
);

CREATE TABLE votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    voter_id INT NOT NULL,
    candidate_id INT NOT NULL,
    FOREIGN KEY (voter_id) REFERENCES voters(id),
    FOREIGN KEY (candidate_id) REFERENCES candidates(id)
);
```

4. **Configura las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```plaintext
DB_NAME=sistema_votaciones
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
```

5. **Configura el archivo `config/database.js`:**

   Asegúrate de que el archivo utiliza las variables de entorno

6. **Inicia el servidor:**

   En desarrollo, usa `nodemon` para reiniciar automáticamente el servidor:

```bash
npx nodemon index.js
```

   El servidor estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Pruebas con Postman

### Ejemplo de solicitud POST para registrar un votante:
- **URL:** `http://localhost:3000/voters`
- **Método:** POST
- **Cuerpo (JSON):**

```json
{
  "name": "Juan Pérez",
  "email": "juan.perez@example.com"
  "has_voted": false
}
```

### Ejemplo de solicitud GET para obtener estadísticas de votos:
- **URL:** `http://localhost:3000/votes/statistics`
- **Método:** GET

## Ejemplos en Postman
Los ejemplos se pueden visualizar en un documento drive [Peticiones probadas desde postman](https://docs.google.com/document/d/1E8vX6cU0BK7s5HWPMjkp6yPTs_ScMHADIf5JNHjwHhM/edit?usp=sharing).

## **Documentación Swagger**

La API está documentada usando Swagger. Puedes acceder a la documentación interactiva en la siguiente URL:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Esta documentación permite explorar y probar los endpoints directamente desde el navegador.


## Licencia
Este proyecto está bajo la licencia MIT.

