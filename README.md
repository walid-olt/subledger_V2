# SubLedger v2 
[![tests](https://github.com/walid-olt/subledger_V2/actions/workflows/tests.yml/badge.svg)](https://github.com/walid-olt/subledger_V2/actions/workflows/tests.yml)

API de gestion d'abonnements construite avec **Node.js**, **Express 5** et **MongoDB**

Fonctionnalités :
- inscription et authentification par JWT
- CRUD complet des abonnements
- suivi des transactions
- rôles utilisateur (`user`) et administrateur (`admin`)
- validation des entrées avec **Zod**
- collection de requêtes **Bruno** incluse
- documentation OpenAPI 3.0

## Diagramme UML

<img src="./class_diagram.png" alt="Diagramme de classes" style="width:100%; height:auto;">

## Installation

```bash
git clone https://github.com/walid-olt/subledger_V2
cd subledger_V2
pnpm install   # ou npm install
```

## Configuration des variables d'environnement

Copiez les variables d'environnement dans un fichier `.env` à la racine du projet :

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://mongodb:27017
MONGODB_DB_NAME=subledger_v2
JWT_SECRET_KEY=votre_cle_secrete
JWT_EXPIRES_IN=1d
```

| Variable | Description | Valeur par défaut |
|---|---|---|
| `NODE_ENV` | Environnement d'exécution (`development`, `dev`, `prod`, `test`) | `development` |
| `PORT` | Port du serveur | `3000` |
| `MONGODB_URI` | URI de connexion MongoDB | `mongodb://localhost:27017` |
| `MONGODB_DB_NAME` | Nom de la base de données | `subledger_v2` |
| `JWT_SECRET_KEY` | Clé secrète pour signer les JWT | — |
| `JWT_EXPIRES_IN` | Durée de validité du token | `1h` |

## Utilisation Docker

```bash
docker compose up -d
```

Lance le serveur (port `3000`) et MongoDB (`27017`) dans des conteneurs. MongoDB persiste via un volume nommé `mongo-data`.

## Exécution des tests

```bash
pnpm test          # Lance les tests avec Vitest
pnpm test:coverage # Avec couverture de code
```

Les tests utilisent `mongodb-memory-server` (MongoDB embarqué en mémoire) et `supertest` pour les requêtes HTTP.

## Structure du projet

```
subledger_V2/
├── app.js                     # Configuration Express
├── index.js                   # Point d'entrée
├── config/
│   ├── db.js                  # Connexion MongoDB
│   └── env.js                 # Validation des variables d'env
├── controllers/               # Gestionnaires de requêtes
│   ├── auth.controller.js
│   ├── admin.controller.js
│   ├── user.controller.js
│   └── subscription.controller.js
├── middleware/
│   ├── auth.js                # Authentification JWT + rôles
│   ├── global.js              # Gestion globale d'erreurs
│   └── validate.js            # Validation Zod
├── models/
│   ├── User.model.js
│   ├── Subscription.model.js
│   └── Transaction.model.js
├── routes/
│   ├── auth.routes.js
│   ├── admin.routes.js
│   ├── user.routes.js
│   └── subscription.route.js
├── schemas/
│   └── index.js               # Schémas de validation Zod
├── services/
│   ├── jwt.service.js
│   ├── user.service.js
│   ├── subscription.service.js
│   └── transaction.service.js
├── utils/
│   ├── errors.js              # Classes d'erreur métier
│   ├── response.js            # Format de réponse standardisé
│   └── password.js            # Hachage bcrypt
├── tests/
│   ├── test-db.js             # Helper MongoDB en mémoire
│   ├── utils.js               # Factories (Faker)
│   ├── auth.controller.test.js
│   ├── user.service.test.js
│   └── subscription.service.test.js
├── scripts/
│   └── clearDB.js             # Réinitialisation BDD
├── bruno/                     # Collection Bruno
├── openapi.json               # Documentation OpenAPI 3.0
├── Dockerfile
└── compose.yaml
```
