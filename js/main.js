/**
 * PiscisLab — main.js
 * -----------------------------------------------------------------------------
 * RÔLE
 * ----
 * Bootstrap Auth / UI
 *
 * - Initialise l’overlay login
 * - Branche le login email / mot de passe
 * - Branche le login Google
 * - Écoute l’état Auth global
 * - Déclenche USER-001 (création /users/{uid})
 *
 * CONTRAINTES
 * -----------
 * - AUCUNE logique métier
 * - AUCUNE UI directe
 * - AUCUNE logique Firebase ici
 *
 * COUCHE
 * ------
 * Bootstrap applicatif
 * -----------------------------------------------------------------------------
 */

import { loadLoginOverlay } from "./ui/loginOverlay.js";
import { initLoginController } from "./ui/loginController.js";
import { initGoogleLoginController } from "./ui/googleLoginController.js";
import { initAuthStateController } from "./ui/authStateController.js";
import { initUserBootstrap } from "./backend/userBootstrap.js";
import { initPasswordToggleController } from "./ui/passwordToggleController.js";
import { loadAuthStatus } from "./ui/authStatusLoader.js";
import { initAuthStatusController } from "./ui/authStatusController.js";
import { initSignupController } from "./ui/signupController.js";
import { initAuthViewToggle } from "./ui/authViewToggle.js";
import { initPasswordToggle } from "./ui/passwordToggle.js";

async function bootstrapApp() {
    // 1. Charger et injecter l’overlay login
    await loadLoginOverlay();

    // 2. Brancher les contrôleurs UI (le DOM existe maintenant)
    initLoginController();
    initGoogleLoginController();

    // 3. Écouter l’état Auth (affiche / masque login)
    initAuthStateController();

    // 4. USER-001 : création automatique /users/{uid}
    initUserBootstrap();

    initPasswordToggleController();

    // Badge état connecté
    await loadAuthStatus();
    initAuthStatusController();

    initSignupController();
    initAuthViewToggle();
    initPasswordToggle();


}


// Lancement explicite
bootstrapApp();
