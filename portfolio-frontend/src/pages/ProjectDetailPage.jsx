import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiFetch } from '../hooks/useFetch';

export default function ProjectDetailPage() {
  const { id } = useParams(); // Capture de la variable d'URL :id
  const [project, setProject] = useState(null); // detail du projet selectionné
  const [loading, setLoading] = useState(true); // état de chargement pour afficher un loader pendant la requete
  const [error, setError] = useState(null); // état d'erreur pour afficher un message si la requete échoue (ex: backend éteint ou id invalide)

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const data = await apiFetch(`/projects/${id}`);
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();// Appel asynchroen pour recuperer les details du projet en fonction de l'id capturé dans l'url
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-emerald-400 font-mono tracking-widest animate-pulse">CHARGEMENT DES DÉTAILS...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-6 rounded-xl inline-block mb-6">
          <p className="font-bold">Impossible de trouver ce projet</p>
          <p className="text-sm font-mono mt-1">{error || 'Le projet demandé n\'existe pas.'}</p>
        </div>
        <div>
          <Link to="/projects" className="text-emerald-400 hover:underline">← Retour à la liste des projets</Link>
        </div>
      </div>
    );
  }

  const tags = project.tech_stack ? project.tech_stack.split(',').map(t => t.trim()) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/projects" className="text-slate-400 hover:text-white transition-colors font-medium flex items-center mb-8">
        ← Retour aux projets
      </Link>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
        {/* Bannière principale image */}
        {project.image_url && (
          <div className="w-full h-80 bg-slate-950">
            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{project.title}</h1>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, index) => (
                <span key={index} className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/20">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="text-slate-300 leading-relaxed whitespace-pre-line mb-8">
            {project.description || "Aucune description détaillée disponible."}
          </div>

          <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-700">
            {project.github_url && (
              <a 
                href={project.github_url} 
                target="_blank" 
                rel="noreferrer"
                className="bg-slate-900 hover:bg-slate-950 text-white font-semibold px-5 py-2.5 rounded-lg border border-slate-700 transition-colors inline-flex items-center"
              >
                Code Source GitHub
              </a>
            )}
            {project.demo_url && (
              <a 
                href={project.demo_url} 
                target="_blank" 
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2.5 rounded-lg shadow transition-colors inline-flex items-center"
              >
                Démo Vidéo / Live
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}