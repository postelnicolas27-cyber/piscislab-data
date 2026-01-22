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
    apiKey: "AIzaSyDlbCaLrJYjg-VumgKXP185rFd6NbBiTGg",
    authDomain: "piscislab-28b38.firebaseapp.com",
    projectId: "piscislab-28b38",
    storageBucket: "piscislab-28b38.appspot.com",
    messagingSenderId: "936910312028",
    appId: "1:936910312028:web:db1c6105e244023a7f8c99"
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
