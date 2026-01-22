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

### 4.3 Règle absolue — Process de modification des fichiers

Toute modification d’un fichier existant (`html`, `js`, `css`, `php`, etc.)
doit obligatoirement respecter le processus suivant :

1. **Demande explicite du fichier concerné**
   - Le fichier ou le code complet doit être fourni avant toute proposition de modification.

2. **Lecture réelle et complète du fichier**
   - Le fichier est lu intégralement.
   - Aucune modification ne doit être proposée sans analyse réelle du contenu.

3. **Restitution du fichier complet après modification**
   - Le fichier modifié doit être rendu **en entier** dans la mesure du possible.
   - Aucune fonction, logique ou ligne ne doit être supprimée implicitement.
   - Toute suppression ou modification de comportement doit être **explicitement signalée**.

4. **Cas des modifications partielles (patchs)**
   - Si une modification ne concerne qu’un extrait de code
     (ajout, remplacement ou suppression ciblée),
     le fichier complet doit être **redemandé et relu intégralement**
     avant validation finale.

Tout non-respect de ce processus est considéré comme une **faute de méthode**.

Conséquences :
- l’étape est invalide
- aucune validation n’est accordée
- aucun commit ne doit être effectué

Cette règle est **non négociable**.

---

### 4.4 Règle absolue — Attribution et responsabilité des couches

Toute fonctionnalité demandée dans le cadre du projet PiscisLab
doit obligatoirement être rattachée à une **couche logique**.

Le processus est le suivant :

1. **Analyse de la fonctionnalité**
   - La fonctionnalité est analysée dans son intention, son périmètre et ses impacts.

2. **Choix de la couche par l’assistant**
   - Le choix de la couche n’est pas imposé par l’utilisateur.
   - L’assistant est responsable de proposer la couche la plus cohérente.

3. **Justification explicite**
   - Le choix de la couche doit être expliqué.
   - Les raisons techniques et conceptuelles doivent être claires.

4. **Documentation obligatoire**
   - L’attribution de la fonctionnalité à une couche doit être documentée.
   - Cette documentation fait partie intégrante de la décision.

Les couches :
- ne sont jamais figées
- peuvent évoluer, être scindées ou déplacées
- mais toujours de manière explicite et documentée

Toute fonctionnalité sans couche clairement identifiée
est considérée comme **non valide**.

---

### 4.5 Règle absolue — Clôture et relance de conversation

Toute fin de conversation de travail sur le projet PiscisLab
doit obligatoirement respecter le processus suivant
avant toute reprise dans une nouvelle conversation.

1. **Mise à jour complète de la documentation**
   - Toutes les décisions prises dans la conversation doivent être retranscrites.
   - La documentation doit refléter l’état réel du projet.

2. **Création d’un document de synthèse**
   - Un document de synthèse doit être créé.
   - Il doit contenir :
     - les décisions validées
     - ce qui est terminé
     - ce qui reste à faire
     - ce qui fonctionne
     - ce qui ne fonctionne pas
   - Ce document sert de référence contractuelle.

3. **Mise à jour Git**
   - Toute décision validée doit être versionnée.
   - Aucun état intermédiaire non documenté ne doit rester hors Git.

4. **Rédaction d’un prompt de relance structuré**
   - Un prompt dédié doit être rédigé pour la nouvelle conversation.
   - Ce prompt doit :
     - imposer la lecture et l’application de la documentation existante
     - imposer la lecture de tous les fichiers fournis
     - résumer l’état du projet
     - préciser les objectifs de la reprise
     - rappeler les règles fondamentales

Toute reprise de travail sans ce processus
est considérée comme **non conforme**.

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
