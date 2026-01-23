/**
 * Signup UI Controller
 * -------------------
 * Rôle :
 * - Gérer la création de compte email / mot de passe
 * - Connecter l’UI signup à Firebase Auth
 *
 * Couche :
 * UI — Auth
 */

import { signUp } from "../backend/auth.js";

function initSignupController() {
    const overlay = document.querySelector(".auth-overlay-signup");
    if (!overlay) return;

    const form = overlay.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = form.email.value.trim();
        const password = form.password.value;
        const passwordConfirm = form.passwordConfirm.value;

        if (!email || !password) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        if (password !== passwordConfirm) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            await signUp(email, password);
            // Succès :
            // - utilisateur connecté automatiquement
            // - authStateController prend le relais
        } catch (error) {
            console.error("[signupController]", error);
            alert(error.message);
        }
    });
}

export { initSignupController };
