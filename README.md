# Student API
## STD25045 - N3

API REST simple de gestion d'étudiants construite avec **Express** et **PostgreSQL**. Elle permet de créer, lire, modifier et supprimer des étudiants.

## Prérequis

- [Node.js](https://nodejs.org/) (v18 ou supérieure)
- [PostgreSQL](https://www.postgresql.org/)
- npm (inclus avec Node.js)

## Installation

1. Cloner le dépôt et installer les dépendances :

```bash
npm install
```

2. Créer la base de données `students_db` dans PostgreSQL :

```sql
CREATE DATABASE students_db;
```

3. Créer la table `students` :

```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    age INT NOT NULL
);
```

4. Configurer les variables d'environnement dans un fichier `.env` à la racine du projet :

```env
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
DB_NAME=students_db
PORT=3000
```

## Lancement

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000`.

## Routes de l'API

| Méthode | URL                     | Description                             |
| ------- | ----------------------- | --------------------------------------- |
| GET     | `/`                     | Page d'accueil                          |
| GET     | `/students`             | Récupérer tous les étudiants            |
| GET     | `/students/:id`         | Récupérer un étudiant par son id        |
| POST    | `/students`             | Créer un nouvel étudiant                |
| PUT     | `/students/:id`         | Modifier un étudiant                     |
| DELETE  | `/students/:id`         | Supprimer un étudiant                    |

### Exemple de requête POST

```json
{
    "first_name": "Jean",
    "last_name": "Dupont",
    "email": "jean.dupont@example.com",
    "age": 20
}
```

## Structure du projet

```
student-api/
├── src/
│   ├── config/
│   │   └── db.js              # Connexion à la base PostgreSQL
│   ├── controllers/
│   │   └── student.controller.js  # Logique métier (gestion des requêtes)
│   ├── models/
│   │   └── student.model.js   # Requêtes SQL (accès aux données)
│   ├── routes/
│   │   └── student.routes.js  # Définition des routes
│   └── server.js              # Point d'entrée de l'application
├── .env                       # Variables d'environnement
└── package.json
```

## Technologies

- [Express](https://expressjs.com/) — framework web
- [pg](https://node-postgres.com/) — client PostgreSQL
- [dotenv](https://github.com/motdotla/dotenv) — gestion des variables d'environnement# student-api
