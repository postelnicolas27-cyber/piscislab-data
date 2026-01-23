# 🔐 PiscisLab — Auth Firebase dans l’APK Android

## 1. Objectif de ce document

Ce document cadre le fonctionnement de l’authentification **Firebase Authentication**
dans l’APK Android PiscisLab, en cohérence avec :

- l’UI Web existante (HTML / CSS / JavaScript vanilla) embarquée dans une WebView,
- l’architecture cible validée (séparation Web / Native),
- la décision technologique **DECISION-APK-001** (Capacitor).

L’authentification repose **exclusivement** sur :
- **email / mot de passe**,
- **réinitialisation de mot de passe par email**.

Aucun fournisseur OAuth tiers (Google, Apple, etc.) n’est utilisé.

---

## 2. Principe global retenu

### 2.1 Règle centrale

> **L’authentification est exécutée côté natif (Android) via Firebase SDK,  
> et consommée côté Web (UI) via un pont Capacitor.**

Conséquences :
- le Web **ne gère pas directement** Firebase,
- le Web agit comme un client UI :
  - déclenche les actions d’auth,
  - reçoit l’état de session,
  - adapte l’interface (badge, overlays, accès aux modules).

---

### 2.2 Email / mot de passe

Le flux email / mot de passe :
- est initié depuis l’UI Web,
- est exécuté par la couche native,
- renvoie un résultat standardisé au Web.

Objectifs :
- conserver l’expérience UI existante,
- garantir un comportement identique Web navigateur / APK,
- éviter toute dépendance à des mécanismes spécifiques WebView.

---

### 2.3 Réinitialisation de mot de passe

La réinitialisation :
- est déclenchée depuis l’UI Web,
- utilise Firebase Auth (email de reset),
- ne nécessite aucun traitement spécifique côté APK.

---

## 3. Responsabilités Web / Native

### 3.1 Couche Web (UI)

Responsabilités :
- afficher les overlays Login / Signup / Reset password,
- collecter les champs utilisateur (email, mot de passe),
- déclencher les actions d’auth :
  - connexion
  - création de compte
  - réinitialisation de mot de passe
  - déconnexion
- afficher l’état minimal connecté (badge, accès modules),
- gérer les messages d’erreur UI.

Interdits :
- implémenter une logique Firebase directe,
- stocker des identifiants ou secrets,
- dépendre d’un fournisseur OAuth tiers.

---

### 3.2 Couche Native (Capacitor + Firebase SDK)

Responsabilités :
- exécuter les opérations Firebase Auth :
  - création de compte email / mot de passe
  - connexion email / mot de passe
  - envoi email de réinitialisation
  - déconnexion
- gérer la persistance de session Firebase,
- exposer au Web :
  - l’état d’auth courant,
  - les informations utilisateur minimales,
  - des erreurs normalisées et non sensibles.

Interdits :
- implémenter de la logique métier PiscisLab,
- exposer des données sensibles au Web,
- introduire des flux OAuth externes.

---

## 4. État d’auth consommé par l’UI Web

### 4.1 Données minimales attendues

L’UI Web fonctionne avec un état d’auth minimal :

- statut : connecté / non connecté
- identité :
  - uid
  - email
  - date de création (si nécessaire)
- état de session persistant

Ces données sont utilisées uniquement pour :
- affichage UI,
- contrôle d’accès aux modules,
- personnalisation minimale.

---

### 4.2 Standardisation des erreurs

Les erreurs retournées au Web doivent être :
- non sensibles,
- compréhensibles,
- adaptées à une UI simple.

Exemples de codes fonctionnels :
- `AUTH_INVALID_CREDENTIALS`
- `AUTH_EMAIL_ALREADY_IN_USE`
- `AUTH_USER_NOT_FOUND`
- `AUTH_NETWORK_ERROR`
- `AUTH_UNKNOWN_ERROR`

Le mapping exact Firebase → codes UI est défini à l’implémentation,
mais la **standardisation est obligatoire**.

---

## 5. Redirections et deep links

### Position retenue (MVP)

- Aucun flux d’auth ne dépend de redirections externes.
- Aucun deep link n’est requis pour l’authentification.
- Le cycle de connexion reste **entièrement interne à l’APK**.

Toute introduction future de deep links
devra faire l’objet d’une **décision dédiée**.

---

## 6. Sécurité minimale attendue

### 6.1 Principes

- ❌ Aucun secret serveur dans l’APK
- ❌ Aucun stockage de mot de passe côté Web
- ✅ Firebase SDK gère la session et les tokens
- ✅ Séparation stricte des projets Firebase (dev / prod si applicable)

---

### 6.2 Surfaces de risque identifiées

- incohérence d’état Web ↔ Native,
- erreurs trop verbeuses exposées à l’UI,
- logs contenant des informations sensibles,
- mauvaise gestion du cycle de vie Android.

L’implémentation devra :
- filtrer les erreurs,
- maîtriser les logs,
- synchroniser l’état d’auth de manière fiable.

---

## 7. Tests fonctionnels attendus (validation)

Une implémentation auth APK est considérée valide si :

- création de compte email / mot de passe OK
- connexion email / mot de passe OK
- déconnexion OK
- réinitialisation de mot de passe OK
- persistance de session après redémarrage de l’app
- cohérence UI (badge, accès modules)

---

## 8. Points hors périmètre

Ce document n’inclut pas :
- la configuration Firebase Android (fichiers, IDs),
- les commandes Capacitor,
- les plugins précis à installer,
- la gestion multi-app Firebase avancée,
- l’authentification via fournisseurs tiers.

Ces points relèvent des phases d’implémentation,
après validation du plan de travail.

---

## 9. Validation attendue

Ce cadrage devient **opposable** après validation explicite.

Toute implémentation auth :
- doit respecter le principe **email / mot de passe uniquement**,
- ne peut introduire un fournisseur tiers sans décision formalisée.

---

## 10. Étape suivante

La suite logique consiste à cadrer le **plan d’implémentation APK** :

➡️ `PLAN_IMPLEMENTATION.md`
