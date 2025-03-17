# 🚀 Tâches à Réaliser pour le Backend et le Frontend de MIRAI

## 🟢 **1. Backend (Node.js + Express + Prisma)**

### **1.1. Configuration et Base de Données**
- ✅ Initialisation de Prisma et connexion à PostgreSQL
- ✅ Création du schéma de base de données (fait)
- 🔄 Migration Prisma (`npx prisma migrate dev --name init`)
- 📂 Mise en place des modèles Prisma (`User`, `Profile`, `Mission`, etc.)

### **1.2. Authentification et Sécurité**
- 🔐 Implémentation de l’authentification avec JWT
- 🔄 Routes `POST /auth/register` et `POST /auth/login`
- 🔄 Middleware d’authentification (`authMiddleware.ts`)
- 🛡️ Sécurisation des routes privées avec JWT

### **1.3. Gestion des Utilisateurs et Profils**
- 👤 Route `GET /users/:id` (récupérer un utilisateur)
- ✏️ Route `PATCH /users/:id` (mise à jour du profil)
- ❌ Route `DELETE /users/:id` (suppression de compte)

### **1.4. Gestion des Missions**
- 📌 Route `GET /missions` (récupérer toutes les missions)
- ➕ Route `POST /missions` (création d’une mission)
- 🔄 Route `PATCH /missions/:id` (modification d’une mission)
- 🗑️ Route `DELETE /missions/:id` (suppression d’une mission)

### **1.5. Candidatures et Matching**
- ✅ Route `POST /applications` (postuler à une mission)
- ✅ Route `GET /applications/user/:id` (voir ses candidatures)
- ✅ Route `POST /matching` (gestion du matching automatique)

### **1.6. Messagerie**
- 📨 Route `POST /messages` (envoyer un message)
- 📩 Route `GET /messages/:userId` (récupérer les messages d’un utilisateur)

### **1.7. Paiements et Transactions**
- 💳 Intégration de Stripe pour les paiements
- 📜 Route `POST /payments/checkout` (paiement sécurisé)
- ✅ Route `GET /transactions/:userId` (historique des paiements)

### **1.8. Avis et Notations**
- ⭐ Route `POST /reviews` (laisser un avis sur un freelance ou une entreprise)
- ⭐ Route `GET /reviews/:userId` (voir les avis d’un utilisateur)

---

## 🟢 **2. Frontend (Next.js + Tailwind CSS)**

### **2.1. Pages de l’Extranet**

#### **(Entreprise)**
- 📌 `/dashboard` → Accueil avec résumé des missions postées
- 📌 `/missions/create` → Formulaire de création de mission
- 📌 `/missions` → Liste des missions postées
- 📌 `/applications` → Voir les candidatures reçues
- 📌 `/transactions` → Historique des paiements
- 📌 `/messages` → Messagerie avec les freelances
- 📌 `/profile` → Modifier le profil et paramètres de l’entreprise

#### **(Freelance)**
- 📌 `/dashboard` → Accueil avec aperçu des missions recommandées
- 📌 `/missions` → Liste des missions disponibles
- 📌 `/applications` → Voir ses candidatures envoyées
- 📌 `/transactions` → Historique des paiements
- 📌 `/messages` → Messagerie avec les entreprises
- 📌 `/profile` → Modifier le profil et ajouter des compétences

### **2.2. Pages Globales**
- 🏠 `/` → Page d’accueil (vitrine)
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
- **Prioriser l’authentification et la gestion des utilisateurs**
- **Mettre en place les missions et candidatures en priorité**
- **Implémenter progressivement la messagerie et les paiements**

🔥 **Tout est bien structuré, dis-moi si tu veux modifier ou ajouter des détails !** 😊

