/**
 * Wrapper personnalisé autour de fetch pour communiquer avec le backend de manière standardisée.
 * @param {string} endpoint - La route API (ex: '/projects')
 * @param {Object} options - Options standard de fetch (method, body, etc.)
 * @returns {Promise<any>} - Les données JSON renvoyées par l'API
 */
export async function apiFetch(endpoint, options = {}) {
  // Construction dynamique de l'URL absolue via les variables d'environnement de Vite
  const baseUrl = import.meta.env.VITE_API_URL;
  const url = `${baseUrl}${endpoint}`;

  // Récupération dynamique du token pour l'ajouter aux headers des requêtes sécurisées
  const token = localStorage.getItem('token');

  // Initialisation ou fusion des en-têtes de requêtes
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Si le token est présent en local, on l'injecte sous le protocole Bearer
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Configuration finale de la requête
  const config = {
    ...options,
    headers,
  };

  // Exécution de la requête réseau
  const response = await fetch(url, config);

  // Gestion spécifique du statut HTTP 204 No Content (ex: après une suppression réussie)
  if (response.status === 204) {
    return null;
  }

  // Si le serveur renvoie un code d'erreur (4xx, 5xx)
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json(); 
    } catch {
      errorData = { message: "Une erreur inattendue est survenue." };
    }
    // On lève une exception contenant le message de l'API pour l'intercepter dans nos composants
    throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
  }

  // Retourne les données formatées
  return response.json();
}