/**
 * PiscisLab — loginController.js
 * -----------------------------------------------------------------------------
 * RÔLE
 * ----
 * - Orchestration du login email / mot de passe
 * - Relier le formulaire UI à Firebase Auth via signIn()
 *
 * CONTRAINTES
 * -----------
 * - AUCUNE logique métier
 * - AUCUNE modification de auth.js
 * - AUCUNE navigation
 * - Gestion d’erreur MINIMALE
 *
 * DÉPENDANCES
 * -----------
 * - auth.js          → signIn()
 * - loginOverlay.js  → hideLoginOverlay()
 *
 * COUCHE
 * ------
 * UI — Orchestration Auth
 * -----------------------------------------------------------------------------
 */

import { signIn } from "../backend/auth.js";
import { hideLoginOverlay } from "./loginOverlay.js";

/**
 * Initialise le contrôleur de login.
 * À appeler UNE SEULE FOIS après l’injection du fragment login.
 */
export function initLoginController() {
    const overlay = document.querySelector(".auth-overlay");
    if (!overlay) {
        throw new Error("[loginController] .auth-overlay introuvable");
    }

    const form = overlay.querySelector("form");
    if (!form) {
        throw new Error("[loginController] formulaire login introuvable");
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const emailInput = form.querySelector('input[name="email"]');
        const passwordInput = form.querySelector('input[name="password"]');

        if (!emailInput || !passwordInput) {
            console.error("[loginController] champs email / password manquants");
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            console.warn("[loginController] email ou mot de passe vide");
            return;
        }

        try {
            await signIn(email, password);

            // Succès : on ferme simplement l’overlay
            hideLoginOverlay();
        } catch (error) {
            // Gestion minimale d’erreur (console uniquement)
            console.error("[loginController] erreur de connexion :", error.code);
            alert("Connexion impossible. Vérifie tes identifiants.");
        }
    });
}
