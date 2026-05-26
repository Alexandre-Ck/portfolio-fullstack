import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// Importation des composants FontAwesome requis
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons'; // Importation directe et propre de l'icône de code

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirection immédiate vers l'accueil après déconnexion
  };

  return (
    <nav className="bg-slate-900 text-white shadow-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* LOGO RE-STYLISÉ AVEC L'ICÔNE DE CODE </> */}
        <Link 
          to="/" 
          className="flex items-center space-x-3 text-xl font-bold tracking-wider text-emerald-400 group"
        >
          {/* L'icône de code demandée avec un effet de transition propre au survol */}
          <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all">
            <FontAwesomeIcon icon={faCode} className="text-emerald-400 w-5 h-5" />
          </div>
          
          
        </Link>

        {/* Liens de Navigation principaux */}
        <div className="flex items-center space-x-6 font-medium">
          <Link to="/" className="hover:text-emerald-400 transition-colors text-sm md:text-base">Accueil</Link>
          <Link to="/projects" className="hover:text-emerald-400 transition-colors text-sm md:text-base">Projets</Link>
          
          {/* Menu conditionnel selon l'état d'authentification de la session */}
          {isAuthenticated ? (
            <>
              <Link 
                to="/admin" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-sm transition-colors shadow-sm"
              >
                Dashboard Admin
              </Link>
              <button 
                onClick={handleLogout}
                className="text-red-400 hover:text-red-500 text-sm font-semibold transition-colors cursor-pointer"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link to="/login" className="text-slate-400 hover:text-white transition-colors text-sm">
              Connexion Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}