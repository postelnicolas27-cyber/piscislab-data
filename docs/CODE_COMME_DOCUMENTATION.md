# PiscisLab — Code comme documentation

## 1. Principe fondamental

Dans PiscisLab, le code est considéré comme une **documentation vivante**.

Un fichier de code ne doit pas seulement fonctionner :
il doit être **lu, compris et maintenu** sans contexte externe.

---

## 2. Objectifs

Cette approche vise à :
- faciliter la maintenance à long terme
- éviter les suppressions ou régressions involontaires
- permettre une reprise du projet à tout moment
- rendre chaque décision technique explicite

---

## 3. Niveau de commentaires attendu

Chaque fichier (`html`, `js`, `css`, `php`, etc.) doit contenir :

- un **en-tête de fichier** expliquant :
  - son rôle
  - ce qu’il fait
  - ce qu’il ne fait pas
  - ses dépendances

- des **commentaires de structure** :
  - grandes sections
  - responsabilités
  - points d’entrée importants

- des **commentaires de décision** :
  - pourquoi un choix a été fait
  - pourquoi une solution simple a été préférée
  - pourquoi certaines choses sont volontairement absentes

Les commentaires inutiles ou redondants sont évités.
Les commentaires explicatifs et intentionnels sont encouragés.

---

## 4. Responsabilité unique par fichier

Principe fondamental :

> **Une fonction importante = un fichier dédié**

Conséquences :
- pas de fichiers “fourre-tout”
- pas de logique cachée
- pas de fonctions anonymes critiques

Chaque fichier doit avoir :
- une responsabilité claire
- des limites explicites
- une évolution maîtrisée

---

## 5. Évolution et refactor

Toute évolution du code doit :
- préserver les fonctions existantes par défaut
- signaler explicitement toute suppression
- éviter les modifications silencieuses
- être compréhensible par simple lecture du fichier

Un refactor qui rend le code plus court
mais moins lisible est considéré comme une régression.

---

## 6. Lien avec la gouvernance

Ce principe complète et renforce :
- la règle de modification des fichiers
- la gouvernance globale du projet
- la philosophie “simplicité avant tout”

Le non-respect de ce principe est une faute de méthode.

---

## 7. Statut

- Principe : VALIDÉ
- Application : OBLIGATOIRE
- Portée : tous les fichiers du projet

Toute implémentation future devra respecter ce document.
