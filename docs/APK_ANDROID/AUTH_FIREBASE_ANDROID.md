# 🔐 PiscisLab — Auth Firebase dans l’APK Android

## 1. Objectif de ce document

Ce document cadre le fonctionnement de l’authentification **Firebase Auth** dans l’APK Android PiscisLab,
en cohérence avec :

- l’UI Web existante (HTML/CSS/JS vanilla) embarquée dans une WebView,
- l’architecture cible validée (séparation Web / Native),
- la décision **DECISION-APK-001** : **Capacitor + authentification native via SDK Android**.

Ce document doit permettre :
- de définir la frontière exacte Web ↔ Native pour l’auth,
- de cadrer Google Sign-In sans dépendre d’un redirect Web fragile,
- d’énoncer les exigences de sécurité minimale,
- de préparer une implémentation contrôlée (phases + validations).

---

## 2. Principe global retenu

### 2.1 Règle centrale

> **L’authentification est effectuée côté natif (Android) via Firebase SDK,  
> et consommée côté Web (UI) via un pont Capacitor.**

Conséquence :
- le Web **ne pilote pas** Google Sign-In via popup/redirect,
- le Web se comporte comme un “client UI” :
  - il demande une action d’auth (login/logout),
  - il reçoit un état de session et des informations utilisateur,
  - il adapte l’UI (badge, overlays, session).

### 2.2 Email / mot de passe

Le flux email/mot de passe :
- peut être initié depuis l’UI Web,
- est exécuté via la couche native,
- renvoie un résultat standardisé au Web.

Objectif :
- conserver l’expérience UI existante,
- éviter tout comportement différent entre Web navigateur et APK.

### 2.3 Google Sign-In

Google Sign-In est considéré comme **nativement piloté** (SDK Android),
afin de garantir :
- la stabilité du flux de connexion,
- la cohérence du retour à l’application,
- l’évitement des redirects Web / deep links fragiles.

---

## 3. Responsabilités Web / Native (auth)

### 3.1 Couche Web (UI)

Responsabilités :
- afficher les overlays Login / Signup / Reset password,
- collecter les champs (email, password),
- déclencher les actions d’auth :
  - login email/password
  - signup email/password
  - reset password
  - login Google
  - logout
- afficher l’état minimal connecté (badge + bouton logout),
- gérer les erreurs côté UI (messages utilisateur).

Interdits :
- implémenter un Google Sign-In “Web” basé sur popup/redirect dans la WebView,
- stocker des secrets,
- dupliquer la logique native.

### 3.2 Couche Native (Capacitor + Firebase SDK)

Responsabilités :
- exécuter les opérations Firebase Auth :
  - create account
  - sign in (email/password)
  - password reset
  - Google Sign-In
  - logout
- gérer la persistance de session Firebase (côté SDK),
- fournir au Web :
  - l’état d’auth courant,
  - les infos utilisateur minimales nécessaires à l’UI,
  - des erreurs typées (codes + messages safe).

Interdits :
- implémenter des règles métier PiscisLab,
- forcer des écrans natifs de navigation (hors flux auth strict).

---

## 4. État d’auth “consommé” par l’UI Web

### 4.1 Données minimales attendues

L’UI Web doit fonctionner avec un “Auth State” minimal, par exemple :

- statut : connecté / non connecté
- identité minimale :
  - uid
  - email (si disponible)
  - displayName (si disponible)
  - provider (password / google)
  - photoURL (si disponible)

Ces données sont utilisées uniquement pour :
- affichage badge “connecté”,
- identification UI,
- déverrouillage progressif de modules.

### 4.2 Standardisation des erreurs

Les erreurs renvoyées au Web doivent être :
- non sensibles,
- compréhensibles,
- compatibles avec une UI simple.

Exemples :
- `AUTH_INVALID_CREDENTIALS`
- `AUTH_EMAIL_ALREADY_IN_USE`
- `AUTH_NETWORK_ERROR`
- `AUTH_USER_CANCELLED` (Google)

Le mapping exact des codes Firebase → codes UI est à définir en implémentation,
mais ce document impose le principe de standardisation.

---

## 5. Redirections, deep links, redirect URI

### 5.1 Position officielle (MVP)

Dans le cadre de l’APK (MVP) :
- **aucun flux critique ne doit dépendre d’un redirect Web**,
- Google Sign-In est géré par le SDK natif.

### 5.2 Cas où les deep links deviennent nécessaires

Les deep links peuvent devenir nécessaires si :
- des features futures imposent un retour via URL (ex : partage, invitation),
- un flux d’auth externe impose une URL de retour,
- une stratégie multi-plateforme unifiée est décidée.

Dans ce cas :
- une décision dédiée doit être documentée,
- les schémas/hosts autorisés doivent être listés,
- la sécurité (anti-spoofing) doit être traitée.

---

## 6. Sécurité minimale attendue

### 6.1 Principes

- ✅ Aucun secret serveur dans l’APK
- ✅ Le Web n’est qu’un client UI, il ne détient pas de secrets
- ✅ Le SDK Firebase gère la session de manière standard
- ✅ Les projets Firebase dev/prod doivent être strictement séparés (si applicables)

### 6.2 Surfaces de risque identifiées

- fuite de tokens dans des logs
- erreurs trop verbeuses exposées à l’UI
- incohérence d’état entre natif et web (session non synchronisée)
- configuration Google Sign-In incorrecte (certificats / empreintes)

L’implémentation devra prévoir :
- des logs contrôlés (pas d’informations sensibles),
- des retours d’erreurs “safe” côté UI,
- une synchronisation fiable de l’état auth.

---

## 7. Tests fonctionnels attendus (validation)

Une implémentation auth dans l’APK ne peut être validée que si :

### 7.1 Email / mot de passe
- login OK
- logout OK
- reset password OK
- persistance session OK (fermer/réouvrir l’app)

### 7.2 Google Sign-In
- login Google OK
- annulation utilisateur gérée (retour UI propre)
- logout OK
- persistance session OK

### 7.3 Cohérence UI
- overlays inchangés (pas de refonte)
- état minimal connecté identique au Web
- erreurs UI propres et compréhensibles

---

## 8. Points hors périmètre (volontairement exclus)

Ce document n’inclut pas :
- l’identification du plugin exact à installer,
- la configuration Firebase Android (fichiers/IDs),
- la gestion des empreintes SHA (détails),
- les commandes Capacitor,
- la mise en place de deep links.

Ces éléments relèvent des phases d’implémentation,
après validation explicite du plan de travail.

---

## 9. Validation attendue

Ce cadrage auth devient opposable après validation explicite.

Toute implémentation auth (APK) :
- doit suivre ce principe : **auth native / UI web consommatrice**,
- ne doit pas réintroduire un Google auth WebView via redirect sans décision dédiée.

---

## 10. Étape suivante

La suite logique consiste à produire le plan d’implémentation contrôlée :

➡️ `PLAN_IMPLEMENTATION.md`

Ce document définira :
- les phases,
- l’ordre des priorités,
- les risques,
- les validations obligatoires.
