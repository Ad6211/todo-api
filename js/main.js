/**
 * main.js – Point d'entrée de l'application
 *
 * Ce fichier orchestre tous les autres modules :
 * - Il déclare la variable globale `allTodos` qui contient toutes les tâches
 * - Il définit la fonction `loadTodos()` qui enchaîne : chargement → API → affichage
 * - Il initialise les filtres au démarrage
 * - Il lance le chargement initial des tâches
 *
 * Ordre d'import dans index.html (important) :
 * 1. api.js    → fournit fetchTodos()
 * 2. ui.js     → fournit showLoading(), updateStats(), renderTodos(), showError()
 * 3. filters.js → fournit initFilters(), currentFilter
 * 4. main.js   → utilise tout ce qui précède
 */

console.log('main.js charge !');
console.log('main.js -> Debut de l\'application Todo List');

/** Variable globale contenant toutes les tâches récupérées depuis l'API */
let allTodos = [];
console.log('main.js -> Variable allTodos initialisee (tableau vide)');

/**
 * Fonction principale : charge les tâdepuis l'API et les affiche
 * 1. Affiche le spinner de chargement
 * 2. Appelle l'API
 * 3. Si succès → stocke les données, met à jour les stats, affiche la liste
 * 4. Si erreur → affiche un message d'erreur avec bouton "Réessayer"
 */
async function loadTodos() {
    console.log('main.js -> loadTodos() demarre');

    // Étape 1 : afficher le spinner
    console.log('main.js -> Etape 1 : affichage du spinner');
    showLoading();

    try {
        // Étape 2 : appel à l'API
        console.log('main.js -> Etape 2 : appel a fetchTodos()');
        allTodos = await fetchTodos();
        console.log('main.js -> Donnees stockees dans allTodos :', allTodos.length, 'taches');

        // Étape 3 : mise à jour des statistiques et affichage
        console.log('main.js -> Etape 3 : updateStats() + renderTodos()');
        updateStats(allTodos);
        renderTodos(allTodos, currentFilter, searchTerm);
    } catch (error) {
        // Étape 4 : gestion d'erreur
        console.error('main.js -> Etape 4 : ERREUR attrapee :', error.message);
        showError(error.message);
    }

    console.log('main.js -> loadTodos() termine');
}

console.log('main.js -> Initialisation en cours...');

// Au chargement de la page :
// 1. On initialise les boutons de filtre
console.log('main.js -> Etape 1 : initFilters()');
initFilters();

// 2. On initialise la barre de recherche
console.log('main.js -> Etape 2 : initSearch()');
initSearch();

// 3. On lance le chargement des tâches
console.log('main.js -> Etape 3 : loadTodos()');
loadTodos();

console.log('main.js -> Initialisation terminee, en attente des donnees...');
