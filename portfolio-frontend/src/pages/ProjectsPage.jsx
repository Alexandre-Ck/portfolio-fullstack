import { useState, useEffect } from 'react';
import { apiFetch } from '../hooks/useFetch';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Appel asynchrone via notre utilitaire standardisé
        const data = await apiFetch('/projects');
        setProjects(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();// ca va lancer la requete  et afficher les porjet sur cette page
  }, []);

  // ÉTAT 1 : Chargement asynchrone
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-emerald-400 font-mono tracking-widest animate-pulse">CHARGEMENT DES PROJETS EN COURS...</p>
      </div>
    );
  }

  // ÉTAT 2 : Récupération en échec (ex: Backend éteint)
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-6 rounded-xl inline-block">
          <p className="font-bold">Erreur de chargement :</p>
          <p className="text-sm font-mono mt-1">{error}</p>
        </div>
      </div>
    );
  }

  // ÉTAT 3 : Requête réussie
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-white">Mes Réalisations</h2>
        <p className="text-slate-400 mt-2">Explorez les architectures logicielles et les interfaces que j'ai conçues.</p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16 bg-slate-800/50 rounded-xl border border-slate-800">
          <p className="text-slate-400">Aucun projet n'a encore été publié.</p>
        </div>
      ) : (
        // Grille adaptative CSS Grid (1 col sur mobile, 2 sur tablette, 3 sur desktop)
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}