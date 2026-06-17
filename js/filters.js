/**
 * filters.js – Gère les boutons de filtre (Toutes / En cours / Faites)
 *                et la barre de recherche par titre
 *
 * Ce fichier s'occupe de :
 * - Stocker le filtre actif dans une variable globale `currentFilter`
 * - Stocker le terme de recherche dans une variable globale `searchTerm`
 * - Ajouter les écouteurs d'événements sur les boutons de filtre
 * - Ajouter l'écouteur sur la barre de recherche
 * - Mettre à jour la classe 'active' sur le bouton sélectionné
 * - Déclencher le ré-affichage des tâches quand on change de filtre ou qu'on tape
 *
 * Les variables `currentFilter` et `searchTerm` sont utilisées par ui.js.
 */

console.log('filters.js charge !');

/** Le filtre actif : 'all' (toutes), 'completed' (faites) ou 'pending' (en cours) */
let currentFilter = 'all';
console.log('filters.js -> Filtre initial :', currentFilter);

/** Le terme de recherche (texte tapé dans la barre) */
let searchTerm = '';
console.log('filters.js -> Recherche initiale : (vide)');

/**
 * Initialise les boutons de filtre
 * À appeler une seule fois au chargement de la page
 */
function initFilters() {
    console.log('filters.js -> initFilters() : configuration des boutons');
    const buttons = document.querySelectorAll('.filters button');
    console.log('filters.js -> Boutons trouves :', buttons.length);

    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            console.log('filters.js -> Clic sur le bouton :', this.dataset.filter);

            // Retire la classe 'active' de tous les boutons
            buttons.forEach(b => b.classList.remove('active'));

            // Ajoute la classe 'active' au bouton cliqué
            this.classList.add('active');

            // Met à jour le filtre courant
            currentFilter = this.dataset.filter;
            console.log('filters.js -> Nouveau filtre :', currentFilter);

            // Réaffiche les tâches avec le nouveau filtre ET la recherche
            console.log('filters.js -> Appel de renderTodos avec filtre =', currentFilter, 'et search =', searchTerm);
            renderTodos(allTodos, currentFilter, searchTerm);
        });
    });
}

/**
 * Initialise la barre de recherche
 * À appeler une seule fois au chargement de la page
 */
function initSearch() {
    console.log('filters.js -> initSearch() : configuration de la barre de recherche');
    const input = document.getElementById('searchInput');

    if (!input) {
        console.error('filters.js -> ERREUR : element #searchInput introuvable !');
        return;
    }

    console.log('filters.js -> Barre de recherche trouvee');

    input.addEventListener('input', function () {
        // Met à jour le terme de recherche (insensible à la casse)
        const avant = searchTerm;
        searchTerm = this.value.trim().toLowerCase();
        console.log('filters.js -> Recherche :', avant ? `"${avant}"` : '(vide)', '->', searchTerm ? `"${searchTerm}"` : '(vide)');

        // Réaffiche les tâches avec le filtre actuel ET la recherche
        console.log('filters.js -> Appel de renderTodos avec filtre =', currentFilter, 'et search =', searchTerm);
        renderTodos(allTodos, currentFilter, searchTerm);
    });
}
