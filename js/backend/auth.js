/**
 * Firebase Authentication — socle
 * --------------------------------
 * Rôle :
 * - Fournir une API minimale d'authentification
 * - Être importé par des modules de test ou futurs modules métier
 *
 * Contraintes :
 * - Pas de Firestore
 * - Pas d’UI
 * - Pas de logique métier
 *
 * Référence :
 * docs/CHOIX_TECHNIQUES_LOCAUX.md
 */

import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged }
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { firebaseApp } from "./firebase.js";

// Initialisation Auth Firebase
const auth = getAuth(firebaseApp);

/**
 * Connexion utilisateur (email / mot de passe)
 */
function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Déconnexion utilisateur
 */
function signOutUser() {
    return signOut(auth);
}

/**
 * Observer les changements d’état d’authentification
 */
function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}

export {
    auth,
    signIn,
    signOutUser,
    onAuthChange
};
