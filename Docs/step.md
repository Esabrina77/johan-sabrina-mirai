# 🚀 Tâches à Réaliser pour le Backend et le Frontend de MIRAI

## 🟢 **1. Backend (Node.js + Express + Prisma)**

### **1.1. Configuration et Base de Données**
- ✅ Initialisation de Prisma et connexion à PostgreSQL
- ✅ Création du schéma de base de données (fait)
- ✅ Migration Prisma (`npx prisma migrate dev --name init`)
- ✅ Mise en place des modèles Prisma (`User`, `Profile`, `Mission`, etc.)

### **1.2. Authentification et Sécurité**
- ✅ Implémentation de l'authentification avec JWT
- ✅ Routes `POST /auth/register` et `POST /auth/login`
- ✅ Middleware d'authentification (`authMiddleware.ts`)
- ✅ Sécurisation des routes privées avec JWT
- ✅ Limitation de débit (Rate Limiting) pour sécurité
- ✅ Gestion des rôles utilisateur (middleware de rôles)

### **1.3. Gestion des Utilisateurs et Profils**
- ✅ Route `GET /users` (récupérer tous les utilisateurs)
- ✅ Route `GET /users/profile` (récupérer son profil)
- ✅ Route `PUT /users/profile` (mise à jour du profil)
- ✅ Route `PUT /users/profile/password` (changer son mot de passe)
- ✅ Route `DELETE /users/profile` (suppression de compte)

### **1.4. Gestion des Missions**
- ✅ Route `GET /missions` (récupérer toutes les missions)
- ✅ Route `GET /missions/:id` (récupérer une mission spécifique)
- ✅ Route `POST /missions` (création d'une mission - réservé aux entreprises)
- ✅ Route `PATCH /missions/:id` (modification d'une mission - réservé aux entreprises)
- ✅ Route `DELETE /missions/:id` (suppression d'une mission - réservé aux entreprises)
- ✅ Route `PATCH /missions/:id/status` (mise à jour du statut d'une mission)

### **1.5. Candidatures et Matching**
- ✅ Route `POST /applications` (postuler à une mission)
- ✅ Route `GET /applications/received` (voir les candidatures reçues - entreprise)
- ✅ Route `GET /applications/sent` (voir les candidatures envoyées - freelancer)
- ✅ Route `PATCH /applications/:id/status` (accepter/refuser une candidature)
- ✅ Route `GET /matching/suggestions` (obtenir les suggestions de missions pour un freelancer)
- ✅ Route `GET /matching/score/:missionId` (obtenir le score de matching pour une mission)
- ✅ Système de matching intelligent avec :
  - Score basé sur les compétences (50%)
  - Prise en compte du budget (20%)
  - Localisation (15%)
  - Expérience (15%)

### **1.6. Messagerie**
- ✅ Route `POST /messages/conversations` (créer une conversation)
- ✅ Route `GET /messages/conversations` (liste des conversations)
- ✅ Route `POST /messages` (envoyer un message)
- ✅ Route `GET /messages/conversations/:id` (messages d'une conversation)
- ✅ Route `PUT /messages/conversations/:id/read` (marquer comme lu)

### **1.7. Paiements et Transactions** 
- 💳 Intégration de Stripe pour les paiements (à venir)
- 📜 Route `POST /payments/checkout` (paiement sécurisé) (à venir)
- 🔄 Route `GET /transactions/:userId` (historique des paiements) (à venir)

### **1.8. Avis et Notations**
- ✅ Route `POST /reviews` (laisser un avis)
- ✅ Route `GET /reviews/user/:userId` (voir les avis d'un utilisateur)
- ✅ Route `GET /reviews/mission/:missionId` (voir les avis d'une mission)

---

## 🟢 **2. Frontend (Next.js + Tailwind CSS)**

### **2.1. Pages de l'Extranet**

#### **(Entreprise)**
- 📌 `/dashboard` → Accueil avec résumé des missions postées
- 📌 `/missions/create` → Formulaire de création de mission
- 📌 `/missions` → Liste des missions postées
- 📌 `/applications` → Voir les candidatures reçues
- 📌 `/transactions` → Historique des paiements
- 📌 `/messages` → Messagerie avec les freelances
- 📌 `/profile` → Modifier le profil et paramètres de l'entreprise

#### **(Freelance)**
- 📌 `/dashboard` → Accueil avec aperçu des missions recommandées
- 📌 `/missions` → Liste des missions disponibles
- 📌 `/applications` → Voir ses candidatures envoyées
- 📌 `/transactions` → Historique des paiements
- 📌 `/messages` → Messagerie avec les entreprises
- 📌 `/profile` → Modifier le profil et ajouter des compétences

### **2.2. Pages Globales**
- 🏠 `/` → Page d'accueil (vitrine)
- 🔑 `/login` → Connexion
- 🆕 `/signup` → Inscription
- 📞 `/contact` → Page de contact
- 📄 `/blog` → Blog et articles informatifs

### **2.3. Composants Réutilisables**
- ✅ **Header.tsx** → Barre de navigation
- ✅ **Footer.tsx** → Pied de page
- ✅ **Button.tsx** → Bouton stylisé
- ✅ **Card.tsx** → Carte pour afficher une mission
- ✅ **Modal.tsx** → Fenêtre modale réutilisable

---

🎯 **Objectif :**
- ✅ **Prioriser l'authentification et la gestion des utilisateurs**
- ✅ **Mettre en place les missions et candidatures en priorité**
- ✅ **Implémenter la messagerie et les avis**
- 🔄 **Implémenter le système de paiements**

🔥 **Prochaine étape : Développement du Frontend avec Next.js et Tailwind CSS !** 😊

