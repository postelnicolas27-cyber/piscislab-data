# 📱 PiscisLab — APK Android (Documentation de cadrage)

## 1. Contexte général

Le projet **PiscisLab** est une plateforme cartographique dédiée à la pêche,
reposant sur un socle **Web HTML / CSS / JavaScript vanilla**, intégrant :

- Cartographie **Leaflet + OpenStreetMap**
- UI modulaire via fragments HTML
- Authentification **Firebase Auth** :
  - Email / mot de passe
  - Reset password
  - Google Sign-In
- Aucune dépendance à un framework front (React, Vue, etc.)

L’authentification **AUTH v1 (Web)** est considérée comme **TERMINÉE et VALIDÉE**.

Ce dossier ouvre une **nouvelle phase dédiée à la préparation de l’APK Android**.

---

## 2. Rôle de ce dossier `APK_ANDROID/`

Ce dossier contient la **documentation de travail vivante** relative à l’APK Android :

- cadrage technique,
- architecture cible,
- choix d’intégration,
- planification des phases.

👉 Il **ne s’agit pas** d’un dossier d’archives de décisions.

Les **synthèses de fin de conversation** et décisions clôturées restent
documentées séparément dans le dossier `docs/DECISIONS/`.

---

## 3. Décision technologique actée

La décision suivante est **validée** et constitue un **pré-requis non négociable** pour la suite :

### 🧭 DECISION-APK-001 — Technologie APK Android

- **Capacitor** est retenu comme technologie de construction de l’APK Android.
- L’application Android repose sur une **WebView** embarquant l’UI Web existante.
- L’UI HTML / CSS / JS actuelle est **conservée sans refonte**.
- L’authentification **Google + Firebase** est réalisée via **SDK natif Android**
  (plugin Capacitor Firebase Authentication), et non via redirect Web.

Cette décision :
- autorise l’accès aux capacités natives (GPS, permissions, stockage, offline),
- garantit la stabilité de Google Sign-In,
- évite toute migration vers React Native / Expo.

---

## 4. Périmètre de cette documentation

Ce dossier couvre :

- le cadrage de l’APK Android,
- l’architecture cible (Web ↔ Native),
- la gestion de l’authentification Firebase dans une APK,
- le plan de travail et les phases d’implémentation.

Ce dossier **n’a pas vocation** à :
- contenir du code,
- lancer des commandes,
- décrire une implémentation détaillée prématurée,
- figer des choix non validés.

---

## 5. Règles de gouvernance applicables

Les règles suivantes s’appliquent strictement à toute évolution APK :

- ❌ Aucun code sans décision validée
- ❌ Aucune hypothèse non documentée
- ❌ Aucune refonte UI globale
- ❌ Aucun framework front imposé sans validation explicite
- ✅ Une étape = une action = une validation
- ✅ Toujours expliquer avant de proposer
- ✅ Toute décision majeure est formalisée **en fin de conversation**

---

## 6. Organisation du dossier

APK_ANDROID/
├── README.md → Contexte et cadre général
├── ARCHITECTURE_CIBLE.md → Architecture APK et Web ↔ Native
├── AUTH_FIREBASE_ANDROID.md → Auth Firebase & Google dans l’APK
└── PLAN_IMPLEMENTATION.md → Découpage des phases et validations

yaml
Copier le code

Chaque fichier est **évolutif** tant que la phase correspondante n’est pas clôturée.

---

## 7. Étape suivante

La suite logique consiste à définir **l’architecture cible de l’APK Android** :

➡️ `ARCHITECTURE_CIBLE.md`

Cette étape permettra de cadrer :
- la source des assets Web,
- le rôle exact de Capacitor,
- la gestion des permissions Android,
- la séparation Web / Native,
- la gestion des environnements.

Aucune implémentation ne doit débuter avant validation explicite
de cette étape de cadrage.