# Guide d'initialisation PostgreSQL et Prisma pour Mirai

## Configuration initiale de PostgreSQL avec pgAdmin

### Création d'un utilisateur dédié
1. Ouvrir pgAdmin
2. Se connecter avec l'utilisateur postgres (superutilisateur)
3. Développer le serveur dans l'arborescence
4. Cliquer droit sur "Login/Group Roles"
5. Sélectionner "Create" > "Login/Group Role"
6. Dans l'onglet "General", entrer le nom d'utilisateur (ex: `mirai_user`)
7. Dans l'onglet "Definition", définir un mot de passe sécurisé (ex: `m1ra1_db-passw0rd`)
8. Dans l'onglet "Privileges", activer "Can login?" et "Create database"
9. Cliquer sur "Save"

### Création de la base de données
1. Cliquer droit sur "Databases"
2. Sélectionner "Create" > "Database"
3. Nommer la base de données "mirai"
4. Dans l'onglet "Owner", sélectionner l'utilisateur créé précédemment (`mirai_user`)
5. Cliquer sur "Save"

### Attribution des privilèges
1. Cliquer droit sur la base de données "mirai"
2. Sélectionner "Properties"
3. Aller dans l'onglet "Privileges"
4. S'assurer que l'utilisateur a tous les privilèges nécessaires
5. Cliquer sur "Save"

## Configuration de Prisma dans le projet

### Configuration du fichier .env
1. Créer ou modifier le fichier `.env` à la racine du dossier backend
2. Ajouter la variable d'environnement avec les informations de connexion:
   ```
   DATABASE_URL="postgresql://mirai_user:m1ra1_db-passw0rd@localhost:5432/mirai?schema=public"
   ```

### Initialisation de Prisma
1. Si le dossier `prisma` n'existe pas, initialiser Prisma:
   ```
   npx prisma init
   ```
2. Remplacer le contenu du fichier `schema.prisma` par le schéma complet de l'application
3. Générer et appliquer la migration initiale:
   ```
   npx prisma migrate dev --name init
   ```
4. Vérifier l'installation avec Prisma Studio:
   ```
   npx prisma studio
   ```

## Pour les développeurs qui rejoignent le projet

### Après avoir cloné le dépôt
1. Installer les dépendances:
   ```
   cd backend
   npm install
   ```

2. Créer un fichier `.env` avec les informations de connexion fournies par l'équipe:
   ```
   DATABASE_URL="postgresql://mirai_user:m1ra1_db-passw0rd@localhost:5432/mirai?schema=public"
   ```

3. Appliquer les migrations existantes:
   ```
   npx prisma migrate deploy
   ```
   Cette commande applique toutes les migrations existantes sans générer de nouveau client.

4. Générer le client Prisma:
   ```
   npx prisma generate
   ```

5. Vérifier que tout fonctionne correctement:
   ```
   npx prisma studio
   ```

### Après un pull avec de nouvelles migrations
1. Appliquer les nouvelles migrations:
   ```
   npx prisma migrate deploy
   ```

2. Régénérer le client Prisma:
   ```
   npx prisma generate
   ```

## Commandes utiles à retenir
- Visualiser la base de données: `npx prisma studio`
- Appliquer les migrations: `npx prisma migrate deploy`
- Créer une nouvelle migration: `npx prisma migrate dev --name nom_migration`
- Générer le client Prisma: `npx prisma generate`
- Réinitialiser la base de données: `npx prisma migrate reset` (⚠️ supprime toutes les données)
