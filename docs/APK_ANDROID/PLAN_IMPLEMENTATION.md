# 🧭 PiscisLab — Plan d’implémentation APK Android (Capacitor)

## 1. Objectif de ce document

Ce document définit le **plan de travail contrôlé** pour construire l’APK Android PiscisLab
sur la base des documents validés :

- `README.md`
- `ARCHITECTURE_CIBLE.md`
- `AUTH_FIREBASE_ANDROID.md`

Il fournit :
- un découpage en **phases**,
- l’ordre des priorités,
- les risques techniques identifiés,
- les **points de validation obligatoires**.

Règle centrale :
> **Une phase = un objectif = une validation explicite.**  
Aucun passage à la phase suivante sans validation.

---

## 2. Principes de réalisation (non négociables)

- ✅ UI Web existante embarquée (pas de refonte)
- ✅ Capacitor = wrapper APK + pont Web ↔ Native
- ✅ Auth Firebase/Google exécutée côté natif via SDK Android
- ✅ Aucun flux Google via redirect WebView pour le MVP
- ✅ Séparation stricte Web / Native
- ✅ Documentation avant implémentation
- ❌ Pas de code “précoce”
- ❌ Pas d’ajout de framework front sans décision

---

## 3. Périmètre MVP (APK v1)

Le MVP APK vise à livrer une application Android qui :

1. démarre et affiche l’UI Web (carte + structure actuelle),
2. gère l’authentification (email/password + Google) via natif,
3. gère la persistance de session,
4. accède au GPS avec permissions,
5. assure un stockage local minimal (paramètres / état),
6. prépare un socle pour l’offline (sans offline carto avancé).

---

## 4. Phasage détaillé

### PHASE 0 — Préparation & verrouillage documentaire
**Objectif :** cadrage documentaire complet, opposable.

Livrables :
- `docs/APK_ANDROID/README.md`
- `docs/APK_ANDROID/ARCHITECTURE_CIBLE.md`
- `docs/APK_ANDROID/AUTH_FIREBASE_ANDROID.md`
- `docs/APK_ANDROID/PLAN_IMPLEMENTATION.md` (ce document)

✅ Validation PHASE 0 :
- les 4 documents sont validés explicitement.

---

### PHASE 1 — Socle Capacitor (Wrapper APK minimal)
**Objectif :** obtenir une APK qui lance l’UI Web **embarquée** sans régression UI.

Périmètre :
- intégration Capacitor,
- packaging des assets Web,
- lancement WebView stable.

Exclusions :
- pas d’auth,
- pas de GPS,
- pas de stockage avancé.

✅ Validation PHASE 1 :
- APK installable,
- UI Web s’affiche correctement (carte + overlays),
- navigation UI OK,
- aucune erreur bloquante au démarrage.

---

### PHASE 2 — Auth email/password (via natif)
**Objectif :** reproduire le comportement Auth v1 Web dans l’APK, via le natif.

Périmètre :
- login email/password,
- signup email/password (si existant dans v1),
- reset password,
- logout,
- persistance session.

Exclusions :
- Google Sign-In (phase dédiée),
- deep links.

✅ Validation PHASE 2 :
- login/logout OK,
- reset password OK,
- persistance session OK (fermer/réouvrir l’app),
- erreurs UI propres (standardisées / non sensibles).

---

### PHASE 3 — Google Sign-In (via natif)
**Objectif :** activer Google Sign-In robuste, sans redirect Web.

Périmètre :
- connexion Google,
- annulation utilisateur gérée,
- logout,
- persistance session,
- cohérence UI (badge/état).

✅ Validation PHASE 3 :
- login Google OK,
- annulation = retour UI propre,
- persistance session OK,
- aucun retour navigateur “perdu”,
- cohérence avec l’état auth minimal.

---

### PHASE 4 — GPS + permissions Android
**Objectif :** obtenir la position GPS et l’injecter dans la logique cartographique Web.

Périmètre :
- demande de permission au moment opportun,
- gestion refus permission,
- récupération position,
- transmission au Web (pont).

✅ Validation PHASE 4 :
- permission demandée correctement,
- refus permission géré (message UI + fallback),
- position récupérée et utilisée dans la carte,
- aucun crash / boucle permission.

---

### PHASE 5 — Stockage local minimal
**Objectif :** stocker localement un socle de données non sensibles pour stabilité UX.

Périmètre (exemples de besoins, à valider à l’implémentation) :
- préférences UI (thème, derniers choix),
- état auth minimal (uniquement si nécessaire côté UI — pas de secrets),
- derniers paramètres carto (dernier zoom/centre),
- flags “offline mode” (si présent).

✅ Validation PHASE 5 :
- données persistantes au redémarrage,
- aucune exposition de secrets,
- comportement stable offline de base (UI s’ouvre).

---

### PHASE 6 — Offline v1 (non cartographique avancé)
**Objectif :** assurer une continuité d’usage sans réseau, sans viser les tuiles offline.

Périmètre :
- détection offline,
- messages UI adaptés,
- fonctionnement des éléments locaux (préférences, cache minimal),
- interdiction de dépendre du réseau au lancement.

Exclusions :
- caching tuiles OSM/Leaflet (phase future dédiée),
- synchronisation avancée.

✅ Validation PHASE 6 :
- app démarre sans réseau,
- UI s’affiche,
- message offline clair,
- pas d’erreurs bloquantes.

---

## 5. Ordre des priorités

Priorité absolue :
1) PHASE 1 (wrapper stable)
2) PHASE 2 (auth email/password)
3) PHASE 3 (Google natif)
4) PHASE 4 (GPS)
5) PHASE 5 (stockage)
6) PHASE 6 (offline v1)

Raison :
- garantir d’abord un conteneur stable,
- sécuriser l’accès compte / session,
- stabiliser Google (source classique de blocage),
- ajouter ensuite les capacités carto mobiles.

---

## 6. Risques techniques identifiés

1) **Google Sign-In** : configuration Android (certificats / empreintes / projet Firebase)  
   → risque de blocage en PHASE 3.

2) **Synchronisation état auth Web ↔ Native**  
   → risque d’incohérence UI si le Web ne reçoit pas l’état à temps.

3) **WebView / compatibilité** (permissions, stockage, comportements spécifiques Android)  
   → risque de régressions UI en PHASE 1.

4) **GPS / permissions runtime**  
   → risque UX si refus permission non géré.

5) **Offline** : attentes utilisateur vs limites (tuiles)  
   → besoin d’un cadrage explicite avant d’annoncer une promesse offline carto.

Chaque risque doit être :
- suivi par une validation,
- documenté en fin de conversation si décision impliquée.

---

## 7. Points de validation obligatoires (checklist)

- ✅ Validation PHASE 1 : APK affiche l’UI
- ✅ Validation PHASE 2 : email/password + reset + persistance
- ✅ Validation PHASE 3 : Google Sign-In natif + persistance + annulation
- ✅ Validation PHASE 4 : GPS + permissions + fallback
- ✅ Validation PHASE 5 : stockage local minimal + non sensible
- ✅ Validation PHASE 6 : lancement offline + UX offline

---

## 8. Sortie attendue (fin de cycle MVP)

L’APK PiscisLab MVP est considérée prête si :
- elle s’installe et s’exécute de façon stable,
- l’auth (email + Google) est robuste et persistante,
- le GPS est fonctionnel,
- l’app démarre sans réseau,
- la gouvernance “étape par étape” a été respectée,
- une synthèse de clôture est produite (archivage fin de conversation).

---

## 9. Étape suivante

Une fois ce plan validé :

➡️ démarrage **PHASE 1 — Socle Capacitor (wrapper minimal)**

Aucune commande / implémentation ne doit commencer
sans validation explicite de ce document.
