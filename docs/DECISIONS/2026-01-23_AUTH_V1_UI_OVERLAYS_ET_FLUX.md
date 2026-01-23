# 2026-01-23 — AUTH v1 : UI overlays & flux Auth (analyse conversation)

Ce document est une **synthèse contractuelle** de la phase **AUTH v1** réalisée/validée en conversation.
Il formalise :
- le périmètre réellement couvert,
- les décisions implicites/explicites validées,
- les fichiers effectivement créés/branchés,
- les incidents rencontrés et leurs corrections,
- le statut final.

---

## 1) Contexte

PiscisLab est un **site mono-page** centré sur la **carte** (index.html).
Toute UI d’authentification est implémentée sous forme de **fragments HTML injectés** (overlays), sans transformer l’architecture en multi-pages.

Objectif : livrer un socle Auth Firebase **opérationnel** et **testable**.

---

## 2) Périmètre AUTH v1 (réalisé)

### 2.1 Fonctionnalités couvertes
- Connexion **email / mot de passe**
- Déconnexion
- Création de compte **email / mot de passe**
- Connexion Google (provider)
- Mot de passe oublié : **envoi email de réinitialisation** (Firebase)
- État connecté minimal : badge + déconnexion + **affichage email** (test multi-comptes)

### 2.2 Contraintes respectées
- UI = fragments HTML (pas de logique Firebase dans les fragments)
- Backend Auth = fonctions Firebase Auth minimales
- Pas de logique métier ajoutée
- Pas de Firestore dans les contrôleurs UI Auth

---

## 3) Architecture retenue (résumé)

### 3.1 Fragments UI (HTML injectés)
Fragments injectés dans `#auth-overlay-root` :
- `web/fragments/login-overlay.html`
- `web/fragments/signup-overlay.html`
- `web/fragments/reset-password-overlay.html`
- `web/fragments/auth-status.html`

Principes :
- HTML only
- styles locaux acceptés
- classes explicites pour cibler les overlays :
  - `.auth-overlay-login`
  - `.auth-overlay-signup`
  - `.auth-overlay-reset`

### 3.2 Contrôleurs UI (JS)
Responsabilités uniques :
- `js/ui/loginOverlay.js` : charge/injecte les fragments (login + signup + reset)
- `js/ui/authViewToggle.js` : bascule login ↔ signup ↔ reset (UI only)
- `js/ui/loginController.js` : submit login (UI → Auth)
- `js/ui/signupController.js` : submit signup (UI → Auth)
- `js/ui/googleLoginController.js` : login Google (UI → Auth)
- `js/ui/resetPasswordController.js` : reset password (UI → Auth)
- `js/ui/passwordToggle.js` : œil affichage/masquage mots de passe (UI only)
- `js/ui/authStatusController.js` : badge connecté + déconnexion + email affiché
- `js/ui/authStateController.js` : écoute Auth globale (affiche/masque overlays selon état)

Bootstrap :
- `js/main.js` : initialise la chaîne UI/Auth au démarrage

### 3.3 Backend Auth (Firebase)
- `js/backend/firebase.js` : init Firebase App + Firestore export
- `js/backend/auth.js` : API Auth minimale exposée :
  - `signIn(email, password)`
  - `signUp(email, password)`
  - `resetPassword(email)`
  - `signOutUser()`
  - `onAuthChange(callback)`
  - Google provider (selon implémentation du projet)

---

## 4) Validations (résumé “étapes”)

### S1 — État connecté minimal
- Badge `.auth-status` visible si user connecté
- Déconnexion via bouton
- Amélioration : remplacement “Connecté” par `user.email` pour tests multi-mails

**Statut : VALIDÉ**

### S2 — Création de compte email / mot de passe
- Overlay signup + contrôleur submit
- Navigation login ↔ signup
- Ajout œil mot de passe côté signup (UX)

**Statut : VALIDÉ**

### S3 — Mot de passe oublié (reset email)
- Overlay reset + contrôleur submit
- Appel `sendPasswordResetEmail` via `resetPassword()`

**Statut : VALIDÉ côté code**

Note importante :
- Firebase Auth (mode standard) **ne fournit pas de logs SMTP/délivrabilité** dans la console Firebase.
- Le succès côté SDK signifie que la demande est acceptée, pas une preuve de réception inbox.
- Toute amélioration future de traçabilité nécessitera SMTP custom / provider email externe (hors périmètre AUTH v1).

---

## 5) Incidents rencontrés & corrections

### 5.1 Clic “Mot de passe oublié” inactif
Cause : overlay reset non injecté / sélecteurs dépendants de la présence d’overlays.
Correction : injection explicite du fragment reset dans `loginOverlay.js` et sélecteurs robustes.

### 5.2 Erreur bloquante : `root is not defined`
Cause : code DOM utilisant `root` en dehors du scope de `loadLoginOverlay()`.
Correction : déplacer toute logique liée à `root` **dans** `loadLoginOverlay()` (aucun DOM hors fonction d’injection).

---

## 6) Statut final AUTH v1

AUTH v1 est considéré comme :
- ✅ fonctionnel
- ✅ stable
- ✅ conforme à la gouvernance (séparation UI/Auth)
- ✅ prêt pour la phase suivante

---

## 7) Suite (prochaine brique)

Prochaine phase prévue : **création APK Android** (wrapping de l’app mono-page).
Cette phase doit démarrer avec :
- une décision “APK-001” (choix techno : Capacitor / autre),
- un prompt de reprise dédié,
- une action unique validée avant implémentation.
