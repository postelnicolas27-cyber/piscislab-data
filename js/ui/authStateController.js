/**
 * PiscisLab — authStateController.js
 * -----------------------------------------------------------------------------
 * RÔLE
 * ----
 * - Écouter l’état global Firebase Auth
 * - Afficher ou masquer l’overlay login en conséquence
 *
 * CONTRAINTES
 * -----------
 * - AUCUNE logique métier
 * - AUCUNE écriture Firestore
 * - AUCUNE UI membre
 * - AUCUNE redirection
 *
 * DÉPENDANCES
 * -----------
 * - auth.js           → onAuthChange()
 * - loginOverlay.js   → showLoginOverlay(), hideLoginOverlay()
 *
 * COUCHE
 * ------
 * UI — Orchestration Auth globale
 * -----------------------------------------------------------------------------
 */

import { onAuthChange } from "../backend/auth.js";
import {
    loadLoginOverlay,
    showLoginOverlay,
    hideLoginOverlay
} from "./loginOverlay.js";

/**
 * Initialise l’écoute globale Auth.
 * À appeler UNE SEULE FOIS au démarrage de l’app.
 */
export async function initAuthStateController() {
    // S’assure que l’overlay est chargé
    await loadLoginOverlay();

    onAuthChange((user) => {
        if (user) {
            // Utilisateur connecté → on masque le login
            hideLoginOverlay();
        } else {
            // Utilisateur non connecté → on affiche le login
            showLoginOverlay();
        }
    });
}
