/**
 * PiscisLab — authViewToggle.js
 * -----------------------------------------------------------------------------
 * RÔLE
 * ----
 * - Bascule UI entre login et signup
 *
 * CONTRAINTES
 * -----------
 * - UI uniquement
 * - Aucune Auth
 * - Aucune donnée
 * -----------------------------------------------------------------------------
 */

export function initAuthViewToggle() {
    const loginOverlay = document.querySelector(".auth-overlay-login");
    const signupOverlay = document.querySelector(".auth-overlay-signup");


    if (!loginOverlay || !signupOverlay) {
        console.warn("[authViewToggle] overlays introuvables");
        return;
    }

    const toSignup = loginOverlay.querySelector(".auth-link-signup");
    const toLogin = signupOverlay.querySelector(".auth-link-login");

    if (toSignup) {
        toSignup.addEventListener("click", (e) => {
            e.preventDefault();
            loginOverlay.style.display = "none";
            signupOverlay.style.display = "block";
        });
    } else {
        console.warn("[authViewToggle] lien auth-link-signup introuvable");
    }

    if (toLogin) {
        toLogin.addEventListener("click", (e) => {
            e.preventDefault();
            signupOverlay.style.display = "none";
            loginOverlay.style.display = "block";
        });
    } else {
        console.warn("[authViewToggle] lien auth-link-login introuvable");
    }
}

