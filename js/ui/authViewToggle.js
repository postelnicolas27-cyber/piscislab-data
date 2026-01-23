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
    const resetOverlay = document.querySelector(".auth-overlay-reset");


    if (!loginOverlay) {
        console.warn("[authViewToggle] login overlay introuvable");
        return;
    }

    const toReset = loginOverlay.querySelector(".auth-link-reset");

    const toSignup = loginOverlay.querySelector(".auth-link-signup");
    const toLogin = signupOverlay
        ? signupOverlay.querySelector(".auth-link-login")
        : null;


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
    if (toReset && resetOverlay) {
        toReset.addEventListener("click", (e) => {
            e.preventDefault();
            loginOverlay.style.display = "none";
            signupOverlay.style.display = "none";
            resetOverlay.style.display = "block";
        });
    }

    if (resetOverlay) {
        const backToLogin = resetOverlay.querySelector(".auth-link-login");
        if (backToLogin) {
            backToLogin.addEventListener("click", (e) => {
                e.preventDefault();
                resetOverlay.style.display = "none";
                loginOverlay.style.display = "block";
            });
        }
    }

}

