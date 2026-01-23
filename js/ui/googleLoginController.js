/**
 * PiscisLab — googleLoginController.js
 * -----------------------------------------------------------------------------
 * RÔLE
 * ----
 * - Orchestration UI du login Google
 * - Activer le bouton "Se connecter avec Google"
 * - Appeler signInWithGoogle() au clic
 *
 * CONTRAINTES
 * -----------
 * - AUCUNE logique métier
 * - AUCUNE écriture Firestore
 * - AUCUNE décision d’état (laisse onAuthChange agir)
 * - AUCUNE modification de auth.js
 *
 * DÉPENDANCES
 * -----------
 * - auth.js          → signInWithGoogle()
 *
 * COUCHE
 * ------
 * UI — Orchestration Auth Google
 * -----------------------------------------------------------------------------
 */

import { signInWithGoogle } from "../backend/auth.js";

/**
 * Initialise le contrôleur de login Google.
 * À appeler UNE SEULE FOIS après l’injection du fragment login.
 */
export function initGoogleLoginController() {
    const overlay = document.querySelector(".auth-overlay");
    if (!overlay) {
        console.warn("[googleLoginController] overlay non encore présent");
        return;
    }

    const button = overlay.querySelector(".auth-google-btn");
    if (!button) {
        console.warn("[googleLoginController] bouton Google non trouvé (overlay injecté mais incomplet)");
        return;
    }

    button.disabled = false;
    button.style.cursor = "pointer";
    button.style.opacity = "1";

    button.addEventListener("click", async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("[googleLoginController] erreur Google Auth :", error.code);
            alert("Connexion Google impossible.");
        }
    });
}

