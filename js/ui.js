/**
 * ui.js – Gère l'affichage et les mises à jour du DOM
 *
 * Ce fichier contient toutes les fonctions qui modifient la page HTML :
 * - Afficher le chargement (spinner)
 * - Afficher les tâches dans la liste
 * - Mettre à jour les statistiques (total, faites, en cours)
 * - Afficher un message d'erreur
 *
 * Il dépend de la variable globale `allTodos` (définie dans main.js)
 * et de `currentFilter` (définie dans filters.js).
 */

console.log('ui.js charge !');

/**
 * Affiche le spinner de chargement dans la zone de contenu
 */
function showLoading() {
    console.log('ui.js -> showLoading() : affichage du spinner');
    const contentEl = document.getElementById('content');
    contentEl.innerHTML = `
        <div class="loading">
            <div class="loader"></div>
            Chargement des tâches...
        </div>
    `;
}

/**
 * Met à jour les statistiques (total, faites, en cours)
 * @param {Array} todos – Toutes les tâches
 */
function updateStats(todos) {
    console.log('ui.js -> updateStats()');
    const total = todos.length;
    const done = todos.filter(t => t.completed).length;
    const pending = total - done;

    console.log(`ui.js -> Stats : ${total} total, ${done} faites, ${pending} en cours`);

    document.getElementById('totalCount').textContent = total;
    document.getElementById('doneCount').textContent = done;
    document.getElementById('pendingCount').textContent = pending;
}

/**
 * Affiche un message d'erreur avec un bouton "Réessayer"
 * @param {string} message – Le message d'erreur à afficher
 */
function showError(message) {
    console.error('ui.js -> showError() :', message);
    const contentEl = document.getElementById('content');
    contentEl.innerHTML = `
        <div class="error-msg">
            ❌ Erreur : ${message}<br>
            <button onclick="fetchTodos()">Réessayer</button>
        </div>
    `;
}

/**
 * Échappe les caractères HTML pour éviter les injections XSS
 * @param {string} text – Texte brut
 * @returns {string} Texte sécurisé pour le HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Affiche la liste des tâches filtrées dans le DOM
 * @param {Array} todos – Le tableau complet des tâches
 * @param {string} filter – Le filtre actif : 'all', 'completed' ou 'pending'
 * @param {string} search – Le terme de recherche (optionnel)
 */
function renderTodos(todos, filter, search = '') {
    console.log('ui.js -> renderTodos() appele');
    console.log('ui.js -> Filtre :', filter, '| Recherche :', search ? `"${search}"` : '(aucune)');
    console.log('ui.js -> Nombre total de taches disponibles :', todos.length);

    const contentEl = document.getElementById('content');

    // Étape 1 : appliquer le filtre (toutes / en cours / faites)
    let filtered;
    if (filter === 'completed') {
        filtered = todos.filter(t => t.completed);
        console.log('ui.js -> Filtre "completed" applique :', filtered.length, 'taches');
    } else if (filter === 'pending') {
        filtered = todos.filter(t => !t.completed);
        console.log('ui.js -> Filtre "pending" applique :', filtered.length, 'taches');
    } else {
        filtered = todos;
        console.log('ui.js -> Filtre "all" : toutes les', filtered.length, 'taches');
    }

    // Étape 2 : appliquer la recherche par titre (si on a tapé quelque chose)
    if (search !== '') {
        const avantRecherche = filtered.length;
        filtered = filtered.filter(t =>
            t.title.toLowerCase().includes(search)
        );
        console.log('ui.js -> Recherche par titre :', avantRecherche, '->', filtered.length, 'taches');
    }

    // Étape 3 : mettre à jour le compteur "Filtre : X" dans les stats
    document.getElementById('shownCount').textContent = filtered.length;
    console.log('ui.js -> Compteur "Filtre" mis a jour :', filtered.length);

    // Si aucune tâche après filtrage, on l'indique
    if (filtered.length === 0) {
        console.log('ui.js -> Aucune tache a afficher');
        contentEl.innerHTML = `
            <div class="loading" style="color: #999;">
                Aucune tâche à afficher.
            </div>
        `;
        return;
    }

    // Construction de la liste HTML
    const ul = document.createElement('ul');
    ul.className = 'todo-list';

    filtered.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item${todo.completed ? ' completed' : ''}`;

        // Si on cherche quelque chose, on surligne le mot trouvé dans le titre
        let titleHtml = escapeHtml(todo.title);
        if (search !== '') {
            const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            titleHtml = titleHtml.replace(regex, '<mark>$1</mark>');
            console.log('ui.js -> Titre surligne :', todo.title, '->', titleHtml);
        }

        li.innerHTML = `
            <span class="todo-id">#${todo.id}</span>
            <input type="checkbox" class="todo-checkbox"
                   ${todo.completed ? 'checked' : ''} disabled>
            <span class="todo-title">${titleHtml}</span>
            <span class="todo-status ${todo.completed ? 'done' : 'pending'}">
                ${todo.completed ? 'Fait' : 'En cours'}
            </span>
            <button class="todo-delete-btn" onclick="deleteTodo(${todo.id})">x</button>
        `;

        ul.appendChild(li);
    });

    // Remplacement du contenu par la nouvelle liste
    contentEl.innerHTML = '';
    contentEl.appendChild(ul);

    console.log('ui.js -> renderTodos() termine,', filtered.length, 'taches affichees');
}
