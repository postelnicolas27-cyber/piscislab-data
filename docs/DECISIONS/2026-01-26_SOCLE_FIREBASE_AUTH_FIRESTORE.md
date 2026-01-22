# 2026-01-26 — Socle Firebase (Auth & Firestore)

## 📌 Statut

* **Type** : Décision structurante (socle technique)
* **Périmètre** : Backend – Authentification & données utilisateur
* **Projet** : PiscisLab
* **Statut** : VALIDÉE
* **Phase** : CLÔTURÉE

---

## 🧭 Contexte

Dans le cadre de la mise en place du socle technique de PiscisLab,
il a été décidé de s’appuyer sur **Firebase** pour fournir :

* une authentification utilisateur fiable
* un stockage sécurisé des données utilisateur
* un backend minimal, sans logique métier

Cette décision s’inscrit dans le respect strict de la gouvernance du projet :

* structures avant contenu
* documentation avant évolution
* aucune anticipation fonctionnelle

---

## 🎯 Objectif de la décision

Valider un **socle Firebase minimal, sécurisé et documenté**,
servant de base aux futures briques fonctionnelles du projet.

Le socle devait :

* être testé en conditions réelles
* être sécurisé dès sa création
* être nettoyé de tout code de test
* être documenté de manière contractuelle

---

## 🔐 Décisions prises

### 1️⃣ Choix de Firebase comme backend

Firebase est retenu pour :

* Firebase Authentication
* Cloud Firestore

Firebase est utilisé **uniquement** comme backend distant.
Aucune logique métier n’est déléguée à Firebase.

---

### 2️⃣ Authentification utilisateur

* Fournisseur retenu : **Email / Mot de passe**
* Firebase Auth est la **seule autorité d’identité**
* L’UID Firebase est défini comme **clé primaire universelle utilisateur**

---

### 3️⃣ Base de données Firestore

* Type : Cloud Firestore
* ID : `(default)`
* Région : **Europe (eur3)**

---

### 4️⃣ Modèle utilisateur minimal

Une collection unique est créée :

```
/users/{uid}
```

Décisions associées :

* 1 utilisateur Firebase = 1 document Firestore
* L’ID du document correspond strictement à l’UID Firebase

Champs validés :

| Champ     | Type      | Description      |
| --------- | --------- | ---------------- |
| email     | string    | Email Firebase   |
| role      | string    | Rôle applicatif  |
| createdAt | timestamp | Date de création |

---

### 5️⃣ Sécurité Firestore

Les règles Firestore publiées garantissent que :

* seul un utilisateur authentifié peut accéder aux données
* un utilisateur ne peut lire / écrire **que son propre document**
* aucun accès public n’est autorisé
* tout autre accès est explicitement refusé

---

### 6️⃣ Tests et validation

* Tests Auth réalisés (login / logout)
* Tests Firestore réalisés depuis le front
* Écriture contrôlée validée (`lastLogin`)
* Règles Firestore effectivement appliquées

Tous les scripts de test ont été :

* strictement limités au DEV
* supprimés après validation

---

## 📘 Documentation associée

Les documents suivants font foi :

* `docs/FIREBASE_SETUP_VALIDÉ.md`
* `docs/README.md` (référence officielle ajoutée)
* `docs/GOUVERNANCE_ET_REGLES_DE_TRAVAIL.md`
* `docs/CHOIX_TECHNIQUES_LOCAUX.md`

---

## 🚫 Hors périmètre volontaire

Cette décision ne couvre pas :

* les données métier
* la cartographie ou le GPS
* l’automatisation de la création du profil utilisateur
* les couches fonctionnelles futures

Ces éléments feront l’objet de décisions séparées.

---

## 🔒 Clôture

La phase **Socle Firebase (Auth & Firestore)** est considérée comme :

* techniquement valide
* sécurisée
* documentée
* clôturée

Toute évolution future devra :

* passer par un nouveau document de décision
* être documentée avant implémentation
* respecter la gouvernance existante
