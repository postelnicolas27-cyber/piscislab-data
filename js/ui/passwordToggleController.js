/**
 * PiscisLab — passwordToggleController.js
 * -----------------------------------------------------------------------------
 * RÔLE
 * ----
 * - Gérer l’affichage / masquage du mot de passe (œil)
 *
 * CONTRAINTES
 * -----------
 * - AUCUNE logique Auth
 * - AUCUNE donnée
 * - AUCUNE dépendance Firebase
 *
 * COUCHE
 * ------
 * UI — Micro-interaction
 * -----------------------------------------------------------------------------
 */

export function initPasswordToggleController() {
    const toggle = document.querySelector(".password-toggle");
    const input = document.querySelector('input[name="password"]');

    if (!toggle || !input) {
        return;
    }

    toggle.addEventListener("click", () => {
        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        toggle.textContent = isHidden ? "🙈" : "👁️";
    });
}
