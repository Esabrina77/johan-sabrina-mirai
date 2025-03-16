erDiagram

    USERS {
        int id PK   // Identifiant unique de l'utilisateur
        string name   // Nom de l'utilisateur
        string email   // Adresse email unique de l'utilisateur
        string password   // Mot de passe de l'utilisateur
        string role   // "freelance" ou "entreprise"
        datetime created_at // Date de création de l'utilisateur
    }
    
    PROFILES {
        int id PK // Identifiant unique du profil
        int user_id FK // Identifiant de l'utilisateur associé
        string type // "freelance" ou "entreprise"
        json details // Compétences, bio, etc.
    }
    
    MISSIONS {
        int id PK
        int user_id FK // L'entreprise qui a posté
        string title
        text description
        decimal budget
        string status // "en attente", "en cours", "terminée"
        datetime created_at
    }
    
    APPLICATIONS {
        int id PK
        int user_id FK // Freelance qui postule
        int mission_id FK
        string status // "envoyée", "acceptée", "refusée"
        datetime date_applied
    }
    
    TRANSACTIONS {
        int id PK
        int mission_id FK
        decimal amount
        string status // "en attente", "payé", "annulé"
        datetime date
    }
    
    MESSAGES {
        int id PK
        int sender_id FK
        int receiver_id FK
        text content
        datetime timestamp
    }
    
    MATCHING {
        int id PK
        int user_id FK // Freelance
        int mission_id FK
        float score // Score basé sur les compétences et historique
        datetime date_matched
    }
    
    REVIEWS {
        int id PK
        int user_id FK // La personne notée (freelance ou entreprise)
        int reviewer_id FK // Celui qui laisse l’avis
        int rating // Note sur 5
        text comment
        datetime date
    }
    
    USERS ||--o{ PROFILES : a_un
    USERS ||--o{ MISSIONS : poste
    USERS ||--o{ APPLICATIONS : postule
    USERS ||--o{ MESSAGES : envoie
    USERS ||--o{ MATCHING : est_suggéré
    USERS ||--o{ REVIEWS : est_noté
    MISSIONS ||--o{ APPLICATIONS : reçoit
    MISSIONS ||--o{ TRANSACTIONS : a_un
    MISSIONS ||--o{ MATCHING : est_suggéré
