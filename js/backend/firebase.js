/**
 * Firebase backend initialization
 * --------------------------------
 * Scope:
 * - Firebase app initialization
 * - Firestore instance exposure
 *
 * Constraints:
 * - No authentication
 * - No data read/write
 * - No business logic
 *
 * Reference:
 * docs/CHOIX_TECHNIQUES_LOCAUX.md
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * Firebase configuration
 * NOTE:
 * These values must be replaced with real project credentials
 * during environment setup.
 */
const firebaseConfig = {
    apiKey: "TO_BE_DEFINED",
    authDomain: "TO_BE_DEFINED",
    projectId: "TO_BE_DEFINED",
    storageBucket: "TO_BE_DEFINED",
    messagingSenderId: "TO_BE_DEFINED",
    appId: "TO_BE_DEFINED"
};

// Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const firestoreDb = getFirestore(firebaseApp);

// Explicit exports
export {
    firebaseApp,
    firestoreDb
};
