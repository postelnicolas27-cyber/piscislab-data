# 🧭 PiscisLab — Plan d’implémentation APK Android

## 1. Objectif de ce document

Ce document définit le **plan d’implémentation contrôlé** de l’APK Android PiscisLab,
sur la base des documents suivants, tous **validés** :

- `README.md`
- `ARCHITECTURE_CIBLE.md`
- `AUTH_FIREBASE_ANDROID.md`

Il vise à :
- découper le travail en **phases claires**,
- définir un **ordre de priorité strict**,
- identifier les **risques techniques**,
- imposer des **points de validation obligatoires**.

Règle absolue :
> **Une phase = un objectif = une validation explicite.**  
Aucune phase ne peut commencer sans validation de la précédente.

---

## 2. Principes directeurs (non négociables)

- ✅ UI Web existante **embarquée**, sans refonte
- ✅ Capacitor utilisé uniquement comme **wrapper APK**
- ✅ Firebase Auth **email / mot de passe uniquement**
- ❌ Aucun fournisseur OAuth tiers
- ❌ Aucun framework front ajouté
- ❌ Aucune logique métier dans la couche native
- ✅ Séparation stricte Web / Native
- ✅ Documentation avant implémentation

---

## 3. Périmètre fonctionnel du MVP APK

Le MVP APK doit permettre :

1. le lancement stable de l’application Android,
2. l’affichage complet de l’UI Web existante,
3. l’authentification email / mot de passe,
4. la persistance de session utilisateur,
5. l’accès au GPS avec gestion des permissions,
6. un fonctionnement dégradé sans réseau (offline v1).

Le MVP **n’inclut pas** :
- l’authentification via Google ou autre tiers,
- l’offline cartographique avancé (tuiles),
- la synchronisation complexe en arrière-plan.

---

## 4. Découpage en phases

### 🔹 PHASE 0 — Cadrage & préparation (terminée)
**Objectif** : verrouiller la documentation et les décisions.

Statut :
- Documentation APK complète
- Désimplémentation Google Auth
- Code Web et docs alignés

✅ PHASE 0 **VALIDÉE**

---

### 🔹 PHASE 1 — Socle Capacitor (wrapper APK)
**Objectif** : obtenir une APK Android installable affichant l’UI Web.

Périmètre :
- initialisation Capacitor,
- intégration des assets Web,
- lancement WebView stable.

Exclusions :
- authentification,
- Firebase,
- GPS,
- stockage local.

✅ Validation attendue :
- APK installable sur téléphone,
- UI Web affichée sans régression,
- aucune erreur bloquante au démarrage.

---

### 🔹 PHASE 2 — Auth Firebase email / mot de passe
**Objectif** : rendre l’authentification fonctionnelle dans l’APK.

Périmètre :
- connexion email / mot de passe,
- création de compte,
- réinitialisation de mot de passe,
- déconnexion,
- persistance de session.

Exclusions :
- fournisseurs OAuth tiers,
- deep links.

✅ Validation attendue :
- flux auth complets fonctionnels,
- persistance session après redémarrage,
- messages d’erreur UI propres et non sensibles.

---

### 🔹 PHASE 3 — GPS & permissions Android
**Objectif** : permettre la géolocalisation utilisateur.

Périmètre :
- demande de permission GPS,
- gestion du refus utilisateur,
- récupération de la position,
- transmission au Web pour usage cartographique.

✅ Validation attendue :
- permissions demandées au bon moment,
- refus géré sans crash,
- position exploitée dans la carte.

---

### 🔹 PHASE 4 — Stockage local minimal
**Objectif** : améliorer la stabilité et l’expérience utilisateur.

Périmètre possible :
- préférences UI (thème, derniers choix),
- état de session non sensible,
- derniers paramètres cartographiques.

Contraintes :
- aucun stockage de secrets,
- données locales non critiques uniquement.

✅ Validation attendue :
- données persistantes après redémarrage,
- comportement stable offline partiel.

---

### 🔹 PHASE 5 — Offline v1 (hors cartographie avancée)
**Objectif** : garantir un démarrage et une UX minimale sans réseau.

Périmètre :
- détection de l’état offline,
- affichage de messages adaptés,
- accès aux données locales disponibles.

Exclusions :
- cache de tuiles cartographiques,
- synchronisation différée avancée.

✅ Validation attendue :
- app lançable sans réseau,
- UI accessible,
- aucun blocage critique.

---

## 5. Ordre de priorité strict

1. PHASE 1 — Wrapper APK
2. PHASE 2 — Auth Firebase email / mot de passe
3. PHASE 3 — GPS & permissions
4. PHASE 4 — Stockage local
5. PHASE 5 — Offline v1

Toute inversion de priorité nécessite une **décision documentée**.

---

## 6. Risques techniques identifiés

- incohérence d’état Web ↔ Native,
- comportement spécifique WebView Android,
- gestion incorrecte des permissions GPS,
- attentes utilisateur excessives sur l’offline,
- persistance de session mal synchronisée.

Chaque risque doit être :
- identifié avant implémentation,
- validé fonctionnellement en fin de phase.

---

## 7. Points de validation obligatoires (checklist)

- ✅ PHASE 1 : APK installable + UI affichée
- ✅ PHASE 2 : Auth email / mot de passe + persistance
- ✅ PHASE 3 : GPS fonctionnel + permissions maîtrisées
- ✅ PHASE 4 : Stockage local stable
- ✅ PHASE 5 : Démarrage offline sans blocage

Aucune phase ne peut être considérée comme terminée
sans validation explicite.

---

## 8. Sortie attendue (fin de cycle MVP)

L’APK PiscisLab MVP est considéré prêt lorsque :

- l’application est stable,
- l’authentification email / mot de passe est fiable,
- le GPS est opérationnel,
- l’app démarre sans réseau,
- la gouvernance “étape par étape” a été respectée,
- une synthèse de fin de conversation est produite.

---

## 9. Étape suivante

Après validation de ce document :

➡️ ouverture officielle de **PHASE 1 — Socle Capacitor**

Aucune implémentation ne doit débuter
sans cette validation explicite.
