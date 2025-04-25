# Frontend MIRAI

⚠️ **IMPORTANT** : Ne pas modifier le dossier `frontend/` qui est un sous-module Git. Utilisez plutôt le dossier `front-fix/` qui contient la version de travail actuelle.

## Démarrage du projet

1. Ouvrez le dossier `front-fix` dans votre terminal

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env` à la racine du dossier `front-fix` :
- Copiez le contenu du fichier `.env.example`
- Collez-le dans votre nouveau fichier `.env`
```bash
# Exemple de contenu du .env
NEXT_PUBLIC_API_URL=https://mirai-api.kaporelo.com
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