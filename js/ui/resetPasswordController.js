/**
 * PiscisLab — resetPasswordController.js
 * -----------------------------------------------------------------------------
 * RÔLE
 * ----
 * - Gérer la demande de réinitialisation du mot de passe (email)
 *
 * CONTRAINTES
 * -----------
 * - UI uniquement
 * - Aucune logique métier
 * - Aucune donnée persistée
 *
 * DÉPENDANCES
 * -----------
 * - auth.js → resetPassword()
 *
 * COUCHE
 * ------
 * UI — Auth
 * -----------------------------------------------------------------------------
 */

import { resetPassword } from "../backend/auth.js";

export function initResetPasswordController() {
    const overlay = document.querySelector(".auth-overlay-reset");
    if (!overlay) return;

    const form = overlay.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = form.email.value.trim();
        if (!email) {
            alert("Veuillez entrer votre adresse email.");
            return;
        }

        try {
            await resetPassword(email);
            alert("📨 Un email de réinitialisation a été envoyé.");
            form.reset();
        } catch (error) {
            console.error("[resetPasswordController]", error);
            alert(error.message || "Erreur lors de l’envoi de l’email.");
        }
    });
}
