/**
 * PiscisLab — userBootstrap.js
 * -----------------------------------------------------------------------------
 * RÔLE
 * ----
 * - Implémenter USER-001
 * - Créer automatiquement le document Firestore /users/{uid}
 *   au premier login réussi (idempotent)
 *
 * CONTRAINTES
 * -----------
 * - AUCUNE logique UI
 * - AUCUNE logique métier
 * - AUCUNE modification Auth
 * - Création STRICTEMENT technique
 *
 * DÉPENDANCES
 * -----------
 * - auth.js        → onAuthChange()
 * - firebase.js    → firestoreDb
 *
 * COUCHE
 * ------
 * Backend — Bootstrap utilisateur
 * -----------------------------------------------------------------------------
 */

import { doc, getDoc, setDoc, serverTimestamp }
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { onAuthChange } from "./auth.js";
import { firestoreDb } from "./firebase.js";

/**
 * Initialise le bootstrap utilisateur.
 * À appeler UNE SEULE FOIS au démarrage de l’application.
 */
export function initUserBootstrap() {
    onAuthChange(async (user) => {
        if (!user) {
            return;
        }

        const userRef = doc(firestoreDb, "users", user.uid);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
            // USER-001 : idempotence stricte
            return;
        }

        const userDoc = {
            uid: user.uid,
            authProvider: user.providerData?.[0]?.providerId || "unknown",
            createdAt: serverTimestamp(),
            version: "v1"
        };

        await setDoc(userRef, userDoc);
    });
}
