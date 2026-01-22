# PiscisLab — Système de couches

## 1. Principe général

La carte interactive est le cœur de PiscisLab.

Tout ce qui apparaît, agit ou influence la carte
doit appartenir à une **couche**.

Il n’existe **aucune fonctionnalité “hors couche”**.

---

## 2. Qu’est-ce qu’une couche ?

Une couche est une **unité logique** qui regroupe :

- une intention fonctionnelle
- un type d’information ou de comportement
- un périmètre clair

Une couche peut :
- afficher quelque chose
- influencer l’affichage
- réagir à des paramètres
- servir de support à une logique métier

Une couche n’est pas nécessairement visible.

---

## 3. Ce qu’une couche N’EST PAS

Une couche n’est pas :
- un simple fichier
- une implémentation figée
- une décision irréversible
- un fourre-tout

Une couche est un **concept avant d’être du code**.

---

## 4. Responsabilité de l’attribution des couches

Lorsqu’une fonctionnalité est demandée :

1. La fonctionnalité est analysée
2. Une couche logique est proposée par l’assistant
3. Le choix est justifié
4. L’attribution est documentée

L’utilisateur ne choisit pas la couche.
Il valide ou ajuste la proposition.

Ce mécanisme garantit :
- cohérence globale
- lisibilité à long terme
- absence de dérive fonctionnelle

---

## 5. Couches non figées

Les couches :
- peuvent évoluer
- peuvent être renommées
- peuvent être scindées
- peuvent être fusionnées

Mais toujours selon les règles suivantes :
- décision explicite
- documentation obligatoire
- traçabilité claire

Aucune couche n’est gelée par défaut.

---

## 6. Relation entre couches et implémentation

Une couche peut être implémentée par :
- un ou plusieurs fichiers JavaScript
- des sous-modules
- une logique partagée

L’implémentation peut évoluer
sans remettre en cause l’existence de la couche.

---

## 7. Ordre de priorité

En cas de doute :

1. La clarté prime sur la performance
2. La lisibilité prime sur la compacité
3. La documentation prime sur la rapidité

Une couche mal comprise est une dette.

---

## 8. Statut

- Système de couches : VALIDÉ
- Attribution par l’assistant : OBLIGATOIRE
- Couches figées : NON

Ce document est une référence centrale du projet.
Toute évolution future doit s’y conformer.
