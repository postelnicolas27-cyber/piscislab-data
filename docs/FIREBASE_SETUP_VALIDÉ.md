# Firebase – Socle backend validé (PiscisLab)

## 1. Objectif

Ce document décrit **le socle Firebase réellement mis en place et validé**
pour le projet **PiscisLab**.

Il ne couvre **aucune fonctionnalité future**.
Il documente uniquement ce qui est :
- implémenté
- testé
- sécurisé
- validé

---

## 2. Périmètre technique

- Projet : PiscisLab
- Environnement : DEV local (localhost)
- Frontend : HTML + JavaScript natif (ES Modules)
- Backend distant : Firebase
- Aucun framework
- Aucune logique métier Firebase

Firebase est utilisé **uniquement** pour :
- l’authentification utilisateur
- le stockage sécurisé des données utilisateur

---

## 3. Firebase – État du projet

### 3.1 Authentication

- Fournisseur activé : **Email / Mot de passe**
- Authentification testée avec un compte réel
- Fonctions validées :
  - `signIn`
  - `onAuthStateChanged`
  - `signOut`

Décision structurante :

> **L’UID Firebase est la clé primaire universelle de l’utilisateur.**
### 3.1 Authentication

- Fournisseur activé : **Email / Mot de passe**
- Authentification testée avec un compte réel
- Fonctions validées :
  - `signIn`
  - `onAuthStateChanged`
  - `signOut`

Décision structurante :

> **L’UID Firebase est la clé primaire universelle de l’utilisateur.**

---

### 3.2 Firestore

- Base de données : Cloud Firestore
- ID : `(default)`
- Région : `eur3 (Europe)`
- Base créée et opérationnelle

---

## 4. Modèle de données validé

### Collection `/users`

Chaque utilisateur Firebase possède **exactement un document Firestore**.

/users/{uid}



Champs existants et validés :

| Champ       | Type       | Description |
|------------|------------|-------------|
| email      | string     | Email Firebase |
| role       | string     | Rôle applicatif (`user`) |
| createdAt | timestamp  | Date de création |

---

## 5. Règles de sécurité Firestore (publiées)

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
      allow read, write: if
        request.auth != null
        && request.auth.uid == userId;
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
Effets concrets
❌ Aucun accès public

✅ Lecture / écriture autorisée uniquement :

si l’utilisateur est connecté

si son UID correspond au document ciblé

❌ Tout le reste est explicitement bloqué

6. Architecture des fichiers JS
js/backend/firebase.js
Responsabilités :

Initialisation Firebase

Exposition de l’instance Firestore

Contraintes :

Pas d’authentification

Pas de lecture/écriture

Pas de logique métier

js/backend/auth.js
Responsabilités :

Encapsulation de l’auth Firebase

Fonctions exportées :

signIn

signOutUser

onAuthChange

Contraintes :

Aucun accès Firestore

Aucun UI

Aucun effet de bord

Fichiers de test (DEV ONLY)
Des scripts de test ont été utilisés pour valider :

le cycle d’authentification

la cohérence UID ↔ Firestore

la stabilité des règles

Ces scripts ont été supprimés après validation
(CLEANUP-1 et CLEANUP-2).

7. Décisions désormais figées
Firebase Auth = autorité d’identité

Firestore = source de vérité utilisateur

UID Firebase = clé primaire universelle

Séparation stricte :

init Firebase

auth

data

Aucune donnée métier hors Firestore

8. État de validation
IMPL-1 : OK

IMPL-2.x : OK

IMPL-3.1 : Firestore créé

IMPL-3.2 : Document utilisateur enregistré

IMPL-3.3 : Règles publiées

IMPL-3.4 : Stratégie validée

CLEANUP-1 / CLEANUP-2 : OK

➡️ Socle Firebase validé et stable



---