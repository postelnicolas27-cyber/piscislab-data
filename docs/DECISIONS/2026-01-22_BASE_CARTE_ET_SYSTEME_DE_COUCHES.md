# PiscisLab — Décisions fondatrices
## Base carte interactive & système de couches

**Date :** 2026-01-22  
**Statut :** VALIDÉ  
**Portée :** Structurante (fondation du projet)

---

## 1. Contexte

PiscisLab est conçu comme un laboratoire d’aide à la décision,
centré autour d’une **carte interactive unique** servant de point
d’entrée principal à l’ensemble du projet.

Cette carte n’est pas un simple affichage, mais un **socle fonctionnel**
sur lequel viennent se greffer données, outils et aides à la décision.

---

## 2. Décision n°1 — Carte centrale unique

Il est décidé que :

- PiscisLab repose sur **une seule page principale**
- Cette page est une **carte interactive**
- La carte est l’élément central de navigation et d’interaction

Les autres fonctionnalités (ex. recettes d’appâts, informations annexes)
pourront exister sous forme :
- d’onglets
- de panneaux
- ou de vues secondaires

Mais **la carte reste la base**.

---

## 3. Décision n°2 — Système de couches obligatoire

Tout ce qui apparaît, agit ou influence la carte
doit appartenir à une **couche**.

Principes :
- aucune fonctionnalité hors couche
- une couche est un concept logique avant d’être du code
- une couche peut être visible ou non

Le système de couches :
- est évolutif
- n’est jamais figé
- ne constitue pas une décision irréversible

---

## 4. Décision n°3 — Responsabilité de l’attribution des couches

Lorsqu’une fonctionnalité est demandée :

- l’utilisateur décrit le besoin
- **l’assistant analyse la fonctionnalité**
- **l’assistant propose la couche appropriée**
- ce choix est **justifié**
- ce choix est **documenté**

L’utilisateur :
- valide
- ou ajuste la proposition

Cette règle garantit :
- cohérence globale
- lisibilité long terme
- maîtrise de la complexité

---

## 5. Décision n°4 — Code comme documentation

Le code PiscisLab doit être :

- abondamment commenté
- lisible
- pédagogique
- pensé pour la maintenance et l’évolution

Règles associées :
- chaque fichier explique son rôle
- chaque fonction importante est documentée
- les responsabilités sont déportées dans des fichiers distincts
- aucun “code magique” ou implicite

---

## 6. Décision n°5 — Process strict de modification des fichiers

Toute modification de fichier existant doit respecter un process strict :

1. Le fichier est demandé explicitement
2. Le fichier est lu intégralement
3. Le fichier est restitué en entier après modification
4. Toute suppression ou modification de comportement est signalée

Ce process est **obligatoire et non négociable**.

---

## 7. Décision n°6 — Base technique minimale

La base technique validée à ce stade est :

- HTML comme conteneur minimal
- JavaScript pour la logique
- Leaflet pour la carte
- OpenStreetMap pour les tuiles
- Mini-serveur local pour le développement

Cette base est considérée comme :
- saine
- simple
- évolutive
- non figée

---

## 8. Ce qui est explicitement exclu à ce stade

- aucune usine à gaz
- aucune architecture lourde prématurée
- aucune donnée utilisateur
- aucun backend complexe
- aucune fonctionnalité figée

---

## 9. Statut

Toutes les décisions ci-dessus sont :

- VALIDÉES
- DOCUMENTÉES
- RÉVERSIBLES (sur décision explicite)

Ce document sert de **référence contractuelle**
pour toute implémentation future liée à la carte
et au système de couches.
