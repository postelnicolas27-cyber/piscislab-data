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
