/**
 * api.js – Gère la communication avec l'API JSONPlaceholder
 *
 * Ce fichier est le seul qui connaît l'URL de l'API.
 * Les autres fichiers (ui.js, filters.js, main.js) n'ont pas besoin
 * de savoir d'où viennent les données. Cela permet de changer l'API
 * facilement sans toucher au reste du code.
 */

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

console.log('api.js charge !');

/**
 * Récupère toutes les tâches depuis l'API
 * @returns {Promise<Array>} Un tableau d'objets todo
 * @throws {Error} Si la requête échoue ou si le statut HTTP n'est pas OK
 */
async function fetchTodos() {
    console.log('api.js -> debut de fetchTodos()');
    console.log('api.js -> URL appelee :', API_URL);

    const response = await fetch(API_URL);

    console.log('api.js -> Reponse recue ! Statut :', response.status);

    // Si le serveur répond avec un code d'erreur (ex: 404, 500),
    // on lance une exception pour la gestion d'erreur
    if (!response.ok) {
        console.error('api.js -> ERREUR HTTP :', response.status);
        throw new Error(`Erreur HTTP ${response.status}`);
    }

    // On convertit la réponse en JSON et on retourne le tableau
    const data = await response.json();
    console.log('api.js -> Donnees recues ! Nombre de taches :', data.length);
    console.log('api.js -> Premiere tache :', data[0]);
    console.log('api.js -> Derniere tache :', data[data.length - 1]);

    return data;
}
