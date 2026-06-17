/**
 * todoManager.js – Ajout, suppression et bascule de tâches en mémoire
 *
 * ATTENTION : les données ne sont PAS sauvegardées. Si tu actualises
 * la page, les tâches ajoutees/supprimees disparaissent et on recharge
 * depuis l'API.
 *
 * Ce fichier agit directement sur la variable globale `allTodos`
 * (declaree dans main.js). Il utilise `renderTodos()` et `updateStats()`
 * (declarees dans ui.js) pour mettre a jour l'affichage apres chaque action.
 */

console.log('todoManager.js charge !');

/**
 * Compteur interne pour generer des IDs uniques aux nouvelles taches.
 * On commence a 1000 pour ne pas entrer en conflit avec les IDs de l'API (1 a 200).
 * Chaque fois qu'on ajoute une tache, on incremente ce compteur.
 */
let nextId = 1000;

/**
 * Ajoute une nouvelle tache dans allTodos
 *
 * @param {string} title – Le titre de la nouvelle tache
 */
function addTodo(title) {
    console.log('todoManager.js -> addTodo() appele avec titre :', title);

    // On cree un objet tache avec la meme structure que celles de l'API
    const newTodo = {
        userId: 1,
        id: nextId,
        title: title,
        completed: false
    };

    console.log('todoManager.js -> Nouvelle tache creee :', newTodo);

    // On incremente le compteur d'ID pour la prochaine tache
    nextId++;
    console.log('todoManager.js -> Prochain ID disponible :', nextId);

    // On ajoute la tache au debut du tableau (pour la voir apparaitre en haut)
    allTodos.unshift(newTodo);
    console.log('todoManager.js -> Tache ajoutee dans allTodos. Nouveau total :', allTodos.length);

    // On met a jour les statistiques (total, faites, en cours)
    updateStats(allTodos);

    // On reaffiche la liste avec le filtre et la recherche actuels
    renderTodos(allTodos, currentFilter, searchTerm);

    console.log('todoManager.js -> Affichage mis a jour !');
}

/**
 * Supprime une tache de allTodos par son ID
 *
 * @param {number} id – L'ID de la tache a supprimer
 */
function deleteTodo(id) {
    console.log('todoManager.js -> deleteTodo() appele pour ID :', id);

    // On cherche la tache avant de la supprimer (pour le log)
    const todoToDelete = allTodos.find(t => t.id === id);
    console.log('todoManager.js -> Tache trouvee :', todoToDelete);

    // On filtre le tableau : on garde tout SAUF la tache avec cet ID
    const avant = allTodos.length;
    allTodos = allTodos.filter(t => t.id !== id);
    console.log('todoManager.js -> Tache supprimee. Avant :', avant, 'Apres :', allTodos.length);

    // On met a jour les statistiques (total, faites, en cours)
    updateStats(allTodos);

    // On reaffiche la liste avec le filtre et la recherche actuels
    renderTodos(allTodos, currentFilter, searchTerm);

    console.log('todoManager.js -> Affichage mis a jour !');
}

/**
 * Bascule l'etat completed d'une tache (fait / en cours)
 *
 * @param {number} id – L'ID de la tache a basculer
 */
function toggleTodo(id) {
    console.log('todoManager.js -> toggleTodo() appele pour ID :', id);

    // On cherche la tache dans allTodos
    const todo = allTodos.find(t => t.id === id);
    if (!todo) {
        console.error('todoManager.js -> Tache introuvable pour ID :', id);
        return;
    }

    // On inverse l'etat completed
    todo.completed = !todo.completed;
    console.log('todoManager.js -> Tache mise a jour :', todo);

    // On met a jour les statistiques (total, faites, en cours)
    updateStats(allTodos);

    // On reaffiche la liste avec le filtre et la recherche actuels
    renderTodos(allTodos, currentFilter, searchTerm);

    console.log('todoManager.js -> Affichage mis a jour !');
}