/**
 * passwordToggle.js
 * -----------------
 * Rôle :
 * - Gérer l’affichage / masquage des champs mot de passe
 * - UI uniquement
 */

export function initPasswordToggle() {
    const toggles = document.querySelectorAll(".toggle-password");

    toggles.forEach((btn) => {
        btn.addEventListener("click", () => {
            const input = btn.previousElementSibling;
            if (!input) return;

            if (input.type === "password") {
                input.type = "text";
                btn.textContent = "🙈";
            } else {
                input.type = "password";
                btn.textContent = "👁️";
            }
        });
    });
}
