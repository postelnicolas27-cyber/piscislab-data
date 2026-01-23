# 🏗️ PiscisLab — Architecture cible APK Android

## 1. Objectif de ce document

Ce document définit **l’architecture cible** de l’APK Android PiscisLab,
suite à la décision technologique **DECISION-APK-001**.

Il a pour rôle de :
- cadrer la séparation **Web / Native**,
- définir le rôle exact de Capacitor,
- préciser l’organisation générale de l’APK,
- identifier les points d’extension futurs (auth, GPS, offline, stockage),
- poser un cadre **avant toute implémentation**.

Ce document est **évolutif** tant que l’architecture n’est pas validée.

---

## 2. Principe architectural global

### 2.1 Choix fondamental

L’APK Android PiscisLab repose sur le principe suivant :

> **L’application Android est un conteneur natif (Capacitor)  
> embarquant l’UI Web existante dans une WebView.**

- Le **Web** reste la source principale de l’UI.
- Le **Native** apporte uniquement :
  - l’accès aux capacités Android,
  - la stabilité des intégrations sensibles (auth, GPS, stockage).

Aucune logique métier PiscisLab n’est déplacée dans la couche native.

---

## 3. Séparation des responsabilités

### 3.1 Couche Web (UI principale)

La couche Web conserve intégralement son rôle actuel :

- HTML / CSS / JavaScript vanilla
- Leaflet + OpenStreetMap
- Fragments HTML (UI modulaire)
- Gestion de l’état UI (overlays, navigation, carte)

Responsabilités :
- affichage,
- interactions utilisateur,
- logique cartographique,
- orchestration des appels (auth, données, GPS).

Contraintes :
- ❌ aucune dépendance à Android
- ❌ aucune logique métier serveur
- ❌ aucune hypothèse native non encapsulée

---

### 3.2 Couche Native (Capacitor)

La couche native est **strictement utilitaire**.

Responsabilités autorisées :
- authentification Firebase **email / mot de passe** via SDK natif,
- accès GPS et gestion des permissions Android,
- accès au stockage local natif,
- gestion du cycle de vie Android (foreground / background),
- pont sécurisé Web ↔ Native.

Responsabilités interdites :
- logique métier PiscisLab,
- duplication de logique UI,
- rendu graphique applicatif,
- intégration de fournisseurs OAuth tiers.

---

## 4. Capacitor : rôle et positionnement

Capacitor agit comme :
- un **wrapper APK**,
- un **pont sécurisé** entre Web et Native,
- un **orchestrateur de plugins natifs**.

Il permet :
- d’embarquer les assets Web,
- de générer un projet Android standard (Gradle),
- d’exposer des APIs natives au JavaScript Web.

Capacitor **ne remplace pas** le Web,  
il **l’encapsule**.

---

## 5. Source des assets Web

### Principe retenu (MVP)

- L’APK embarque une **version packagée des assets Web**.
- Les fichiers HTML / CSS / JS sont copiés dans l’APK lors du build.

Avantages :
- fonctionnement offline de base,
- performances stables,
- indépendance réseau au lancement.

Les stratégies hybrides (UI distante, mise à jour dynamique)
sont **hors périmètre MVP** et feront l’objet de décisions dédiées.

---

## 6. Pont Web ↔ Native

### 6.1 Niveau minimal (socle)

- La WebView charge l’UI Web.
- Aucun pont custom obligatoire.
- Le Web fonctionne de manière autonome.

### 6.2 Niveau étendu (auth, GPS, stockage)

- Utilisation de plugins Capacitor pour :
  - Auth Firebase (email / mot de passe),
  - GPS,
  - Stockage local.

Le Web :
- déclenche les actions,
- consomme les résultats via des abstractions,
- ne connaît pas les détails natifs.

---

## 7. Permissions Android

L’architecture prévoit la gestion explicite des permissions suivantes :

- Accès réseau
- Localisation (fine / coarse)
- Accès stockage local (si requis)

Principes :
- permissions demandées **au moment utile**,
- gestion explicite du refus utilisateur,
- aucune permission implicite.

---

## 8. Gestion des environnements

L’architecture doit permettre :
- une distinction **dev / prod**,
- un rattachement clair aux projets Firebase correspondants,
- une configuration sans duplication de logique.

Les mécanismes exacts (fichiers, flags, variables)
seront définis dans une phase dédiée.

---

## 9. Points volontairement exclus

Ce document **n’inclut pas** :
- les commandes Capacitor,
- la structure détaillée du projet Android,
- les fichiers Gradle,
- la configuration Firebase Android,
- la gestion offline cartographique avancée.

Ces éléments relèvent des phases d’implémentation ultérieures,
après validation explicite.

---

## 10. Validation attendue

Cette architecture devient **opposable** une fois validée explicitement.

Toute implémentation APK :
- doit s’y conformer,
- ne peut la modifier sans décision formalisée.

---

## 11. Étape suivante

La suite logique consiste à cadrer **l’authentification Firebase dans l’APK Android** :

➡️ `AUTH_FIREBASE_ANDROID.md`

Cette étape précisera :
- le rôle exact de l’auth native,
- la synchronisation Web ↔ Native,
- les exigences de sécurité minimale.
