# PiscisLab — Choix techniques locaux

Ce document décrit les choix techniques effectués pour le
développement local de PiscisLab.

Il ne fige aucune technologie côté production.
Il sert uniquement de référence pour le travail en local.

---

## 1. Objectifs de l’environnement local

L’environnement local doit être :
- simple à lancer
- sans dépendances lourdes
- réversible
- compréhensible
- proche du comportement réel d’un navigateur

---

## 2. Éditeur de code

### Choix
- Visual Studio Code

### Raison
- support natif HTML / CSS / JavaScript
- formatage automatique JSON
- validation des fichiers
- travail par dossier simple
- aucun framework imposé

VS Code est utilisé comme **outil**, pas comme contrainte.

---

## 3. Support d’affichage

### Principe
Le navigateur a besoin d’un point d’entrée pour afficher l’interface.

### Choix
- Un fichier HTML minimal (`index.html`)

### Raison
- HTML sert uniquement de **conteneur d’affichage**
- aucune logique métier en HTML
- tout le comportement dynamique est géré en JavaScript

Le fichier HTML est considéré comme **jetable** et non figé.

---

## 4. Mini serveur local

### Problème identifié
- L’ouverture directe via `file://` empêche certains comportements :
  - chargement de fichiers JavaScript
  - futures requêtes HTTP (fetch)
  - comportement réaliste du navigateur

---

### Choix retenu
- Mini serveur HTTP intégré à Python

### Mise en œuvre
- Utilisation du module standard :

python -m http.server

- Aucun package externe
- Aucun framework
- Aucun build

---

## 5. Script de lancement

### Choix
- Script Windows `serve.bat`

### Rôle
- lancer le serveur local
- servir le dossier du projet
- ouvrir automatiquement le navigateur

### Objectif
- une seule action pour démarrer le projet
- pas de configuration manuelle
- environnement reproductible

---

## 6. Philosophie du choix

Les choix techniques locaux respectent les principes suivants :
- simplicité avant tout
- pas d’usine à gaz
- pas de dépendance inutile
- tout doit pouvoir être remplacé plus tard

Ces choix ne préjugent **en rien** :
- de l’architecture finale
- des technologies futures
- du mode de déploiement

---

## 7. Statut

- Environnement local : VALIDÉ
- Mini serveur : VALIDÉ
- Choix non figés : OUI

Ce document doit être mis à jour
à chaque évolution significative de l’environnement local.

## 7   Backend & Données Utilisateur

### Statut
- Type : Choix technique structurant
- Portée : Backend, persistance, authentification (concept)
- Implémentation : progressive, non figée

---

### 1. Principe général

PiscisLab repose sur un **backend de persistance distinct de la carte interactive**.

La carte :
- est un outil de visualisation et d’interaction
- ne stocke aucune donnée
- ne communique jamais directement avec le système de persistance

Toutes les données utilisateur relèvent du **métier**, pas de l’UI.

---

### 2. Backend de persistance

#### Choix
- Firebase est utilisé comme **backend applicatif**
- Cloud Firestore est utilisé comme **système de persistance**

#### Principes
- Firestore implémente le modèle métier, il ne le définit pas
- Le modèle est **logiquement relationnel**
- Le backend est conçu pour évoluer (web, mobile, offline futur)

---

### 3. Données utilisateur

#### Principe fondamental
Toute donnée persistée est **obligatoirement rattachée à un utilisateur identifié**.

Les données utilisateur :
- sont privées par défaut
- ne sont jamais accessibles publiquement
- ne sont jamais stockées côté carte

---

### 4. Modèle conceptuel Utilisateur / Position

#### Utilisateur
- Entité logique identifiée
- Point d’ancrage des données personnelles
- Peut exister sans position

#### Position utilisateur
- Localisation géographique associée à un instant
- Entité métier autonome
- Dépend d’un utilisateur identifié

#### Relation
- Utilisateur (1) → Position (0..N)

---

### 5. Modèle logique Firestore (référence)
users
└─ {userId}
└─ positions
└─ {positionId}

Principes :
- `users` est la collection racine
- `positions` est une sous-collection utilisateur
- Il n’existe pas de collection globale de positions
- Isolement strict des données par utilisateur

---

### 6. Authentification utilisateur (concept)

Deux états utilisateur sont distingués :

#### Utilisateur non identifié
- Accès à la carte et au GPS local
- Aucune persistance de données

#### Utilisateur identifié
- Existence réelle dans le backend
- Autorisé à créer, lire et gérer ses propres données

Règle fondamentale :
- Toute persistance nécessite un utilisateur identifié
- L’utilisateur est créé au moment de l’identification

---

### 7. Règles d’accès aux données (conceptuelles)

- Les données sont privées par défaut
- Un utilisateur accède uniquement à ses propres données
- Aucune lecture ou écriture inter-utilisateurs
- Aucune écriture anonyme
- Aucun accès direct à Firestore depuis la carte

Ces règles sont **métier** et devront être appliquées
dans les mécanismes techniques ultérieurs.

---

### 8. Portée et évolutivité

Ce choix technique :
- n’impose pas les modes d’authentification (email, Google, autres)
- n’impose pas l’ordre d’implémentation
- n’empêche pas des ajustements futurs

Il constitue la **référence active** pour toute implémentation
liée au backend et aux données utilisateur.
