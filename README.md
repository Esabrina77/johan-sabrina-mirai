# MIRAI - Plateforme de mise en relation freelances et entreprises

⚠️ **IMPORTANT** : Ne pas modifier le dossier `frontend/` qui est un sous-module Git. Utilisez plutôt le dossier `front-fix/` qui contient la version de travail actuelle.

## Installation du projet

### Configuration du Backend

1. Ouvrez le dossier `backend` dans votre terminal

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env` à la racine du dossier `backend` avec le contenu suivant :
```
DATABASE_URL="postgresql://username:password@localhost:5432/mirai_db"
PORT=3009
JWT_SECRET=votre_secret_jwt
```
Remplacez `username`, `password` et éventuellement le nom de la base de données selon votre configuration PostgreSQL.

4. Créez la base de données PostgreSQL :
```bash
createdb mirai_db
```

5. Importez le schéma et les données initiales :
```bash
psql mirai_db < mirai.sql
```

6. Générez le client Prisma :
```bash
npm run prisma:generate
```

7. Démarrez le serveur de développement :
```bash
npm run dev
```

Le serveur API sera accessible à l'adresse http://localhost:3009

### Configuration du Frontend

1. Ouvrez le dossier `front-fix` dans votre terminal

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env` à la racine du dossier `front-fix` :
```bash
NEXT_PUBLIC_API_URL=http://localhost:3009
```

4. Démarrez le serveur de développement :
```bash
npm run dev
```

5. Ouvrez votre navigateur sur http://localhost:3007

## Comptes de test

Pour voir les différentes interfaces, vous pouvez utiliser ces comptes :

### Interface Freelance
```
Email: mobile.dev@test.com
Mot de passe: password123
```

### Interface Entreprise
```
Email: company@test.com
Mot de passe: password123
```

## Structure des pages

### Pages Freelance
- `/freelancer/dashboard` : Tableau de bord
- `/freelancer/missions` : Liste des missions disponibles
- `/freelancer/applications` : Candidatures envoyées
- `/freelancer/messages` : Messagerie
- `/freelancer/profile` : Profil du freelance

### Pages Entreprise
- `/company/dashboard` : Tableau de bord
- `/company/missions` : Gestion des missions
- `/company/applications` : Candidatures reçues
- `/company/messages` : Messagerie
- `/company/profile` : Profil de l'entreprise

## Développement CSS

Les fichiers de style se trouvent dans :
- `src/styles/` : Styles globaux
- `src/styles/extranet/` : Styles spécifiques aux pages freelance et entreprise

Chaque page a son propre fichier CSS module, par exemple :
- `missions.module.css`
- `dashboard.module.css`
- `messages.module.css`