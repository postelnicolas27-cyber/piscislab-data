# PiscisLab — Gouvernance & règles de travail

## 1. Principe fondamental

PiscisLab est construit selon une règle absolue :

> **Une étape = une action = une validation**

Aucune action suivante n’est engagée sans validation explicite de l’étape en cours.

---

## 2. Philosophie générale

- Simplicité avant tout
- Pas d’usine à gaz
- Pas de magie cachée
- Pas de décisions irréversibles
- Évolution progressive
- Base saine avant fonctionnalités

Le projet privilégie :
- la lisibilité
- la traçabilité
- la réversibilité

---

## 3. Règles de travail

### 3.1 Travail par micro-étapes
- Une seule action à la fois
- Pas d’anticipation
- Pas de regroupement artificiel
- Chaque action doit être compréhensible isolément

### 3.2 Validation explicite
- Une étape n’est considérée terminée que lorsqu’elle est explicitement validée
- Sans validation → on n’avance pas

---

## 4. Gestion du code et des fichiers

### 4.1 Git
- Git est utilisé comme outil de sécurité et de traçabilité
- Commits :
  - clairs
  - ciblés
  - un sujet = un commit
- Aucun commit mélangeant plusieurs décisions

### 4.2 Structure
- Schémas = règles
- Fichiers JSON = contenu
- Séparation stricte entre structure et données

---

## 5. Données

### 5.1 Données publiques
- JSON uniquement
- Lecture seule
- Versionnées
- Sans logique métier
- Sans données personnelles

### 5.2 Données utilisateur
- Séparées strictement des données publiques
- Gérées par un backend dédié (ex. Firebase)
- Jamais hébergées via GitHub Pages

---

## 6. Ce qui est INTERDIT

- Ajouter du contenu réel sans décision claire
- Modifier une structure validée sans versioning
- Mélanger données publiques et données utilisateur
- Avancer “pour aller plus vite”
- Corriger plusieurs choses en même temps
- Faire des suppositions techniques non validées

---

## 7. Documentation

- Toute décision structurante doit être documentée
- La documentation fait partie intégrante du projet
- Un projet non documenté est considéré incomplet

---

## 7.1 Règle absolue — Documentation indexée

Toute création ou ajout d’un document de référence implique
OBLIGATOIREMENT :

1. La mise à jour immédiate de `docs/README.md`
2. L’ajout du document dans la section appropriée
3. Une validation explicite avant tout commit

Aucun document ne doit exister sans être référencé dans l’index.

Si cette règle n’est pas respectée :
- l’étape est considérée comme INVALIDE
- aucun commit ne doit être effectué

---

## 8. Évolution du projet

Toute évolution doit respecter :
1. Identification du besoin
2. Décision explicite
3. Implémentation minimale
4. Validation
5. Documentation
6. Commit

---

## 9. État actuel

- Gouvernance : VALIDÉE
- Méthode : FIGÉE
- Base technique : SAINE

Toute la suite du projet s’appuie sur ce document.
