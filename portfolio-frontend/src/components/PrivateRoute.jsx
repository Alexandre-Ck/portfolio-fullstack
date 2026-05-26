import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  // Si l'utilisateur est authentifié, on affiche la page demandée (children)
  // Sinon, on le redirige vers /login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}