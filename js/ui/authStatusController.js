/**
 * PiscisLab — authStatusController.js
 * -----------------------------------------------------------------------------
 * RÔLE
 * ----
 * - Afficher / masquer le badge "Connecté"
 * - Gérer la déconnexion utilisateur
 *
 * CONTRAINTES
 * -----------
 * - AUCUNE logique métier
 * - AUCUNE donnée utilisateur affichée
 * - AUCUNE écriture Firestore
 *
 * DÉPENDANCES
 * -----------
 * - auth.js → onAuthChange(), signOutUser()
 *
 * COUCHE
 * ------
 * UI — État Auth minimal
 * -----------------------------------------------------------------------------
 */

import { onAuthChange, signOutUser } from "../backend/auth.js";

let statusElement = null;
let logoutButton = null;

/**
 * Initialise le badge d’état Auth.
 * À appeler UNE SEULE FOIS au démarrage.
 */
export function initAuthStatusController() {
    statusElement = document.querySelector(".auth-status");
    if (!statusElement) {
        console.warn("[authStatusController] badge auth-status introuvable");
        return;
    }

    logoutButton = statusElement.querySelector(".auth-logout-btn");
    if (!logoutButton) {
        console.warn("[authStatusController] bouton déconnexion introuvable");
        return;
    }

    logoutButton.addEventListener("click", async () => {
        try {
            await signOutUser();
        } catch (error) {
            console.error("[authStatusController] erreur déconnexion :", error);
        }
    });

    onAuthChange((user) => {
        if (user) {
            statusElement.style.display = "flex";
        } else {
            statusElement.style.display = "none";
        }
    });
}
