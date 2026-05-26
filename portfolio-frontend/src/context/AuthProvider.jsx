import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { isTokenValid } from "../utils/jwt.utils";

export function AuthProvider({ children }) {
  // Récupération initiale du token depuis le stockage local du navigateur
  const storedToken = localStorage.getItem("token");
  
  // Sécurité proactive : Si le token est corrompu ou expiré au chargement, on nettoie immédiatement
  if (storedToken && !isTokenValid(storedToken)) {
    localStorage.removeItem("token");
  }

  // État local de l'authentification (vrai si un token valide existe)
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!storedToken && isTokenValid(storedToken)
  );

  /**
   * Enregistre le token après un login réussi et met à jour le state global
   * @param {string} token 
   */
  function login(token) {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  }

  /**
   * Déconnexion complète de l'utilisateur et nettoyage du stockage
   */
  function logout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {/* On injecte l'état et les fonctions dans les composants enfants */}
      {children}
    </AuthContext.Provider>
  );
}