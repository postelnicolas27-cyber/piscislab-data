# PiscisLab — Documentation

Ce dossier contient la documentation officielle du projet PiscisLab.  
Chaque document fait partie intégrante du socle et doit être respecté.

Toute décision, règle ou évolution du projet
doit être formalisée ici avant toute implémentation.

---

## 📌 Documents de référence

### 🧰 Templates
- [Prompt officiel de relance de conversation](./TEMPLATES/PROMPT_RELANCE_CONVERSATION.md)

> Template obligatoire pour toute reprise de travail afin de garantir la continuité, la lecture de la documentation et le respect des règles de gouvernance.

---

### 🧩 Système de couches
- [Système de couches](./SYSTEME_DE_COUCHES.md)

> Définit le rôle des couches, leur caractère non figé et la responsabilité de l’assistant dans leur attribution.

---

### 🧱 Gouvernance & méthode de travail
- [Gouvernance et règles de travail](./GOUVERNANCE_ET_REGLES_DE_TRAVAIL.md)

> Définit la façon de travailler, les règles absolues, le rythme du projet, le protocole de clôture et de relance de conversation, ainsi que les responsabilités de décision.

---
### 🔐 Backend & données utilisateur
- [Firebase – socle backend validé](./FIREBASE_SETUP_VALIDÉ.md)

> Documente le socle Firebase réellement implémenté :  
> authentification, Firestore, règles de sécurité et modèle utilisateur.


### 🗺️ Carte interactive (base UI)
- [Carte interactive – base conceptuelle](./CARTE_INTERACTIVE_BASE.md)

> Définit la carte comme interface principale, la nature hybride de l’outil, et le principe des couches non figées.

---

### 🛠️ Choix techniques locaux
- [Choix techniques locaux](./CHOIX_TECHNIQUES_LOCAUX.md)

> Décrit l’environnement de travail local (VS Code, mini-serveur, HTML minimal), les choix techniques effectués et leurs justifications.

---

### 🧾 Code comme documentation
- [Code comme documentation](./CODE_COMME_DOCUMENTATION.md)

> Définit le principe selon lequel chaque fichier de code est une documentation vivante, abondamment commentée, lisible et maintenable dans le temps.

---

### 📜 Décisions & synthèses
- [2026-01-22 — Base carte interactive & système de couches](./DECISIONS/2026-01-22_BASE_CARTE_ET_SYSTEME_DE_COUCHES.md)
- [2026-01-23 — AUTH v1 (UI overlays & flux Auth)](./DECISIONS/2026-01-23_AUTH_V1_UI_OVERLAYS_ET_FLUX.md)
- [2026-01-26 — Socle Firebase (Auth & Firestore)](./DECISIONS/2026-01-26_SOCLE_FIREBASE_AUTH_FIRESTORE.md)

> Documents de synthèse contractuels reprenant les décisions structurantes validées du projet.



---

### 📦 Données publiques
- [Données publiques v1 (validées)](./DONNEES_PUBLIQUES_V1.md)

> Définit la structure, les types de données publiques, les schémas associés et les règles d’utilisation.

---

## 📐 Principes clés

- Une étape = une action = une validation
- Documentation avant évolution
- Structures avant contenu
- Code = documentation
- Pas de décisions irréversibles
- Continuité inter-conversation garantie

---

## 🔒 Statut

- Documentation : **ACTIVE**
- Gouvernance : **VALIDÉE**
- Système de couches : **VALIDÉ**
- Données publiques v1 : **VALIDÉES**

Toute évolution du projet doit s’appuyer sur ces documents  
et respecter strictement la gouvernance en place.
