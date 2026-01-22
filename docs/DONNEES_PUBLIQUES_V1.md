# PiscisLab — Données publiques v1 (VALIDÉES)

## 1. Objectif
Définir le socle des données publiques de PiscisLab.
Ces données sont :
- communes à tous les utilisateurs
- accessibles en lecture seule
- hébergées via GitHub Pages
- versionnées via Git

Aucune donnée personnelle n’est incluse.

---

## 2. Types de données validés

### 2.1 Species (poissons)
- Fichier : `species.json`
- Schéma : `species.schema.json`
- Statut : vide (structure validée)

### 2.2 Baits (appâts)
- Fichier : `baits.json`
- Schéma : `baits.schema.json`
- Statut : vide (structure validée)

### 2.3 Environments (milieux)
- Fichier : `environments.json`
- Schéma : `environments.schema.json`
- Statut : vide (structure validée)

---

## 3. Structure commune

Chaque fichier respecte la structure suivante :

- `meta`
  - project (const)
  - type (const)
  - version
  - readonly (true)
- `items` (array)

Aucune logique métier n’est présente dans les données.

---

## 4. Règles fondamentales

- Lecture seule côté client
- Références par ID
- Pas de données personnelles
- Pas de calculs
- Pas de dépendance entre fichiers
- Format JSON strict

---

## 5. Hébergement

- Dépôt GitHub public
- GitHub Pages activé
- Fichiers publiables tels quels
- Cache navigateur possible

---

## 6. État du socle

- Données publiques v1 : VALIDÉES
- Contenu : volontairement vide
- Structure : figée
- Évolutions futures : possibles via versioning

---

## 7. Philosophie

- Simplicité avant tout
- Pas d’usine à gaz
- Pas de décision irréversible
- Une chose à la fois
