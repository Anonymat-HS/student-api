# Student API
## STD25045 - N3

API REST simple de gestion d'étudiants construite avec **Express**, **TypeScript** et **PostgreSQL**. Elle permet de créer, lire, modifier et supprimer des étudiants.

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
    age INT,
    created_at TIMESTAMP DEFAULT NOW()
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
# Développement (avec rechargement automatique)
npm run dev

# Compilation TypeScript
npm run build

# Production (après build)
npm start
```

Le serveur démarre sur `http://localhost:3000`.

## Routes de l'API

| Méthode | URL             | Description                          |
| ------- | --------------- | ------------------------------------ |
| GET     | `/`             | Page d'accueil                       |
| GET     | `/students`     | Récupérer tous les étudiants         |
| GET     | `/students/:id` | Récupérer un étudiant par son id     |
| POST    | `/students`     | Créer un nouvel étudiant             |
| PUT     | `/students/:id` | Modifier un étudiant                  |
| DELETE  | `/students/:id` | Supprimer un étudiant                 |

### Exemple de requête POST

```json
{
    "first_name": "Jean",
    "last_name": "Dupont",
    "email": "jean.dupont@example.com",
    "age": 20
}
```

### Codes de réponse

- `201` — création réussie
- `200` — lecture, mise à jour ou suppression réussie
- `400` — champs obligatoires manquants (`first_name`, `last_name`, `email`)
- `404` — étudiant introuvable
- `409` — email déjà utilisé
- `500` — erreur serveur

## Structure du projet

```
student-api/
├── src/
│   ├── config/
│   │   └── db.ts                    # Connexion à la base PostgreSQL
│   ├── controllers/
│   │   └── student.controller.ts    # Gestion des requêtes/réponses HTTP
│   ├── services/
│   │   └── student.service.ts       # Logique métier et validation
│   ├── repositories/
│   │   └── student.repository.ts    # Requêtes SQL (accès aux données)
│   ├── models/
│   │   └── student.model.ts         # Types TypeScript (interfaces)
│   ├── routes/
│   │   └── student.routes.ts        # Définition des routes
│   └── server.ts                    # Point d'entrée de l'application
├── .env                             # Variables d'environnement
├── tsconfig.json                    # Configuration TypeScript
└── package.json
```

## Technologies

- [Express](https://expressjs.com/) — framework web
- [TypeScript](https://www.typescriptlang.org/) — typage statique
- [pg](https://node-postgres.com/) — client PostgreSQL
- [dotenv](https://github.com/motdotla/dotenv) — gestion des variables d'environnement
- [tsx](https://tsx.is/) — exécution TypeScript en développement
