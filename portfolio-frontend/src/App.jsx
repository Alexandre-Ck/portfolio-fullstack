import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// Importation des composants structurels globaux
import Navbar from './components/Navbar';

// Importation des pages publiques (Visiteurs)
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import LoginPage from './pages/LoginPage';

// Importation des pages privées (Administration sécurisée)
import AdminPage from './pages/admin/AdminPage';
import CreateProjectPage from './pages/admin/CreateProjectPage';
import EditProjectPage from './pages/admin/EditProjectPage';

/**
 * Composant de protection de route (Guard)
 * Intercepte l'accès, examine l'état du Contexte d'authentification et redirige si nécessaire.
 */
function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  
  // Si l'utilisateur n'est pas identifié, on le redirige vers l'écran de login
  // replace={true} efface la tentative d'accès de l'historique de navigation pour éviter les boucles de retour arrière
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      {/* Barre de navigation statique supérieure */}
      <Navbar />

      {/* Zone d'affichage dynamique des composants de page */}
      <main className="flex-grow">
        <Routes>
          {/* CONFIGURATION DES ROUTES PUBLIQUES */}
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* CONFIGURATION DES ROUTES PRIVÉES ET SÉCURISÉES VIA PRIVATE_ROUTE */}
          <Route path="/admin" element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          } />
          <Route path="/admin/projects/new" element={
            <PrivateRoute>
              <CreateProjectPage />
            </PrivateRoute>
          } />
          <Route path="/admin/projects/:id/edit" element={
            <PrivateRoute>
              <EditProjectPage />
            </PrivateRoute>
          } />

          {/* ROUTE DE SECOURS (FALLBACK) - Redirection automatique en cas d'URL inconnue */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Pied de page statique */}
      <footer className="border-t border-slate-800 bg-slate-950 text-center py-6 text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} Alexandre CHIKHAOUI - Tous droits réservés.
      </footer>
    </div>
  );
}