/**
 * PiscisLab — authStatusLoader.js
 * -----------------------------------------------------------------------------
 * RÔLE
 * ----
 * - Charger et injecter le fragment auth-status.html
 *
 * CONTRAINTES
 * -----------
 * - HTML only (fragment)
 * - Aucune logique Auth ici
 *
 * COUCHE
 * ------
 * UI — Loader
 * -----------------------------------------------------------------------------
 */

const STATUS_FRAGMENT_URL = "/web/fragments/auth-status.html";

let isLoaded = false;

export async function loadAuthStatus() {
    if (isLoaded) return;

    const response = await fetch(STATUS_FRAGMENT_URL);
    if (!response.ok) {
        throw new Error("[authStatusLoader] échec chargement auth-status.html");
    }

    const html = await response.text();
    document.body.insertAdjacentHTML("beforeend", html);

    isLoaded = true;
}
