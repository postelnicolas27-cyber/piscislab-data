/**
 * =============================================================================
 * PiscisLab — map.js
 * =============================================================================
 *
 * RÔLE DU FICHIER
 * ---------------
 * Ce fichier contient la logique MINIMALE de la carte centrale de PiscisLab.
 *
 * Il est volontairement limité à :
 * - l'initialisation de la carte Leaflet
 * - l'affichage d'un fond de carte neutre
 * - le centrage de la carte sur la position GPS de l'utilisateur
 *
 * CE FICHIER NE FAIT PAS :
 * ----------------------
 * - aucune gestion de données métier
 * - aucune gestion de couches applicatives
 * - aucun stockage (localStorage, backend, etc.)
 * - aucune logique de décision
 * - aucune interface utilisateur secondaire
 *
 * Il constitue le SOCLE technique sur lequel tout le reste sera construit.
 *
 * =============================================================================
 *
 * DÉPENDANCES
 * -----------
 * - Leaflet doit être chargé AVANT ce fichier
 * - Le conteneur HTML avec l'id `map` doit exister dans le DOM
 *
 * =============================================================================
 *
 * PHILOSOPHIE
 * -----------
 * - Code volontairement simple
 * - Facile à lire
 * - Facile à déplacer
 * - Facile à remplacer
 *
 * Toute fonctionnalité future devra être :
 * - ajoutée dans un fichier séparé
 * - ou appelée explicitement depuis ici
 *
 * =============================================================================
 */

/**
 * Fonction auto-exécutée (IIFE)
 * ---------------------------------------------------------------------------
 * Objectifs :
 * - éviter toute pollution de l'espace global (window)
 * - garantir que le code s'exécute immédiatement
 * - encapsuler la logique de la carte dans un scope isolé
 *
 * Ce choix facilite :
 * - la maintenance
 * - l'évolution
 * - le refactor futur
 */
(function () {

    /**
     * -------------------------------------------------------------------------
     * INITIALISATION DE LA CARTE
     * -------------------------------------------------------------------------
     *
     * La carte est initialisée avec :
     * - une position neutre temporaire
     * - un niveau de zoom large
     *
     * Cette position est :
     * - arbitraire
     * - non contractuelle
     * - remplacée dès que le GPS est disponible
     *
     * IMPORTANT :
     * - Aucun calcul métier ici
     * - Aucun état utilisateur stocké
     */
    const map = L.map('map').setView([48.8566, 2.3522], 5);

    /**
     * -------------------------------------------------------------------------
     * FOND DE CARTE
     * -------------------------------------------------------------------------
     *
     * Utilisation d'OpenStreetMap comme fond neutre :
     * - libre
     * - standard
     * - sans logique métier
     *
     * Le fond de carte est :
     * - interchangeable
     * - non figé
     *
     * Toute évolution (autre provider, styles, etc.)
     * devra être isolée dans un fichier dédié.
     */
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    /**
     * -------------------------------------------------------------------------
     * GÉOLOCALISATION UTILISATEUR (GPS)
     * -------------------------------------------------------------------------
     *
     * Objectif :
     * - centrer la carte sur la position réelle de l'utilisateur
     *
     * Contraintes volontaires :
     * - aucune sauvegarde de la position
     * - aucune transmission
     * - aucun suivi en temps réel
     *
     * La position est utilisée UNIQUEMENT
     * pour améliorer l'expérience visuelle immédiate.
     */

    if ('geolocation' in navigator) {

        /**
         * Récupération ponctuelle de la position GPS
         * -------------------------------------------------------------
         * - demande d'autorisation navigateur
         * - succès : recentrage de la carte
         * - échec : fallback silencieux
         */
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                /**
                 * Recentrage de la carte sur la position utilisateur
                 * --------------------------------------------------
                 * Aucun marqueur n'est ajouté volontairement :
                 * - la carte reste "vide"
                 * - aucune donnée utilisateur n'est matérialisée
                 */
                map.setView([lat, lng], 13);
            },
            (error) => {
                /**
                 * Échec de la géolocalisation
                 * --------------------------------------------------
                 * Cas possibles :
                 * - autorisation refusée
                 * - GPS indisponible
                 * - erreur système
                 *
                 * Comportement volontaire :
                 * - aucune alerte bloquante
                 * - aucun fallback complexe
                 * - la carte reste fonctionnelle
                 */
                console.warn('GPS indisponible ou refusé', error);
            }
        );

    } else {
        /**
         * Cas rare : navigateur sans support de la géolocalisation
         * ---------------------------------------------------------
         * La carte reste utilisable sans GPS.
         */
        console.warn('Géolocalisation non supportée par le navigateur');
    }

})();
