/**
 * PiscisLab — loginOverlay.js
 * -----------------------------------------------------------------------------
 * RÔLE
 * ----
 * - Charger les fragments HTML login + signup
 * - Les injecter dans #auth-overlay-root
 * - Exposer show / hide (login uniquement)
 *
 * AUCUN HTML ICI
 * ----------------------------------------------------------------------------- */

const OVERLAY_ROOT_ID = "auth-overlay-root";
const LOGIN_FRAGMENT_URL = "/web/fragments/login-overlay.html";
const SIGNUP_FRAGMENT_URL = "/web/fragments/signup-overlay.html";

let loginOverlayElement = null;
let signupOverlayElement = null;

export async function loadLoginOverlay() {
    const root = document.getElementById(OVERLAY_ROOT_ID);
    if (!root) {
        throw new Error("[loginOverlay] #auth-overlay-root introuvable");
    }

    // Déjà chargé
    if (loginOverlayElement) {
        return loginOverlayElement;
    }

    // 1) Inject login
    const loginResponse = await fetch(LOGIN_FRAGMENT_URL);
    if (!loginResponse.ok) {
        throw new Error("[loginOverlay] Échec chargement fragment login");
    }
    const loginHtml = await loginResponse.text();
    root.insertAdjacentHTML("beforeend", loginHtml);

    // 2) Inject signup
    const signupResponse = await fetch(SIGNUP_FRAGMENT_URL);
    if (!signupResponse.ok) {
        throw new Error("[loginOverlay] Échec chargement fragment signup");
    }
    const signupHtml = await signupResponse.text();
    root.insertAdjacentHTML("beforeend", signupHtml);

    // 3) Récupérer les overlays
    loginOverlayElement = root.querySelector(".auth-overlay-login");
    if (!loginOverlayElement) {
        throw new Error("[loginOverlay] .auth-overlay-login introuvable");
    }

    signupOverlayElement = root.querySelector(".auth-overlay-signup");
    if (!signupOverlayElement) {
        throw new Error("[loginOverlay] .auth-overlay-signup introuvable");
    }

    // 4) État initial : tout caché (login piloté par authStateController)
    loginOverlayElement.style.display = "none";
    loginOverlayElement.setAttribute("aria-hidden", "true");

    signupOverlayElement.style.display = "none";
    signupOverlayElement.setAttribute("aria-hidden", "true");

    return loginOverlayElement;
}

export function showLoginOverlay() {
    if (!loginOverlayElement) return;
    loginOverlayElement.style.display = "block";
    loginOverlayElement.setAttribute("aria-hidden", "false");
}

export function hideLoginOverlay() {
    if (!loginOverlayElement) return;
    loginOverlayElement.style.display = "none";
    loginOverlayElement.setAttribute("aria-hidden", "true");
}
